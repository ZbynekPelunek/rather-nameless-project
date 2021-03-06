import axios from 'axios';
import { useState } from 'react';

const UseRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}, url2) => {
        try {
            setErrors(null);
            const response = await axios[method](url || url2, { ...body, ...props} );
            
            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (err) {
            setErrors(
                <div className="aler alert-danger">
                    <h4>Oooopsss....</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(err => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};

export default UseRequest;