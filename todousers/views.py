from rest_framework.generics import get_object_or_404
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TodoUser
from rest_framework.viewsets import ViewSet, ModelViewSet
from .serializers import TodoUserModelSerializer


# class TodoUsersViewSet(ModelViewSet):
#     queryset = TodoUser.objects.all()
#     serializer_class = TodoUserModelSerializer

# class TodoUsersViewSet(APIView):
#     renderer_classes = [JSONRenderer]
#     queryset = TodoUser.objects.all()
#
#     def get(self, request, format=None, pk=None):
#         if pk is None:
#             users = TodoUser.objects.all()
#         else:
#             print(f'pk = {pk}')
#             users = TodoUser.objects.filter(pk=pk)
#         serializer = TodoUserModelSerializer(users, many=True)
#         return Response(serializer.data)


class TodoUsersViewSet(ViewSet):
    serializer_class = TodoUserModelSerializer
    queryset = TodoUser.objects.all()

    def list(self, request):
        users = TodoUser.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = get_object_or_404(TodoUser, pk=pk)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def update(self, request, pk=None):
        instance = get_object_or_404(TodoUser, pk=pk)
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)