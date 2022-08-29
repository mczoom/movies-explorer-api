const PORT = 3000;
const BD_ADRESS = 'mongodb://localhost:27017/moviesdb';
const NODE_ENV = process.env;

const CURRENT_BD_ADRESS = NODE_ENV === 'production' ? BD_ADRESS : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  PORT,
  CURRENT_BD_ADRESS,
};
