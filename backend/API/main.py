from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import redis
from CeleryWorker.tasks import call_agent

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/")
async def root():
    return {"msg" : "yo"}

@app.post("/makeX/{topic}")
@limiter.limit("5/minute")
async def read_item(request: Request):
    # TODO: use redis to enqueue the job and get the job_id
    call_agent.add(request.path_params['topic'])
    
    # return the job Id
    return {"item" : 0} 

@app.get("/makeX/{topic}/{topic_id}")
@limiter.limit("30/minute")
async def read_item(request: Request):
    #TODO: poll celery to check the status of the job
    #TODO: If job is done get the result from redis
    return {"item" : request.path_params['topic']}