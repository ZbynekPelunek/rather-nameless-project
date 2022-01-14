import request from 'supertest';
import { app } from '../../app';
import { Character } from '../../models/character';

describe('POST /api/characters', () => {
    const cookie = signin();

    it('has a route handler listening to /api/characters/create for post request', async () => {
        const response = await request(app)
            .post('/api/characters')
            .send({});
    
        expect(response.status).not.toEqual(404);
    });

    it('returns error with empty body', async () => {
        await request(app)
            .post('/api/characters')
            .set('Cookie', cookie)
            .send({})
            .expect(400)
    });

    it('does not create character with empty name or class', async () => {
        await request(app)
            .post('/api/characters')
            .set('Cookie', cookie)
            .send({
                characterName: '',
                characterClass: 'warrior'
            })
            .expect(400);

        await request(app)
            .post('/api/characters')
            .set('Cookie', cookie)
            .send({
                characterName: 'abcdefg',
                characterClass: ''
            })
            .expect(400);
    });

    it('returns a 201 on successful character creation', async () => {
        let characters = await Character.find({});
        expect(characters.length).toEqual(0);

        const charName = 'Borec';
        const charClass = 'warrior';
        
        await request(app)
            .post('/api/characters')
            .set('Cookie', cookie)
            .send({
                characterName: charName,
                characterClass: charClass
            })
            .expect(201);
        
        characters = await Character.find({});
        expect(characters.length).toEqual(1);
        expect(characters[0].characterName).toEqual(charName);
        expect(characters[0].characterClass).toEqual(charClass);
    });
})
