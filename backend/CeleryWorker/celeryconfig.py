import os

broker_url = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
result_backend = os.getenv("CELERY_RESULT_BACKEND", broker_url)

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'Canada/Toronto'
enable_utc = True
include = ['CeleryWorker.tasks']
task_annotations = {
    'tasks.callAgent': {'rate_limit': os.getenv("CELERY_TASK_RATE_LIMIT", "10/m")}
}