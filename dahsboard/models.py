from django.db import models

# Create your models here.
class Linea(models.Model):
    num_linea = models.PositiveSmallIntegerField()
    nombre = models.CharField(max_length=50)
    longitud_km = models.FloatField(default=100)

    def __str__(self):
        return f"Línea {self.num_linea}: {self.nombre}"
        
class Marcador(models.Model):
    linea = models.ForeignKey(
        to='Linea',
        related_name='marcadores',
        on_delete=models.CASCADE
    )
    longitud = models.FloatField(default=19)
    latitud = models.FloatField(default=19)
    ficha = models.CharField(max_length=100, blank=False, default="ficha")
    
    def __str__(self):
        return f"Línea {self.linea.num_linea}\nLongitud: {self.longitud}\nLatitud: {self.latitud}"