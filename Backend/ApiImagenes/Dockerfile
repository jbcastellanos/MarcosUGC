FROM python:3.9

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /imagenes

WORKDIR /imagenes

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install gunicorn

COPY . .

COPY ./entrypoint.sh /
ENTRYPOINT [ "sh", "/entrypoint.sh" ]



# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "apiInventario.wsgi:application"] 