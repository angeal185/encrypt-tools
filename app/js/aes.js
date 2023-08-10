//aes.js

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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'AES Encryption')
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
          x('h3', 'AES Encryption/Decryption'),
          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'message' }, 'Message:'),
                x('textarea', { class: 'form-control', id: 'message', rows: '6' })
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
              x('label', { class: 'l-txt w-100', for: 'key' }, 'AES Key:', x('span', {
                class: 'fr cp',
                onclick(){
                  let e = document.getElementById("key");
                    if (e.type === "password") {
                      e.type = "text";
                      this.textContent = 'hide'
                    } else {
                      e.type = "password";
                      this.textContent = 'show'
                    }

                }
              },'hide')),
                x('input', { class: 'form-control', type: 'text', id: 'key' }),
                x('label', { class: 'l-txt' }, 'Select key size:'),
                x('select', { class: 'form-control', id: 'keySize' },
                  x('option', { value: '128' }, '128-bit'),
                  x('option', { value: '256' }, '256-bit')
                ),
                x('label', { class: 'l-txt' }, 'Select mode of operation:'),
                x('select', { class: 'form-control', id: 'modeOfOperation' },
                  x('option', { value: 'CBC' }, 'CBC (Cipher Block Chaining)'),
                  x('option', { value: 'GCM' }, 'GCM (Galois/Counter Mode)')
                ),
                x('label', { class: 'l-txt' }, 'Iterations:'),
                x('input', { class: 'form-control', type: 'number', id: 'iterations', min: '1', value: '10000' })
              )
            )
          ),

          // Encrypt and Decrypt buttons
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'encrypt' }, 'Encrypt'),
          x('button', { class: 'btn btn-primary mt-2', id: 'decrypt' }, 'Decrypt'),

          x('hr'),

          // Output row
          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'ciphertext' }, 'Encrypted Message:'),
                x('textarea', { class: 'form-control', id: 'ciphertext', rows: '6' }),
                x('button', {
                  class: 'btn btn-primary mt-2',
                  id: 'clearCiphertext',
                  onclick(){
                    document.getElementById('ciphertext').value = ''
                  }
                }, 'Clear Encrypted Message')
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'decrypted' }, 'Decrypted Message:'),
                x('textarea', { class: 'form-control', id: 'decrypted', rows: '6', readonly: true }),
                x('button', {
                  class: 'btn btn-primary mt-2',
                  id: 'clearDecrypted',
                  onclick(){
                    document.getElementById('decrypted').value = ''
                  }
                }, 'Clear Decrypted Message')
              )
            )
          )
        ),

        x('hr'),

        // Instructions textarea
        x('div', { class: 'form-group mb-4' },
          x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
          x('textarea', { class: 'form-control', id: 'instructions', rows: '16', readonly: true }, 'Welcome to the AES Encryption/Decryption tool!\n\nWith this tool, you can encrypt and decrypt messages using the Advanced Encryption Standard (AES), a widely used symmetric encryption algorithm. AES provides a high level of security and is used to protect sensitive data in various applications.\n\nHere\'s how to use the AES Encryption/Decryption tool:\n\n1. Enter your message in the "Message" input area.\n2. Provide the AES key (a passphrase or binary key) in the "AES Key" input field.\n3. Click the "Encrypt" button to encrypt the message using AES.\n4. The encrypted message will appear in the "Encrypted Message" area.\n5. To decrypt the message, paste the encrypted message in the "Encrypted Message" area and provide the correct AES key.\n6. Click the "Decrypt" button to decrypt the message.\n\nPlease keep your AES key safe and ensure it is known only to authorized parties. The strength of AES encryption relies on the secrecy and complexity of the key.\n\nUse this tool responsibly and enjoy secure encryption/decryption!\n')
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
      const bytes = new Uint8Array(hexString.length / 2);
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
      }
      return bytes;
    }

    function arrayBufferToHexString(buffer) {
      const byteArray = new Uint8Array(buffer);
      let hexString = '';
      let nextHexByte;

      for (let i = 0; i < byteArray.length; i++) {
        nextHexByte = byteArray[i].toString(16);
        if (nextHexByte.length < 2) {
          nextHexByte = '0' + nextHexByte;
        }
        hexString += nextHexByte;
      }

      return hexString;
    }

    // Function to derive an AES key using PBKDF2
    function deriveAESKey(password, salt, keySize, callback) {
      const encoder = new TextEncoder();
      const encodedPassword = encoder.encode(password);
      let iterations = document.getElementById('iterations'); // You can adjust the number of iterations as needed
      iterations = parseInt(iterations.value);

      crypto.subtle.importKey(
        'raw',
        encodedPassword,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      ).then(baseKey => {
        crypto.subtle.deriveBits(
          {
            name: 'PBKDF2',
            salt: encoder.encode(salt),
            iterations,
            hash: 'SHA-256'
          },
          baseKey,
          keySize
        ).then(derivedBits => {
          callback(null, new Uint8Array(derivedBits));
        }).catch(error => {
          callback(error);
        });
      }).catch(error => {
        callback(error);
      });
    }

    // Function to generate a secure random salt
    function generateSecureSalt(length) {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const randomValues = new Uint8Array(length);
      const randomBytes = crypto.getRandomValues(randomValues);

      let result = '';
      for (let i = 0; i < randomBytes.length; i++) {
        result += charset[randomBytes[i] % charset.length];
      }
      return result;
    }

    // Function to generate a random IV (Initialization Vector)
    function generateRandomIV() {
      const ivLength = 16; // 128-bit IV for AES
      const ivBuffer = new Uint8Array(ivLength);
      crypto.getRandomValues(ivBuffer);
      return ivBuffer;
    }

    function performAESEncryption(message, password, keySize, modeOfOperation, callback) {
      const salt = generateSecureSalt(16);
      deriveAESKey(password, salt, keySize, function (error, derivedKey) {
        if (error) {
          callback(error);
          return;
        }

        const iv = generateRandomIV();

        const algorithm = { name: 'AES-' + modeOfOperation, iv };
        crypto.subtle.importKey(
          'raw',
          derivedKey,
          algorithm,
          false,
          ['encrypt']
        ).then(importedKey => {
          const encodedMessage = new TextEncoder().encode(message);

          crypto.subtle.encrypt(
            algorithm,
            importedKey,
            encodedMessage
          ).then(encryptedBuffer => {

            const saltAndIV = salt + ':' + arrayBufferToHexString(iv);

            const encryptedMessage = saltAndIV + ':' + arrayBufferToHexString(encryptedBuffer);

            callback(null, encryptedMessage);
          }).catch(error => {
            callback(error);
          });
        }).catch(error => {
          callback(error);
        });
      });
    }

    // Function to perform AES decryption
    function performAESDecryption(encryptedMessage, password, keySize, modeOfOperation, callback) {
      const parts = encryptedMessage.split(':');
      if (parts.length !== 3) {
        callback(new Error('Invalid encrypted message format'));
        return;
      }



      const salt = parts[0];
      const iv = hexStringToUint8Array(parts[1]);
      const ciphertext = hexStringToUint8Array(parts[2]);
      deriveAESKey(password, salt, keySize, function (error, derivedKey) {
        if (error) {
          callback(error);
          return;
        }

        const algorithm = { name: 'AES-' + modeOfOperation, iv };

        crypto.subtle.importKey(
          'raw',
          derivedKey,
          algorithm,
          false,
          ['decrypt']
        ).then(importedKey => {
          crypto.subtle.decrypt(
            algorithm,
            importedKey,
            ciphertext
          ).then(decryptedBuffer => {
            const decryptedMessage = new TextDecoder().decode(decryptedBuffer);

            callback(null, decryptedMessage);
          }).catch(error => {
            callback(error);
          });
        }).catch(error => {
          callback(error);
        });
      });
    }

  // Event listener for the "Encrypt" button
  const encryptBtn = document.getElementById('encrypt');
  const ciphertextArea = document.getElementById('ciphertext');

  encryptBtn.addEventListener('click', function () {
    const messageInput = document.getElementById('message').value;
    const keyInput = document.getElementById('key').value;
    const keySize = parseInt(document.getElementById('keySize').value);
    const modeOfOperation = document.getElementById('modeOfOperation').value;

    performAESEncryption(messageInput, keyInput, keySize, modeOfOperation, function (error, encryptedMessage) {
      if (error) {
        console.error('Encryption error:', error);
        return;
      }

      ciphertextArea.value = encryptedMessage;
    });
  });

  // Event listener for the "Decrypt" button
  const decryptBtn = document.getElementById('decrypt');
  const decryptedArea = document.getElementById('decrypted');

  decryptBtn.addEventListener('click', function () {
    const encryptedMessageInput = document.getElementById('ciphertext').value;
    const keyInput = document.getElementById('key').value;
    const keySize = parseInt(document.getElementById('keySize').value);
    const modeOfOperation = document.getElementById('modeOfOperation').value;

    performAESDecryption(encryptedMessageInput, keyInput, keySize, modeOfOperation, function (error, decryptedMessage) {
      if (error) {
        console.error('Decryption error:', error);
        return;
      }

      decryptedArea.value = decryptedMessage;
    });
  });
  }
};
  // Initialize the app
  app.build().init();
  window.onload = null;
};
