import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../BugForm';

test('shows error when title too short', () => {
  const onAdd = jest.fn();
  render(<BugForm onAdd={onAdd} />);
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'ab' }});
  fireEvent.submit(screen.getByText('Report Bug'));
  expect(screen.getByRole('alert').textContent).toMatch(/Title too short/);
  expect(onAdd).not.toHaveBeenCalled();
});

test('calls onAdd with valid data', async () => {
  const onAdd = jest.fn().mockResolvedValue({});
  render(<BugForm onAdd={onAdd} />);
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Valid title' }});
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'desc' }});
  fireEvent.submit(screen.getByText('Report Bug'));
  expect(onAdd).toHaveBeenCalledWith({ title: 'Valid title', description: 'desc' });
});
