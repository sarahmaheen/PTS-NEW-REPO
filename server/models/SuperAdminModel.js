import mongoose from 'mongoose';

const superAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

export default SuperAdmin;
