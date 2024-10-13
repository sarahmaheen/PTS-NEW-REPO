

import express from 'express';
import Patient from '../models/PatientModel.js';  // Assuming your model is in 'models/patient.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import verifyJWT from '../middleware/verifyToken.js';
// import { compare } from 'bcrypt';
const router = express.Router();

// Route to create a new patient
router.post('/add-patient', async (req, res) => {
  const {
    name,
    email,
    password,
    age,
    condition,
    conditionLevel,
    therapy,
    therapyPlan,
    bookingType,
    paymentAmount,
    paymentMethod,
    therapistArray
  } = req.body;


  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newPatient = new Patient({
      name,
      email,
      password: hashedPassword,
      age,
      condition,
      conditionLevel,
      therapy,
      therapyPlan,
      bookingType,
      paymentAmount,
      paymentMethod,
      therapistArray
    });
console.log(newPatient);
    await newPatient.save();
    return res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




// loginroute for this patient 
router.post('/patient-login', async (req, res) => {
  const { email, password } = req.body;

  try {
      console.log(email,password)
   
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If the patient is not logged in, set isLoggedIn to true and set firstLoginDate
    if (!patient.isLoggedIn) {
      patient.isLoggedIn = true;
      patient.firstLoginDate = new Date(); // Set the current date as first login date
      await patient.save(); // Save changes to the database
    }

    // Generate JWT token
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d', // Token expiration time
    });


      // Return the token and some patient information
      res.status(200).json({ 
          token
          // patient: {
          //     id: patient._id,
          //     name: patient.name,
          //     email: patient.email,
          //     age: patient.age,
          //     condition: patient.condition
          // }
      });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});




//  get the patient details through id getting from token


router.get('/patient-details',verifyJWT, async (req, res) => {
  try {
    console.log(req.user)
    const patient = await Patient.findById(req.user.id); // Fetch patient by ID from token
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient); // Send back the patient details as JSON
  } catch (error) {
    console.error('Error fetching patient details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});









// get only one patient by Id 
router.get('/patient/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the route parameters

  try {
    const patient = await Patient.findById(id); // Fetch patient by ID
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' }); // Handle case when patient is not found
    }
    res.status(200).json(patient); // Send back the patient as a JSON response
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
});

//  get all patients 
router.get('/allpatients', async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients from the database
    res.status(200).json(patients); // Send back the patients as a JSON response
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
});




// Delete patient by ID
router.delete('/delete-patient/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// update the patient 
router.put('/update-patient/:id', async (req, res) => {
  const { id } = req.params; // Get the patient ID from the URL
  const updateFields = req.body; // Get the fields to update from the request body
  console.log(updateFields)
  try {
    // Find the patient by ID and update the fields
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      updateFields, // Update with the fields provided in the request body
      {
        new: true, // Return the updated document
        runValidators: false, // No validations (as per your request)
      }
    );

    // If no patient is found, return a 404 error
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Return the updated patient information
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});




// updating the proforma as per the patient name 

router.get('/get-patient-by-name/:name', async (req, res) => {
  const { name } = req.params; // Get the patient name from the URL
  console.log('Fetching details for patient:', name);

  try {
    // Find the patient by name
    const patient = await Patient.findOne({ name: name });

    // If no patient is found, return a 404 error
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Return the patient information
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});







export default router;


