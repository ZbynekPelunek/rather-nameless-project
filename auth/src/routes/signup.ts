import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@minuslevel/common';

import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
async (req: Request, res: Response) => {
    // const { email, password } = req.body;

    // const existingUser = await User.findOne({ email });
    
    // if (existingUser) {
    //     throw new BadRequestError('Email in use');
    // }

    // const user = User.build({ email, password });
    // await user.save();

    // // Generate JWT
    // const userJwt = jwt.sign(
    //     {
    //         id: user.id,
    //         email: user.email
    //     }, 
    //     process.env.JWT_KEY! // with the "!" telling typescript not to worry about value being undefined because it is already taken of in index.ts start() function
    // );

    // // Store it on session object
    // req.session = {
    //     jwt: userJwt
    // };

    // res.status(201).send(user);
    res.status(200).send('Nice try');
});

export { router as signupRouter };