import { rest } from 'msw';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  // req res ctx(context)
  rest.get('/api/repositories', (req, res, ctx) => {
    const searchQuery = req.url.searchParams.get('q').split('language:')[1];

    // ...and respond to them using this JSON response.
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push({ id: 1, full_name: searchQuery + `_${i}` });
    }

    return res(
      ctx.json({
        items: items,
      })
    );
  }),
];
