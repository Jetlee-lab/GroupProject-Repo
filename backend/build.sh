#!/usr/bin/env bash
# exit on error

env

print ----------+++++++++++++++++++++++++++++++++++++----------------------------

# RUN python manage.py collectstatic --noinput
RUN mkdir -p /app/backend/staticfiles
RUN mv /app/frontend/dist /app/backend/staticfiles/frontend

RUN echo ...DONE

RUN echo STARTING SERVER...

pwd

echo ===================================================
# python manage.py runserver 0.0.0.0:8000



# set -o errexit

# pip install --upgrade pip
# pip install -r requirements.txt

# python manage.py migrate
