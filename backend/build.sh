#!/usr/bin/env bash
# exit on error

env

print ----------+++++++++++++++++++++++++++++++++++++----------------------------

# RUN python manage.py collectstatic --noinput
# mkdir -p /app/backend/staticfiles

# mv /app/frontend/dist /app/backend/staticfiles/frontend

echo ...DONE

echo STARTING SERVER...

pwd

echo ===================================================
# python manage.py runserver 0.0.0.0:8000



# set -o errexit

# pip install --upgrade pip
# pip install -r requirements.txt

# python manage.py migrate
