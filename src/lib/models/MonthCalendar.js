import mongoose from "mongoose";

const calendarDaySchema = new mongoose.Schema({
  dayNo: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
  themeName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
});

const monthCalendarSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  postDays: {
    type: [calendarDaySchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const MonthCalendar = mongoose.models.MonthCalendar || mongoose.model("MonthCalendar", monthCalendarSchema);
