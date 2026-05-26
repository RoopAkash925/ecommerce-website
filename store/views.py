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