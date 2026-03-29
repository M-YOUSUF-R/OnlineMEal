from django.db import models

class UserSync(models.Model):
    mongo_id = models.CharField(max_length=255, unique=True)
    border_no = models.CharField(max_length=50, unique=True)
    reg_no = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=255)
    room_no = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.border_no} - {self.full_name}"

class Meal(models.Model):
    user = models.ForeignKey(UserSync, on_delete=models.CASCADE)
    date = models.DateField()
    user_meal_status = models.BooleanField(default=True)
    guest_meal_status = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'date')

    def __str__(self):
        return f"{self.user.border_no} - {self.date}"
