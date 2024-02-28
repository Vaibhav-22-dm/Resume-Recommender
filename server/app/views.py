import jwt
import json
from django.conf import settings
from datetime import datetime, timedelta
from rest_framework.decorators import api_view, permission_classes, authentication_classes,  parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models.sessions import Session
from .models.resumes import Resume
from .serializers import SessionSerializer, ResumeSerializer
from .utils.extraction import extract_details
from .utils.scoring import score_resume_details
from middleware.auth import Authentication
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

MAX_RETRIES = 5

@api_view(['POST'])
def create_session(request):
    try:
        session = Session.objects.create()

        exp = datetime.now() + timedelta(hours=24)
        payload = {'session_id': str(session.id), 'exp': exp.timestamp()}
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        return Response({'message': 'Session created successfully', 'access_token': token}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@authentication_classes([Authentication])
@parser_classes([MultiPartParser, FormParser])
def attach_files(request):
    try:
        session_id = getattr(request, 'session_id', None)
        session = Session.objects.get(id=session_id)

        files = request.data.getlist('files[]')
        for file in files:
            resume = Resume.objects.create(session=session, file=file)
            resume.save()
        return Response({'message': 'Files uploaded successfully'}, status=201)
    except Session.DoesNotExist:
        return Response({'error': 'Session does not exist'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
@authentication_classes([Authentication])
def generate_recommendations(request):
    try:
        session_id = getattr(request, 'session_id', None)
        session = Session.objects.get(id=session_id)
        resume_files = Resume.objects.filter(session=session)
        if session.status is False:
            session.role = request.data.get('role')
            session.description = request.data.get('description')
            session.save()
            for resume_file in resume_files:
                if not resume_file.details:
                    details = extract_details(resume_file.file.path)
                    resume_file.details = json.dumps(details)
                else:
                    details = json.loads(resume_file.details)

                for i in range(MAX_RETRIES):
                    score_details = score_resume_details(session.role, session.description, details)
                    if score_details is None: 
                        details = extract_details(resume_file.file.path)
                        resume_file.details = json.dumps(details)
                    else:
                        break

                if (score_details is None): 
                    resume_file.relevance_score =  0 
                else: 
                    resume_file.relevance_score = json.loads(score_details)['overall_relevance_score']
                    details = score_details

                resume_file.details = details
                resume_file.save()

                session.status = True
                session.save()

        return Response({"message": "Recommendations Generated"}, status=200)
    except Session.DoesNotExist:
        return Response({'error': 'Session does not exist'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['GET'])
@authentication_classes([Authentication])
def get_recommendations(request):
    try:
        session_id = getattr(request, 'session_id', None)
        session = Session.objects.get(id=session_id)
        if session.status==False:
            return Response({"error":"Recommendations not yet generated"}, status=400)
        data = {}
        resume_files_recommended = Resume.objects.filter(session=session).filter(relevance_score__gte=80)
        serializer = ResumeSerializer(resume_files_recommended, many=True)
        data["resume_files_recommended"] = serializer.data
        resume_files_non_recommended = Resume.objects.filter(session=session).filter(relevance_score__lt=80)
        serializer = ResumeSerializer(resume_files_non_recommended, many=True)
        data["resume_files_non_recommended"] = serializer.data
        return Response(data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)