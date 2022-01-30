import Link from 'next/link';
import Router from 'next/router';
import useRequest from '../hooks/use-request';

const LandingPage = ({ currentUser, characters }) => {

    const { doRequest, errors } = useRequest({
        method: 'delete',
        onSuccess: () => Router.push('/')
    });

    const renderWelcomePage = () => {
        if (currentUser) {
            const charactersList = characters.map(character => {
                return (
                    <tr key={character.id}>
                        <td>{character.characterName}</td>
                        <td>{character.characterClass}</td>
                        <td>{character.characterLevel}</td>
                        <td>
                            <Link href="/characters/[characterId]" as={`/characters/${character.id}`}>
                                <a><button className="btn btn-primary">Play</button></a>
                            </Link>
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={() => doRequest({}, `/api/characters/${character.id}`)}>Delete</button>
                        </td>
                    </tr>
                );
            })

            return (
                <div>
                    <h1>{currentUser.username}</h1>
                    <h3>Characters</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {charactersList}
                        </tbody>
                    </table>
                    <Link href="/characters/create">
                        <a>Create New Character</a>
                    </Link>
                </div>
            )  
        } else {
            return (
                <div>
                    <h1>Welcome</h1>
                    <h3>please Sign In or Sign Up</h3>
                </div>
            )
        }
    }

    return (
            renderWelcomePage()
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    if(currentUser) {
        const { data } = await client.get(`/api/characters?userId=${currentUser.id}`);

        return { characters: data };
    } else {
        return {}
    }
};

export default LandingPage;