// checksum.js

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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'Checksum Generator')
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
          x('h3', 'Checksum Generator'),
          x('div', { class: 'row' },
            x('div', { class: 'col-12' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'message' }, 'Data to Hash:'),
                x('textarea', { class: 'form-control', id: 'message', rows: '6' })
              )
            )
          ),

          // Hash algorithm selection
          x('div', { class: 'form-group' },
            x('label', { class: 'l-txt', for: 'hashAlgorithm' }, 'Select Hash Algorithm:'),
            x('select', { class: 'form-control', id: 'hashAlgorithm' },
              x('option', { value: 'SHA-256' }, 'SHA-256'),
              x('option', { value: 'SHA-384' }, 'SHA-384'),
              x('option', { value: 'SHA-512' }, 'SHA-512')
            )
          ),

          // Generate Hash button
          x('button', { class: 'btn btn-primary mt-2', id: 'generateHash' }, 'Generate Checksum'),

          x('hr'),

          // Output row
          x('div', { class: 'row' },
            x('div', { class: 'col-12' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'hashResult' }, 'Base64 Hash Result:'),
                x('textarea', { class: 'form-control', id: 'hashResult', rows: '6', readonly: true })
              )
            )
          )
        ),
        x('hr'),

        // Instructions textarea
        x('div', { class: 'form-group mb-4' },
          x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
          x('textarea', { class: 'form-control', id: 'instructions', rows: '16', readonly: true },
            'Welcome to the Checksum Generator!\n\n'+
            'This tool allows you to calculate the checksum of data using various hash algorithms.\n\n'+
            'Follow these steps:\n'+
            '1. Enter the data you want to hash in the "Data to Hash" textarea.\n'+
            '2. Select a hash algorithm from the dropdown.\n'+
            '3. Click the "Generate Checksum" button.\n'+
            '4. The calculated checksum will be displayed in the "Hash Result" textarea.\n'+
            '5. For file integrity, copy the Base64-encoded hash.\n\n'+
            'Note: The tool uses the SubtleCrypto API, so it is secure and efficient.\n'+
            'Supported hash algorithms: SHA-256, SHA-384, SHA-512.\n\n'+
            'Feel free to use this tool for secure data verification!\n'
          )
        ),
        x('hr')
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




      const generateHashBtn = document.getElementById('generateHash');
      const hashResultArea = document.getElementById('hashResult');

      generateHashBtn.addEventListener('click', function () {

        const messageInput = document.getElementById('message').value;
        const algorithmSelect = document.getElementById('hashAlgorithm');
        const selectedAlgorithm = algorithmSelect.value;
        let hashResult;

        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(messageInput);
          const hashBuffer = crypto.subtle.digest(selectedAlgorithm, data);

          hashBuffer.then(function (hashArrayBuffer) {
            const hashArray = new Uint8Array(hashArrayBuffer);
            const hashBytes = Array.from(hashArray);
            hashResult = hashBytes.map(byte => byte.toString(16).padStart(2, '0')).join('');

            // Convert the hash bytes to Base64
            const hashBase64 = btoa(hashBytes.reduce((data, byte) => data + String.fromCharCode(byte), ''));

            hashResultArea.value = hashBase64;
          });
        } catch (error) {
          console.error('Error calculating hash:', error);
        }

      });


      }
  };


  // Initialize the app
  app.build().init();
  window.onload = null;
};
