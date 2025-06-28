import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
  levelNumber: { 
    type: Number, required: true, unique: true 
  },
  title: { 
    type: String 
  },
  description: { 
    type: String 
  },
});

export const Level = mongoose.models.Level || mongoose.model("Level", levelSchema);
