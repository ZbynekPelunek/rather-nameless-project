import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const CharCreate = () => {
    const [characterClass, setCharacterClass] = useState('warrior');
    const [characterName, setCharacterName] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/characters',
        method: 'post',
        body: {
            characterClass, characterName
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Character Creation</h1>
            <div className="form-group">
                <label>Class:</label>
                <select value={characterClass} onChange={e => setCharacterClass(e.target.value)}>
                    <option value="warrior" className="form-control">Warrior</option>
                    <option value="hunter" className="form-control">Hunter</option>
                    <option value="mage" className="form-control">Mage</option>
                </select>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input value={characterName} onChange={e => setCharacterName(e.target.value)} className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Create</button>
        </form>
    );
};

export default CharCreate;