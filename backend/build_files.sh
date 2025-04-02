echo " BUILD START..."

# create a virtual environment named 'venv' if it doesn't already exist
python3.9 -m venv .venv

# activate the virtual environment
source venv/bin/activate

# install the required packages
pip install -r requirements.txt

python3.9 manage.py collectstatic --noinput

# python3 ./manage.py makemigrations
# python3 ./manage.py migrate

# python3 ./manage.py runserver

echo "...BUILD END"

echo "SPINNING UP THE SERVER..."

# [optional] Start the application here 
python manage.py runserver
