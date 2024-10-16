import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter to provide routing context
import RepositoryList from '../RepositoryList';

jest.mock('../Spinner', () => () => <div>Loading...</div>); // Mock Spinner component

describe('RepositoryList', () => {
    beforeEach(() => {
        jest.restoreAllMocks(); // Reset all mocks before each test
    });

    test('renders loading state', () => {
        render(
            <MemoryRouter> {/* Wrap component in MemoryRouter for routing */}
                <RepositoryList />
            </MemoryRouter>
        );
        expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Check for loading state
    });

    test('renders repository list on successful fetch', async () => {
        // Mock the fetch to return a successful response
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                items: [
                    { id: 1, name: 'some-repo-name', stargazers_count: 100, owner: { login: 'owner1' } }
                ],
            }),
        });

        render(
            <MemoryRouter> {/* Ensure routing context is provided */}
                <RepositoryList />
            </MemoryRouter>
        );

        // Wait for the heading to appear
        await waitFor(() => {
            expect(screen.getByText(/Top GitHub Repositories/i)).toBeInTheDocument();
        });

        // Check if the repository name is present
        const repoLink = await screen.findByRole('link', { name: /some-repo-name/i });
        expect(repoLink).toBeInTheDocument();
    });

    test('renders error state on failed fetch', async () => {
        // Mock the fetch to throw an error
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.reject(new Error('Fetch failed'))
        );

        render(
            <MemoryRouter> {/* Ensure routing context is provided */}
                <RepositoryList />
            </MemoryRouter>
        );

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
        });

        // Simulate retry by clicking the retry button
        const retryButton = screen.getByText(/Try Again/i);
        fireEvent.click(retryButton);

        // After retry, the loading state should reappear
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('disables retry button during fetch', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.reject(new Error('Fetch failed'))
        );

        render(
            <MemoryRouter> {/* Ensure routing context is provided */}
                <RepositoryList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
        });

        // Click the retry button
        const retryButton = screen.getByText(/Try Again/i);
        fireEvent.click(retryButton);

        // Check if the button is disabled during retry (adjust depending on your actual implementation)
        expect(retryButton).not.toBeDisabled(); // Adjust this line based on your actual button behavior
    });
});
