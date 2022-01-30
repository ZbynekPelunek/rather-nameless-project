import mongoose from 'mongoose';

// An interface that describes the properties that are required to create a new Character
interface CharacterAttrs {
    characterName: string;
    characterClass: string;
    characterLevel: number;
    userId: string;

    statsPrimaryAgility: number;
    statsPrimaryStrength: number;
    statsPrimaryIntellect: number;
    statsPrimaryStamina: number;

    statsBaseHealth?: number;
    statsBaseResource?: number;
    statsSecondaryMultristrikeChance?: number;
    statsSecondaryMultistrikeDamage?: number;
    statsSecondaryAttackPower?: number;
    statsSecondarySpellPower?: number;
}

// An interface that describes the properties that a Character Model has
interface CharacterModel extends mongoose.Model<CharacterDoc> {
    build(attrs: CharacterAttrs): CharacterDoc;
}

// An interface that describes the properties that a Character Document has
interface CharacterDoc extends mongoose.Document {
    characterName: string;
    characterClass: string;
    characterLevel: number;
    userId: string;

    statsBaseHealth: number;
    statsBaseResource: number;

    statsPrimaryAgility: number;
    statsPrimaryStrength: number;
    statsPrimaryIntellect: number;
    statsPrimaryStamina: number;
    
    statsSecondaryMultristrikeChance: number;
    statsSecondaryMultistrikeDamage: number;
    statsSecondaryAttackPower: number;
    statsSecondarySpellPower: number;
}

const characterSchema = new mongoose.Schema({
    characterName: {
        type: String,
        required: true
    },
    characterClass: {
        type: String,
        required: true
    },
    characterLevel: {
        type: Number,
        required: true,
        min: 1
    },
    statsPrimaryAgility: {
        type: Number,
        required: true,
        min: 0
    },
    statsPrimaryStrength: {
        type: Number,
        required: true,
        min: 0
    },
    statsPrimaryIntellect: {
        type: Number,
        required: true,
        min: 0
    },
    statsPrimaryStamina: {
        type: Number,
        required: true,
        min: 0
    },
    statsBaseHealth: {
        type: Number,
        required: true,
        min: 1,
        default: 25
    },
    statsBaseResource: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    statsSecondaryMultristrikeChance: {
        type: Number,
        required: true,
        min: 0,
        default: 5
    },
    statsSecondaryMultistrikeDamage: {
        type: Number,
        required: true,
        min: 0,
        default: 30
    },
    statsSecondaryAttackPower: {
        type: Number,
        required: true,
        min: 0,
        default: 1
    },
    statsSecondarySpellPower: {
        type: Number,
        required: true,
        min: 0,
        default: 1
    },
    userId: {
        type: String,
        required: true
    }
}, 
{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    }
});

characterSchema.statics.build = (attrs: CharacterAttrs) => {
    return new Character(attrs);
};

const Character = mongoose.model<CharacterDoc, CharacterModel>('Character', characterSchema);

export { Character };