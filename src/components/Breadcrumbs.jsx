import React from 'react';

const Breadcrumbs = ({ paths }) => {
    return (
        <ul className="breadcrumb">
            {paths.map((path, idx) => (
                <li key={idx}>{path}</li>
            ))}
        </ul>
    );
};

export default Breadcrumbs;
