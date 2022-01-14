import request from 'supertest';
import mongoose from 'mongoose';
import { Character } from '../../models/character';
import { app } from '../../app';

describe('DELETE /api/characters', () => {
    it('returns a 404 if the character is not found', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
    
        await request(app)
            .delete(`/api/characters/${id}`)
            .set('Cookie', signin())
            .send()
            .expect(404);
    });

    it('returns Unauthorized when deleting not owned character', async () => {
        const character = Character.build({
            characterName: 'abcdefg',
            characterClass: 'warrior',
            characterLevel: 1,
            userId: new mongoose.Types.ObjectId().toHexString()
        });
        await character.save();
    
        await request(app)
            .delete(`/api/characters/${character.id}`)
            .set('Cookie', signin())
            .send()
            .expect(401);
    });

    it('successfully deletes character the user owns', async () => {
        const userId = new mongoose.Types.ObjectId().toHexString();
        const cookie = signin(userId);
        
        const character = Character.build({
            characterName: 'abcdefg',
            characterClass: 'warrior',
            characterLevel: 1,
            userId
        });
        await character.save();

        await request(app)
            .delete(`/api/characters/${character.id}`)
            .set('Cookie', cookie)
            .send()
            .expect(204);
    });
});