import fitz  # PyMuPDF
import openai
import os
import pytesseract
from PIL import Image
from dotenv import load_dotenv

load_dotenv('.env')

openai.api_key = os.getenv('OPENAI_API_KEY')

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    if not text:
        text = ocr_pdf(doc)
    return text

def ocr_pdf(doc):
    text = ''
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        pix = page.get_pixmap()
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        text += pytesseract.image_to_string(img)
    return text

def query_gpt(prompt):
    response = openai.completions.create(
        model="gpt-3.5-turbo-instruct", # GPT-4 modeli
        prompt=prompt,
        temperature=0.5,
        max_tokens=2048,  # Adjusted for potentially longer inputs
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()

def extract_from_gpt(text):
    prompt = """Transform the provided resume text into a JSON object strictly adhering to the format below. Use 'month,yyyy' for dates (e.g., May,2024) and express durations in months, keep descriptions concise, max 1-2 lines. Use 'N/A' for missing info. Only include the JSON output in your response.

    {
        "name": "Name",
        "email": "Email",
        "projects": [
            {
                "project_title": "Title",
                "short_description": "Description",
                "tech_stack": ["Technology"],
                "time_duration": {
                    "start": "month,yyyy",
                    "end": "month,yyyy",
                    "duration_months": Duration
                }
            }
        ],
        "professional_experience": [
            {
                "role": "Role",
                "organization": "Organization",
                "short_description": "Description",
                "tech_stack": ["Technology"],
                "time_duration": {
                    "start": "month,yyyy",
                    "end": "month,yyyy",
                    "duration_months": Duration
                }
            }
        ],
        "college": {
            "name": "College Name",
            "branch": "Branch",
            "degree": "Degree",
            "cgpa": CGPA,
            "start": "month,yyyy",
            "end": "month,yyyy"
        }
    }

    Directly parse and structure the resume text into this JSON format, ensuring all fields are accurately filled with the provided data or marked as 'N/A' for string and 0 for number if unavailable."""

    extracted_text = query_gpt(prompt + "\n\nResume Text:\n" + text)
    return extracted_text

def extract_details(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    resume_details = extract_from_gpt(text)
    return resume_details

