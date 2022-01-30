import express, { Request, Response } from "express";
import { Character } from '../models/character';

const router = express.Router();

router.get('/api/characters', async (req: Request, res: Response) => {
    const { userId } = req.query;
    
    let characters;
    if(userId) {
        characters = await Character.find().where({ userId });
    } else {
        characters = await Character.find().select('characterName characterClass characterLevel');
    }

    res.send(characters);
});

export { router as listCharactersRouter };