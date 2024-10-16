import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RepositoryList from './components/RepositoryList'; // Ensure path is correct
import RepositoryDetails from './components/RepositoryDetails'; // Ensure path is correct
import OwnerDetails from './components/OwnerDetails'; // Ensure path is correct
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>GitHub Stars Explorer</h1>
                </header>
                <Routes>
                    <Route path="/" element={<RepositoryList />} />
                    <Route path="/repository/:id" element={<RepositoryDetails />} />
                    <Route path="/owner/:login" element={<OwnerDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
