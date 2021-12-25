import React, { useState, useEffect } from 'react';
import api from '../api';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../index.css';

const UserPage = ({ id }) => {
    const [userPage, setUserPage] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUserPage(data));
    }, []);

    const history = useHistory();
    const handleSave = () => {
        history.replace('/users');
    };

    return (
        <>
            {userPage ? (
                <div>
                    <h1>{userPage.name}</h1>
                    <h3>Профессия: {userPage.profession.name}</h3>
                    {userPage.qualities.map((qual) => (
                        <h2
                            key={qual._id}
                            className={'badge m-1 bg-' + qual.color}
                        >
                            {qual.name}
                        </h2>
                    ))}

                    <h4>completedMeetings: {userPage.completedMeetings}</h4>
                    <h3>Rate: {userPage.rate}</h3>
                    <button onClick={() => handleSave()}>
                        Все пользователи
                    </button>
                </div>
            ) : (
                'Loading'
            )}
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
