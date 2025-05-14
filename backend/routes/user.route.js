import express from 'express';
import {createUser,loginUser,me} from '../controller/user.controller.js'


const router=express.Router();

router.post("/register",createUser);
router.post("/login",loginUser);
router.get('/me', me);

export default router;