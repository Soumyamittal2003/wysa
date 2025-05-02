import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  answers: {
    sleepGoal: [String],
    sleepDuration: String,
    bedTime: String,
    wakeTime: String,
    strugglePeriod: String,
  },
  score: Number,
});

export default mongoose.model('User', userSchema);
