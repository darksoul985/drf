from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from .models import Project, Todo
# from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer, TodoSerializer
from .filters import ProjectFilter, TodoFilter
from rest_framework.response import Response


class ProjectDefaultPagination(LimitOffsetPagination):
    default_limit = 10


class NoteDefaultPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    # renderer_classes = [BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectDefaultPagination
    filterset_class = ProjectFilter


class NoteViewSet(ModelViewSet):
    # renderer_classes = [BrowsableAPIRenderer]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = NoteDefaultPagination
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
