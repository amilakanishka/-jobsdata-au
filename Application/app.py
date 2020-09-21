import os
from flask import Flask, request, jsonify, render_template, redirect
from flask_sqlalchemy import SQLAlchemy

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.ext.declarative import declarative_base
import psycopg2
# from models import Keyword,Jobs
from flask import Flask, jsonify
import sys


app = Flask(__name__)

# app.config.from_object(os.environ['APP_SETTINGS'])
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

Base = declarative_base()
# db credentials to be moved to hide
engine = create_engine("postgresql://Jupyter_User:test@127.0.0.1/JobsDB")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Jobs = Base.classes.jobs
Keyword = Base.classes.keyword
State = Base.classes.state

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/<stat>/<role>", methods=['GET', 'POST'])
def get_jobs(stat=None, role=None):

    if request.method == 'POST':
        
        stateSelection = request.form.get('state')
        roleSelection = request.form.get('role')
        stat = str(stateSelection)
        role = str(roleSelection)
        
    session = Session(engine)

    results = session.query(Jobs.company, Jobs.contract_time, Jobs.contract_type, Jobs.latitude, Jobs.longitude, Jobs.area, Jobs.redirect_url,Jobs.created,Jobs.title,Jobs.salary_min,
        Jobs.salary_max,Jobs.description,Keyword.keyword,State.state).filter(Keyword.id == Jobs.keyword_id,State.id == Jobs.state_id,State.state == stat, Keyword.keyword == role).all()

    session.close()    

    all_jobs = []
    for company, contract_time, contract_type, latitude, longitude, area, redirect_url,created,title,salary_min,salary_max,description,keyword,state in results:
        job_dict = {}
        job_dict["company"] = company
        job_dict["contract_time"] = contract_time
        job_dict["contract_type"] = contract_type
        job_dict["latitude"] = latitude
        job_dict["longitude"] = longitude
        job_dict["area"] = area
        job_dict["redirect_url"] = redirect_url
        job_dict["created"] = created
        job_dict["title"] = title
        job_dict["salary_min"] = salary_min
        job_dict["salary_max"] = salary_max
        job_dict["description"] = description
        job_dict["keyword"] = keyword
        job_dict["state"] = state
        all_jobs.append(job_dict)
    
    data = all_jobs
    # print(data)
    return render_template("index.html", data=data)
    


@app.route("/team")
def team():
    return render_template("team.html")    

if __name__ == '__main__':
    app.run()    