// src/components/RepositoryDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RepositoryDetails.css'; // Add styles as needed

const RepositoryDetails = () => {
    const { id } = useParams(); // Get the repository ID from the URL
    const [repository, setRepository] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRepositoryDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.github.com/repositories/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRepository(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepositoryDetails(); // Fetch details when component mounts
    }, [id]);

    if (loading) return <p>Loading...</p>; // Loading state

    if (error) {
        return (
            <div className="error">
                <p>Oops! Something went wrong.</p>
                <p>Error: {error.message}</p>
                <button onClick={fetchRepositoryDetails}>Retry</button> {/* Retry Button */}
            </div>
        );
    }
    
    return (
        <div className="repository-details">
            <h1>{repository.name}</h1>
            <p>{repository.description || 'No description available.'}</p>
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
            </a>
        </div>
    );
};

export default RepositoryDetails;
