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
            const tableElement = document.querySelector('.table');
            tableElement.hidden = true;
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

    const bookMark = (userId) => {
        const myState = users.map((user) => {
            if (user._id === userId) {
                user.bookmark = !user.bookmark;
                return user;
            }
            return user;
        });
        setUsers(myState);
    };

    const bookMarkClasses = (bookmarkValue) => {
        let classBookMark = '';
        classBookMark += !bookmarkValue ? 'bi bi-bookmark' : 'bi bi-bookmark-fill';
        return classBookMark;
    };

    const renderUsers = () => {
        return users.map((user) => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map((qualitie) => (
                        <div key={qualitie._id} className={`badge bg-${qualitie.color} m-1`}>
                            {qualitie.name}
                        </div>
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                    <div
                        type="button"
                        className={bookMarkClasses(user.bookmark)}
                        onClick={() => bookMark(user._id)}
                    ></div>
                </td>
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

    return (
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
                        <th scope="col">Избранное</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{renderUsers()}</tbody>
            </table>
        </>
    );
};

export default Users;
