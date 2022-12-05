const openpgp = require("openpgp");

async function generateKeys() {
    const key = await openpgp.generateKey({
      userIDs:[ { name: "sam", email: "sam@gmail.com" }],
    })
 
            console.log(key);
            var keys= { public: key.publicKey, private: key.privateKey }

console.log(keys);
const privateKey = await openpgp.readKey({
  armoredKey: keys.private,
})
const publicKey = await openpgp.readKey({
  armoredKey: keys.public,
})

const encryptMessage = await openpgp.encrypt({
  message: await openpgp.createMessage({
      text: 'hello',
  }),
  encryptionKeys: publicKey,
})

console.log(encryptMessage);
const encryptedMessageObj = await openpgp.readMessage({
    armoredMessage: encryptMessage,
})

console.log(encryptedMessageObj);


const decryptedMessage = await openpgp.decrypt({
message: encryptedMessageObj,
decryptionKeys: privateKey,
})
console.log(decryptedMessage);

  }
  generateKeys()
  

  


  