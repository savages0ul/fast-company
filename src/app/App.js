import React, { useState } from "react";
import Users from "./components/users";
import { paginate } from "./utils/paginate";
import SearchStatus from "./components/searchStatus";
import Pagination from "./components/pagination";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

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
            <SearchStatus count={count} />
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
                    {userCrop.map((user) => (
                        <Users
                            key={user._id}
                            id={user._id}
                            name={user.name}
                            profession={user.profession}
                            qualities={user.qualities}
                            completedMeetings={user.completedMeetings}
                            rate={user.rate}
                            bookmark={user.bookmark}
                            handleDelete={handleDelete}
                            handleToggleBookMark={handleToggleBookMark}
                        />
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default App;
