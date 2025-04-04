#!/usr/bin/env bash
# exit on error

# env

# print ----------+++++++++++++++++++++++++++++++++++++----------------------------


echo RUNNING MIGRATIONS...

python manage.py makemigrations
python manage.py migrate

echo POPULATING DATABASE...

python manage.py loaddata d

# Collect static files
echo COLLECTING STATIC FILES...

# python manage.py collectstatic --noinput
# mkdir -p /app/backend/staticfiles
ls /app/backend/

# mv /app/frontend/dist /app/backend/staticfiles/frontend

echo =======================================================
ls /app/backend/staticfiles/frontend/

echo SPINING UP SERVER...

python manage.py runserver 0.0.0.0:8000



# set -o errexit

# pip install --upgrade pip
# pip install -r requirements.txt

# python manage.py migrate