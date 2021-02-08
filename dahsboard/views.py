from django.http.response import Http404
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
import os, json

# Create your views here.
def index(request):
    return render(request, 'dahsboard/index_map.html', {
        
    })

def markers(request, linea):
    if 0 < linea < 4:
        return render(request, 'dahsboard/markers_map.html', {
            "linea":linea
        })
    raise Http404("Invalid argument.")

def videos(request, linea):
    if 0 < linea < 4:
        return render(request, 'dahsboard/videos.html', {
            "linea": linea
        })
    raise Http404("Invalid argument.")

def get_line(request):
    try:
        line = int(request.GET.get("line") or 1)
        if not(0 < line < 7):
            raise Http404()
        
        file_names = sorted(os.listdir('datos/'))
        path = 'datos/' + file_names[line - 1]
        with open(path) as linea:
            linea = linea.read()
            linea = json.loads(linea)
        for feature in linea["features"]:
            feature["properties"]["linea"] = (line - 1) // 2 + 1
        print(linea["features"][0]["properties"].keys())
    except Exception as e:
        raise Http404("Invalid argument.")

    return JsonResponse(linea)

def get_markers(request):
    try:
        line = int(request.GET.get("line") or 1)

        if not(0 < line < 4):
            raise Http404()
        linea = Linea.objects.get(num_linea=line)
        marcadores = linea.marcadores.all()
        json_api_response = {
            "num_linea": linea.num_linea,
            "nombre_linea": linea.nombre,
            "directorio_fichas": f"/static/pdf/linea_{line}/senalamientos/",
            "marcadores": []
        }
        for marcador in marcadores:
            marcador_json = {
                "coord": [marcador.latitud, marcador.longitud],
                "ficha": marcador.ficha
            }
            json_api_response["marcadores"].append(marcador_json)
    except:
        raise Http404("Invalid argument.")

    return JsonResponse(json_api_response)

