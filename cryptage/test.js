const {aes_cry, aes_dec} = require('./aes');

const chiff = aes_cry("Hello word");

// console.log("message chiffre :"+chiff);

const dechiff = aes_dec(chiff);

// console.log("message dechiffre :"+dechiff);
