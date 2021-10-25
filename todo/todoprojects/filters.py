from todoprojects.models import Project
from django_filters import rest_framework as filters


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['title']

