from django.urls import path
from .views import products
from .views import register,login

urlpatterns = [

    path("products/",products),
    path("register/",register),
    path("login/",login),

]
