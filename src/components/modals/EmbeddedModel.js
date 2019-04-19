import React from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    const src = source
    return (
        // basic bootstrap classes. you can change with yours.
        <div>
            <div>
                <iframe style={{width: "500px", height: "500px"}}src={src}></iframe>
            </div>
        </div>
    );
};

export default Iframe;