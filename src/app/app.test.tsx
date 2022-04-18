import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './app.component';

test('renders popular and starred repos link', () => {
    render(<App />);

    const popularElements = screen.getAllByText(/Popular repos/i);
    expect(popularElements.length).toBeGreaterThanOrEqual(1);
    expect(popularElements[0]).toBeInTheDocument();

    const starredElement = screen.getByText(/Starred repos/i);
    expect(starredElement).toBeInTheDocument();
});
