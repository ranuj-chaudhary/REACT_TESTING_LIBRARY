import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('userform on submit user data shows user in userlist', async () => {
  render(<App />);

  // userform name and email input exist;
  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });
  const button = screen.getByRole('button');
  // simulate click and keyboard input
  await userEvent.click(nameInput);
  await userEvent.keyboard('ranuj');
  await userEvent.click(emailInput);
  await userEvent.keyboard('ranujchoudhary@gmail.com');

  // simulate button click
  await userEvent.click(button);

  // find the cell for each name and email in tbody
  const name = screen.getByRole('cell', {
    name: 'ranuj',
  });
  const email = screen.getByRole('cell', {
    name: 'ranujchoudhary@gmail.com',
  });

  // Assertion must be present in document
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
