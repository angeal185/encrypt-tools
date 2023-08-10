// otp.js

// otp

window.onload = function() {


  const app = {
    build(){

      const menuitems = menu
      // Create the 'app' div element
     this.appDiv = x('div', { id: 'app' },
    // Navbar Top
    x('nav', { class: 'navbar fixed-top bg-dark' },
      x('div', { class: 'container-fluid' },
        x('span', {
          id: 'menu-bar',
          class: 'fa fa-bars',
          onclick(){
            let ele = document.getElementById('menu-toggle')
            ele.classList.toggle('show')
          }
        }),
        x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'OTP Encryption')
      )
    ),

    x('div', {id: 'menu-toggle', class: 'menu-side'},
      function(){
        let mnu = x('ul', {class: 'menu-sub'})

        for (var i = 0; i < menuitems.length; i++) {
          mnu.append(x('li', {class: 'menu-lnk'}, x('a', {href: menuitems[i].href}, menuitems[i].name)))
        }

        return mnu
      }
    ),

    // Main container
    x('div', { class: 'container-fluid mt-4' },
      // Input row
      x('h3', 'OTP Encryption'),
      x('div', { class: 'row' },
        x('div', { class: 'col-12 col-md-6' },
          x('div', { class: 'form-group' },
            x('label', { class: 'l-txt', for: 'message' }, 'Message:'),
            x('textarea', { class: 'form-control', id: 'message', rows: '6' })
          )
        ),
        x('div', { class: 'col-12 col-md-6' },
          x('div', { class: 'form-group' },
            x('label', { class: 'l-txt', for: 'key' }, 'OTP:'),
            x('textarea', { class: 'form-control', id: 'key', rows: '6' })
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
            x('textarea', { class: 'form-control', id: 'ciphertext', rows: '6', readonly: true }),
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
      ),

      x('hr'),

      // OTP row
      x('div', { class: 'row' },
        x('div', { class: 'form-group' },
          x('label', { class: 'l-txt', for: 'generatedCiphertext' }, 'Generated Secure Otp:'),
          x('textarea', { class: 'form-control', id: 'generatedCiphertext', rows: '6', readonly: true })
        ),
        x('div', { class: 'form-group' },
          x('label', { class: 'l-txt', for: 'ciphertextLength' }, 'Otp Length:'),
          x('input', { class: 'form-control', type: 'number', id: 'ciphertextLength', min: '1', value: '128' }),
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'generateCiphertext' }, 'Generate'),
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'saveCiphertext' }, 'Download Otp'),
          x('button', { class: 'btn btn-primary mt-2', id: 'clearpad' }, 'Clear Otp')
        )
      ),

      x('hr'),

      x('div', { class: 'row' },
        x('div', { class: 'form-group' },
          x('label', { class: 'l-txt', for: 'generatedCiphertexts' }, 'Generated Secure Otp List:'),
          x('textarea', { class: 'form-control', id: 'generatedCiphertexts', rows: '6', readonly: true })
        ),
        x('div', { class: 'form-group' },
          x('label', { class: 'l-txt', for: 'ciphertextLengths' }, 'Otp Length:'),
          x('input', { class: 'form-control', type: 'number', id: 'ciphertextLengths', min: '1', value: '128' }),
          x('label', { class: 'l-txt', for: 'ciphertextCount' }, 'Otp Count:'),
          x('input', { class: 'form-control', type: 'number', id: 'ciphertextCount', min: '1', value: '16' }),
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'generateCiphertexts' }, 'Generate'),
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'saveCiphertexts' }, 'Download Otp List'),
          x('button', { class: 'btn btn-primary mt-2', id: 'clearpadlist' }, 'Clear Otp List')
        )
      ),

      x('hr'),

      // Instructions textarea
      x('div', { class: 'form-group mb-4' },
        x('label', { class: 'l-txt', for: 'Instructions' }, 'Instructions:'),
        x('textarea', { class: 'form-control', id: 'Instructions', rows: '16', readonly: true },     'Welcome to the Wasteland Encryption Terminal (W.E.T.)!\n\nSecure your messages with the unbreakable power of the One-Time Pad (OTP) algorithm, a time-tested method from the pre-war era that ensures absolute secrecy in the post-nuclear wasteland!\n\nHere\'s why the OTP is unbreakable when used right:\n\n1. The Power of Perfect Secrecy: OTP encryption is built upon the foundation of perfect secrecy. When you encrypt your message using OTP, the resulting ciphertext provides no information about the original message, as long as the key is truly random, secret, and never reused.\n\n2. Infinite Key Possibilities: With OTP, your secret key must be at least as long as your message. This infinite number of possible keys ensures an astronomical key space, making brute-force attacks impossible within a reasonable timeframe.\n\n3. The Shield of Unpredictability: The key in OTP must be generated using true randomness, making it unpredictable and resistant to cryptanalysis. Without knowing the key, no amount of computational power can decipher the encrypted message.\n\nInstructions to use the OTP encryption:\n\n1. Generating OTP:\n   a. Enter the desired length for the OTP in the "Ciphertext Length" input field.\n   b. Click the "Generate" button to generate a secure random OTP of the specified length.\n   c. The generated OTP will appear in the "Generated Secure OTP" terminal.\n\n2. Encrypting Messages:\n   a. In the "Message" input field, enter the message you want to encrypt. Use only alphanumeric characters and common symbols.\n   b. In the "OTP" input field, paste the secret OTP you want to use for encryption. The OTP must be at least as long as your message.\n   c. Click the "Encrypt" button to perform the encryption.\n   d. The encrypted ciphertext will appear in the "Encrypted Message" terminal.\n\n3. Decrypting Messages:\n   a. In the "Encrypted Message" input field, paste the ciphertext you want to decrypt.\n   b. In the "OTP" input field, paste the same secret OTP that was used for encryption.\n   c. Click the "Decrypt" button to perform the decryption.\n   d. The decrypted message will appear in the "Decrypted Message" terminal.\n\n4. Saving OTP:\n   a. After generating an OTP or a list of OTPs, you can save them to a text file.\n   b. For a single OTP, click the "Download OTP" button to save it as a text file.\n   c. For a list of OTPs, click the "Download OTP List" button to save them as a text file.\n\n5. Clearing Terminals:\n   a. To clear the "Encrypted Message" terminal, click the "Clear Encrypted Message" button.\n   b. To clear the "Decrypted Message" terminal, click the "Clear Decrypted Message" button.\n   c. To clear the "Generated Secure OTP" terminal, click the "Clear OTP" button.\n   d. To clear the "Generated Secure OTP List" terminal, click the "Clear OTP List" button.\n\nRemember, the true strength of the One-Time Pad lies in its rigorous adherence to these principles. Secure key management and the one-time use of the key are paramount. Stay vigilant, Wasteland Encryptor! The fate of your communications rests on the strength of your encryption.'
        )
      )
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
    init(){

      document.body.appendChild(this.appDiv);
      this.appDiv = null;
      this.build = null;
      delete this.appDiv;
      delete this.build;
      delete menu

      // Event listener for the "Generate Ciphertext" button
      const generateCiphertextBtn = document.getElementById('generateCiphertext');
      const generatedCiphertextArea = document.getElementById('generatedCiphertext');

      const saveCiphertext = document.getElementById('saveCiphertext');

      const saveCiphertexts = document.getElementById('saveCiphertexts');

      // Event listener for the "Generate Ciphertext" button
      const generateCiphertextsBtn = document.getElementById('generateCiphertexts');
      const generatedCiphertextsArea = document.getElementById('generatedCiphertexts');

      // Event listener for the "Encrypt" button
      const encryptBtn = document.getElementById('encrypt');
      const ciphertextArea = document.getElementById('ciphertext');

      // Event listener for the "Decrypt" button
      const decryptBtn = document.getElementById('decrypt');
      const decryptedArea = document.getElementById('decrypted');


      // Event listener for the "Clear Ciphertext" button
      const clearCiphertextBtn = document.getElementById('clearCiphertext');
      // Event listener for the "Clear Decrypted Message" button
      const clearDecryptedBtn = document.getElementById('clearDecrypted');

      const clearpad = document.getElementById('clearpad');
      // Event listener for the "Clear Decrypted Message" button
      const clearpadlist = document.getElementById('clearpadlist');



      // Function to generate a secure random integer between min and max (inclusive)
      function getRandomInt(min, max) {
        const randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        const randomNumber = randomBuffer[0];
        return Math.floor((randomNumber / 0xFFFFFFFF) * (max - min + 1) + min);
      }

      // Function to generate a secure random ciphertext with the chosen length (in hex format)
      function generateRandomCiphertext(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
        let ciphertext = '';

        for (let i = 0; i < length; i++) {
          const randomIndex = getRandomInt(0, characters.length - 1);
          ciphertext += characters.charAt(randomIndex);
        }

        return ciphertext;
      }

      function performEncryption(message, key) {
        if (message.length > key.length) {
          return 'Error: Message must be at least the key length for One-Time Pad encryption.';
        }

        if (message.length < key.length) {
          key = key.slice(0,message.length);
        }

        let encryptedMessage = '';
        for (let i = 0; i < message.length; i++) {
          const messageCharCode = message.charCodeAt(i);
          const keyCharCode = key.charCodeAt(i);
          const encryptedCharCode = (messageCharCode ^ keyCharCode) % 256;
          const encryptedHex = encryptedCharCode.toString(16).toUpperCase().padStart(2, '0');
          encryptedMessage += encryptedHex;
        }

        return encryptedMessage;
      }

      function performDecryption(ciphertext, key) {
        if (message.length %2 > key.length) {
          return 'Error: Message must be at least the key length for One-Time Pad encryption.';
        }

        if (message.length %2 < key.length) {
          key = key.slice(0,message.length);
        }

        let decryptedMessage = '';
        for (let i = 0; i < ciphertext.length; i += 2) {
          const encryptedHex = ciphertext.substr(i, 2);
          const encryptedCharCode = parseInt(encryptedHex, 16);
          const keyCharCode = key.charCodeAt(i / 2);
          const decryptedCharCode = (encryptedCharCode ^ keyCharCode) % 256;
          decryptedMessage += String.fromCharCode(decryptedCharCode);
        }

        return decryptedMessage;
      }

      function downloadFile(filename, content) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }

      generateCiphertextBtn.addEventListener('click', function() {
        const ciphertextLengthInput = document.getElementById('ciphertextLength');
        const ciphertextLength = parseInt(ciphertextLengthInput.value, 10);
        const generatedCiphertext = generateRandomCiphertext(ciphertextLength);
        generatedCiphertextArea.textContent = generatedCiphertext;

      });

      generateCiphertextsBtn.addEventListener('click', function() {
        const ciphertextLengthInput = document.getElementById('ciphertextLengths');
        const ciphertextLength = parseInt(ciphertextLengthInput.value, 10);

        let len = parseInt(document.getElementById('ciphertextCount').value);
        let generatedCiphertext = generateRandomCiphertext(ciphertextLength);
        console.log(len)
        if(!len){
          return alert('invalid otp count');
        }

        generatedCiphertextsArea.textContent = '';
        for (var i = 0; i < len; i++) {

          generatedCiphertextsArea.textContent +=
          'id: ' + (i+1) + '\n' +
          'length: ' + ciphertextLength + '\n' +
          'pad: '+ generateRandomCiphertext(ciphertextLength) + '\n\n'

        }

      });

      saveCiphertext.addEventListener('click', function() {
        // Prompt the user to download the generated OTP to a text file
        const otpFilename = 'generated_otp.txt';
        downloadFile(otpFilename, generatedCiphertext.value);
      });

      saveCiphertexts.addEventListener('click', function() {
        // Prompt the user to download the generated OTP to a text file
        const otpFilename = 'generated_otp_list.txt';
        downloadFile(otpFilename, generatedCiphertextsArea.value);
      });

      encryptBtn.addEventListener('click', function() {
        const messageInput = document.getElementById('message').value;
        const keyInput = document.getElementById('key').value;

        const encryptedMessage = performEncryption(messageInput, keyInput);
        ciphertextArea.value = encryptedMessage;
      });

      decryptBtn.addEventListener('click', function() {
        const ciphertextInput = document.getElementById('ciphertext').value;
        const keyInput = document.getElementById('key').value;

        const decryptedMessage = performDecryption(ciphertextInput, keyInput);
        decryptedArea.value = decryptedMessage;
      });

      clearCiphertextBtn.addEventListener('click', function() {
        ciphertextArea.value = '';
      });

      clearDecryptedBtn.addEventListener('click', function() {
        decryptedArea.value = '';
      });

      clearpad.addEventListener('click', function(){
        generatedCiphertextArea.textContent = '';
      })

      clearpadlist.addEventListener('click', function(){
        generatedCiphertextsArea.textContent = '';
      })


      return this
    }
  }

  app.build().init();
  window.onload = null;



};
