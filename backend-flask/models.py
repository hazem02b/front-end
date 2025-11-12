from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(50), nullable=True)
    type = db.Column(db.String(50), nullable=False, default='STUDENT')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    two_fa_code = db.Column(db.String(10), nullable=True)
    two_fa_expires = db.Column(db.DateTime, nullable=True)
    cv = db.Column(db.String(255), nullable=True)

class StudentProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('studentProfile', uselist=False))
    skills = db.Column(db.Text, nullable=True)
    bio = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(255), nullable=True)
    university = db.Column(db.String(255), nullable=True)
    degree = db.Column(db.String(255), nullable=True)
    graduation_year = db.Column(db.String(50), nullable=True)
    linkedin = db.Column(db.String(255), nullable=True)
    github = db.Column(db.String(255), nullable=True)
    website = db.Column(db.String(255), nullable=True)

class CompanyProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('companyProfile', uselist=False))
    name = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
