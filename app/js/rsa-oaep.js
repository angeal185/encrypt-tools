// rsa-oaep.js

window.onload = function () {
  const app = {
    build() {
      const menuitems = menu;
      // Create the 'app' div element
      this.appDiv = x('div', { id: 'app' },
        // Navbar Top
        x('nav', { class: 'navbar fixed-top bg-dark' },
          x('div', { class: 'container-fluid' },
            x('span', {
              id: 'menu-bar',
              class: 'fa fa-bars',
              onclick() {
                let ele = document.getElementById('menu-toggle');
                ele.classList.toggle('show');
              }
            }),
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'RSA-OAEP Encryption/Decryption')
          )
        ),

        x('div', { id: 'menu-toggle', class: 'menu-side' },
          function () {
            let mnu = x('ul', { class: 'menu-sub' });

            for (var i = 0; i < menuitems.length; i++) {
              mnu.append(x('li', { class: 'menu-lnk' }, x('a', { href: menuitems[i].href }, menuitems[i].name)));
            }

            return mnu;
          }
        ),

        // Main container
        x('div', { class: 'container-fluid mt-4' },
          // Input row
          x('h3', 'RSA-OAEP Encryption/Decryption'),
          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'message' }, 'Message:'),
                x('textarea', { class: 'form-control', id: 'message', rows: '6' })
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'modulusLength' }, 'Modulus Length:'),
                x('select', { class: 'form-control', id: 'modulusLength' },
                  x('option', { value: '1024' }, '1024 bits'),
                  x('option', { value: '2048', selected: 'selected' }, '2048 bits'),
                  x('option', { value: '4096' }, '4096 bits')
                ),
                x('label', { class: 'l-txt', for: 'hashLength' }, 'Hash Length:'),
                x('select', { class: 'form-control', id: 'hashLength' },
                  x('option', { value: '256', selected: 'selected' }, 'SHA-256'),
                  x('option', { value: '384'}, 'SHA-384'),
                  x('option', { value: '512' }, 'SHA-512')
                ),
                x('label', { class: 'l-txt', for: 'publicExponent' }, 'publicExponent'),
                x('input', { class: 'form-control', id: 'publicExponent', type: 'text', readonly: 'readonly', value: '65537' })
              ),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'publicKey' }, 'Public Key (spki):'),
                x('textarea', { class: 'form-control', id: 'publicKey', rows: '6' })
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
                x('div', { class: 'form-group' },
                    x('label', { class: 'l-txt', for: 'privateKey' }, 'Private Key (pkcs8):'),
                    x('textarea', { class: 'form-control', id: 'privateKey', rows: '6'})
                )
            )
          ),

          // Encrypt and Decrypt buttons
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'generateKey' }, 'Generate Public Key'),
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'encrypt' }, 'Encrypt'),
          x('button', { class: 'btn btn-primary mt-2', id: 'decrypt' }, 'Decrypt'),

          x('hr'),

          // Output row
          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'ciphertext' }, 'Encrypted Message:'),
                x('textarea', { class: 'form-control', id: 'ciphertext', rows: '6'}),
                x('button', { class: 'btn btn-primary mt-2', id: 'clearCiphertext' }, 'Clear Encrypted Message')
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'decrypted' }, 'Decrypted Message:'),
                x('textarea', { class: 'form-control', id: 'decrypted', rows: '6', readonly: true }),
                x('button', { class: 'btn btn-primary mt-2', id: 'clearDecrypted' }, 'Clear Decrypted Message')
              )
            )
          )
        ),

        x('hr'),

        // Instructions textarea
        x('div', { class: 'form-group mb-4' },
          x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
          x('textarea', { class: 'form-control', id: 'instructions', rows: '16', readonly: true }, `Welcome to the RSA-OAEP Encryption/Decryption tool!\n\nWith this tool, you can encrypt and decrypt messages using RSA-OAEP (Optimal Asymmetric Encryption Padding), which is a cryptographic padding scheme used with RSA public key encryption. It adds randomness to the encrypted data, making it secure against certain attacks.\n\nHere's how to use the RSA-OAEP Encryption/Decryption tool:\n\n1. Generate Public Key:\n   - Before you can encrypt a message, you need to generate an RSA key pair consisting of a public key and a corresponding private key.\n   - Choose the desired modulus length (key size) from the "Modulus Length" dropdown. Common values are 1024, 2048, or 4096 bits.\n   - Select the hash function for the padding scheme from the "Hash Length" dropdown. SHA-256, SHA-384, and SHA-512 are available options.\n   - Click the "Generate Public Key" button to generate the RSA key pair.\n   - The RSA public key will be displayed in the "Public Key (spki)" text area, and the private key will be shown in the "Private Key (pkcs8)" text area.\n\n2. Encrypt a Message:\n   - Enter your message in the "Message" input area.\n   - Paste the recipient's RSA public key (in PEM format) into the "Public Key (spki)" text area. This key will be used for encryption.\n   - Click the "Encrypt" button to encrypt the message using RSA-OAEP.\n   - The encrypted message will appear in the "Encrypted Message" text area. The encrypted message is represented in hexadecimal format.\n\n3. Decrypt a Message:\n   - To decrypt an encrypted message, you need the corresponding RSA private key.\n   - Paste the encrypted message (in hexadecimal format) into the "Encrypted Message" text area.\n   - Paste your RSA private key (in PEM format) into the "Private Key (pkcs8)" text area.\n   - Click the "Decrypt" button to decrypt the message using RSA-OAEP.\n   - The decrypted message will appear in the "Decrypted Message" text area.\n\nImportant Notes:\n- Keep your RSA private key safe and ensure it is known only to authorized parties. The strength of RSA encryption relies on the security of the private key.\n- Use this tool responsibly and avoid sharing sensitive data or private keys with untrusted parties.\n- You can experiment with different key sizes (modulus length) and hash functions to understand their impact on encryption strength and performance.\n\nEnjoy secure RSA-OAEP encryption/decryption with this tool!`)
        ),

        x('hr'),

        // Navbar Bottom
        x('nav', { class: 'navbar fixed-bottom bg-dark' },
          x('div', { class: 'container-fluid jcc' },
            x('span', {}, '2023')
          )
        )
      );

      return this;
    },
    init() {
  document.body.appendChild(this.appDiv);
  this.appDiv = null;
  this.build = null;
  delete this.appDiv;
  delete this.build;
  delete menu

  // Function to convert a hexadecimal string to a Uint8Array
  function hexStringToUint8Array(hexString) {
    var bytes = new Uint8Array(hexString.length / 2);
    for (var i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
    }
    return bytes;
  }

  function arrayBufferToHexString(buffer) {
    var byteArray = new Uint8Array(buffer);
    var hexString = '';
    var nextHexByte;

    for (var i = 0; i < byteArray.length; i++) {
      nextHexByte = byteArray[i].toString(16);
      if (nextHexByte.length < 2) {
        nextHexByte = '0' + nextHexByte;
      }
      hexString += nextHexByte;
    }

    return hexString;
  }

  // Function to perform RSA-OAEP encryption
  function performRSAEncryption(message, publicKey) {

    return new Promise(function (resolve, reject) {
      try {
        // Convert the RSA public key from PEM format to CryptoKey format
        var publicKeyData = hexStringToUint8Array(publicKey);
        let sha = document.getElementById('hashLength');
        crypto.subtle.importKey(
          'spki',
          publicKeyData,
          { name: 'RSA-OAEP', hash: 'SHA-'+ sha.value },
          false,
          ['encrypt']
        ).then(function (rsaPublicKey) {

          // Encrypt the message using RSA-OAEP

          var encodedMessage = new TextEncoder().encode(message);
          crypto.subtle.encrypt(
            { name: 'RSA-OAEP' },
            rsaPublicKey,
            encodedMessage
          ).then(function (encryptedBuffer) {
            // Convert the encrypted message to a hex string
            var encryptedMessage = arrayBufferToHexString(encryptedBuffer);
            resolve(encryptedMessage);
          }).catch(function (error) {
            console.error('Encryption error:', error);
            reject(error);
          });
        }).catch(function (error) {
          console.error('Error importing RSA public key:', error);
          reject(error);
        });
      } catch (error) {
        console.error('Encryption error:', error);
        reject(error);
      }
    });
  }

  // Function to perform RSA-OAEP decryption
  function performRSADecryption(encryptedMessage, privateKey) {
    return new Promise(function (resolve, reject) {
      try {
        // Convert the RSA private key from PEM format to CryptoKey format
        var privateKeyData = hexStringToUint8Array(privateKey);
        let sha = document.getElementById('hashLength');
        crypto.subtle.importKey(
          'pkcs8',
          privateKeyData,
          { name: 'RSA-OAEP', hash: 'SHA-'+ sha.value },
          false,
          ['decrypt']
        ).then(function (rsaPrivateKey) {
          // Convert the encrypted message from hex to Uint8Array
          var encryptedBuffer = hexStringToUint8Array(encryptedMessage);
          // Decrypt the message using RSA-OAEP
          crypto.subtle.decrypt(
            { name: 'RSA-OAEP' },
            rsaPrivateKey,
            encryptedBuffer
          ).then(function (decryptedBuffer) {
            // Convert the decrypted buffer to a UTF-8 string
            var decryptedMessage = new TextDecoder().decode(decryptedBuffer);
            resolve(decryptedMessage);
          }).catch(function (error) {
            console.error('Decryption error:', error);
            reject(error);
          });
        }).catch(function (error) {
          console.error('Error importing RSA private key:', error);
          reject(error);
        });
      } catch (error) {
        console.error('Decryption error:', error);
        reject(error);
      }
    });
  }

  // Function to generate an RSA key pair
  function generateRSAKeyPair() {
    return new Promise(function (resolve, reject) {
      // RSA key pair options
      const ml = document.getElementById('modulusLength');
      let sha = document.getElementById('hashLength');

      const keyPairOptions = {
        name: 'RSA-OAEP',
        modulusLength: parseInt(ml.value), // You can adjust the key size as needed
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
        hash: { name: 'SHA-'+ sha.value }
      };

      // Generate the RSA key pair
      crypto.subtle.generateKey(keyPairOptions, true, ['encrypt', 'decrypt'])
        .then(function (keyPair) {
          resolve(keyPair);
        })
        .catch(function (error) {
          console.error('Error generating RSA key pair:', error);
          reject(error);
        });
    });
  }

  function exportRSAPublicKey(publicKey) {
    // Define the PEM header and footer
    const publicKeyArea = document.getElementById('publicKey');

    return crypto.subtle.exportKey('spki', publicKey)
      .then(function (spki) {
        const publicKeyHex = arrayBufferToHexString(spki);
        publicKeyArea.value = publicKeyHex;
        return;
      });
  }

function displayKeyPair(keyPair) {
    const privateKeyArea = document.getElementById('privateKey');

    // Export the public key in PEM format and display it
    crypto.subtle.exportKey('spki', keyPair.publicKey)
        .then(function (spki) {
            exportRSAPublicKey(keyPair.publicKey);

        })
        .catch(function (error) {
            console.error('Error exporting RSA public key:', error);
        });

    // Export the private key in PEM format and display it
    crypto.subtle.exportKey('pkcs8', keyPair.privateKey)
        .then(function (pkcs8) {
            const privateKeyPEM = arrayBufferToHexString(pkcs8);
            privateKeyArea.value = privateKeyPEM;
        })
        .catch(function (error) {
            console.error('Error exporting RSA private key:', error);
        });
}

  // Generate RSA key pair and display it to the user
  function generateAndDisplayRSAKeyPair() {
    generateRSAKeyPair()
      .then(function (keyPair) {

        displayKeyPair(keyPair);
      })
      .catch(function (error) {
        console.error('Error generating RSA key pair:', error);
      });
  }

  // Event listener for the "Generate Public Key" button
  var generateBtn = document.getElementById('generateKey');
  generateBtn.addEventListener('click', generateAndDisplayRSAKeyPair);

  // Event listener for the "Encrypt" button
  var encryptBtn = document.getElementById('encrypt');
  var ciphertextArea = document.getElementById('ciphertext');

  encryptBtn.addEventListener('click', function () {
    var messageInput = document.getElementById('message').value;
    var publicKeyInput = document.getElementById('publicKey').value;

    performRSAEncryption(messageInput, publicKeyInput).then(function (encryptedMessage) {
      ciphertextArea.value = encryptedMessage;
    }).catch(function (error) {
      console.error('Encryption error:', error);
    });
  });

  // Event listener for the "Decrypt" button
  var decryptBtn = document.getElementById('decrypt');
  var decryptedArea = document.getElementById('decrypted');

  decryptBtn.addEventListener('click', function () {
    var encryptedMessageInput = document.getElementById('ciphertext').value;
    var privateKeyInput = document.getElementById('privateKey').value;

    performRSADecryption(encryptedMessageInput, privateKeyInput).then(function (decryptedMessage) {
      decryptedArea.value = decryptedMessage;
    }).catch(function (error) {
      console.error('Decryption error:', error);
    });
  });
}

  };

  // Initialize the app
  app.build().init();
  window.onload = null;
};
