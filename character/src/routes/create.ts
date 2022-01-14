import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@minuslevel/common';

import { Character } from '../models/character';

const router = express.Router();

const characterNameMin = 3;
const characterNameMax = 15;

router.post('/api/characters',
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
        body('characterClass')
            .not()
            .isEmpty()
            .withMessage('Parameter \'characterClass\' is required')
            .bail()
            .toLowerCase()
            .isIn(['warrior', 'hunter', 'mage'])
            .withMessage('Currently possible classes: warrior, hunter, mage')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { characterName, characterClass } = req.body;

        const character = Character.build({
            characterName,
            characterClass,
            characterLevel: 1,
            userId: req.currentUser!.id
        });
        await character.save();
    
    res.status(201).send(character);
});

export { router as createCharacterRouter };