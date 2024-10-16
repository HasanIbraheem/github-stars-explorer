// src/components/OwnerDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './OwnerDetails.css'; // Import any styles you want

const OwnerDetails = () => {
    const { login } = useParams(); // Get the owner's login from the URL
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOwnerDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.github.com/users/${login}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOwner(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwnerDetails();
    }, [login]);

    if (loading) return <p>Loading...</p>;

    if (error) {
        return (
            <div className="error">
                <p>Oops! Something went wrong.</p>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="owner-details">
            {owner && (
                <>
                    <h1>{owner.login}</h1>
                    <img src={owner.avatar_url} alt={owner.login} width="150" />
                    <p><strong>Bio:</strong> {owner.bio || 'No bio available.'}</p>
                    <p><strong>Location:</strong> {owner.location || 'Not specified.'}</p>
                    <p>
                        <a href={owner.html_url} target="_blank" rel="noopener noreferrer">
                            View GitHub Profile
                        </a>
                    </p>
                </>
            )}
        </div>
    );
};

export default OwnerDetails;
