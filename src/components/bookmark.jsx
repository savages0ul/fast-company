import React from 'react';

const BookMark = (props) => {
    const getBookMarkClasses = (bookmarkValue) => {
        let classBookMark = '';
        classBookMark += !bookmarkValue ? 'bi bi-bookmark' : 'bi bi-bookmark-fill';
        return classBookMark;
    };

    return (
        <>
            <td>
                <div
                    type="button"
                    className={getBookMarkClasses(props.bookmark)}
                    onClick={() => props.functionBookMark(props.id)}
                ></div>
            </td>
        </>
    );
};

export default BookMark;
