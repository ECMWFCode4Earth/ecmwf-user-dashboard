from django.db import models


# Create your models here.
class Notification(models.Model):
    message = models.TextField()
    date = models.DateField()
