import openai
import os
import json
from dotenv import load_dotenv

load_dotenv('.env')

openai.api_key = os.getenv('OPENAI_API_KEY')

def query_gpt_for_scoring(prompt):
    response = openai.completions.create(
        model="gpt-3.5-turbo-instruct",  # GPT-4 modeli
        prompt=prompt,
        temperature=0.3,
        max_tokens=500,  # Adjust based on the length of your prompt
        top_p=1.0,
        frequency_penalty=0.5,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()

def generate_scoring_prompt(job_role, job_description, resume_details):
    projects_summary = "; ".join([f"Project titled '{proj['project_title']}' using {', '.join(proj['tech_stack'])}." for proj in resume_details['projects']])
    experiences_summary = "; ".join([f"Experience at {exp['organization']} as a {exp['role']}." for exp in resume_details['professional_experience']])
    
    prompt = (f"Considering the job role of {job_role} with a focus on {job_description}, "
              f"evaluate the relevance of the following projects and professional experiences: "
              f"College: {resume_details['college']} "
              f"Projects: {projects_summary} "
              f"Experiences: {experiences_summary}. "
              "Assess each project and professional experience for their relevance to the job role and description. "
              "Provide a relevance score for projects on a scale from 0 (not relevant) to 5 (highly relevant), and for professional experiences on a scale from 0 to 10. "
              "Conclude with an overall resume relevance score that reflects how well the entire resume aligns with the job role and description on a scale from 0 (not aligned) to 100 (highly aligned). "
              "Format your response as follows: '{\"projects_scores\": [0, 3], \"experience_scores\": [5, 10], \"relevance_score\": 89}'.")
    return prompt


def process_gpt_scoring_response(resume_details, scoring_text):
    try:
        scoring_data = json.loads(scoring_text)
        
        project_scores = scoring_data.get('projects_scores', [])
        experience_scores = scoring_data.get('experience_scores', [])
        relevance_score = scoring_data.get('relevance_score', 0)
        
        # Update project relevancy scores
        for i, score in enumerate(project_scores):
            if i < len(resume_details['projects']):
                resume_details['projects'][i]['relevancy'] = score
        
        # Update professional experience relevancy scores
        for i, score in enumerate(experience_scores):
            if i < len(resume_details['professional_experience']):
                resume_details['professional_experience'][i]['relevancy'] = score
        
        # Add overall relevance score to the resume details
        resume_details['overall_relevance_score'] = relevance_score
    except Exception as e:
        print(f"Error parsing GPT-4 response: {e}")
    
    return resume_details


def score_resume_details(job_role, job_description, resume_details_json):
    try:
        resume_details = json.loads(resume_details_json)
        prompt = generate_scoring_prompt(job_role, job_description, resume_details)
        
        scoring_text = query_gpt_for_scoring(prompt)
        updated_resume_details = process_gpt_scoring_response(resume_details, scoring_text)
        
        updated_resume_details_json = json.dumps(updated_resume_details, indent=4)
        return updated_resume_details_json
    except Exception as e:
        print(e.with_traceback)
        pass

