broker_url = 'redis://localhost'
result_backend = 'redis://localhost'

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json','text']
timezone = 'Canada/Toronto'
enable_utc = True
include = ['CeleryWorker.tasks']
task_annotations = {
    'tasks.callAgent': {'rate_limit': '10/m'}
}