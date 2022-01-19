import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';
import { BadRequestError, validateRequest } from '@yuriv-test/common';

const router = express.Router();

router.post("/api/users/signin", 
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().isLength({ min: 4, max: 20 }).withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res:Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser){
      throw new BadRequestError('Invalid credentials');
    }

    const matched = await Password.compare(existingUser.password, password);
    if(!matched){
      throw new BadRequestError('Invalid credentials');
    }

    const key = process.env.JWT_KEY || 'testkey';
    const token = jwt.sign({id: existingUser.id, email: existingUser.email }, key);
    req.session = {
      jwt : token
    };

    res.status(200).send(existingUser);

});

export { router as signinRouter };
