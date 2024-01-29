from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from .models import Project, Note
# from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer, NoteSerializer
from .filters import ProjectFilter, NoteFilter
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
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    pagination_class = NoteDefaultPagination
    filterset_class = NoteFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
