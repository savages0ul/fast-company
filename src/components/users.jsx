import React, { useState } from 'react';
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    let numberUsers = users.length;

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    };

    const renderPhase = (number) => {
        if (number === 0) {
            return 'Никто с тобой не тусанет';
        }
        return number === 1 || number >= 5
            ? `${number} человек тусанет с тобой сегодня`
            : `${number} человека тусанут с тобой сегодня`;
    };

    const getBadgeClasses = () => {
        let classes = '';
        classes += numberUsers === 0 ? 'badge bg-danger' : 'badge bg-primary';
        return classes;
    };

    const renderUsers = () => {
        return users.map((user) => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map((qualitie) => (
                        <div key={qualitie._id} className={`badge bg-${qualitie.color}`}>
                            {qualitie.name}
                        </div>
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        ));
    };

    return numberUsers > 0 ? (
        <>
            <h2>
                <span className={getBadgeClasses()}>{renderPhase(numberUsers)}</span>
            </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{renderUsers()}</tbody>
            </table>
        </>
    ) : (
        <h2>
            <span className={getBadgeClasses()}>{renderPhase(numberUsers)}</span>
        </h2>
    );
};

export default Users;
