from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('markers/<int:linea>', views.markers, name="markers"),
    path('videos/<int:linea>', views.videos, name="videos"),
    path('get_line/', views.get_line, name="get_line"),
    path('get_markers/', views.get_markers, name="get_markers")
]