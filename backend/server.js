const app = require('./app');
const dotenv = require('dotenv');

//dotenv.config({ path: '.env.development' });
require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

console.log('process.env.NODE_ENV->', process.env.NODE_ENV);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
