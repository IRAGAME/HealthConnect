
-- 1. Table des Hôpitaux
CREATE TABLE hopitaux (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    adresse TEXT,
    telephone VARCHAR(50),
    image_url TEXT
);
ALTER TABLE hopitaux ADD COLUMN email VARCHAR(255) UNIQUE NOT NULL;


-- 2. Table des Patients (Table INDÉPENDANTE)
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    motdepasse VARCHAR(255) NOT NULL,
    telephone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table des Users (Pour le STAFF : Admin, Docteur, Réceptionniste)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    motdepasse VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'admin', 'docteur', 'receptionniste'
    telephone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table Docteur (Lié à Users)
CREATE TABLE docteur (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    hospital_id INTEGER REFERENCES hopitaux(id),
    specialite VARCHAR(100),
    aviabilite VARCHAR(255)
);

-- 5. Table Admin (Lié à Users)
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    hospital_id INTEGER REFERENCES hopitaux(id)
);

-- 6. Table Réceptionniste (Lié à Users)
CREATE TABLE receptionniste (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    hospital_id INTEGER REFERENCES hopitaux(id)
);

-- 7. Table Rendez-vous (Appointments)
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    docteur_id INTEGER REFERENCES docteur(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'En attente',
    medical_condition VARCHAR(255),
    medical_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Table Notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    type VARCHAR(50),
    message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'unread'
);

-- 1. Créer la table des spécialités
CREATE TABLE specialites (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50)
);

-- 2. Créer la table de liaison (Un hôpital a plusieurs spécialités, une spécialité est dans plusieurs hôpitaux)
CREATE TABLE hopital_specialites (
    hopital_id INTEGER REFERENCES hopitaux(id) ON DELETE CASCADE,
    specialite_id INTEGER REFERENCES specialites(id) ON DELETE CASCADE,
    PRIMARY KEY (hopital_id, specialite_id)
);

-- 3. Insérer quelques spécialités par défaut
INSERT INTO specialites (nom, icon) VALUES 
('Cardiologie'),
('Médecine Générale'),
('Pédiatrie'),
('Orthopédie'),
('Dermatologie'),
('Neurologie'),
('Ophtalmologie'),
('Dentisterie');

