from django.urls import path,include
from jobs import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('jobs',views.JobViewSet,basename='JobList')
urlpatterns = [
# function based 
    # path('JobList/',views.JobList,name='joblist'),
    # path('JobDetail/<int:pk>/',views.JobDetail,name='jobdetail'),

# class based
    # path('JobList/',views.JobList.as_view(),name='joblist'),
    # path('JobDetail/<int:pk>/',views.JobDetail.as_view(),name='jobdetail'),

# mixins based
#     path('JobList/',views.JobList.as_view(),name='joblist'),
#     path('JobDetail/<int:pk>/',views.JobDetail.as_view(),name='jobdetail'),

#generic based
    # path('JobList/',views.JobList.as_view(),name='joblist'),
    # path('JobDetail/<int:pk>/',views.JobDetail.as_view(),name='jobdetail'),

#modelview based
        path('',include(router.urls)),
        path('analyze/', views.analyze_job, name='analyze'),
]

