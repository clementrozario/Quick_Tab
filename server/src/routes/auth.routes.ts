import express from 'express'
import { signin, signup, getMe } from '../controllers/auth.controller'
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/me',verifyToken,getMe)

export default router