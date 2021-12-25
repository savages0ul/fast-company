import React, { useState, useEffect } from 'react';
import UsersList from '../UsersList';
import UserPage from '../userPage';
import api from '../../api';
import PropTypes from 'prop-types';

const Users = ({ match }) => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const userId = match.params.userId;

    return (
        <>
            {userId ? (
                <UserPage id={userId} />
            ) : (
                <UsersList
                    users={users}
                    handleDelete={handleDelete}
                    handleToggleBookMark={handleToggleBookMark}
                />
            )}
        </>
    );
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
