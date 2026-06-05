from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from accounts.models import User

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name')
    if not name or not email or not password:
        return Response(
            {'message': 'All fields are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    if User.objects.filter(email = email).exists():
        return Response(
            {'message': 'Email already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    user = User.objects.create_user(
        email=email,
        password=password,
        name=name
    )

    return Response(
        {'message': 'Account created successfully!'},
        status=status.HTTP_201_CREATED
    )


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def signin(request):
#     email = request.data.get("email")
#     password = request.data.get("password")

#     if not email or not password:
#         return Response(
#             {'message': 'All fields are required'},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     user = authenticate(request, email=email, password=password)

#     if user is None:
#         return Response(
#             {'message': 'Invalid email or password'},
#             status=status.HTTP_401_UNAUTHORIZED
#         )

#     if not user.is_active:
#         return Response(
#             {'message': 'Your account has been blocked'},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     from rest_framework_simplejwt.tokens import RefreshToken
#     refresh = RefreshToken.for_user(user)

#     return Response({
#         'access': str(refresh.access_token),
#         'refresh': str(refresh),
#         'email': user.email,
#         'name': user.name,
#     }, status=status.HTTP_200_OK)