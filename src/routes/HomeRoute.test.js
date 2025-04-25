import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import HomeRoute from './HomeRoute';
import { createServer } from '../tests/server';

function renderComponent() {
 render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );
}

describe('render links for each langauge', () => {
  createServer([
    {
      method: 'get',
      path: '/api/repositories',
      res: (req, res, ctx) => {
        const searchQuery = req.url.searchParams.get('q').split('language:')[1];

        // ...and respond to them using this JSON response.
        const items = [];
        for (let i = 0; i < 10; i++) {
          items.push({ id: i, full_name: searchQuery + `_${i}` });
        }

        return {
          items,
        };
      },
    },
  ]);

  test('render two links for each language', async () => {
    //1) render homeroute
    //first test running console

    renderComponent();
     // Pause here and inspect what's rendered

    // loop each language and check if two links exist
    const languages = [
      'go',
      'rust',
      'javascript',
      'typescript',
      'react',
      'python',
    ];

    for (const language of languages) {
      // Run all findByRole checks in parallel
      const promises = Array.from({ length: 10 }, (_, i) =>
        screen.findByRole('link', { name: `${language}_${i}` })
      );

      const elements = await Promise.all(promises);

      elements.forEach((element, i) => {
        expect(element).toHaveAttribute(
          'href',
          `/repositories/${language}_${i}`
        );
      });
    }
  });
});
