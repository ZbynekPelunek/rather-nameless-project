import express, { Request, Response } from "express";
import { Character } from '../models/character';
import { NotFoundError, requireAuth, NotAuthorizedError } from "@minuslevel/common";

const router = express.Router();

router.get('/api/characters/:id', requireAuth, async (req: Request, res: Response) => {
    const character = await Character.findById(req.params.id);

    if (!character) {
        throw new NotFoundError();
    }
    if(character.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    res.send(character);
});

export { router as showCharacterRouter };