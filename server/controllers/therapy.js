// import express from 'express';
// import Therapy from '../models/TherapyModel.js';
// import Therapist from '../models/Therapistmodel.js';
// import verifyJWT from '../middleware/verifyToken.js';

// const router = express.Router();

// // Route to add a new therapy
// router.post('/add-therapy', async (req, res) => {
//     const { therapyName, therapistIds, plan } = req.body;
//     console.log({ therapyName, therapistIds, plan})
//     try {

//         const existingTherapy = await Therapy.find({ therapyName });
//         if (existingTherapy) {
//             return res.status(409).json({ message: 'Therapy with this name already exists' });
//         }


//         // Verify that all therapist IDs exist
//         const therapists = await Therapist.find({ _id: { $in: therapistIds } });
//       console.log(therapistIds.length)

//         if (therapistIds.length == 0) {
//             return res.status(404).json({ message: 'Add therapists - Therapists not found' });
//         }

//         // Create a new therapy instance
//         const newTherapy = new Therapy({
//             therapyName,
//             therapistIds, // Store the therapist Object IDs
//             plan,
//         });
//         console.log(newTherapy);
//         // Save the therapy to the database
//         await newTherapy.save();

//         // Respond with success message
//         res.status(201).json({ message: 'Therapy added successfully', therapy: newTherapy });
//     } catch (error) {
//         console.error('Error adding therapy:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// router.get('/therapies', async (req, res) => {
//     try {
//         // Fetch all therapies from the database
//         const therapies = await Therapy.find().populate('therapistIds'); // Populate therapist details if needed

//         // Respond with the therapies
//         res.status(200).json(therapies);
//     } catch (error) {
//         // Handle any errors
//         console.error('Error fetching therapies:', error);
//         res.status(500).json({ message: 'Error fetching therapies', error });
//     }
// });



// router.delete('/delete-therapy/:id', verifyJWT, async (req, res) => {
//     const therapyId = req.params.id;

//     try {
//         // Find the therapy by ID and delete it
//         const deletedTherapy = await Therapy.findByIdAndDelete(therapyId);

//         // Check if the therapy was found and deleted
//         if (!deletedTherapy) {
//             return res.status(404).json({ message: 'Therapy not found' });
//         }

//         // Respond with success message
//         res.status(200).json({ message: 'Therapy deleted successfully', deletedTherapy });
//     } catch (error) {
//         console.error('Error deleting therapy:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });







// router.put('/update-therapy/:id',  async (req, res) => {
//     const therapyId = req.params.id;
//     const { therapyName, therapistIds, plan } = req.body; // Extract fields to be updated

//     try {
//         // Verify that all therapist IDs exist
//         if (therapistIds && therapistIds.length) {
//             const therapists = await Therapist.find({ _id: { $in: therapistIds } });
//             if (therapists.length !== therapistIds.length) {
//                 return res.status(404).json({ message: 'One or more therapists not found' });
//             }
//         }

//         // Update the therapy using findByIdAndUpdate
//         const updatedTherapy = await Therapy.findByIdAndUpdate(
//             therapyId,
//             { therapyName, therapistIds, plan },
//             { new: true } // Options to return the updated document
//         );

//         // Check if the therapy was found and updated
//         if (!updatedTherapy) {
//             return res.status(404).json({ message: 'Therapy not found' });
//         }

//         // Respond with the updated therapy
//         res.status(200).json({ message: 'Therapy updated successfully', therapy: updatedTherapy });
//     } catch (error) {
//         console.error('Error updating therapy:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// export default router;



























import express from 'express';
import Therapy from '../models/TherapyModel.js';  // Adjust the path based on your folder structure
import Patient from '../models/PatientModel.js';

const router = express.Router();

// Route to create a new therapy record
// router.post('/add-therapy', async (req, res) => {
//   const {
//     patientName,
//     therapyNames,
//     therapists,
//     therapyGoals,
//     observations,
//     dailyActivities,
//     timeDuration,
//     assignedDays
//   } = req.body;

//   try {
//     const newTherapy = new Therapy({
//       patientName,
//       therapyNames,
//       therapists,
//       therapyGoals,
//       observations,
//       dailyActivities,
//       timeDuration,
//       assignedDays
//     });

//     await newTherapy.save();
//     return res.status(201).json({ message: 'Therapy added successfully', therapy: newTherapy });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });





















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

  

  // DELETE therapy by therapyId
// router.delete('/delete-therapy/:therapyId', async (req, res) => {
//   const { therapyId } = req.params;

//   try {
//     const deletedTherapy = await Therapy.findByIdAndDelete(therapyId);

//     if (!deletedTherapy) {
//       return res.status(404).json({ message: 'Therapy not found' });
//     }

//     res.status(200).json({ message: 'Therapy deleted successfully', deletedTherapy });
//   } catch (error) {
//     console.error('Error deleting therapy:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });


// New DELETE route to remove therapy and update patient's therapyCompletedDays
router.delete('/delete-therapy/:therapyId', async (req, res) => {
  const { therapyId } = req.params; // Get the therapy ID from the URL
  const { patientName } = req.body; // Get the patient name from the request body

  try {
    // Find the therapy by ID to get the assignedDays
    console.log(therapyId)
    const therapy = await Therapy.findById(therapyId);
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb",therapy)
    // If no therapy is found, return a 404 error
    if (!therapy) {
      return res.status(404).json({ message: 'Therapy not found' });
    }

    const assignedDays = Number(therapy.assignedDays); // Convert assignedDays to a number

    // Find the patient by name
    console.log("momomomomomomo",patientName)
    const patient = await Patient.findOne({ name: patientName });
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbhllllllllllllllllllllllllllllllllllllllllllllllllllll",patient)
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

export default router;