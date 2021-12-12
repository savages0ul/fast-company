import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ count }) => {
    const searchStatus = (number) => {
        if (number === 0) {
            const tableElement = document.querySelector(".table");
            tableElement.hidden = true;
            return "Никто с тобой не тусанет";
        }
        return number === 1 || number >= 5
            ? `${number} человек тусанет с тобой сегодня`
            : `${number} человека тусанут с тобой сегодня`;
    };

    const getBadgeClasses = () => {
        let classes = "";
        classes += count === 0 ? "badge bg-danger" : "badge bg-primary";
        return classes;
    };

    return (
        <>
            <h2>
                <span className={getBadgeClasses()}>{searchStatus(count)}</span>
            </h2>
        </>
    );
};

SearchStatus.propTypes = {
    count: PropTypes.number.isRequired
};

export default SearchStatus;
