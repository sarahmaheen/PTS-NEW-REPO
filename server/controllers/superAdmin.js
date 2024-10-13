import express from 'express';
import SuperAdmin from '../models/SuperAdminModel.js'; // Adjust the path as necessary
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Route to create a super admin
router.post('/add-super-admin', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the super admin already exists
        const existingAdmin = await SuperAdmin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Super admin already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new super admin instance
        const newSuperAdmin = new SuperAdmin({
            name,
            email,
            password: hashedPassword,
        });

        // Save the super admin to the database
        await newSuperAdmin.save();

        // Respond with success message
        res.status(201).json({ message: 'Super admin created successfully', admin: newSuperAdmin });
    } catch (error) {
        console.error('Error creating super admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


















    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            // Find the super admin by email
            const superAdmin = await SuperAdmin.findOne({ email });
            if (!superAdmin) {
                return res.status(404).json({ message: 'Super admin not found' });
            }

            // Check if the password matches
            const isMatch = await bcrypt.compare(password, superAdmin.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: superAdmin._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h', // Token expiration time
            });

            // res.status(200).json({ token, superAdmin: { id: superAdmin._id, name: superAdmin.name, email: superAdmin.email } });
            res.status(200).json({ token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });

    export default router;
