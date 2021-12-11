import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => user._id !== userId);
        setUsers(newUsers);
    };

    const handleToggleBookMark = (userId) => {
        const myState = users.map((user) => {
            if (user._id === userId) {
                user.bookmark = !user.bookmark;
                return user;
            }
            return user;
        });
        setUsers(myState);
    };

    return (
        <>
            <SearchStatus usersNumbers={users.length} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <Users
                            key={user._id}
                            handleDelete={handleDelete}
                            handleToggleBookMark={handleToggleBookMark}
                            {...user}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default App;
