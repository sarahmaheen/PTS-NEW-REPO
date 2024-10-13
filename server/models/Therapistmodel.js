import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,  // e.g., 'speech therapy', 'occupational therapy', etc.
    },
    experience: {
        type: Number,
        required: true,  // Number of years of experience
        min: 0,
    },
    licenseNumber: {
        type: String,
        required: true,  // Licensing information if applicable
        unique: true, 
    },      
    patients: [{  // Array of patient Object IDs
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    }],
});

const Therapist = mongoose.model('Therapist', therapistSchema);

export default Therapist;
