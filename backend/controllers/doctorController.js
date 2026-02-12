// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\doctorController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

/**
 * Créer un nouveau docteur.
 * Crée un utilisateur (role 'doctor') et l'ajoute à la table 'doctors' avec sa spécialité.
 */
exports.createDoctor = async (req, res) => {
    const { nom, email, motdepasse, telephone, hospital_id, specialite } = req.body;
    
    if (!nom || !email || !motdepasse || !hospital_id || !specialite) {
        return res.status(400).json({ message: "Tous les champs sont requis (nom, email, motdepasse, hospital_id, specialite)." });
    }

    const client = await db.connect();

    try {
        await client.query('BEGIN');

        // 1. Vérifier l'email
        const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            throw new Error("Cet email est déjà utilisé.");
        }

        // 2. Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(motdepasse, 10);

        // 3. Insérer dans 'users'
        const newUserResult = await client.query(
            'INSERT INTO users (nom, email, motdepasse, role, telephone) VALUES ($1, $2, $3, $4, $5) RETURNING id, nom, email, role',
            [nom, email, hashedPassword, 'doctor', telephone]
        );
        const newUser = newUserResult.rows[0];

        // 4. Insérer dans 'doctors'
        // Assurez-vous que votre table s'appelle 'doctors' et a une colonne 'specialite'
        const newDoctorResult = await client.query(
            'INSERT INTO docteur (user_id, hospital_id, specialite) VALUES ($1, $2, $3) RETURNING id, hospital_id, specialite',
            [newUser.id, hospital_id, specialite]
        );
        const newDoctor = newDoctorResult.rows[0];

        await client.query('COMMIT');

        res.status(201).json({
            ...newUser,
            doctor_id: newDoctor.id,
            hospital_id: newDoctor.hospital_id,
            specialite: newDoctor.specialite
        });

    } catch (err) {
        await client.query('ROLLBACK');
        res.status(err.message.includes("déjà utilisé") ? 400 : 500).json({ error: err.message });
    } finally {
        client.release();
    }
};

/**
 * Récupérer tous les docteurs avec leurs infos utilisateur et hôpital.
 */
exports.getAllDoctors = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                u.id as user_id,
                d.id as doctor_id,
                u.nom, 
                u.email, 
                u.role, 
                u.telephone, 
                d.specialite,
                d.hospital_id,
                h.nom as hospital_name
            FROM users u
            JOIN doctors d ON u.id = d.user_id
            LEFT JOIN hopitaux h ON d.hospital_id = h.id
            WHERE u.role = 'doctor'
            ORDER BY u.nom;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Récupérer un docteur par son ID (table doctors).
 */
exports.getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`
            SELECT 
                u.id as user_id,
                d.id as doctor_id,
                u.nom, 
                u.email, 
                u.role, 
                u.telephone, 
                d.specialite,
                d.hospital_id,
                h.nom as hospital_name
            FROM users u
            JOIN doctors d ON u.id = d.user_id
            LEFT JOIN hopitaux h ON d.hospital_id = h.id
            WHERE d.id = $1 AND u.role = 'doctor'
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Docteur non trouvé" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mettre à jour un docteur.
 */
exports.updateDoctor = async (req, res) => {
    const { id } = req.params; // doctor.id
    const { nom, email, telephone, hospital_id, specialite } = req.body;
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const doctorResult = await client.query('SELECT user_id FROM doctors WHERE id = $1 FOR UPDATE', [id]);
        if (doctorResult.rows.length === 0) {
            throw new Error("Docteur non trouvé");
        }
        const { user_id } = doctorResult.rows[0];

        if (email) {
            const emailCheck = await client.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, user_id]);
            if (emailCheck.rows.length > 0) {
                throw new Error('Cet email est déjà utilisé.');
            }
        }

        await client.query(
            'UPDATE users SET nom = COALESCE($1, nom), email = COALESCE($2, email), telephone = COALESCE($3, telephone) WHERE id = $4',
            [nom, email, telephone, user_id]
        );

        await client.query(
            'UPDATE doctors SET hospital_id = COALESCE($1, hospital_id), specialite = COALESCE($2, specialite) WHERE id = $3',
            [hospital_id, specialite, id]
        );

        await client.query('COMMIT');
        res.json({ message: "Docteur mis à jour avec succès." });

    } catch (err) {
        await client.query('ROLLBACK');
        res.status(err.message.includes('non trouvé') ? 404 : 500).json({ error: err.message });
    } finally {
        client.release();
    }
};

exports.deleteDoctor = async (req, res) => {
    const { id } = req.params;
    // Logique identique à adminController : supprimer l'user supprime le docteur en cascade
    // ... (implémentation simplifiée ici, voir adminController pour détails complets si besoin)
    // Pour faire simple, on réutilise la logique de suppression par user_id
    const doctorResult = await db.query('SELECT user_id FROM doctors WHERE id = $1', [id]);
    if (doctorResult.rows.length === 0) return res.status(404).json({ message: "Docteur non trouvé" });
    
    try {
        await db.query('DELETE FROM users WHERE id = $1', [doctorResult.rows[0].user_id]);
        res.status(200).json({ message: 'Docteur supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};