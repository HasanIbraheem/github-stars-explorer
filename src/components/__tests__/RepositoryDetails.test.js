import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'; // Import screen and waitFor
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RepositoryDetails from '../RepositoryDetails';

describe('RepositoryDetails', () => {
    test('renders repository details', async () => {
        render(
            <MemoryRouter initialEntries={['/repository/1']}>
                <Routes>
                    <Route path="/repository/:id" element={<RepositoryDetails />} />
                </Routes>
            </MemoryRouter>
        );

        // Assert loading state is present initially
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();

        // Mock the API call and repository data (optional: if needed for further test cases)

        // Use waitFor if testing for async loading completion
        await waitFor(() => {
            // Once the data is loaded, you would check for content here
            // Example: expect(screen.getByText(/Repository Name/i)).toBeInTheDocument();
        });
    });
});
