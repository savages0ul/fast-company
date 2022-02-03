import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../hooks/useQualities';

const Quality = ({ id }) => {
    const { isLoading, getQualitie } = useQualities();
    const qual = id.map((q) => getQualitie(q));
    if (!isLoading) {
        return (
            <>
                {qual.map((q) => (
                    <p key={q._id} className={'badge m-1 bg-' + q.color}>
                        {q.name}
                    </p>
                ))}
            </>
        );
    }
    return 'loading ...';
};

Quality.propTypes = {
    id: PropTypes.array
};

export default Quality;
