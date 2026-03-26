from celery import Celery
import os


def make_celery() -> Celery:
    """
    Build a Celery app whose broker/result backend come from environment.
    This avoids relying on local file paths when running inside Docker.
    """
    broker_url = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
    result_backend = os.getenv("CELERY_RESULT_BACKEND", broker_url)

    app = Celery("makex", broker=broker_url, backend=result_backend)
    app.conf.update(
        task_serializer="json",
        result_serializer="json",
        accept_content=["json"],
        timezone=os.getenv("CELERY_TIMEZONE", "Canada/Toronto"),
        enable_utc=True,
        include=["CeleryWorker.tasks"],
    )

    return app


app = make_celery()


if __name__ == "__main__":
    app.start()
