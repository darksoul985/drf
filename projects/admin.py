from django.contrib import admin
from .models import Project, Todo

# admin.site.register(Project)
# admin.site.register(Note)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'repo']
    list_filter = ['name', 'users', 'repo']
    search_fields = ['name', 'users']
    raw_id_fields = ['users']
    ordering = ['name']


@admin.register(Todo)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['project', 'body', 'user', 'created', 'update', 'is_active']
    list_filter = ['project', 'user', 'is_active']
    search_fields = ['project', 'user']
    raw_id_fields = ['user']
    ordering = ['-update', '-created']