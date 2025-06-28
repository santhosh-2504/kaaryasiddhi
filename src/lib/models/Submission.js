import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
  },
  taskId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task', required: true 
  },
  levelNumber: { 
    type: Number, required: true 
  },
  submissionLink: { 
    type: String 
  },
  status: { 
    type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' 
  },
  score: { 
    type: Number, min: 0, max: 10, default: null 
  },
  remarks: { 
    type: String 
  },
  submittedAt: { 
    type: Date, default: Date.now 
  },
  reviewedAt: { 
    type: Date 
  }
});


export const Submission = mongoose.models.Submission || mongoose.model("Submission", submissionSchema);