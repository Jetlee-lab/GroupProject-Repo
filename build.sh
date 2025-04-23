#!/usr/bin/env bash
# exit on error

# env

# print ----------+++++++++++++++++++++++++++++++++++++----------------------------


if [ ! -d "/app/backend/staticfiles/frontend" ]; then

    echo RUNNING MIGRATIONS... && python manage.py makemigrations &&  python manage.py migrate && \
    echo POPULATING DATABASE... && python manage.py loaddata data && \
    echo COLLECTING STATIC FILES... && python manage.py collectstatic --noinput
    
    mv /app/frontend/dist /app/backend/staticfiles/frontend

fi

echo SPINING UP SERVER...

python manage.py runserver 0.0.0.0:8000



# set -o errexit

# pip install --upgrade pip
# pip install -r requirements.txt

# python manage.py migrate