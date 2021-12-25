import React from 'react';
import PropTypes from 'prop-types';
import classes from './tableHeader.css';

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            });
        } else {
            onSort({ path: item, order: 'asc' });
        }
    };

    const classHandleSort = (item) => {
        const upFill = 'bi bi-caret-up-fill';
        const downFill = 'bi bi-caret-down-fill';
        if (selectedSort.path === item) {
            if (selectedSort.order === 'asc') {
                return upFill;
            } else {
                return downFill;
            }
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        className={classes.columnnn}
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && 'button' }}
                        scope="col"
                    >
                        {columns[column].name}
                        <i
                            className={
                                columns[column].path
                                    ? classHandleSort(columns[column].path)
                                    : undefined
                            }
                        ></i>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
