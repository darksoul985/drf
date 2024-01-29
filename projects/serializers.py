from rest_framework import serializers
from .models import Project, Note
from todousers.serializers import TodoUserModelSerializer


class ProjectSerializer(serializers.ModelSerializer):
    users = TodoUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField()
    user = TodoUserModelSerializer()

    class Meta:
        model = Note
        fields = ['body', 'project', 'user', 'update', 'is_active']