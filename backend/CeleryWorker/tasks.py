from .celery_app import app


@app.task
def call_agent(input: str):
    return 'Called agent with input: {0}'.format(input)

# docker run -d -p 6379:6379 redis
# pip install -r requirements.txt
# celery -A tasks worker --loglevel=INFO

