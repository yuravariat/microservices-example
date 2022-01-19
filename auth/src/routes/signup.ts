import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from '@yuriv-test/common';
import { User, UserDoc } from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
      throw new BadRequestError('Email already exists');
    }

    const user: UserDoc = User.build({email, password});
    await user.save();

    const key = process.env.JWT_KEY || 'testkey';
    const token = jwt.sign({id: user.id, email: user.email }, key);
    req.session = {
      jwt : token
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
