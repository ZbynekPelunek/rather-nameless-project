import axios from 'axios';

let baseURL;

switch(process.env.NODE_ENV) {
    case 'development':
        baseURL = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
        break;
    case 'production':
        baseURL = 'https://www.minuslevel.com';
        break;
    default:
        baseURL = '';
}

const BuildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // We are on the server

        return axios.create({
            baseURL,
            //baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // We are on the browser
        return axios.create({
            baseURL: '/'
        });
    }
};

export default BuildClient;