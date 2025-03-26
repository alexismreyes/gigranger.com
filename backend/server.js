const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
