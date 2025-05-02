import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const existingUser = await User.findOne({ nickname });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nickname, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const user = await User.findOne({ nickname });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ message: "Login successful", nickname });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const checkUser = async (req, res) => {
  const { nickname } = req.body;
  const user = await User.findOne({ nickname });
  if (user) return res.status(200).json({ exists: true, score: user.score });
  return res.status(200).json({ exists: false });
};

export const saveAnswers = async (req, res) => {
  const { nickname, answers } = req.body;
  const score = 100 - Math.floor(Math.random() * 10);

  const user = await User.findOneAndUpdate(
    { nickname },
    { answers, score },
    { new: true }
  );

  res.status(200).json({ score });
};

export const getUser = async (req, res) => {
  const { nickname } = req.params;
  const user = await User.findOne({ nickname });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ score: user.score, answers: user.answers });
};
