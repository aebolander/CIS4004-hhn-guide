from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import pymysql
from sqlalchemy import text
from flask_cors import CORS


app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:ucfd!sn3ysql?!@localhost/hhn_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

# Define your models (tables)
class HHNEvent(db.Model):
    __tablename__ = 'hhn_events'
    event_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_name = db.Column(db.String(100), unique=True, nullable=False)
    event_year = db.Column(db.Integer, unique=True, nullable=False)

class HHNScarezone(db.Model):
    __tablename__ = 'hhn_scarezones'
    scarezone_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    scarezone_name = db.Column(db.String(200), nullable=False, index=True)
    event_id = db.Column(db.Integer, db.ForeignKey('hhn_events.event_id'), nullable=False, index=True)

class HHNScareZoneByPerson(db.Model):
    __tablename__ = 'hhn_scarezones_by_person'

    person_id = db.Column(db.Integer, primary_key=True)
    scarezone_id = db.Column(db.Integer, primary_key=True)
    visit_count = db.Column(db.Integer, nullable=True)
 
class HHNShows(db.Model): 
    __tablename__ = 'hhn_shows'
    show_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    show_name = db.Column(db.String(200), nullable=False, index=True)
    event_id = db.Column(db.Integer, db.ForeignKey('hhn_events.event_id'), nullable=False, index=True)

class HHNShowByPerson(db.Model):
    __tablename__ = 'hhn_shows_by_person'

    person_id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, primary_key=True)
    visit_count = db.Column(db.Integer, nullable=True)

class HHNPerson(db.Model):
    __tablename__ = 'hhn_persons'
    person_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    person_name = db.Column(db.String(200), unique=True, nullable=False)

class HHNHouse(db.Model):
    __tablename__ = 'hhn_houses'
    house_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    house_name = db.Column(db.String(200), unique=True, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('hhn_events.event_id'), nullable=False)
    
class HHNHousesByPerson(db.Model):
    __tablename__ = 'hhn_houses_by_person'
    person_id = db.Column(db.Integer, db.ForeignKey('hhn_persons.person_id'), primary_key=True)
    house_id = db.Column(db.Integer, db.ForeignKey('hhn_houses.house_id'), primary_key=True)
    visit_count = db.Column(db.Integer, nullable=True)

# Create the tables in the database
with app.app_context():
    db.create_all()  # This will create all the tables in the database

# Configure pymysql for fetching data
mysql = pymysql.connect(
    host='localhost',
    user='root',
    password='ucfd!sn3ysql?!', #insert password#
    database='hhn_db'
)

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/show_data', methods=['GET'])
def show_data():
    try:
        # Create a cursor to interact with the database
        cursor = mysql.cursor()
        
        # Execute the query to fetch all databases
        cursor.execute("SHOW DATABASES")  
        
        # Fetch all the rows (databases)
        rows = cursor.fetchall()  
        
        # Extracting the name of the database from the result (if you want the first one)
        db_name = rows[0][0]  # Assuming you want the first database name
        
        cursor.close()
        
        # Return the database name directly to the browser
        return f"Database name: {db_name}"
    
    except pymysql.MySQLError as e:
        # Handle the error if something goes wrong
        return f"Error fetching data from database: {e}"

@app.route('/show_persons', methods=['GET'])
def show_persons():
    try:
        # Query the HHNPerson model to get all persons
        persons = HHNPerson.query.all()
        
        # Prepare the response data
        person_data = []
        for person in persons:
            person_data.append({
                'person_id': person.person_id,
                'person_name': person.person_name
            })

        # Return the data as JSON
        return ({"persons": person_data})

    except Exception as e:
        return ({"error": str(e)})
    
@app.route('/show_houses', methods=['GET'])
def show_houses():
    try:
        # Query all houses from the HHNHouse table
        houses = HHNHouse.query.all()

        # Format the response data
        house_data = []
        for house in houses:
            house_data.append({
                'house_id': house.house_id,
                'house_name': house.house_name,
                'event_id': house.event_id
            })

        # Return data as JSON
        return ({"houses": house_data})

    except Exception as e:
        return ({"error": str(e)})

@app.route('/show_scarezones', methods=['GET'])
def show_scarezones():
    try:
        # Query all scarezones from the HHNScarezone table
        scarezones = HHNScarezone.query.all()

        # Format the response data
        scarezone_data = []
        for scarezone in scarezones:
            scarezone_data.append({
                'scarezone_id': scarezone.scarezone_id,
                'scarezone_name': scarezone.scarezone_name,
                'event_id': scarezone.event_id
            })

        # Return data as JSON
        return ({"scarezones": scarezone_data})

    except Exception as e:
        return ({"error": str(e)})

@app.route('/show_scarezones_by_person', methods=['GET'])
def show_scarezones_by_person():
    try:
        # Query all records from the HHNScareZoneByPerson table
        records = HHNScareZoneByPerson.query.all()

        # Format the response data
        scarezone_by_person_data = []
        for record in records:
            scarezone_by_person_data.append({
                'person_id': record.person_id,
                'scarezone_id': record.scarezone_id,
                'visit_count': record.visit_count,
            })

        # Return data as JSON
        return ({"scarezones_by_person": scarezone_by_person_data})

    except Exception as e:
        return ({"error": str(e)})

@app.route('/show_shows', methods=['GET'])
def show_shows():
    try:
        # Query all shows from the HHNShows table
        shows = HHNShows.query.all()

        # Format the response data
        show_data = []
        for show in shows:
            show_data.append({
                'show_id': show.show_id,
                'show_name': show.show_name,
                'event_id': show.event_id
            })

        # Return data as JSON
        return ({"shows": show_data})

    except Exception as e:
        return ({"error": str(e)})

@app.route('/show_shows_by_person', methods=['GET'])
def show_shows_by_person():
    try:
        # Query all records from the HHNShowByPerson table
        records = HHNShowByPerson.query.all()

        # Format the response data
        show_by_person_data = []
        for record in records:
            show_by_person_data.append({
                'person_id': record.person_id,
                'show_id': record.show_id,
                'visit_count': record.visit_count,
            })

        # Return data as JSON
        return ({"shows_by_person": show_by_person_data})

    except Exception as e:
        return ({"error": str(e)})
    
@app.route('/show_houses_by_person', methods=['GET'])
def show_houses_by_person():
    try:
        records = HHNHousesByPerson.query.all()
        print(records)

        data = []
        for record in records:
            data.append({
                'person_id': record.person_id,
                'house_id': record.house_id,
                'visit_count': record.visit_count
            })

        return ({"houses_by_person": data})

    except Exception as e:
        return ({"error": str(e)})
    
@app.route('/show_events', methods=['GET'])
def show_events():
    try:
        # Query the HHNEvent model to get all events
        events = HHNEvent.query.all()
        
        # Create a response as a list of dictionaries (you can convert it to JSON)
        event_data = []
        for event in events:
            event_data.append({
                'event_id': event.event_id,
                'event_name': event.event_name,
                'event_year': event.event_year
            })
        
        # Return the event data as JSON
        return {"events": event_data}

    except Exception as e:
        return {"error": str(e)}


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'GET':
        return "Login via the login Form"

    if request.method == 'POST':
        name = request.form['name']
        age = request.form['age']
        cursor = mysql.cursor()
        cursor.execute("INSERT INTO info_table (name, age) VALUES (%s, %s)", (name, age))
        mysql.commit()
        cursor.close()
        return "Done!!"

@app.route('/add_person', methods=['POST'])
def add_person():
    try:
        data = request.get_json()

        person_name=data.get('person_name')

        if not person_name:
            return {"error": "Missing person_name"}, 400

        person_exists = HHNPerson.query.filter_by(person_name=person_name).first()
        if person_exists:
            return {"error": "Person already exists"}, 200

        stmt = text("""
            INSERT INTO hhn_persons VALUES (3, :p_person_name)
        """)
        
        # Execute the statement
        db.session.execute(stmt, {
            'p_person_name': person_name
        })
        db.session.commit()

        return {"message": "Person added successfully"}

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500
        
@app.route('/increment_visit', methods=['POST'])
def increment_visit():
    try:
        data = request.get_json()

        person_id = data.get('person_id', 3)  # Always 3, set default value to 3
        house_id = data.get('house_id')
        visit_count = data.get('visit_count', 1)  # Default visit_count to 1 if not provided

        # Ensure house_id is provided
        if not house_id:
            return {"error": "Missing house_id"}, 400

        # Check if the person exists (you can skip this step if person_id is always 3)
        person_exists = HHNPerson.query.filter_by(person_id=person_id).first()
        if not person_exists:
            return {"error": f"Person with ID {person_id} does not exist"}, 400

        # Update the visit count in hhn_houses_by_person table
        # Use the ON DUPLICATE KEY UPDATE to handle updates to existing records
        stmt = text("""
            INSERT INTO hhn_houses_by_person (person_id, house_id, visit_count)
            VALUES (:p_person_id, :p_house_id, :p_visit_count)
            ON DUPLICATE KEY UPDATE visit_count = visit_count + :p_visit_count
        """)
        
        # Execute the statement
        db.session.execute(stmt, {
            'p_person_id': person_id,
            'p_house_id': house_id,
            'p_visit_count': visit_count
        })
        db.session.commit()

        return {"message": "Visit count updated successfully!"}

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

@app.route('/increment_scarezone_visit', methods=['POST'])
def increment_scarezone_visit():
    try:
        data = request.get_json()

        person_id = data.get('person_id', 3)  # Always 3, set default value to 3
        scarezone_id = data.get('scarezone_id')
        visit_count = data.get('visit_count', 1)  # Default visit_count to 1 if not provided

        # Ensure house_id is provided
        if not scarezone_id:
            return {"error": "Missing scarezone_id"}, 400

        # Check if the person exists (you can skip this step if person_id is always 3)
        person_exists = HHNPerson.query.filter_by(person_id=person_id).first()
        if not person_exists:
            return {"error": f"Person with ID {person_id} does not exist"}, 400

        # Update the visit count in hhn_houses_by_person table
        # Use the ON DUPLICATE KEY UPDATE to handle updates to existing records
        stmt = text("""
            INSERT INTO hhn_scarezones_by_person (person_id, scarezone_id, visit_count)
            VALUES (:p_person_id, :p_scarezone_id, :p_visit_count)
            ON DUPLICATE KEY UPDATE visit_count = visit_count + :p_visit_count
        """)
        
        # Execute the statement
        db.session.execute(stmt, {
            'p_person_id': person_id,
            'p_scarezone_id': scarezone_id,
            'p_visit_count': visit_count
        })
        db.session.commit()

        return {"message": "Visit count updated successfully!"}

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

@app.route('/increment_show_visit', methods=['POST'])
def increment_show_visit():
    try:
        data = request.get_json()

        person_id = data.get('person_id', 3)  # Always 3, set default value to 3
        show_id = data.get('show_id')
        visit_count = data.get('visit_count', 1)  # Default visit_count to 1 if not provided

        # Ensure house_id is provided
        if not show_id:
            return {"error": "Missing show_id"}, 400

        # Check if the person exists (you can skip this step if person_id is always 3)
        person_exists = HHNPerson.query.filter_by(person_id=person_id).first()
        if not person_exists:
            return {"error": f"Person with ID {person_id} does not exist"}, 400

        # Update the visit count in hhn_houses_by_person table
        # Use the ON DUPLICATE KEY UPDATE to handle updates to existing records
        stmt = text("""
            INSERT INTO hhn_shows_by_person (person_id, show_id, visit_count)
            VALUES (:p_person_id, :p_show_id, :p_visit_count)
            ON DUPLICATE KEY UPDATE visit_count = visit_count + :p_visit_count
        """)
        
        # Execute the statement
        db.session.execute(stmt, {
            'p_person_id': person_id,
            'p_show_id': show_id,
            'p_visit_count': visit_count
        })
        db.session.commit()

        return {"message": "Visit count updated successfully!"}

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)