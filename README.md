# Plataforma Analítica Mexibus

***

Este aplicación consiste de 3 partes principales:

* Visualizador de información por línea y dirección del mexibus.
* Inventario por línea del mexibus.
* Streaming de videos de toma dron y suelo por línea.

La aplicación se desarrollo con 5 teconologías. Para el Frontend se utilizó `HTML 5`, `CSS` y `Javascript`.
El Backend se desarrollo utilizando `Python` junto con el Framework Web `DJANGO` y una base de datos SQL que utiliza `SQLITE` como DBMS.
Complementario a `JavaScript` se utilizó la libreria de `LeafLet` para crear las visualizaciones geográficas. Los datos utilizados para estas 
visualizaciones estan en archivos GeoJson que el backend formatea y el frontend llama a la API para mostrar los datos.

***

# Uso en ambiento de desarrollo

1. Instalar [python](https://www.python.org/downloads/) para el sistema operativo correspondiente. 
2. Crear un ambiente virutal de desarrollo utilizando [`virtualenv`](https://docs.python.org/3/tutorial/venv.html).
  2.1. crear ambiente `python3 -m venv <env-name>`.
  2.2. activar ambiente con  `source <env-directory>/bin/activate`.
  2.3. utilizar el archivo *requirements.txt* para instalar las dependencias con `python -m pip install -r requirements.txt`.  
3. Activar [DJANGO](https://www.djangoproject.com/).
  3.1. En la carpeta donde está guardado el projecto utilizar *manage.py* para iniciar la aplicación.
  3.2. Correr el comando `python3 manage.py runserver`.
  3.3. La aplicación correra en *localhost:8000*.
  
  **Nota:** los pasos anteriores son para un sistema operativo tipo UNIX. Si se cuenta con otro diferente referir a la documentación correspondiente para consultar los comandos equivalentes.
