import request from 'supertest';
import mongoose from 'mongoose';
import { Character } from '../../models/character';
import { app } from '../../app';

describe('GET /api/characters/:id', () => {
    it('returns a 404 if the character is not found', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
    
        await request(app)
            .get(`/api/characters/${id}`)
            .set('Cookie', signin())
            .send()
            .expect(404);
    });

    it('returns an error if the user is not logged in', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
    
        await request(app)
            .get(`/api/characters/${id}`)
            .send()
            .expect(401);
    });

    it('returns the character when found', async () => {
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
            .get(`/api/characters/${character.id}`)
            .set('Cookie', cookie)
            .send()
            .expect(200);
    });

    it('does NOT return character to wrong user', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
    
        await request(app)
            .get(`/api/characters/${id}`)
            .set('Cookie', signin())
            .send()
            .expect(404);
    });
})