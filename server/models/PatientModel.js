
import mongoose from 'mongoose';
import { type } from 'os';

const { Schema, model } = mongoose;

const patientSchema = new Schema({
name: {
type: String,
required: true
},
email: {
type: String,
required: true,
unique: true
},
password: {
type: String,
required: true
},
age: {
type: Number,
required: true
},
condition: {
type: String,
required: true
},
conditionLevel: {
type: String,
required: true
},
therapy: {
type: [String],  // Array of strings representing different therapies
required: true
},
therapyPlan: {
type: Number,
required: true
},
bookingType: {
type: String,
required: true
},
paymentAmount: {
type: String,
required: true
},
paymentMethod: {
type: String,
required: true
},
isLoggedIn:{
type:Boolean,
default:false
},
firstLoginDate: {
type: Date,
default: null, // Use null if you want to initialize it without a date
},
therapyCompletedDays: {
type: Number,
default: 0
},
therapyId: [{
type: Schema.Types.ObjectId,
ref: 'Therapy' // Reference to Therapy model
}],
therapistArray: [{
type: Schema.Types.ObjectId,
ref: 'Therapist', // Reference to Therapist model
required: false
}]
}, { timestamps: true });

const Patient = model('Patient', patientSchema);

export default Patient;

















