# Use the official Python runtime image
FROM python:3.13  
 
# Create the app directory
RUN mkdir /app
 
# Set the working directory inside the container
WORKDIR /app
 
# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 
 
# Upgrade pip
RUN pip install --upgrade pip 

# COPY backend/  /app/
# Copy the Django project to the container
COPY . /app/

# Copy the Django project  and install dependencies
# COPY requirements.txt  /app/
 
# run this command to install all dependencies 
RUN pip install --no-cache-dir -r backend/requirements.txt
 
# Expose the Django port
EXPOSE 8000

# Change to a specific folder, within /app
WORKDIR /app/backend

RUN echo RUNNING MIGRATIONS...

# RUN python manage.py makemigrations
# RUN python manage.py migrate

RUN echo ...DONE

# Collect static files
RUN echo COLLECTING STATIC FILES...

# RUN python manage.py collectstatic --noinput
RUN mkdir -p /app/backend/staticfiles
RUN mv /app/frontend/dist /app/backend/staticfiles/frontend -r

RUN echo ...DONE

RUN echo STARTING SERVER...
# Run Django’s development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]



# FROM python:3.9

# # set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# COPY requirements.txt .

# # install python dependencies
# RUN pip install --upgrade pip
# RUN pip install --no-cache-dir -r requirements.txt

# COPY env.sample .env

# COPY . .

# # running migrations
# RUN python manage.py makemigrations
# RUN python manage.py migrate

# # gunicorn
# CMD ["gunicorn", "--config", "gunicorn-cfg.py", "core.wsgi"]

