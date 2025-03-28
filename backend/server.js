require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

const app = require('./app');

console.log('process.env.NODE_ENV->', process.env.NODE_ENV);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
