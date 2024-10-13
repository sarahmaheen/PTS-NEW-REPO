


import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const therapySchema = new Schema({
  patientName: {
    type: String,
    required: true
  },
  therapyNames: {
    type: [String],  // Array of therapy names
    required: true
  },
  therapists: [{
    type: Schema.Types.ObjectId,
    ref: 'Therapist',  // Reference to the Therapist model
    required: true
  }],
  therapyGoals: {
    behaviouralTherapy: {
      shortTerm: {
        type: Boolean,
        default: false
      },
      longTerm: {
        type: Boolean,
        default: false
      }
    },
    speechTherapy: {
      shortTerm: {
        type: Boolean,
        default: false
      },
      longTerm: {
        type: Boolean,
        default: false
      }
    },
    occupationalTherapy: {
      shortTerm: {
        type: Boolean,
        default: false
      },
      longTerm: {
        type: Boolean,
        default: false
      }
    }
  },
  observations: {
    behaviouralTherapy: {
      type: String,
      default: ''
    },
    occupationalTherapy: {
      type: String,
      default: ''
    },
    speechTherapy: {
      type: String,
      default: ''
    }
  },
  dailyActivities: {
    type: [String],  // Array of daily activities
    required: true
  },
  timeDuration: {
    type: String,  // e.g., '1 hour', '45 minutes'
    required: true
  },
  assignedDays: {
    type: String,  // e.g., 'Monday, Wednesday, Friday'
    required: true
  },
  dailyActivitiesTrack:[{
    type:Number,
    default:0
  }]
}, { timestamps: true });



therapySchema.pre('save', function(next) {
  // Convert assignedDays to a number
  const assignedDaysCount = Number(this.assignedDays);
console.log(assignedDaysCount)
  // Check if the array length matches or if it needs initialization
  if (!this.dailyActivitiesTrack || this.dailyActivitiesTrack.length !== assignedDaysCount) {
    // Initialize or reset the dailyActivitiesTrack array
    this.dailyActivitiesTrack = Array(assignedDaysCount).fill(0);
  }

  next();
});
const Therapy = model('Therapy', therapySchema);

export default Therapy;
