import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import OwnerDetails from '../OwnerDetails';

describe('OwnerDetails', () => {
    test('renders owner details', async () => {
        render(
            <MemoryRouter initialEntries={['/owner/testowner']}>
                <Routes>
                    <Route path="/owner/:login" element={<OwnerDetails />} />
                </Routes>
            </MemoryRouter>
        );

        // Add your assertions here to verify that the owner details are rendered correctly
    });
});
