from rest_framework import serializers
from .models import Project, Todo
from todousers.serializers import TodoUserModelSerializer


class ProjectSerializer(serializers.ModelSerializer):
    #users = serializers.StringRelatedField(many=True)
    users = TodoUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField()
    user = TodoUserModelSerializer()

    class Meta:
        model = Todo
        fields = ['body', 'project', 'user', 'update', 'is_active']