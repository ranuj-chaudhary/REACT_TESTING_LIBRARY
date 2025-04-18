import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserForm from './UserForm';
import userEvent from '@testing-library/user-event';

test('to check name input , email input and button is rendered successfully', async () => {
  render(<UserForm />);

  // Get input elements
  const inputElements = screen.getAllByRole('textbox');

  // Get button element with rext
  const button = screen.getByRole('button');

  // Assertion to check if two input and button rendered
  expect(inputElements).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('to input name amd email on click of button call onSubmit', async () => {
  const mockFn = jest.fn();

  render(<UserForm onUserAdd={mockFn} />);
  // Get input element name amd email
  const inputName = screen.getByRole('textbox', {
    name: /name/i,
  });

  const inputEmail = screen.getByRole('textbox', {
    name: /email/i,
  });
  // Simulate click and typing on inputName
  await userEvent.click(inputName);
  await userEvent.keyboard('ranuj');

  // Simulate click and typing on inputEmail
  await userEvent.click(inputEmail);
  await userEvent.keyboard('ranujchoudhary@gmail.com');

  // find the button and Simulate the click on button
  const button = screen.getByRole('button');
  await userEvent.click(button);

  // Assertion: if input values match the final arguments
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith({
    name: 'ranuj',
    email: 'ranujchoudhary@gmail.com',
  });
});

test('emptied input value name and email onSubmitAdd', async () => {
  // render userForm
  render(<UserForm onUserAdd={() => {}} />);

  // find name and email input
  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });

  // simulate click and typing event
  await userEvent.click(nameInput);
  await userEvent.keyboard('ranuj');
  await userEvent.click(emailInput);
  await userEvent.keyboard('ranujchoudhary@gmail.com');

  // find button to submit user name and email
  const button = screen.getByRole('button');

  //simulate click the button
  userEvent.click(button);

  // Assertion expect empty name and email input
  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});
