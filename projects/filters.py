from django_filters import rest_framework as filters
from .models import Project, Note


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class NoteFilter(filters.FilterSet):
    project = filters.CharFilter(field_name='project__name', lookup_expr='icontains', label='Проект')
    create_date_filter = filters.DateFromToRangeFilter(field_name='created', label='Диапазон дат создания')

    class Meta:
        model = Note
        fields = ['project']