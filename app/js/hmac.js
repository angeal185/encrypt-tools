// hmac.js

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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'Text Encoder')
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

        // HMAC Section
        x('div', { class: 'container-fluid mt-4' },
          // HMAC Section
          x('h3', 'HMAC'),
          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'hmac-message' }, 'Message:'),
                x('textarea', { class: 'form-control', id: 'hmac-message', rows: '6', placeholder: 'Enter the message to be hashed' })
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'hmac-key' }, 'Key:'),
                x('textarea', { class: 'form-control', id: 'hmac-key', rows: '6', placeholder: 'Enter the secret key' })
              )
            )
          ),
          x('div', { class: 'form-group mt-2' },
            x('label', { class: 'l-txt', for: 'hash-algorithm' }, 'Hash Algorithm:'),
            x('select', { class: 'form-control', id: 'hash-algorithm' },
            x('option', { value: 'SHA-256' }, 'SHA-256'),
            x('option', { value: 'SHA-384' }, 'SHA-384'),
            x('option', { value: 'SHA-512' }, 'SHA-512'),
            x('option', { value: 'SHA-224' }, 'SHA3-224'),
            x('option', { value: 'SHA3-256' }, 'SHA3-256'),
            x('option', { value: 'SHA3-384' }, 'SHA3-384'),
            x('option', { value: 'SHA3-512' }, 'SHA3-512'),
            x('option', { value: 'SHAKE128' }, 'SHAKE-128'),
            x('option', { value: 'SHAKE256' }, 'SHAKE-256')
            )
          ),
          x('button', { class: 'btn btn-primary mt-2 mb-4', id: 'calculate-button' }, 'Calculate HMAC'),
          x('div', { class: 'form-group mt-4' },
            x('label', { for: 'hmac-result' }, 'HMAC Result'),
            x('textarea', { class: 'form-control', id: 'hmac-result', rows: '3', readonly: true })
          ),
          x('hr'),
          x('h3', 'KMAC'),
          x('div', { class: 'row' },

            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'KMAC-message' }, 'Message:'),
                x('textarea', { class: 'form-control', id: 'KMAC-message', rows: '6', placeholder: 'Enter the message to be hashed' })
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'KMAC-key' }, 'Key:'),
                x('textarea', { class: 'form-control', id: 'KMAC-key', rows: '6', placeholder: 'Enter the secret key' })
              )
            ),
            x('div', { class: 'col-12' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'KMAC-key' }, 'Customization:'),
                x('textarea', { class: 'form-control', id: 'KMAC-c', rows: '6', placeholder: 'Enter the customization' })
              )
            )
          ),
          x('div', { class: 'form-group mt-2' },
            x('label', { class: 'l-txt', for: 'kal' }, 'Hash Algorithm:'),
            x('select', { class: 'form-control', id: 'kal' },
            x('option', { value: 'KMAC128' }, 'KMAC-128'),
            x('option', { value: 'KMAC256' }, 'KMAC-256')
            )
          ),
          x('div', { class: 'form-group mt-2' },
            x('label', { class: 'l-txt', for: 'kol' }, 'Output Length:'),
            x('select', { class: 'form-control', id: 'kol' },
              x('option', { value: '128' }, '128'),
              x('option', { value: '192' }, '192'),
              x('option', { value: '256' }, '256'),
              x('option', { value: '384' }, '384'),
              x('option', { value: '512' }, '512')
            )
          ),
          x('button', { class: 'btn btn-primary mt-2 mb-4', id: 'KMAC-button' }, 'Calculate KMAC'),
          x('div', { class: 'form-group mt-4' },
            x('label', { for: 'KMAC-result' }, 'KMAC Result'),
            x('textarea', { class: 'form-control', id: 'KMAC-result', rows: '3', readonly: true })
          ),
          x('hr'),
          x('h3', 'CSHAKE'),
          x('div', { class: 'row' },

            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'CSHAKE-message' }, 'Message:'),
                x('textarea', { class: 'form-control', id: 'CSHAKE-message', rows: '6', placeholder: 'Enter the message to be hashed' })
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'CSHAKE-key' }, 'Customization:'),
                x('textarea', { class: 'form-control', id: 'CSHAKE-key', rows: '6', placeholder: 'Enter the customization' })
              )
            )
          ),
          x('div', { class: 'form-group mt-2' },
            x('label', { class: 'l-txt', for: 'cal' }, 'Hash Algorithm:'),
            x('select', { class: 'form-control', id: 'cal' },
            x('option', { value: 'CSHAKE128' }, 'CSHAKE-128'),
            x('option', { value: 'CSHAKE256' }, 'CSHAKE-256')
            )
          ),
          x('div', { class: 'form-group mt-2' },
            x('label', { class: 'l-txt', for: 'col' }, 'Output Length:'),
            x('select', { class: 'form-control', id: 'col' },
              x('option', { value: '128' }, '128'),
              x('option', { value: '192' }, '192'),
              x('option', { value: '256' }, '256'),
              x('option', { value: '384' }, '384'),
              x('option', { value: '512' }, '512')
            )
          ),
          x('button', { class: 'btn btn-primary mt-2 mb-4', id: 'CSHAKE-button' }, 'Calculate CSHAKE'),
          x('div', { class: 'form-group mt-4' },
            x('label', { for: 'CSHAKE-result' }, 'CSHAKE Result'),
            x('textarea', { class: 'form-control', id: 'CSHAKE-result', rows: '3', readonly: true })
          ),
          x('hr'),
          x('h3', 'BLAKE2'),
          x('div', { class: 'row' },

            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'BLAKE2-message' }, 'Message:'),
                x('textarea', { class: 'form-control', id: 'BLAKE2-message', rows: '6', placeholder: 'Enter the message to be hashed' })
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'BLAKE2-key' }, 'Key:'),
                x('textarea', { class: 'form-control', id: 'BLAKE2-key', rows: '6', placeholder: 'Enter the Key' })
              )
            )
          ),
          x('div', { class: 'form-group mt-2' },
            x('label', { class: 'l-txt', for: 'bal' }, 'Hash Algorithm:'),
            x('select', { class: 'form-control', id: 'bal' },
            x('option', { value: 'BLAKE2-256' }, 'BLAKE2-256'),
            x('option', { value: 'BLAKE2-512' }, 'BLAKE2-512')
            )
          ),
          x('button', { class: 'btn btn-primary mt-2 mb-4', id: 'BLAKE2-button' }, 'Calculate BLAKE2'),
          x('div', { class: 'form-group mt-4' },
            x('label', { for: 'BLAKE2-result' }, 'BLAKE2 Result'),
            x('textarea', { class: 'form-control', id: 'BLAKE2-result', rows: '3', readonly: true })
          ),
          x('hr'),

           x('h3', 'Instructions'),
           x('div', { class: 'form-group mt-4' },
              x('textarea', {
                class: 'form-control',
                rows: '22',
                readonly: true
              }, 'HMAC Instructions:\n' +
                  'To calculate HMAC, enter the message and the secret key in the respective text areas.\n' +
                  'Then select the desired hash algorithm from the dropdown menu.\n' +
                  'Click on the "Calculate HMAC" button to get the HMAC result.\n\n' +

                  'KMAC Instructions:\n' +
                  'To calculate KMAC, enter the message, secret key, and customization in the respective text areas.\n' +
                  'Then select the desired hash algorithm and output length from the dropdown menus.\n' +
                  'Click on the "Calculate KMAC" button to get the KMAC result.\n\n' +

                  'CSHAKE Instructions:\n' +
                  'To calculate CSHAKE, enter the message and the customization in the respective text areas.\n' +
                  'Then select the desired hash algorithm and output length from the dropdown menus.\n' +
                  'Click on the "Calculate CSHAKE" button to get the CSHAKE result.\n\n' +

                  'BLAKE2 Instructions:\n' +
                  'To calculate BLAKE2, enter the message and the key in the respective text areas.\n' +
                  'Then select the desired BLAKE2 variant (BLAKE2-256 or BLAKE2-512) from the dropdown menu.\n' +
                  'Note: The maximum key length for BLAKE2-256 is 32 bytes (256 bits).\n' +
                  '      The maximum key length for BLAKE2-512 is 64 bytes (512 bits).\n' +
                  'Click on the "Calculate BLAKE2" button to get the BLAKE2 result.\n'
               )
            )







        ),

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

    // Calculate HMAC using Web Crypto API
      function calculateHMAC() {
        const message = document.getElementById('hmac-message').value;
        const key = document.getElementById('hmac-key').value;
        const hashAlgorithm = document.getElementById('hash-algorithm').value;

        if (!message || !key) {
          alert('Please enter both the message and the key.');
          return;
        }

        const shaObj = new jsSHA(hashAlgorithm, "TEXT", {
          hmacKey: { value: key, format: "TEXT" },
        });

        shaObj.update(message);

        let hmac

        if(hashAlgorithm === 'SHAKE256'){
          hmac = shaObj.getHash("HEX", {shakeLen: 256});
        } else if (hashAlgorithm === 'SHAKE128') {
          hmac = shaObj.getHash("HEX", {shakeLen: 128});
        } else {
          hmac = shaObj.getHash("HEX");
        }




        document.getElementById('hmac-result').value = hmac.toUpperCase();


      }

      function calculateKMAC(){
        const message = document.getElementById('KMAC-message').value;
        const key = document.getElementById('KMAC-key').value;
        const custom = document.getElementById('KMAC-c').value;
        const hashAlgorithm = document.getElementById('kal').value;
        const len = parseInt(document.getElementById('kol').value);

        if (!message || !key || !custom) {
          alert('Please enter the message, key and the customization.');
          return;
        }

        const shaObj = new jsSHA(hashAlgorithm, "TEXT", {
          customization: { value: custom, format: "TEXT" },
          kmacKey: { value: key, format: "TEXT" },
        });

        shaObj.update(message);
        const kmac = shaObj.getHash("HEX", { outputLen: len });

        document.getElementById('KMAC-result').value = kmac.toUpperCase();

      }

      function calculateCSHAKE(){
        const message = document.getElementById('CSHAKE-message').value;
        const key = document.getElementById('CSHAKE-key').value;
        const hashAlgorithm = document.getElementById('cal').value;
        const len = parseInt(document.getElementById('col').value);

        if (!message || !key) {
          alert('Please enter both the message and the customization.');
          return;
        }

        const shaObj = new jsSHA(hashAlgorithm, "TEXT", {
          customization: { value: key, format: "TEXT" },
        });
        shaObj.update(message);

        const cshake = shaObj.getHash("HEX", { outputLen: len });

        document.getElementById('CSHAKE-result').value = cshake.toUpperCase();

      }


      function calculateBLAKE2(){
        const message = document.getElementById('BLAKE2-message').value;
        const key = new TextEncoder().encode(document.getElementById('BLAKE2-key').value);
        const hashAlgorithm = document.getElementById('bal').value;

        if (!message || !key.length) {
          alert('Please enter both the message and the key.');
          return;
        }

        if (key.length > 32 && hashAlgorithm === 'BLAKE2-256') {
          alert('BLAKE2-256 max key length = 32.');
          return;
        }

        if (key.length > 64 && hashAlgorithm === 'BLAKE2-512') {
          alert('BLAKE2-512 max key length = 32.');
          return;
        }

        let hmac

        if(hashAlgorithm === 'BLAKE2-256'){
          hmac = blake.blake2sHex(message, key, 32)

        } else if (hashAlgorithm === 'BLAKE2-512') {
          hmac = blake.blake2bHex(message, key, 64)
        }



        document.getElementById('BLAKE2-result').value = hmac;

      }


      // Add event listener to the "Calculate HMAC" button
      const calculateButton = document.getElementById('calculate-button');
      const kmacButton = document.getElementById('KMAC-button');
      const cshakeButton = document.getElementById('CSHAKE-button');
      const blake2Button = document.getElementById('BLAKE2-button');



      calculateButton.addEventListener('click', calculateHMAC);
      kmacButton.addEventListener('click', calculateKMAC);
      cshakeButton.addEventListener('click', calculateCSHAKE);
      blake2Button.addEventListener('click', calculateBLAKE2);

  }
}

  // Initialize the app
  app.build().init();
  window.onload = null;
};
