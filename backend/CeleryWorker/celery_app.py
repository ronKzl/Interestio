from celery import Celery


app = Celery('makex')
app.config_from_object('./celeryconfig.py')

if __name__ == '__main__':
    app.start()
