var aesjs = require('aes-js');
//  Un exemple de clé de 256 bits 
var key =[
  0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
  0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
  0x76, 0x3b, 0x7b, 0x10, 0x0d, 0xfd, 0x24, 0x1a,
  0x58, 0x4d, 0x2c, 0xfa, 0x25, 0x6a, 0x10, 0x15
];
const aes_cry=(m)=>{

    //  Convertit le texte en octets
    var textBytes = aesjs.utils.utf8.toBytes(m);
    
    //  Le compteur est facultatif, et s'il est omis, il commencera à 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes1 = aesCtr.encrypt(textBytes);
    
    //  Pour imprimer ou stocker les données binaires, vous pouvez les convertir en hexadécimal
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes1);
    return encryptedHex;
}

const aes_dec=(c)=>{

    //  Lorsque vous êtes prêt à déchiffrer la chaîne hexadécimale, reconvertissez-la en octets
    var encryptedBytes = aesjs.utils.hex.toBytes(c);

    //  Le mode de fonctionnement du compteur maintient l'état interne, donc
    //  déchiffre une nouvelle instance qui doit être instanciée
    var aesCtr2 = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr2.decrypt(encryptedBytes);
    
    //  Convertit nos octets en texte
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
} 

module.exports ={aes_cry,aes_dec}