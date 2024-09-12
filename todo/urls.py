"""
URL configuration for todo project.
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from todousers.views import TodoUsersViewSet
from projects.views import ProjectViewSet, NoteViewSet


router = DefaultRouter()
router.register('users', TodoUsersViewSet, basename='users_')
router.register('projects', ProjectViewSet)
router.register('todo', NoteViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    # path('views/api-view/<int:pk>/', TodoUsersViewSet.as_view()),
]
