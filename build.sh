#!/usr/bin/env bash
# exit on error

# env

# print ----------+++++++++++++++++++++++++++++++++++++----------------------------

if [ ! -f "/app/backend/staticfiles/frontend/index.html" ]; then

    # echo FLUSHING DATABASE... && python manage.py flush --no-input && \
    # echo RUNNING MIGRATIONS... && python manage.py makemigrations &&  python manage.py migrate && \
    # echo POPULATING DATABASE... && python manage.py loaddata data && \
    # echo COLLECTING STATIC FILES... && python manage.py collectstatic --noinput
    
    mkdir -p /app/backend/staticfiles
    mv /app/frontend/dist /app/backend/staticfiles/frontend

fi

echo SPINING UP SERVER...

# Dynamically assigned by heroku
python manage.py runserver 0.0.0.0:${PORT}



# set -o errexit

# pip install --upgrade pip
# pip install -r requirements.txt

# python manage.py migrate