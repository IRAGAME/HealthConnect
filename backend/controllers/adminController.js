// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\adminController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

/**
 * Créer un nouvel administrateur.
 * Cela crée un utilisateur avec le rôle 'admin' et l'associe à un hôpital.
 */
exports.createAdmin = async (req, res) => {
    const { nom, email, motdepasse, telephone, hospital_id } = req.body;
    
    // Validation simple
    if (!nom || !email || !motdepasse || !hospital_id) {
        return res.status(400).json({ message: "Les champs nom, email, motdepasse et hospital_id sont requis." });
    }

    const client = await db.connect();

    try {
        await client.query('BEGIN');

        // 1. Vérifier si l'email existe déjà
        const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            throw new Error("Cet email est déjà utilisé.");
        }

        // 2. Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(motdepasse, 10);

        // 3. Insérer dans la table 'users'
        const newUserResult = await client.query(
            'INSERT INTO users (nom, email, motdepasse, role, telephone) VALUES ($1, $2, $3, $4, $5) RETURNING id, nom, email, role',
            [nom, email, hashedPassword, 'admin', telephone]
        );
        const newUser = newUserResult.rows[0];

        // 4. Insérer dans la table 'admin'
        const newAdminResult = await client.query(
            'INSERT INTO admin (user_id, hospital_id) VALUES ($1, $2) RETURNING id, hospital_id',
            [newUser.id, hospital_id]
        );
        const newAdmin = newAdminResult.rows[0];

        await client.query('COMMIT');

        res.status(201).json({
            ...newUser,
            admin_id: newAdmin.id,
            hospital_id: newAdmin.hospital_id
        });

    } catch (err) {
        await client.query('ROLLBACK');
        res.status(err.message.includes("déjà utilisé") ? 400 : 500).json({ error: err.message });
    } finally {
        client.release();
    }
};

/**
 * Récupérer la liste de tous les administrateurs.
 */
exports.getAllAdmins = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                u.id as user_id,
                a.id as admin_id,
                u.nom, 
                u.email, 
                u.role, 
                u.telephone, 
                a.hospital_id,
                h.nom as hospital_name
            FROM users u
            JOIN admin a ON u.id = a.user_id
            LEFT JOIN hopitaux h ON a.hospital_id = h.id
            WHERE u.role = 'admin'
            ORDER BY u.nom;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Récupérer un administrateur par son ID (ID de la table admin).
 */
exports.getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(`
            SELECT 
                u.id as user_id,
                a.id as admin_id,
                u.nom, 
                u.email, 
                u.role, 
                u.telephone, 
                a.hospital_id,
                h.nom as hospital_name
            FROM users u
            JOIN admin a ON u.id = a.user_id
            LEFT JOIN hopitaux h ON a.hospital_id = h.id
            WHERE a.id = $1 AND u.role = 'admin'
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Administrateur non trouvé" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mettre à jour un administrateur.
 */
exports.updateAdmin = async (req, res) => {
    const { id } = req.params; // admin.id
    const { nom, email, telephone, hospital_id } = req.body;
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const adminResult = await client.query('SELECT user_id FROM admin WHERE id = $1 FOR UPDATE', [id]);
        if (adminResult.rows.length === 0) {
            throw new Error("Admin non trouvé");
        }
        const { user_id } = adminResult.rows[0];

        if (email) {
            const emailCheck = await client.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, user_id]);
            if (emailCheck.rows.length > 0) {
                throw new Error('Cet email est déjà utilisé par un autre compte.');
            }
        }

        await client.query(
            'UPDATE users SET nom = COALESCE($1, nom), email = COALESCE($2, email), telephone = COALESCE($3, telephone) WHERE id = $4',
            [nom, email, telephone, user_id]
        );

        await client.query(
            'UPDATE admin SET hospital_id = COALESCE($1, hospital_id) WHERE id = $2',
            [hospital_id, id]
        );

        await client.query('COMMIT');
        
        res.json({ message: "Admin mis à jour avec succès." });

    } catch (err) {
        await client.query('ROLLBACK');
        const statusCode = err.message.includes('non trouvé') ? 404 : err.message.includes('déjà utilisé') ? 400 : 500;
        res.status(statusCode).json({ error: err.message });
    } finally {
        client.release();
    }
};

/**
 * Supprimer un administrateur.
 * La suppression de l'utilisateur entraînera la suppression en cascade de l'entrée dans la table 'admin'.
 */
exports.deleteAdmin = async (req, res) => {
    const { id } = req.params; // admin.id
    
    const adminResult = await db.query('SELECT user_id FROM admin WHERE id = $1', [id]);
    if (adminResult.rows.length === 0) {
        return res.status(404).json({ message: "Admin non trouvé" });
    }
    const { user_id } = adminResult.rows[0];

    try {
        // La contrainte ON DELETE CASCADE sur la table 'admin' s'occupera de supprimer la ligne admin.
        await db.query('DELETE FROM users WHERE id = $1', [user_id]);
        res.status(200).json({ message: 'Admin supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};