import React, { useLayoutEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagniation = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    console.log(currentPage)

    const pageCount = itemsCount / pageSize;
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);


    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={page === currentPage ? "page-item active" : "page-item "}>
                        <a className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagniation.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagniation;