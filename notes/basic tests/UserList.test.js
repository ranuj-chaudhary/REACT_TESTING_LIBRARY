import { screen, render, within } from '@testing-library/react';
import UserList from './UserList';

// Helper Function (using DRY (do not repeat yourself))
function renderUserlist() {
  const users = [
    { name: 'ranuj choudhary', email: 'ranujchoudhary@gmail.com' },
    { name: 'raneesh choudhary', email: 'raneeshchoudhary@gmail.com' },
  ];
  render(<UserList users={users} />);
  return { users };
}

test('render one row per user', async () => {
  renderUserlist();
  // find row from tbody
  const rows = within(screen.getByTestId('users')).getAllByRole('row');
  // Assertion check if two rows present
  expect(rows).toHaveLength(2);
});

test('each userlist record of user match with row', async () => {
  const { users } = renderUserlist();

  // Assertion check if two rows present
  for (let user of users) {
    // get the element if exist by name
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', {
      name: user.email,
    });
    // checks if found element visible on screen
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
