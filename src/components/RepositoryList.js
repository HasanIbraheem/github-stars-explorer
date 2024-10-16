import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './RepositoryList.css'; // Import specific styles
import Spinner from './Spinner'; // Import the Spinner component

const RepositoryList = () => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRepositories = async () => {
        setLoading(true); // Start loading state
        setError(null); // Reset error state
        try {
            const response = await fetch('https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRepositories(data.items);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepositories(); // Call fetch on component mount
    }, []);

    if (loading) return <Spinner />; // Use the Spinner component for loading state

    if (error) {
        return (
            <div className="error">
                <p>Oops! Something went wrong.</p>
                <p>Error: {error.message}</p>
                <button onClick={fetchRepositories}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="repository-list">
            <h1>Top GitHub Repositories</h1>
            <div className="card-container">
                {repositories.map(repo => (
                    <div className="card" key={repo.id}>
                        <h2>
                            <Link to={`/repository/${repo.id}`}>
                                {repo.name}
                            </Link>
                        </h2>
                        <p>⭐ {repo.stargazers_count}</p>
                        <p>
                            <Link to={`/owner/${repo.owner.login}`}>
                                Owner: {repo.owner.login}
                            </Link>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RepositoryList;
