/*==================HEALTHCONNECT-SCHEMA DE BASE DE DONNEES==========*/
/*==================Table Users==============*/
CREATE TABLE users(id SERIAL PRIMARY KEY,nom VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL, Motdepasse VARCHAR(255)NOT NULL,role VARCHAR(20) NOT NULL/*Patient,Docteur,Admin*/);
/*==================Table Docteur=============*/
CREATE TABLE docteur(id SERIAL PRIMARY KEY,user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE, specialite VARCHAR(100) NOT NULL,aviabilite VARCHAR(100));
/*==================Table Rendez-vous=============*/
CREATE TABLE appointments(id SERIAL PRIMARY KEY,patient_id INT REFERENCES users(id) ON DELETE CASCADE,docteur_id INT REFERENCES docteur(id) ON DELETE CASCADE, date TIMESTAMP NOT NULL, status VARCHAR(20) DEFAULT 'En attente');
/*==================Table NOTIFICATIONS=============*/
CREATE TABLE notifications(id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id) ON DELETE CASCADE, type VARCHAR(20),message TEXT, sent_at TIMESTAMP,status VARCHAR(20));
/*==================Table Admin=============*/
CREATE TABLE admin(id SERIAL PRIMARY KEY, user_id INT UNIQUE REFERENCES user(id) ON DELETE CASCADE);
