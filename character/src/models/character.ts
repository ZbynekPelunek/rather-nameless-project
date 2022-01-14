import mongoose from 'mongoose';

// An interface that describes the properties that are required to create a new Character
interface CharacterAttrs {
    characterName: string;
    characterClass: string;
    characterLevel: number;
    userId: string;
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