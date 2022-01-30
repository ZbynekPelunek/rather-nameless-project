import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@minuslevel/common';

import { User } from '../models/user';

const router = express.Router();

const constrains = {
    username: {
        minLength: 3,
        maxLength: 24
    },
    password: {
        minLength: 4,
        maxLength: 20
    }
}

router.post('/api/users/signup', [
    body('username')
        .trim()
        .isLength({ min: constrains.username.minLength, max: constrains.username.maxLength})
        .withMessage(`Username must be between ${constrains.username.minLength} and ${constrains.username.maxLength} characters`),
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: constrains.password.minLength, max: constrains.password.maxLength })
        .withMessage(`Password must be between ${constrains.password.minLength} and ${constrains.password.maxLength} characters`)
],
validateRequest,
async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({ username, email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        }, 
        process.env.JWT_KEY! // with the "!" telling typescript not to worry about value being undefined because it is already taken of in index.ts
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

export { router as signupRouter };