import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext); 
    //console.log(`Logout ${user.accessToken}`)
    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                userLogout();
                navigate('/');
            })
            .catch(() => {
                navigate('/404');
            });
    });

    return null;
}

export default Logout;
