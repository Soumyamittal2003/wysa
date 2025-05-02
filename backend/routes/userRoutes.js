import express from "express";
import {
  signup,
  login,
  checkUser,
  saveAnswers,
  getUser
} from '../controller/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/check', checkUser);
router.post('/save', saveAnswers);
router.get('/:nickname', getUser);

export default router;
