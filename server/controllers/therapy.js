

import express from 'express';
import Therapy from '../models/TherapyModel.js';  // Adjust the path based on your folder structure
import Patient from '../models/PatientModel.js';
import verifyJWT from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/add-therapy', async (req, res) => {
  const {
    patientName,
    therapyNames,
    therapists,
    therapyGoals,
    observations,
    dailyActivities,
    timeDuration,
    assignedDays,
  } = req.body;

  try {
    // Find the patient
    const patient = await Patient.findOne({ _id: patientName });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Calculate the remaining therapy days
    const remainingDays = patient.therapyPlan - patient.therapyCompletedDays;

    // Ensure assigned days do not exceed remaining days
    if (assignedDays > remainingDays) {
      return res.status(400).json({ error: `Assigned days exceed remaining days. Remaining days: ${remainingDays}` });
    }

    // Create a new therapy
    const newTherapy = new Therapy({
      patientName: patient.name,
      therapyNames,
      therapists,
      therapyGoals,
      observations,
      dailyActivities,
      timeDuration,
      assignedDays,
    });

    // Save the new therapy
    const therapy = await newTherapy.save();

    // Update patient details: add therapy ID and update therapyCompletedDays
    patient.therapyCompletedDays += assignedDays;
    patient.therapyId.push(therapy._id);

    await patient.save();

    res.status(200).json({ message: 'Therapy added successfully', therapy });
  } catch (error) {
    console.error('Error adding therapy:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




// Change to POST method if you're passing the ID in the body
router.post('/therapies', async (req, res) => {
  const { therapyId } = req.body; // Get the therapy ID from the request body

  try {
      const therapy = await Therapy.findById(therapyId); // Find therapy by ID

      if (!therapy) {
          return res.status(404).json({ message: 'Therapy not found' });
      }

      res.status(200).json(therapy); // Send the therapy data as a response
  } catch (error) {
      console.error('Error fetching therapy:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});









router.post('/therapiesArrayForPatient', async (req, res) => {
  const { therapyIds } = req.body; // Get array of therapy IDs
  console.log(therapyIds)

  try {
    const therapies = await Therapy.find({ _id: { $in: therapyIds } }); // Fetch therapies for the given IDs

    if (therapies.length === 0) {
      return res.status(404).json({ message: 'Therapies not found' });
    }

    res.status(200).json(therapies); // Send the therapies data
  } catch (error) {
    console.error('Error fetching therapies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// to get only one therapy 

router.get('/therapies/:therapyId', async (req, res) => {
  const { therapyId } = req.params; // Get the therapy ID from the URL parameters

  try {
      const therapy = await Therapy.findById(therapyId); // Find therapy by ID

      if (!therapy) {
          return res.status(404).json({ message: 'Therapy not found' });
      }

      res.status(200).json(therapy); // Send the therapy data as a response
  } catch (error) {
      console.error('Error fetching therapy:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});








router.get('/therapies', async (req, res) => {
    try {
      // Fetch all therapy records from the database
      const therapies = await Therapy.find()
        .populate('therapists') // Populate therapist data
        .exec();
  
      // Return the therapies in the response
      res.status(200).json(therapies);
    } catch (error) {
      console.error('Error fetching therapies:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });


  router.put('/update-therapy/:therapyId', async (req, res) => {
    const { therapyId } = req.params;
    const updates = req.body; // Therapy fields to update
  
    try {
      const updatedTherapy = await Therapy.findByIdAndUpdate(therapyId, updates, { new: true });
  
      if (!updatedTherapy) {
        return res.status(404).json({ message: 'Therapy not found' });
      }
  
      res.status(200).json(updatedTherapy);
    } catch (error) {
      console.error('Error updating therapy:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

  


// New DELETE route to remove therapy and update patient's therapyCompletedDays
router.delete('/delete-therapy/:therapyId', async (req, res) => {
  const { therapyId } = req.params; // Get the therapy ID from the URL
  const { patientName } = req.body; // Get the patient name from the request body

  try {
    // Find the therapy by ID to get the assignedDays
    console.log(therapyId)
    const therapy = await Therapy.findById(therapyId);
    // console.log("bbbbbbbbbbbbbbbbbbbbbbbb",therapy)
    // If no therapy is found, return a 404 error
    if (!therapy) {
      return res.status(404).json({ message: 'Therapy not found' });
    }

    const assignedDays = Number(therapy.assignedDays); // Convert assignedDays to a number

    // Find the patient by name
    console.log("momomomomomomo",patientName)
    const patient = await Patient.findOne({ name: patientName });
    // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbhllllllllllllllllllllllllllllllllllllllllllllllllllll",patient)
    // If no patient is found, return a 404 error
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Subtract assignedDays from therapyCompletedDays
    patient.therapyCompletedDays -= assignedDays;

    // Remove the therapyId from the therapyId array
    patient.therapyId = patient.therapyId.filter(id => id.toString() !== therapyId);

    // Save the updated patient information
    await patient.save();

    // Optionally, you can also delete the therapy record if needed
    await Therapy.findByIdAndDelete(therapyId);

    // Return the updated patient information
    res.status(200).json(patient);
    
  } catch (error) {
    console.error('Error deleting therapy:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});















router.put('/update-dailyActivityTrack-therapy/:therapyId', async (req, res) => {
  const { therapyId } = req.params;
  const { dayIndex, completedActivity } = req.body; // Get the day index and the completed activity array from the request body

  try {

    console.log(therapyId, dayIndex, completedActivity)
    // Fetch the therapy document by ID
    const therapy = await Therapy.findById(therapyId);

    if (!therapy) {
      return res.status(404).json({ message: 'Therapy not found' });
    }

    // Ensure the index is within the bounds of the dailyActivitiesTrack array
    if (dayIndex < 0 || dayIndex >= therapy.dailyActivitiesTrack.length) {
      return res.status(400).json({ message: 'Invalid day index' });
    }

    // Update the dailyActivitiesTrack for the specified day with the completed activities
    therapy.dailyActivitiesTrack[dayIndex] = completedActivity;

    // Save the updated therapy document
    const updatedTherapy = await therapy.save();

    res.status(200).json(updatedTherapy);
  } catch (error) {
    console.error('Error updating therapy:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



router.get('/therapy-distribution', verifyJWT, async (req, res) => {
  try {
    // Count total therapies (assumes each Patient document represents a therapy)
    const count = await Therapy.countDocuments();

    res.json({ count }); // Send the total count in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
});



router.post('/therapistsArrayForPatient', async (req, res) => {
  try {
    const { therapistIds } = req.body; // Array of therapist document IDs sent from the frontend

    if (!therapistIds || !Array.isArray(therapistIds) || therapistIds.length === 0) {
      return res.status(400).json({ message: 'Therapist IDs are required and should be an array' });
    }

    // Fetch therapists from the database using the array of IDs
    const therapists = await Therapist.find({ _id: { $in: therapistIds } });

    // Check if therapists were found
    if (therapists.length === 0) {
      return res.status(404).json({ message: 'No therapists found with the given IDs' });
    }

    // Return the therapist details in the response
    res.status(200).json(therapists);
  } catch (error) {
    console.error('Error fetching therapists:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});








export default router;
