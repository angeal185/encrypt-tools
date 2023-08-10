//shift-ciphers.js

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
          x('h3', 'Caesar Cipher'),
          x('div', {class: 'row'},
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt', for: 'caesarPlainText' }, 'Plain Text:'),
              x('textarea', { class: 'form-control', rows: '8', id: 'caesarPlainText' })
            ),
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt' }, 'Encrypted Text:'),
              x('textarea', { class: 'form-control', rows: '8', id: 'caesarEncryptedText', readonly: true })
            ),
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt', for: 'caesarShift' }, 'Shift (0-25):'),
              x('input', { class: 'form-control', type: 'number', id: 'caesarShift', min: '0', max: '25', value: '3' }),
              x('button', { class: 'btn btn-primary me-2 mt-2', id:'carEnc' }, 'Encrypt'),
              x('button', { class: 'btn btn-primary mt-2', id:'caeDec' }, 'Decrypt')
            )
          ),
          x('hr'),
          x('h3', 'ROT13 Cipher'),
          x('div', {class: 'row'},
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt', for: 'rot13PlainText' }, 'Plain Text:'),
              x('textarea', { class: 'form-control', rows: '8', id: 'rot13PlainText' })
            ),
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt' }, 'Encrypted Text:'),
              x('textarea', { class: 'form-control', rows: '8', id: 'rot13EncryptedText', readonly: true })
            ),
            x('div', { class: 'col-12 mb-2' },
              x('label', { class: 'l-txt', for: 'rot13IncludePunctuation' }, 'Include Punctuation:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'rot13IncludePunctuation' })
            ),
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt', for: 'rot13RotValue' }, 'ROT Value (1-25):'),
              x('input', { class: 'form-control', type: 'number', id: 'rot13RotValue', min: '1', max: '25', value: '13' })
            ),
            x('div', { class: 'col-12 mb-2' },
              x('button', { class: 'btn btn-primary me-2', id: 'rotEnc'}, 'Encrypt'),
              x('button', { class: 'btn btn-primary', id:'rotDec' }, 'Decrypt')
            )
          ),
          x('hr'),

          x('h3', 'Atbash Cipher'),
          x('div', {class: 'row'},
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt', for: 'atbashPlainText' }, 'Plain Text:'),
              x('textarea', { class: 'form-control', rows: '8', id: 'atbashPlainText' })
            ),
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt' }, 'Encrypted Text:'),
              x('textarea', { class: 'form-control', rows: '8', id: 'atbashEncryptedText', readonly: true })
            ),
            x('div', { class: 'col-12 mb-2' },
              x('label', { class: 'l-txt', for: 'atbashPreserveWhitespace' }, 'Include Whitespace:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'atbashPreserveWhitespace' })
            ),
            x('div', { class: 'col-12 mb-2' },
              x('label', { class: 'l-txt', for: 'atbashPreserveNumerals' }, 'Include Numerals:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'atbashPreserveNumerals' })
            ),
            x('div', { class: 'col-12 mb-2' },
              x('label', { class: 'l-txt', for: 'atbashHandleSpecialChars' }, 'Handle Special Characters:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'atbashHandleSpecialChars' })
            ),
            x('div', { class: 'col-12 mb-2' },
              x('label', { class: 'l-txt', for: 'atbashCaseSensitive' }, 'Case Sensitive:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'atbashCaseSensitive' })
            ),
            x('div', { class: 'col-12 mb-2' },
              x('button', { class: 'btn btn-primary me-2', id: 'atbEnc'}, 'Encrypt'),
              x('button', { class: 'btn btn-primary', id:'atbDec' }, 'Decrypt')
            )
          ),
          x('hr'),
          x('h3', 'Vigenère Cipher'),
          x('div', {class: 'row'},
              x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt', for: 'vigenerePlainText' }, 'Plain Text:'),
              x('textarea', { class: 'form-control', rows: '8', id: 'vigenerePlainText' })
            ),
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt' }, 'Encrypted Text:'),
              x('textarea', { class: 'form-control', rows: '8', id: 'vigenereEncryptedText', readonly: true })
            ),
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt', for: 'vigKeyword' }, 'Keyword:'),
              x('input', { class: 'form-control', type: 'text', id: 'vigKeyword' })
            ),
            x('div', { class: 'col-12 col-md-6 mb-2' },
              x('label', { class: 'l-txt', for: 'vigKeywordLength' }, 'Keyword Length:'),
              x('input', { class: 'form-control', type: 'number', id: 'vigKeywordLength', min: '1', max: '25', value: '8' })

            ),
            x('div', { class: 'col-12 mb-2' },
              x('button', { class: 'btn btn-primary me-2', id: 'vigAutoGen' }, 'Auto-generate Keyword'),
              x('button', { class: 'btn btn-primary me-2', id: 'vigEnc' }, 'Encrypt'),
              x('button', { class: 'btn btn-primary', id: 'vigDec' }, 'Decrypt')
            )
          )
        ),
        x('hr'),


        // Instructions textarea
        x('div', { class: 'form-group mb-4' },
          x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
          x('textarea', { class: 'form-control', id: 'instructions', rows: '16', readonly: true },
`Caesar Cipher Instructions:
--------------------------
The Caesar Cipher is a simple substitution cipher where each letter in the plaintext is shifted a fixed number of positions down the alphabet. To use the Caesar Cipher, follow these steps:
1. Enter the plaintext you want to encrypt in the "Plain Text" textarea.
2. Provide a numeric shift value (0-25) in the "Shift (0-25)" input field. This value determines the number of positions each letter will be shifted down the alphabet during encryption.
3. Click the "Encrypt" button to encrypt the plaintext. The encrypted text will be displayed in the "Encrypted Text" textarea.
4. To decrypt the encrypted text, enter it in the "Encrypted Text" textarea and provide the same shift value used for encryption in the "Shift (0-25)" input field. Click the "Decrypt" button to see the decrypted plaintext.

ROT13 Cipher Instructions:
--------------------------
The ROT13 Cipher is a special case of the Caesar Cipher, where the shift value is fixed to 13, resulting in a simple letter substitution. To use the ROT13 Cipher, follow these steps:
1. Enter the plaintext you want to encrypt or decrypt in the "Plain Text" or "Encrypted Text" textarea, respectively.
2. Optionally, you can check the "Include Punctuation" checkbox if you want to preserve non-alphabetic characters during encryption or decryption.
3. Click the "Encrypt" button to encrypt the plaintext or the "Decrypt" button to decrypt the encrypted text. The result will be displayed in the corresponding textarea.

Atbash Cipher Instructions:
--------------------------
The Atbash Cipher is a substitution cipher that reverses the alphabet. Each letter is replaced with its reverse (A is replaced with Z, B with Y, and so on). To use the Atbash Cipher, follow these steps:
1. Enter the plaintext you want to encrypt in the "Plain Text" textarea.
2. You can customize the behavior of the cipher using the checkboxes provided:
   - "Include Whitespace": Preserve whitespace characters during encryption.
   - "Include Numerals": Preserve numerical characters during encryption.
   - "Handle Special Characters": Preserve special characters during encryption.
   - "Case Sensitive": Treat the input as case-sensitive during encryption.
3. Click the "Encrypt" button to encrypt the plaintext. The encrypted text will be displayed in the "Encrypted Text" textarea.
4. To decrypt the encrypted text, simply re-enter it in the "Encrypted Text" textarea, and click the "Decrypt" button.

Vigenère Cipher Instructions:
----------------------------
The Vigenère Cipher is a polyalphabetic cipher that uses a keyword to encrypt the plaintext. Each letter in the keyword corresponds to a shift value for the corresponding letter in the plaintext. To use the Vigenère Cipher, follow these steps:
1. Enter the plaintext you want to encrypt in the "Plain Text" textarea.
2. Provide a keyword, which should consist of alphabetic characters only, in the "Keyword" input field. The keyword will be used for encryption.
3. Optionally, you can provide the length of the keyword in the "Keyword Length" input field and click the "Auto-generate Keyword" button to generate a random keyword of the specified length.
4. Click the "Encrypt" button to encrypt the plaintext using the provided keyword. The encrypted text will be displayed in the "Encrypted Text" textarea.
5. To decrypt the encrypted text, enter it in the "Encrypted Text" textarea and provide the same keyword used for encryption in the "Keyword" input field. Click the "Decrypt" button to see the decrypted plaintext.

Hill Cipher Instructions:
-------------------------
1. Enter the plain text in the 'Plain Text' textarea.
2. Enter the key matrix (e.g., 2x2 or 3x3) in the 'Key Matrix' textarea.
3. Click the 'Encrypt' button to encrypt or 'Decrypt' button to decrypt.


`)
        ),


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


    void function Caesar(){

      const caesarEncryptButton = document.getElementById('carEnc');
       const caesarDecryptButton = document.getElementById('caeDec');

       caesarEncryptButton.addEventListener('click', function () {
         const plainText = document.getElementById('caesarPlainText').value;
         const shift = parseInt(document.getElementById('caesarShift').value, 10);
         const encryptedText = caesarEncrypt(plainText, shift);
         document.getElementById('caesarEncryptedText').value = encryptedText;
       });

       caesarDecryptButton.addEventListener('click', function () {
         const encryptedText = document.getElementById('caesarEncryptedText').value;
         const shift = parseInt(document.getElementById('caesarShift').value, 10);
         const decryptedText = caesarDecrypt(encryptedText, shift);
         document.getElementById('caesarPlainText').value = decryptedText;
       });

       // Caesar Cipher functions
       function caesarEncrypt(plainText, shift) {
         // Validate the shift value (key) to be within the range 0 to 25
         if (shift < 0 || shift > 25) {
           alert('Shift value (key) must be between 0 and 25.');
           return '';
         }

         const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
         const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
         const shiftedAlphabetUpper = alphabetUpper.slice(shift) + alphabetUpper.slice(0, shift);
         const shiftedAlphabetLower = alphabetLower.slice(shift) + alphabetLower.slice(0, shift);

         let encryptedText = '';

         for (let i = 0; i < plainText.length; i++) {
           const char = plainText[i];
           const isUpper = alphabetUpper.includes(char);
           const isLower = alphabetLower.includes(char);

           if (isUpper) {
             const index = alphabetUpper.indexOf(char);
             encryptedText += shiftedAlphabetUpper[index];
           } else if (isLower) {
             const index = alphabetLower.indexOf(char);
             encryptedText += shiftedAlphabetLower[index];
           } else {
             // Non-alphabetic characters remain unchanged
             encryptedText += char;
           }
         }

         return encryptedText;
       }

       function caesarDecrypt(encryptedText, shift) {
         // Validate the shift value (key) to be within the range 0 to 25
         if (shift < 0 || shift > 25) {
           alert('Shift value (key) must be between 0 and 25.');
           return '';
         }

         const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
         const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
         const shiftedAlphabetUpper = alphabetUpper.slice(shift) + alphabetUpper.slice(0, shift);
         const shiftedAlphabetLower = alphabetLower.slice(shift) + alphabetLower.slice(0, shift);

         let decryptedText = '';

         for (let i = 0; i < encryptedText.length; i++) {
           const char = encryptedText[i];
           const isUpper = alphabetUpper.includes(char);
           const isLower = alphabetLower.includes(char);

           if (isUpper) {
             const index = shiftedAlphabetUpper.indexOf(char);
             decryptedText += alphabetUpper[index];
           } else if (isLower) {
             const index = shiftedAlphabetLower.indexOf(char);
             decryptedText += alphabetLower[index];
           } else {
             // Non-alphabetic characters remain unchanged
             decryptedText += char;
           }
         }

         return decryptedText;
       }


    }();


    void function ROT13() {
      // ROT13 Cipher functions

      const rot13EncryptButton = document.getElementById('rotEnc');
       const rot13DecryptButton = document.getElementById('rotDec');

       rot13EncryptButton.addEventListener('click', function () {
         const plainText = document.getElementById('rot13PlainText').value;
         const includePunctuation = document.getElementById('rot13IncludePunctuation').checked;
         const encryptedText = rot13Encrypt(plainText, includePunctuation);
         document.getElementById('rot13EncryptedText').value = encryptedText;
       });

       rot13DecryptButton.addEventListener('click', function () {
         const encryptedText = document.getElementById('rot13EncryptedText').value;
         const includePunctuation = document.getElementById('rot13IncludePunctuation').checked;
         const decryptedText = rot13Decrypt(encryptedText, includePunctuation);
         document.getElementById('rot13PlainText').value = decryptedText;
       });

      function rot13Encrypt(plainText, includePunctuation) {
        if (typeof plainText !== 'string') {
          throw new Error('Input text must be a string.');
        }

        const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';

        let encryptedText = '';

        for (let i = 0; i < plainText.length; i++) {
          const char = plainText[i];

          if (alphabetUpper.includes(char)) {
            const index = alphabetUpper.indexOf(char);
            const newIndex = (index + 13) % 26;
            encryptedText += alphabetUpper[newIndex];
          } else if (alphabetLower.includes(char)) {
            const index = alphabetLower.indexOf(char);
            const newIndex = (index + 13) % 26;
            encryptedText += alphabetLower[newIndex];
          } else if (includePunctuation) {
            encryptedText += char; // Preserve non-alphabetic characters if includePunctuation is true
          }
        }

        return encryptedText;
      }

      function rot13Decrypt(encryptedText, includePunctuation) {
        if (typeof encryptedText !== 'string') {
          throw new Error('Encrypted text must be a string.');
        }

        const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';

        let decryptedText = '';

        for (let i = 0; i < encryptedText.length; i++) {
          const char = encryptedText[i];

          if (alphabetUpper.includes(char)) {
            const index = alphabetUpper.indexOf(char);
            const newIndex = (index - 13 + 26) % 26;
            decryptedText += alphabetUpper[newIndex];
          } else if (alphabetLower.includes(char)) {
            const index = alphabetLower.indexOf(char);
            const newIndex = (index - 13 + 26) % 26;
            decryptedText += alphabetLower[newIndex];
          } else if (includePunctuation) {
            decryptedText += char; // Preserve non-alphabetic characters if includePunctuation is true
          }
        }

        return decryptedText;
      }
    }();

    void function Atbash() {
      // Atbash Cipher functions
      function atbashEncrypt(plainText, preserveWhitespace, preserveNumerals, caseSensitive, handleSpecialChars) {
        if (typeof plainText !== 'string') {
          throw new Error('Input text must be a string.');
        }

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const reversedAlphabet = alphabet.split('').reverse().join('');

        let encryptedText = '';
        let modifiedPlainText = plainText;

        for (let i = 0; i < modifiedPlainText.length; i++) {
          const char = modifiedPlainText[i];
          const isLetter = alphabet.includes(char);
          const isWhitespace = char === ' ';
          const isNumeral = '0123456789'.includes(char);
          const isSpecialChar = !isLetter && !isWhitespace && !isNumeral;

          if (isLetter) {
            let index;
            if (caseSensitive) {
              if (char === char.toUpperCase()) {
                index = alphabet.indexOf(char);
              } else {
                index = alphabet.toLowerCase().indexOf(char);
              }
            } else {
              index = alphabet.toUpperCase().indexOf(char.toUpperCase());
            }
            encryptedText += reversedAlphabet[index];
          } else if (isWhitespace && preserveWhitespace) {
            encryptedText += char;
          } else if (isNumeral && preserveNumerals) {
            encryptedText += char;
          } else if (isSpecialChar && handleSpecialChars) {
            encryptedText += char;
          } else {
            // Handle other cases based on user options
            // For example, you could ignore the character or replace it with a placeholder.
            // In this example, we replace other characters with an underscore '_'.
            encryptedText += '';
          }
        }

        return encryptedText;
      }

      function atbashDecrypt(encryptedText, preserveWhitespace, preserveNumerals, caseSensitive, handleSpecialChars) {
        if (typeof encryptedText !== 'string') {
          throw new Error('Encrypted text must be a string.');
        }

        // The Atbash cipher is symmetric, so decryption is the same as encryption
        return atbashEncrypt(encryptedText, preserveWhitespace, preserveNumerals, caseSensitive, handleSpecialChars);
      }

      const atbashEncryptButton = document.getElementById('atbEnc');
      const atbashDecryptButton = document.getElementById('atbDec');

      atbashEncryptButton.addEventListener('click', function() {
        const plainText = document.getElementById('atbashPlainText').value;
        const preserveWhitespace = document.getElementById('atbashPreserveWhitespace').checked;
        const preserveNumerals = document.getElementById('atbashPreserveNumerals').checked;
        const handleSpecialChars = document.getElementById('atbashHandleSpecialChars').checked;
        const caseSensitive = document.getElementById('atbashCaseSensitive').checked;

        try {
          const encryptedText = atbashEncrypt(plainText, preserveWhitespace, preserveNumerals, handleSpecialChars, caseSensitive);
          document.getElementById('atbashEncryptedText').value = encryptedText;
        } catch (error) {
          alert(error.message);
        }
      });

      atbashDecryptButton.addEventListener('click', function() {
        const encryptedText = document.getElementById('atbashEncryptedText').value;
        const preserveWhitespace = document.getElementById('atbashPreserveWhitespace').checked;
        const preserveNumerals = document.getElementById('atbashPreserveNumerals').checked;
        const handleSpecialChars = document.getElementById('atbashHandleSpecialChars').checked;
        const caseSensitive = document.getElementById('atbashCaseSensitive').checked;

        try {
          const decryptedText = atbashDecrypt(encryptedText, preserveWhitespace, preserveNumerals, handleSpecialChars, caseSensitive);
          document.getElementById('atbashPlainText').value = decryptedText;
        } catch (error) {
          alert(error.message);
        }
      });
    }();

    void function Vigenere(){
      function generateRandomKeyword(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const keywordArray = new Uint8Array(length);
        crypto.getRandomValues(keywordArray);

        let keyword = '';
        for (let i = 0; i < length; i++) {
          const charIndex = keywordArray[i] % charset.length;
          keyword += charset.charAt(charIndex);
        }

        return keyword;
      }

      const vigenereEncryptButton = document.getElementById('vigEnc');
      const vigenereDecryptButton = document.getElementById('vigDec');
      const vigenereAutoGenerateButton = document.getElementById('vigAutoGen');

      vigenereEncryptButton.addEventListener('click', function () {
        const plainText = document.getElementById('vigenerePlainText').value;
        const keyword = document.getElementById('vigKeyword').value;
        if (!plainText || !keyword) {
          alert('Please enter the plain text and the keyword.');
          return;
        }

        const encryptedText = vigenereEncrypt(plainText, keyword);
        document.getElementById('vigenereEncryptedText').value = encryptedText;
      });

      vigenereDecryptButton.addEventListener('click', function () {
        const encryptedText = document.getElementById('vigenereEncryptedText').value;
        const keyword = document.getElementById('vigKeyword').value;
        if (!encryptedText || !keyword) {
          alert('Please enter the encrypted text and the keyword.');
          return;
        }

        const decryptedText = vigenereDecrypt(encryptedText, keyword);
        document.getElementById('vigenerePlainText').value = decryptedText;
      });

      vigenereAutoGenerateButton.addEventListener('click', function () {
        const keywordLength = parseInt(document.getElementById('vigKeywordLength').value, 10);
        if (isNaN(keywordLength) || keywordLength <= 0) {
          alert('Invalid keyword length. Please enter a positive integer.');
          return;
        }

        const generatedKeyword = generateRandomKeyword(keywordLength);
        document.getElementById('vigKeyword').value = generatedKeyword;
      });

      function vigenereEncrypt(plainText, keyword) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const keywordUpper = keyword.toUpperCase();
        let encryptedText = '';

        let keywordIndex = 0;
        for (let i = 0; i < plainText.length; i++) {
          const char = plainText[i];
          const charUpper = char.toUpperCase();

          if (alphabet.includes(charUpper)) {
            const keywordChar = keywordUpper[keywordIndex % keywordUpper.length];
            const shift = alphabet.indexOf(keywordChar);
            const isUpperCase = char === charUpper;
            const charIndex = alphabet.indexOf(charUpper);
            const shiftedIndex = (charIndex + shift) % alphabet.length;
            encryptedText += isUpperCase ? alphabet[shiftedIndex] : alphabet[shiftedIndex].toLowerCase();
            keywordIndex++;
          } else {
            // Non-alphabetic characters remain unchanged
            encryptedText += char;
          }
        }

        return encryptedText;
      }

      function vigenereDecrypt(encryptedText, keyword) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const keywordUpper = keyword.toUpperCase();
        let decryptedText = '';

        let keywordIndex = 0;
        for (let i = 0; i < encryptedText.length; i++) {
          const char = encryptedText[i];
          const charUpper = char.toUpperCase();

          if (alphabet.includes(charUpper)) {
            const keywordChar = keywordUpper[keywordIndex % keywordUpper.length];
            const shift = alphabet.indexOf(keywordChar);
            const isUpperCase = char === charUpper;
            const charIndex = alphabet.indexOf(charUpper);
            const shiftedIndex = (charIndex - shift + alphabet.length) % alphabet.length;
            decryptedText += isUpperCase ? alphabet[shiftedIndex] : alphabet[shiftedIndex].toLowerCase();
            keywordIndex++;
          } else {
            // Non-alphabetic characters remain unchanged
            decryptedText += char;
          }
        }

        return decryptedText;
      }
    }();







}
}
  // Initialize the app
  app.build().init();
  window.onload = null;
};
