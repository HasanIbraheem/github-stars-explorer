// src/SkeletonLoader.js
import React from 'react';
import './SkeletonLoader.css'; // Import styles for skeleton loader

const SkeletonLoader = () => {
    return (
        <div className="skeleton-loader">
            <div className="skeleton-card">
                <div className="skeleton-title" />
                <div className="skeleton-stars" />
                <div className="skeleton-owner" />
            </div>
            <div className="skeleton-card">
                <div className="skeleton-title" />
                <div className="skeleton-stars" />
                <div className="skeleton-owner" />
            </div>
            <div className="skeleton-card">
                <div className="skeleton-title" />
                <div className="skeleton-stars" />
                <div className="skeleton-owner" />
            </div>
        </div>
    );
};

export default SkeletonLoader;
