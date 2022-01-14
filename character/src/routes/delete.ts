import express, { Request, Response } from "express";
import { Character } from '../models/character';
import { NotFoundError, NotAuthorizedError, requireAuth } from "@minuslevel/common";

const router = express.Router();

router.delete('/api/characters/:id', requireAuth, async (req: Request, res: Response) => {
    const character = await Character.findById(req.params.id);

    if (!character) {
        throw new NotFoundError();
    }

    if(character.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    await character.delete();

    res.status(204).send({});
});

export { router as deleteCharacterRouter };