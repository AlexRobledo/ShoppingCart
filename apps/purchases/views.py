from django.shortcuts import render

# Create your views here.

def Shopping(request):
    data = {}
    return render(request, 'purchases/shopping.html', data)