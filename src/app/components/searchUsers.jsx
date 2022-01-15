import React from 'react';
import PropTypes from 'prop-types';

const SearchUsers = ({ search, onChange }) => {
    return (
        <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={search}
            onChange={onChange}
        />
    );
};

SearchUsers.propTypes = {
    search: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchUsers;
