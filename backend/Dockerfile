FROM python:3.12-alpine
WORKDIR /app
RUN apk add --no-cache gcc musl-dev linux-headers
RUN python -m pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENV PYTHONPATH=/app
EXPOSE 5000
CMD ["fastapi", "run", "API/main.py","--port", "5000"]




