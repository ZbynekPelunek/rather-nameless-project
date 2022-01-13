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
            <h1>Welcome</h1>
            <h3>{currentUser ? currentUser.email : 'please sign in'}</h3>
        </div>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    //const { data } = await client.get('/api/tickets');

    //return { tickets: data };
    return {};
};

export default LandingPage;