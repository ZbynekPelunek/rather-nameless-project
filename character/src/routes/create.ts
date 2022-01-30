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

        const characterPrimaryStats = {
            warrior: {
                agility: 5,
                strength: 10,
                intellect: 3,
                stamina: 8
            },
            hunter: {
                agility: 10,
                strength: 8,
                intellect: 3,
                stamina: 5
            },
            mage: {
                agility: 3,
                strength: 3,
                intellect: 10,
                stamina: 10
            }
        };

        let statsPrimaryAgility = 0;
        let statsPrimaryStrength = 0;
        let statsPrimaryIntellect = 0;
        let statsPrimaryStamina = 0;

        switch(characterClass) {
            case 'warrior':
                statsPrimaryAgility = characterPrimaryStats.warrior.agility;
                statsPrimaryStrength = characterPrimaryStats.warrior.strength;
                statsPrimaryIntellect = characterPrimaryStats.warrior.intellect;
                statsPrimaryStamina = characterPrimaryStats.warrior.stamina;
                break;
            case 'hunter':
                statsPrimaryAgility = characterPrimaryStats.hunter.agility;
                statsPrimaryStrength = characterPrimaryStats.hunter.strength;
                statsPrimaryIntellect = characterPrimaryStats.hunter.intellect;
                statsPrimaryStamina = characterPrimaryStats.hunter.stamina;
                break;
            case 'mage':
                statsPrimaryAgility = characterPrimaryStats.mage.agility;
                statsPrimaryStrength = characterPrimaryStats.mage.strength;
                statsPrimaryIntellect = characterPrimaryStats.mage.intellect;
                statsPrimaryStamina = characterPrimaryStats.mage.stamina;
                break;
        }

        const character = Character.build({
            characterName,
            characterClass,
            characterLevel: 1,
            statsPrimaryAgility,
            statsPrimaryStrength,
            statsPrimaryIntellect,
            statsPrimaryStamina,
            userId: req.currentUser!.id
        });
        await character.save();
    
    res.status(201).send(character);
});

export { router as createCharacterRouter };