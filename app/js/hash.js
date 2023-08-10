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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'Hash Generator')
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
          x('h3', 'Hash Generator'),
          x('div', { class: 'row' },
            x('div', { class: 'col-12' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'message' }, 'Message to Hash:'),
                x('textarea', { class: 'form-control', id: 'message', rows: '6' })
              )
            )
          ),

          // Hash algorithm selection
          x('div', { class: 'form-group' },
            x('label', { class: 'l-txt', for: 'hashAlgorithm' }, 'Select Hash Algorithm:'),
            x('select', { class: 'form-control', id: 'hashAlgorithm' },
              x('option', { value: 'sha1' }, 'SHA-1'),
              x('option', { value: 'sha256' }, 'SHA-256'),
              x('option', { value: 'sha384' }, 'SHA-384'),
              x('option', { value: 'sha512' }, 'SHA-512'),
              x('option', { value: 'sha3-224' }, 'SHA3-224'),
              x('option', { value: 'sha3-256' }, 'SHA3-256'),
              x('option', { value: 'sha3-384' }, 'SHA3-384'),
              x('option', { value: 'sha3-512' }, 'SHA3-512'),
              x('option', { value: 'SHAKE128' }, 'SHAKE-128'),
              x('option', { value: 'SHAKE256' }, 'SHAKE-256'),
              x('option', { value: 'BLAKE2-256' }, 'BLAKE2-256'),
              x('option', { value: 'BLAKE2-512' }, 'BLAKE2-512'),
              x('option', { value: 'Whirlpool-512' }, 'Whirlpool-512')
            )
          ),

          // Generate Hash button
          x('button', { class: 'btn btn-primary mt-2', id: 'generateHash' }, 'Generate Hash'),

          x('hr'),

          // Output row
          x('div', { class: 'row' },
            x('div', { class: 'col-12' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'hashResult' }, 'Hash Result:'),
                x('textarea', { class: 'form-control', id: 'hashResult', rows: '6', readonly: true })
              )
            )
          )
        ),
        x('hr'),

        // Instructions textarea
        x('div', { class: 'form-group mb-4' },
          x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
          x('textarea', { class: 'form-control', id: 'instructions', rows: '16', readonly: true }, 'Welcome to the Hash Generator!\n\nWith the Hash Generator, you can securely hash your messages using different hash algorithms. Hashing is a one-way process that converts your message into a fixed-size string of characters, providing data integrity and verifying data integrity.\n\nHere\'s how to use the Hash Generator:\n\n1. Enter your message in the "Message to Hash" input area.\n2. Choose the desired hash algorithm from the "Select Hash Algorithm" dropdown.\n3. Click the "Generate Hash" button to calculate the hash of your message.\n4. The generated hash will appear in the "Hash Result" area.\n5. You can copy the hash to use it as needed.\n\nRemember that hash functions are irreversible, meaning you cannot retrieve the original message from the hash. So, it is crucial to keep your original message safe.\n\nUse this tool responsibly, and enjoy secure hashing!\n')
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

        // Helper function to convert array buffer to hexadecimal string
        function bufferToHexString(buffer) {
          const byteArray = new Uint8Array(buffer);
          return Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('');
        }

        function sha3(message, variant) {
          let shaobj;

          switch (variant) {
            case 224:
              shaobj = new jsSHA('SHA3-224', 'TEXT');
              shaobj.update(message);
              return shaobj.getHash('HEX').toUpperCase();
            case 256:
              shaobj = new jsSHA('SHA3-256', 'TEXT');
              shaobj.update(message);
              return shaobj.getHash('HEX').toUpperCase();
            case 384:
              shaobj = new jsSHA('SHA3-384', 'TEXT');
              shaobj.update(message);
              return shaobj.getHash('HEX').toUpperCase();
            case 512:
              shaobj = new jsSHA('SHA3-512', 'TEXT');
              shaobj.update(message);
              return shaobj.getHash('HEX').toUpperCase();
            default:
              throw new Error('Unsupported SHA-3 variant.');
          }
        }

    function generateHash(message, algorithm, callback) {
      try {
        if (algorithm === ('Whirlpool-512')) {
          callback(wp.encSync(message, 'hex'));
        } else if (algorithm.startsWith('sha3-')) {
          const variant = parseInt(algorithm.substring(5), 10);
          const hashResult = sha3(message, variant);
          callback(hashResult);
        } else if (algorithm === 'sha1') {
          const shaObj = new jsSHA('SHA-1', 'TEXT');
          shaObj.update(message);
          callback(shaObj.getHash('HEX').toUpperCase());
        } else if (algorithm === 'sha256') {
          const shaObj = new jsSHA('SHA-256', 'TEXT');
          shaObj.update(message);
          callback(shaObj.getHash('HEX').toUpperCase());
        } else if (algorithm === 'sha384') {
          const shaObj = new jsSHA('SHA-384', 'TEXT');
          shaObj.update(message);
          callback(shaObj.getHash('HEX').toUpperCase());
        } else if (algorithm === 'sha512') {
          const shaObj = new jsSHA('SHA-512', 'TEXT');
          shaObj.update(message);
          callback(shaObj.getHash('HEX').toUpperCase());
        } else if (algorithm === 'SHAKE128') {
          const shaObj = new jsSHA('SHAKE128', 'TEXT');
          shaObj.update(message);
          callback(shaObj.getHash('HEX', {shakeLen: 128}).toUpperCase());
        } else if (algorithm === 'SHAKE256') {
          const shaObj = new jsSHA('SHAKE256', 'TEXT');
          shaObj.update(message);
          callback(shaObj.getHash('HEX', {shakeLen: 256}).toUpperCase());
        } else if (algorithm === 'BLAKE2-256') {
          const shaObj = blake.blake2sHex(message);
          callback(shaObj.toUpperCase());
        } else if (algorithm === 'BLAKE2-512') {
          const shaObj = blake.blake2bHex(message);
          callback(shaObj.toUpperCase());
        } else {
          throw new Error('Unsupported algorithm.');
        }
      } catch (error) {
        console.error('Hashing error:', error);
      }
    }
            const generateHashBtn = document.getElementById('generateHash');
            const hashResultArea = document.getElementById('hashResult');

            generateHashBtn.addEventListener('click', function () {
              const messageInput = document.getElementById('message').value;
              const algorithmSelect = document.getElementById('hashAlgorithm');
              const selectedAlgorithm = algorithmSelect.options[algorithmSelect.selectedIndex].value;

              try {
                generateHash(messageInput, selectedAlgorithm, function (hashResult) {
                  hashResultArea.value = hashResult;
                });
              } catch (error) {
                console.error('Hashing error:', error);
              }
            });

            return this;
          }
  };


  // Initialize the app
  app.build().init();
  window.onload = null;
};
