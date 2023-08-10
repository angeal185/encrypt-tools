// ecdsa.js

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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'ECDSA Signature Generation/Verification')
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
          x('h3', 'ECDSA Signature Generation and Verification'),
          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'message' }, 'Message:'),
                x('textarea', { class: 'form-control', id: 'message', rows: '6' })
              )
            ),

            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'signature' }, 'ECDSA Signature (hex):'),
                x('textarea', { class: 'form-control', id: 'signature', rows: '6'})
              )
            ),

            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'privateKey' }, 'Private Key (hex):'),
                x('textarea', { class: 'form-control', id: 'privateKey', rows: '6'  })
              )
            ),

            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'publicKey' }, 'Public Key (hex):'),
                x('textarea', { class: 'form-control', id: 'publicKey', rows: '6'  })
              )
            )
          ),





          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('button', { class: 'btn btn-primary mt-2 me-2', id: 'generateKeyPair' }, 'Generate Key Pair'),
              x('button', { class: 'btn btn-primary mt-2 me-2', id: 'sign' }, 'Sign'),
              x('button', { class: 'btn btn-primary mt-2', id: 'verify' }, 'Verify')
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'verificationStatus' }, 'Verification Status:'),
                x('input', { class: 'form-control', id: 'verificationStatus', type: 'text', readonly: true })
              )
            )
          )
        ),

        x('div', { class: 'form-group mb-4' },
          x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
          x('textarea', { class: 'form-control', id: 'instructions', rows: '16', readonly: true },
            'Welcome to the ECDSA Signature Generation and Verification tool!\n\nWith this tool, you can generate and verify digital signatures using the Elliptic Curve Digital Signature Algorithm (ECDSA). ECDSA is a widely used cryptographic algorithm for ensuring the authenticity and integrity of messages.\n\nHere\'s how to use the ECDSA Signature Generation and Verification tool:\n\n1. Click the "Generate Key Pair" button to generate an ECDSA key pair.\n2. Enter your message in the "Message" input area.\n3. Use the "Private Key (hex)" and "Public Key (hex)" input fields to set the key pair for signing and verification.\n4. Click the "Sign" button to generate the ECDSA signature for the message using the private key.\n5. The ECDSA signature will appear in the "ECDSA Signature (hex)" text field.\n6. To verify the signature, paste the signature into the "ECDSA Signature (hex)" input field and click the "Verify" button.\n7. The verification status will be displayed in the "Verification Status" text field as "Signature is valid" or "Signature is invalid".\n\nImportant Notes:\n- Ensure you provide the correct private and public keys for successful signature generation and verification.\n- ECDSA relies on the security of the private key. Keep your private key safe and share it only with trusted parties.\n- Use this tool responsibly and avoid sharing sensitive data or private keys with untrusted parties.\n\nEnjoy generating and verifying ECDSA signatures with this tool!'
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

      // Function to generate an ECDSA key pair
      function generateECDSAKeyPair() {
        const namedCurve = 'P-256'; // You can change the curve as needed

        return window.crypto.subtle.generateKey(
          {
            name: 'ECDSA',
            namedCurve
          },
          true,
          ['sign', 'verify']
        );
      }

      // Function to sign a message using ECDSA
      function signMessage(privateKey, message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);

        return window.crypto.subtle.sign(
          {
            name: 'ECDSA',
            hash: { name: 'SHA-256' } // You can change the hash algorithm as needed
          },
          privateKey,
          data
        );
      }

      // Function to verify an ECDSA signature
      function verifySignature(publicKey, signature, message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);

        return window.crypto.subtle.verify(
          {
            name: 'ECDSA',
            hash: { name: 'SHA-256' } // You can change the hash algorithm as needed
          },
          publicKey,
          signature,
          data
        );
      }

      // Event listener for the "Generate Key Pair" button
      const generateKeyPairBtn = document.getElementById('generateKeyPair');
      generateKeyPairBtn.addEventListener('click', async function () {
        try {
          const keyPair = await generateECDSAKeyPair();

          // Export the public and private keys as hex strings and display them
          const privateKeyHex = arrayBufferToHexString(await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey));
          const publicKeyHex = arrayBufferToHexString(await window.crypto.subtle.exportKey('spki', keyPair.publicKey));

          document.getElementById('privateKey').value = privateKeyHex;
          document.getElementById('publicKey').value = publicKeyHex;
        } catch (error) {
          console.error('Error generating ECDSA key pair:', error);
        }
      });

      // Event listener for the "Sign" button
      const signBtn = document.getElementById('sign');
      signBtn.addEventListener('click', async function () {
        try {
          const privateKeyHex = document.getElementById('privateKey').value;
          const privateKeyData = hexStringToUint8Array(privateKeyHex);
          const privateKey = await window.crypto.subtle.importKey(
            'pkcs8',
            privateKeyData,
            {
              name: 'ECDSA',
              namedCurve: 'P-256'
            },
            true,
            ['sign']
          );

          const message = document.getElementById('message').value;
          const signature = await signMessage(privateKey, message);

          // Display the ECDSA signature as a hex string
          document.getElementById('signature').value = arrayBufferToHexString(signature);
        } catch (error) {
          console.error('Error signing the message:', error);
        }
      });

      // Event listener for the "Verify" button
      const verifyBtn = document.getElementById('verify');
      verifyBtn.addEventListener('click', async function () {
        try {
          const publicKeyHex = document.getElementById('publicKey').value;
          const publicKeyData = hexStringToUint8Array(publicKeyHex);
          const publicKey = await window.crypto.subtle.importKey(
            'spki',
            publicKeyData,
            {
              name: 'ECDSA',
              namedCurve: 'P-256'
            },
            true,
            ['verify']
          );

          const message = document.getElementById('message').value;
          const signatureHex = document.getElementById('signature').value;
          const signatureData = hexStringToUint8Array(signatureHex);

          const isSignatureValid = await verifySignature(publicKey, signatureData, message);

          // Display the verification status
          document.getElementById('verificationStatus').value = isSignatureValid ? 'Signature is valid' : 'Signature is invalid';
        } catch (error) {
          console.error('Error verifying the signature:', error);
        }
      });
    }
  };

  // Initialize the app
  app.build().init();
  window.onload = null;
};
