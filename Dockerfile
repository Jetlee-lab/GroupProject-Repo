# Use the official Python runtime image
# FROM python:3.13
FROM nikolaik/python-nodejs:python3.13-nodejs23
 
# Create the app directory
RUN mkdir /app

# Copy the Django project to the container
COPY . /app/
 
# Set the working directory inside the container
WORKDIR /app/frontend

# RUN npm install --global corepack@latest && corepack enable && \
#     corepack prepare pnpm@latest-10 --activate && pnpm config set store-dir ~/.pnpm-store \
RUN npm install -g pnpm && \
    pnpm install && pnpm build

# Change to a specific folder, within /app
WORKDIR /app/backend
# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 
ENV PIP_NO_CACHE_DIR=1 
 
# Upgrade pip
RUN pip install --upgrade pip 

# run this command to install all dependencies 
RUN pip install --no-cache-dir -r requirements.txt

# WORKDIR /app/backend

# RUN echo RUNNING MIGRATIONS...; \
#     python manage.py makemigrations && \
#     python manage.py migrate

# RUN echo POPULATING DATABASE...; \
#     python manage.py loaddata data

# Collect static files
# RUN echo COLLECTING STATIC FILES...; \
#     python manage.py collectstatic --noinput; \
#     mkdir -p /app/backend/staticfiles \
#     mv /app/frontend/dist /app/backend/staticfiles/frontend


# RUN echo RUNNING MIGRATIONS... && python manage.py makemigrations &&  python manage.py migrate && \
#     echo POPULATING DATABASE... && python manage.py loaddata data && \
#     echo COLLECTING STATIC FILES... && python manage.py collectstatic --noinput

# # Move the built frontend
# RUN mv /app/frontend/dist /app/backend/staticfiles/frontend

# Expose the Django port
# No need to expose. Let's use the dynamically assigned port by heroku
# EXPOSE 8000

RUN chmod +x /app/build.sh
# Run Django’s development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
ENTRYPOINT ["bash", "/app/build.sh"]



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
