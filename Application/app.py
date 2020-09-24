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

CONST_ALL = "All"
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgresql://Jupyter_User:test@127.0.0.1/JobsDB"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

Base = declarative_base()
# db credentials to be moved to hide
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Jobs = Base.classes.jobs
Keyword = Base.classes.keyword
State = Base.classes.state
BenchmarkSalary = Base.classes.benchmark_salary

@app.route("/")
def home():
    session = Session(engine)
    statesResults = session.query(State.state).all()
    rolesResults = session.query(Keyword.keyword).all()
    session.close()
    stateList = []
    roleList = []
    for state in statesResults:
        stateList.append(state[0])

    for keyword in rolesResults:
        roleList.append(keyword[0])        

    stateList.append(CONST_ALL)
    roleList.append(CONST_ALL)
    return render_template("index.html",sdata=stateList, rdata = roleList)

@app.route("/get_jobs/<stat>/<role>", methods=['GET'])
def get_jobs(stat=None, role=None):
    results = None    
    
    session = Session(engine)    
    
    if stat == CONST_ALL and role == CONST_ALL:
        results = session.query(Jobs.company, Jobs.contract_time, Jobs.contract_type, Jobs.latitude, Jobs.longitude, Jobs.area, Jobs.redirect_url,Jobs.created,Jobs.title,Jobs.salary_min,
            Jobs.salary_max,Jobs.description,Keyword.keyword,State.state).filter(Keyword.id == Jobs.keyword_id,State.id == Jobs.state_id).all()
    if stat == CONST_ALL and role != CONST_ALL:
        results = session.query(Jobs.company, Jobs.contract_time, Jobs.contract_type, Jobs.latitude, Jobs.longitude, Jobs.area, Jobs.redirect_url,Jobs.created,Jobs.title,Jobs.salary_min,
            Jobs.salary_max,Jobs.description,Keyword.keyword,State.state).filter(Keyword.id == Jobs.keyword_id,State.id == Jobs.state_id, Keyword.keyword == role).all()
    if stat != CONST_ALL and role == CONST_ALL:    
        results = session.query(Jobs.company, Jobs.contract_time, Jobs.contract_type, Jobs.latitude, Jobs.longitude, Jobs.area, Jobs.redirect_url,Jobs.created,Jobs.title,Jobs.salary_min,
            Jobs.salary_max,Jobs.description,Keyword.keyword,State.state).filter(Keyword.id == Jobs.keyword_id,State.id == Jobs.state_id,State.state == stat).all()
    if stat != CONST_ALL and role != CONST_ALL:    
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
        job_dict["description"] = description.replace('"', '\\"')
        job_dict["keyword"] = keyword
        job_dict["state"] = state
        all_jobs.append(job_dict)
        print(area)
    data = all_jobs
    # print(data)
    return jsonify(data)
    

@app.route("/get_benchmark/<stat>/<role>", methods=['GET'])
def get_benchmark(stat=None, role=None):
    results = None    
    session = Session(engine)    
    
    if stat == CONST_ALL and role == CONST_ALL:
        results = session.query(BenchmarkSalary.source, BenchmarkSalary.job_role , BenchmarkSalary.contract_type,BenchmarkSalary.min_sal, BenchmarkSalary.max_sal,
            BenchmarkSalary.median,BenchmarkSalary.country,Keyword.keyword,State.state).filter(Keyword.id == BenchmarkSalary.keyword_id,State.id == BenchmarkSalary.state_id).all()
    if stat == CONST_ALL and role != CONST_ALL:
        results = session.query(BenchmarkSalary.source, BenchmarkSalary.job_role , BenchmarkSalary.contract_type,BenchmarkSalary.min_sal, BenchmarkSalary.max_sal,
            BenchmarkSalary.median,BenchmarkSalary.country,Keyword.keyword,State.state).filter(Keyword.id == BenchmarkSalary.keyword_id,State.id == BenchmarkSalary.state_id, Keyword.keyword == role).all()
    if stat != CONST_ALL and role == CONST_ALL:    
        results = session.query(BenchmarkSalary.source, BenchmarkSalary.job_role , BenchmarkSalary.contract_type,BenchmarkSalary.min_sal, BenchmarkSalary.max_sal,
            BenchmarkSalary.median,BenchmarkSalary.country,Keyword.keyword,State.state).filter(Keyword.id == BenchmarkSalary.keyword_id,State.id == BenchmarkSalary.state_id,State.state == stat).all()
    if stat != CONST_ALL and role != CONST_ALL:    
        results = session.query(BenchmarkSalary.source, BenchmarkSalary.job_role , BenchmarkSalary.contract_type,BenchmarkSalary.min_sal, BenchmarkSalary.max_sal,
            BenchmarkSalary.median,BenchmarkSalary.country,Keyword.keyword,State.state).filter(Keyword.id == BenchmarkSalary.keyword_id,State.id == BenchmarkSalary.state_id,State.state == stat, Keyword.keyword == role).all()            
    session.close()    

    all_bench = []
    for source, job_role, contract_type, min_sal, max_sal, median, country,keyword,state in results:
        job_dict = {}
        job_dict["source"] = source
        job_dict["job_role"] = job_role
        job_dict["contract_type"] = contract_type
        job_dict["min_sal"] = min_sal
        job_dict["max_sal"] = max_sal
        job_dict["median"] = median
        job_dict["country"] = country
        job_dict["keyword"] = keyword
        job_dict["state"] = state        
        all_bench.append(job_dict)
    
    data = all_bench
    return jsonify(data)

@app.route("/team")
def team():
    return render_template("team.html")    

if __name__ == '__main__':
    app.run()    