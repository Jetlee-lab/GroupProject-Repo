EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True# settings.py

# Basic Django settings
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'your-secret-key'
DEBUG = True
ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    # Django default apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Your custom apps
    'your_app',  # Add this line if your app is directly listed
    # OR, if you're using an AppConfig class, use the following:
    'your_app.apps.YourAppConfig',  # Add this line to connect signals (replace 'your_app' with your actual app name)

    # Other third-party apps (if any)
    'rest_framework',  # Example of a third-party app
    # 'other_third_party_app',
]

# Middleware, templates, static files, etc.
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XContentOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Database configuration (PostgreSQL, SQLite, etc.)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # Example for SQLite
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Authentication settings, email configuration, static files, etc.
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your_email@gmail.com'
EMAIL_HOST_PASSWORD = 'your_email_password'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Static files (CSS, JavaScript, images)
STATIC_URL = 'static/'

# Other settings as needed...

EMAIL_HOST_USER = 'your_email@gmail.com'  # Replace with your email
EMAIL_HOST_PASSWORD = 'your_email_password'  # Replace with your email password
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
