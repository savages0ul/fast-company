import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';

const Users = (props) => {
    return (
        <>
            <tr key={props._id}>
                <td>{props.name}</td>
                <Qualitie qualities={props.qualities} />
                <td>{props.profession.name}</td>
                <td>{props.completedMeetings}</td>
                <td>{props.rate}</td>
                <BookMark
                    id={props._id}
                    bookmark={props.bookmark}
                    functionBookMark={props.handleToggleBookMark}
                />
                <td>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => props.handleDelete(props._id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

export default Users;
