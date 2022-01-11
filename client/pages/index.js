const LandingPage = ({ currentUser, tickets }) => {
    // const ticketList = tickets.map(ticket => {
    //     return (
    //         <tr key={ticket.id}>
    //             <td>{ticket.title}</td>
    //             <td>{ticket.price}$</td>
    //         </tr>
    //     );
    // })

    return (
        <div>
            <h1>Welcome {currentUser ? currentUser.email : 'and please sign in or sign up'}</h1>
        </div>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    //const { data } = await client.get('http://localhost:3000/api/tickets');

    //return { tickets: data };
    return {};
};

export default LandingPage;