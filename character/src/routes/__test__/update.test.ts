import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Character } from '../../models/character';

describe('PUT /api/characters', () => {
    it('returns 404 when character doesn\'t exist', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();

        await request(app)
            .put(`/api/characters/${id}`)
            .set('Cookie', signin())
            .send({
                characterName: 'afdsfa',
                characterLevel: 4
            })
            .expect(404);
    });

    it('returns a 401 if the user is not authenticated', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
    
        await request(app)
            .put(`/api/characters/${id}`)
            .send({
                characterName: 'afdsfa',
                characterLevel: 4
            })
            .expect(401);
    });

    it('returns a 401 if the user does not own the character', async () => {
        const userId = new mongoose.Types.ObjectId().toHexString();
        
        const character = Character.build({
            characterName: 'abcdefg',
            characterClass: 'warrior',
            characterLevel: 1,
            statsPrimaryAgility: 5,
            statsPrimaryStrength: 4,
            statsPrimaryIntellect: 3,
            statsPrimaryStamina: 2,
            userId
        });
        await character.save();
    
        await request(app)
            .put(`/api/characters/${character.id}`)
            .set('Cookie', signin())
            .send({
                characterName: 'afdsfa',
                characterLevel: 4
            })
            .expect(401);
    });

    it('returns 400 with invalid inputs', async () => {
        const userId = new mongoose.Types.ObjectId().toHexString();
        const cookie = signin(userId);
        
        const character = Character.build({
            characterName: 'abcdefg',
            characterClass: 'warrior',
            characterLevel: 1,
            statsPrimaryAgility: 5,
            statsPrimaryStrength: 4,
            statsPrimaryIntellect: 3,
            statsPrimaryStamina: 2,
            userId
        });
        await character.save();
    
        await request(app)
            .put(`/api/characters/${character.id}`)
            .set('Cookie', cookie)
            .send({
                characterName: '',
                characterLevel: 4
            })
            .expect(400);

        await request(app)
            .put(`/api/characters/${character.id}`)
            .set('Cookie', cookie)
            .send({
                characterName: 'advrqwervqwertqwvwdfwegjhqrt',
                characterLevel: 4
            })
            .expect(400);
        
        await request(app)
            .put(`/api/characters/${character.id}`)
            .set('Cookie', cookie)
            .send({
                characterName: 'namecorrect',
                characterLevel: -4
            })
            .expect(400);
        
        await request(app)
            .put(`/api/characters/${character.id}`)
            .set('Cookie', cookie)
            .send({
                characterName: 'namecorrect',
                characterLevel: ''
            })
            .expect(400);
    });

    it('successfully updates character inside db', async () => {
        const userId = new mongoose.Types.ObjectId().toHexString();
        const cookie = signin(userId);
        
        const character = Character.build({
            characterName: 'abcdefg',
            characterClass: 'warrior',
            characterLevel: 1,
            statsPrimaryAgility: 5,
            statsPrimaryStrength: 4,
            statsPrimaryIntellect: 3,
            statsPrimaryStamina: 2,
            userId
        });
        await character.save();

        const updatedName = 'updated name';
        const updatedLevel = 5;
    
        await request(app)
            .put(`/api/characters/${character.id}`)
            .set('Cookie', cookie)
            .send({
                characterName: updatedName,
                characterLevel: updatedLevel
            })
            .expect(200);

        const updatedCharacter = await Character.findById(character.id);

        expect(updatedCharacter!.characterName).toEqual(updatedName);
        expect(updatedCharacter!.characterLevel).toEqual(updatedLevel);
    });
});