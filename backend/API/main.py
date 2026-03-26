from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from CeleryWorker.tasks import call_agent
from CeleryWorker.celery_app import app as celery_app

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/")
async def root():
    return {"msg" : "yo"}

@app.post("/makeX/{topic}")
@limiter.limit("5/minute")
async def create_job(request: Request):
    topic = request.path_params['topic']
    # Enqueue the Celery job (Redis broker/result backend)
    result = call_agent.delay(topic)
    return {"job_id": result.id}

@app.get("/makeX/{topic}/{topic_id}")
@limiter.limit("30/minute")
async def get_job(request: Request):
    topic_id = request.path_params['topic_id']
    job = celery_app.AsyncResult(topic_id)

    if job.state in {"PENDING", "STARTED"}:
        return {"state": job.state}
    if job.state == "FAILURE":
        return {"state": job.state, "error": str(job.info)}
    return {"state": job.state, "result": job.result}