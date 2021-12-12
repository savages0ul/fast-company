import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ id, bookmark, functionBookMark }) => {
    const getBookMarkClasses = (bookmarkValue) => {
        let classBookMark = "";
        classBookMark += !bookmarkValue
            ? "bi bi-bookmark"
            : "bi bi-bookmark-fill";
        return classBookMark;
    };

    return (
        <>
            <td>
                <div
                    type="button"
                    className={getBookMarkClasses(bookmark)}
                    onClick={() => functionBookMark(id)}
                ></div>
            </td>
        </>
    );
};

BookMark.propTypes = {
    id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    functionBookMark: PropTypes.func.isRequired
};

export default BookMark;
