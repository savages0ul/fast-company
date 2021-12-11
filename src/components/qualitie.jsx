import React from 'react';

const Qualitie = (props) => {
    return (
        <>
            <td>
                {props.qualities.map((qualitie) => (
                    <div key={qualitie._id} className={`badge bg-${qualitie.color} m-1`}>
                        {qualitie.name}
                    </div>
                ))}
            </td>
        </>
    );
};

export default Qualitie;
