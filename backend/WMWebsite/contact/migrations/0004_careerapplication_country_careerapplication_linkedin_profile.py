from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contact", "0003_careersconfigstate"),
    ]

    operations = [
        migrations.AddField(
            model_name="careerapplication",
            name="country",
            field=models.CharField(blank=True, default="", max_length=3),
        ),
        migrations.AddField(
            model_name="careerapplication",
            name="linkedin_profile",
            field=models.TextField(blank=True, default=""),
        ),
    ]
