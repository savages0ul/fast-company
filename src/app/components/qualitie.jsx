import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ id, name, color }) => {
    return (
        <>
            <div key={id} className={`badge bg-${color} m-1`}>
                {name}
            </div>
        </>
    );
};

Qualitie.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Qualitie;
