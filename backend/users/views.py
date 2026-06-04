from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from google.oauth2 import id_token
from google.auth.transport import requests

from users.models import User, UserAddress

from users.serializers import UserAddressSerializer, UserProfileSerializer


class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get("access_token")

        try:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(), settings.GOOGLE_CLIENT_ID
            )
            email = idinfo["email"]
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")
            picture = idinfo.get("picture", "")
        except ValueError:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )

        # 2. Ищем или создаем юзера
        user, created = User.objects.get_or_create(email=email)

        user.first_name = first_name
        user.last_name = last_name
        user.avatar_url = picture
        user.is_verified = True
        user.save()

        # 3. Генерируем JWT токены
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )


class UserDataAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response(
            {"user": UserProfileSerializer(request.user).data},
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        
        allowed_fields = {
            "first_name": request.data.get("first_name"),
            "last_name": request.data.get("last_name"),
            "phone": request.data.get("phone"),
        }
        print(allowed_fields)
        update_data = {k: v for k, v in allowed_fields.items() if v is not None}

        serializer = UserProfileSerializer(request.user, data=update_data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"user": serializer.data}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAddressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        addresses = UserAddress.objects.filter(user=request.user)
        print(addresses)
        return Response(
            {"addresses": UserAddressSerializer(addresses, many=True).data if addresses else None},
            status=status.HTTP_200_OK,
        )

    def patch(self, request, id):
        address = UserAddress.objects.filter(user=request.user, id=id).first()
        if not address:
            return Response(
                {"error": "Address not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserAddressSerializer(address, data=request.data, partial=True)
        # partial=True позволяет обновлять только те поля, которые пришли в запросе.
        # Если прислали только город — обновится только город, остальные данные в БД не изменятся.
        if serializer.is_valid():
            serializer.save()
            return Response({"address": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
