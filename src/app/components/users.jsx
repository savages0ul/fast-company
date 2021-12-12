import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const Users = ({
    id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    bookmark,
    handleDelete,
    handleToggleBookMark
}) => {
    return (
        <>
            <tr key={id}>
                <td>{name}</td>
                <td>
                    {qualities.map((qualitie) => (
                        <Qualitie
                            key={qualitie._id}
                            id={qualitie._id}
                            name={qualitie.name}
                            color={qualitie.color}
                        />
                    ))}
                </td>
                <td key={profession._id}>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}</td>
                <BookMark
                    id={id}
                    bookmark={bookmark}
                    functionBookMark={handleToggleBookMark}
                />
                <td>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

Users.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
    }).isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired
};

export default Users;
