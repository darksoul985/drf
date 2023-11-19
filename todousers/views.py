from .models import TodoUser
from rest_framework.viewsets import ModelViewSet
from .serializers import TodoUserModelSerializer


class TodoUsersViewSet(ModelViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserModelSerializer
