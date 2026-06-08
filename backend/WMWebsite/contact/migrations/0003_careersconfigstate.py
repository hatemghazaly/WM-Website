from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contact", "0002_careerapplication_applied_job"),
    ]

    operations = [
        migrations.CreateModel(
            name="CareersConfigState",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("payload", models.JSONField(default=dict)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
