const sum = (n1, n2) => {
  if (typeof n1 !== 'number' || typeof n2 !== 'number')
    throw new TypeError('Both arguments must be numbers');
  return n1 + n2;
};

module.exports = { sum };
