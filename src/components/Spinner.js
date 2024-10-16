import React from 'react';
import './Spinner.css'; // Import the CSS for the spinner

const Spinner = () => {
    return (
        <div className="spinner">
            {/* You can add a simple loading text or just the spinner */}
            <div className="loader"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Spinner;
