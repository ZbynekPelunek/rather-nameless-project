import express, { Request, Response } from "express";
import { body } from 'express-validator';
import { Character } from '../models/character';
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError, BadRequestError } from "@minuslevel/common";

const router = express.Router();

const characterNameMin = 3;
const characterNameMax = 15;

router.put(
    '/api/characters/:id',
    requireAuth,
    [
        body('characterName')
            .not()
            .isEmpty()
            .withMessage('Parameter \'characterName\' is required')
            .bail()
            .trim()
            .isLength({ min: characterNameMin, max: characterNameMax })
            .withMessage(`Character name must be between ${characterNameMin} and ${characterNameMax} characters`),
        body('characterLevel')
            .not()
            .isEmpty()
            .withMessage('Parameter \'characterLevel\' is required')
            .bail()
            .isInt({ gt: 0})
            .withMessage('Level cannot be negative')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    const character = await Character.findById(req.params.id);

    if (!character) {
        throw new NotFoundError();
    }

    if (character.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    character.set({
        characterName: req.body.characterName,
        characterLevel: req.body.characterLevel
    });
    await character.save();

    res.send(character);
});

export { router as updateCharacterRouter };