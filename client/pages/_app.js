import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import Menu from '../components/menu';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <Header currentUser={currentUser} />
                </div>
                <div className="row">
                    <div className="col-1"><Menu currentUser={currentUser} /></div>
                    <div className="col-11">
                        <div className="tab-content" id="v-pills-tabContent">
                            <Component currentUser={currentUser} {...pageProps} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    };

    return {
        pageProps,
        ...data
    };
};

export default AppComponent;