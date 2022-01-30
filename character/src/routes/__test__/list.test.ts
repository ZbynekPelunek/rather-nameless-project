import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Character } from '../../models/character';

const createCharacter = async () => {
    const character = Character.build({
        characterName: 'abcdefg',
        characterClass: 'warrior',
        characterLevel: 1,
        statsPrimaryAgility: 5,
        statsPrimaryStrength: 4,
        statsPrimaryIntellect: 3,
        statsPrimaryStamina: 2,
        userId: new mongoose.Types.ObjectId().toHexString()
    });
    await character.save();
}

describe('GET /api/characters', () => {
    it('has route handler', async () => { 
        const response = await request(app)
            .get('/api/characters')
            .send();
    
        expect(response.status).not.toEqual(404);
    });

    it('can fetch a list of characters', async () => {
        await createCharacter();
        await createCharacter();
        await createCharacter();
    
        const response = await request(app)
            .get('/api/characters')
            .send()
            .expect(200);
    
        expect(response.body.length).toEqual(3);
    });
})
