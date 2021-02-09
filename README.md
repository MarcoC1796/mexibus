# Plataforma Analítica Mexibus

***

Este aplicación consiste de 3 partes principales:

* Visualizador de información por línea y dirección del mexibus.
* Inventario por línea del mexibus.
* Streaming de videos de toma dron y suelo por línea.

La aplicación se desarrollo con 5 teconologías. Para el Frontend se utilizó `HTML 5`, `CSS` y `Javascript`.
El Backend se desarrollo utilizando `Python` junto con el Framework Web `DJANGO` y una base de datos SQL que utiliza `SQLITE` como DBMS.
Complementario a `JavaScript` se utilizó la libreria de `LeafLet` para crear las visualizaciones geográficas. Los datos utilizados para estas 
visualizaciones estan en archivos GeoJson que el backend formatea y frontend llama a la API vara mostrar los datos.
