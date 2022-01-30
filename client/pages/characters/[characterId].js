const CharacterShow = ({ character }) => {
    return (
        <div className="tab-pane fade show active" id="v-pills-character" role="tabpanel" aria-labelledby="v-pills-character-tab">
            <h1>{character.characterName}</h1>
            <h3>Level {character.characterLevel}</h3>
            <h5>Health: {character.statsBaseHealth + (character.statsPrimaryStamina * 5)}</h5>
            <h5>Mana: {character.statsBaseResource + (character.statsPrimaryIntellect * 4)}</h5>
            <h4>Primary Stats</h4>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Agility</td>
                        <td>Strength</td>
                        <td>Intellect</td>
                        <td>Stamina</td>
                    </tr>
                    <tr>
                        <td>{character.statsPrimaryAgility}</td>
                        <td>{character.statsPrimaryStrength}</td>
                        <td>{character.statsPrimaryIntellect}</td>
                        <td>{character.statsPrimaryStamina}</td>
                    </tr>
                </tbody>
            </table>
            <h4>Secondary Stats</h4>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Multistrike Chance</td>
                        <td>Multistrike Damage</td>
                        <td>Attack Power</td>
                        <td>Spell Power</td>
                    </tr>
                    <tr>
                        <td>{character.statsSecondaryMultristrikeChance}</td>
                        <td>{character.statsSecondaryMultistrikeDamage}</td>
                        <td>{character.statsSecondaryAttackPower}</td>
                        <td>{character.statsSecondarySpellPower}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

CharacterShow.getInitialProps = async (context, client) => {
    const { characterId } = context.query;
    const { data } = await client.get(`/api/characters/${characterId}`);
    //console.log(data);

    return { character: data };
};

export default CharacterShow;