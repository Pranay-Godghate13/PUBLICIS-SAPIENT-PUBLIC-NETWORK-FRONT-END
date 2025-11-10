import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  test('renders input and button', () => {
    render(<SearchBar query="" setQuery={() => {}} onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  test('calls onSearch when button is clicked', () => {
    const mockSearch = jest.fn();
    render(<SearchBar query="" setQuery={() => {}} onSearch={mockSearch} />);
    fireEvent.click(screen.getByText(/search/i));
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });

  test('calls onSearch when Enter is pressed', () => {
    const mockSearch = jest.fn();
    render(<SearchBar query="" setQuery={() => {}} onSearch={mockSearch} />);
    fireEvent.keyPress(screen.getByPlaceholderText(/search/i), { key: 'Enter', code: 'Enter' });
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });
});
