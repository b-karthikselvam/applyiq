from django.shortcuts import render
from .models import Job
from .serializers import JobSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import mixins, generics, viewsets
from rest_framework.permissions import IsAuthenticated
import anthropic
from rest_framework.decorators import api_view, permission_classes
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()




class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(user=self.request.user).order_by('-date_applied')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analyze_job(request):
    description = request.data.get('description')
    resume = request.data.get('resume')

    if not description or not resume:
        return Response(
            {'error': 'Both job description and resume are required'},
            status=400
        )

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    chat_completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are an expert ATS analyst and career coach.

Analyze the job description and resume below. Respond in JSON format only. No extra text. No markdown.

Job Description:
{description}

Resume:
{resume}

Respond in this exact JSON format:

{{
    "job_details": {{
        "role": "Job title extracted from JD",
        "company_type": "Type of company/industry",
        "required_skills": ["skill1", "skill2"],
        "experience_required": "2+ years / Fresher etc",
        "salary": "salary if mentioned"
    }},
    "skill_analysis": {{
        "matching_skills": ["skills present in both JD and resume"],
        "lacking_skills": [
            {{
                "skill": "skill name",
                "importance": "High/Medium/Low",
                "youtube_channels": [
                    {{"channel": "Channel Name", "url": "https://youtube.com/@channelname"}}
                ]
            }}
        ]
    }},
    "ats_score": 75,
    "job_match_score": 68,
    "match_summary": "Brief explanation of scores",
    "resume_recommendations": [
        "tip1",
        "tip2"
    ],
    "overleaf_resume_code": "\\\\documentclass{{article}}\\\\begin{{document}}...\\\\end{{document}}"
}}"""
            }
        ],
        response_format={"type": "json_object"}
    )

    import json
    result = json.loads(chat_completion.choices[0].message.content)
    return Response(result)


# Anthropic AI view
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def analyze_job(request):
#     description = request.data.get('description')
#     resume = request.data.get('resume')

#     if not description or not resume:
#         return Response(
#             {'error': 'Both job description and resume are required'},
#             status=400
#         )

#     client = anthropic.Anthropic(api_key="........")

#     message = client.messages.create(
#         model="claude-haiku-4-5",
#         max_tokens=3000,
#         messages=[
#             {
#                 "role": "user",
#                 "content": f"""You are an expert ATS analyst and career coach.

# Analyze the job description and resume below. Respond in JSON format only. No extra text. No markdown.

# Job Description:
# {description}

# Resume:
# {resume}

# Respond in this exact JSON format:

# {{
#     "job_details": {{
#         "role": "Job title extracted from JD",
#         "company_type": "Type of company/industry",
#         "required_skills": ["skill1", "skill2", "skill3"],
#         "experience_required": "2+ years / Fresher etc",
#         "salary": "salary if mentioned"
#     }},
#     "skill_analysis": {{
#         "matching_skills": ["skills present in both JD and resume"],
#         "lacking_skills": [
#             {{
#                 "skill": "skill name",
#                 "importance": "High/Medium/Low",
#                 "youtube_channels": [
#                     {{"channel": "Channel Name", "url": "https://youtube.com/@channelname"}},
#                     {{"channel": "Channel Name 2", "url": "https://youtube.com/@channelname2"}}
#                 ]
#             }}
#         ]
#     }},
#     "ats_score": 75,
#     "job_match_score": 68,
#     "match_summary": "Brief explanation of the scores",
#     "resume_recommendations": [
#         "Add TypeScript projects to your portfolio",
#         "Mention AWS experience if any",
#         "Quantify your achievements with numbers"
#     ],
#     "overleaf_resume_code": "\\\\documentclass{{article}}\\\\begin{{document}}...full latex code here...\\\\end{{document}}"
# }}"""
#             }
#         ]
#     )

#     import json
    
#     raw = message.content[0].text
#     # Clean any markdown if AI adds it
#     raw = raw.replace("```json", "").replace("```", "").strip()
#     result = json.loads(raw)
#     return Response(result)
# **********************************************************************


# @api_view(['GET','POST'])
# def JobList(request):
#     if request.method == 'POST':
#         serializer = JobSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message':'Job registered successfully'},status=status.HTTP_201_CREATED)
#         else:
#             return Response({'message':'Something went wrong check the fields you given'},status=status)
            
#     elif request.method == 'GET':
#         job = Job.objects.all()
#         serializer = JobSerializer(job,many=True)
#         return Response(serializer.data)
    
# @api_view(['GET','PUT','DELETE'])
# def JobDetail(request,pk):
#     job = get_object_or_404(Job,pk=pk)
#     if request.method == 'GET':
#         serializer = JobSerializer(job)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = JobSerializer(job,data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response('serializer.data',status=status.HTTP_200_OK)
#         else:
#             return Response({'message':'error'})
#     elif request.method == 'DELETE':
#         job.delete()
#         return Response({'message':'Job Deleted'})


#######################################################################################################


#########  class Based view  #########
# class JobList(APIView):
#     def get(self,request):
#         job = Job.objects.all()
#         serializer = JobSerializer(job,many = True)
#         return Response(serializer.data,status=status.HTTP_200_OK)
#     def post(self,request):
#         serializer = JobSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors)

# class JobDetail(APIView):
#     def get_object(self,pk):
#         return get_object_or_404(Job,pk=pk)
#     def get(self,pk):
#         job = self.get_object(pk)
#         serializer = JobSerializer(job)
#         return Response(serializer.data,status=status.HTTP_200_OK)
    
#     def put(self,request,pk):
#         job = self.get_object(pk)
#         serializer = JobSerializer(job,data = request.data)
#         if serializer.is_valid():
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors)

#     def delete(self,request,pk):
#         job = self.get_object(pk)
#         job.delete()


#######################################################################################################


#Mixins Based View
# class JobList(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
#     queryset = Job.objects.all()                 #           def list(request):
#     serializer_class = JobSerializer             #               serializer = serializer_class(query_set,many = true )
#     def get(self,request):                       #               return Response(serializer.data)
#         return self.list(request)
    
#     def post(self,request):                      #           def post(request):
#         return self.create(request)              #               serializer = serializer_class(request.data)
#                                                  #               if serializer.is_valid():
#                                                  #                  serializer.save()
#                                                  #                  return Response(serializer.data)

# class JobDetail(mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin,generics.GenericAPIView):
#     queryset = queryset = Job.objects.all()                 
#     serializer_class = JobSerializer

#     def get(self,request,pk):
#         return self.retrieve(request,pk)                        #get_object_or_404(queryset, pk=2)
    
#     def put(self,request,pk):
#         return self.update(request,pk)
    
#     def delete(self,request,pk):
#         return self.destroy(self,request,pk)


#######################################################################################################


#generics based view 
# class JobList(generics.ListCreateAPIView):
#     queryset = Job.objects.all()
#     serializer_class = JobSerializer

# class JobDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Job.objects.all()
#     serializer_class = JobSerializer
#     lookup_field = 'pk'       


