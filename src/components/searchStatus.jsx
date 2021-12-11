import React from 'react';

const SearchStatus = (props) => {
    const searchStatus = (number) => {
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
        classes += props.usersNumbers === 0 ? 'badge bg-danger' : 'badge bg-primary';
        return classes;
    };

    return (
        <>
            <h2>
                <span className={getBadgeClasses()}>{searchStatus(props.usersNumbers)}</span>
            </h2>
        </>
    );
};

export default SearchStatus;
