from django.http import JsonResponse
from .models import Product

def products(request):

    all_products = Product.objects.all()

    data = []

    for product in all_products:

        data.append({

            "name":product.name,
            "price":product.price,
            "description":product.description,
            "image":product.image

        })

    return JsonResponse(data,safe=False)
from .models import User
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def register(request):

    if request.method == "POST":

        data = json.loads(request.body)

        username = data["username"]

        email = data["email"]

        password = data["password"]

        if User.objects.filter(email=email).exists():

            return JsonResponse({

                "message":"User already exists"

            })

        User.objects.create(

            username=username,
            email=email,
            password=password

        )

        return JsonResponse({

            "message":"Registration Successful"

        })
    @csrf_exempt
def login(request):

    if request.method == "POST":

        data = json.loads(request.body)

        email = data["email"]

        password = data["password"]

        user = User.objects.filter(

            email=email,
            password=password

        ).first()

        if user:

            return JsonResponse({

                "message":"Login Successful",

                "username":user.username

            })

        return JsonResponse({

            "message":"Invalid Credentials"

        })