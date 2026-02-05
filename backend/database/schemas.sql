/*==================HEALTHCONNECT-SCHEMA DE BASE DE DONNEES==========*/
/*==================Table Users==============*/
CREATE TABLE User(id SERIAL PRIMARY KEY,nom VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL, motdepasse VARCHAR(255)NOT NULL,role VARCHAR(20) NOT NULL/*Patient,Docteur,Admin*/);
/*==================Table Docteur=============*/
CREATE TABLE Docteur(id SERIAL PRIMARY KEY,User_id INT UNIQUE REFERENCES Users(id) ON DELETE CASCADE, specialite VARCHAR(100) NOT NULL,avaliability VARCHAR(100));
/*==================Table Rendez-vous=============*/
CREATE TABLE Appointment(id SERIAL PRIMARY KEY,patient_id INT REFERENCES Users(id) ON DELETE CASCADE,docteur_id INT REFERENCES docteur(id) ON DELETE CASCADE, date TIMESTAMP NOT NULL, status VARCHAR(20) DEFAULT 'En attente');
/*==================Table NOTIFICATIONS=============*/
CREATE TABLE Notification(id SERIAL PRIMARY KEY, User_id INT REFERENCES Users(id) ON DELETE CASCADE, type VARCHAR(20),message TEXT, sent_at TIMESTAMP,status VARCHAR(20));
/*==================Table Admin=============*/
CREATE TABLE Admin(id SERIAL PRIMARY KEY, User_id INT UNIQUE REFERENCES User(id) ON DELETE CASCADE);
