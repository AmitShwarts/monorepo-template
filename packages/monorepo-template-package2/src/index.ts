import express from 'express';
import kleur from 'kleur';

const PORT = process.env.PORT;

const app = express();

// Define a route that responds with "Hello, World!" when accessed
app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(kleur.yellow(`monorepo-template-package2 is running on http://localhost:${PORT}`));
});
