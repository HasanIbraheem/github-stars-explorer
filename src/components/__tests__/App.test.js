import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';


describe('App', () => {
    test('renders loading state initially', () => {
        render(<App />);

        // Check if the loading text is displayed initially
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders header after loading', async () => {
        render(<App />);

        // Wait for the loading to finish and check for the main header
        await waitFor(() => {
            expect(screen.getByText(/GitHub Stars Explorer/i)).toBeInTheDocument();
        });
    });
});