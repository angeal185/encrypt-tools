// encoding.js

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

        // Main container
        x('div', { class: 'container-fluid mt-4' },
          // Text to Hex section
         x('h3', 'Text to Hex'),
         x('div', { class: 'row mt-3' },
           x('div', { class: 'col-12 col-md-6' },
             x('div', { class: 'form-group' },
               x('label', { class: 'l-txt', for: 'textToHexInput' }, 'Text to Encode:'),
               x('textarea', { class: 'form-control', id: 'textToHexInput', rows: '4' })
             ),
             x('button', { class: 'btn btn-primary mt-2', id: 'encodeToHexBtn' }, 'Encode to Hex'),
           ),
           x('div', { class: 'col-12 col-md-6' },
             x('div', { class: 'form-group' },
               x('label', { class: 'l-txt', for: 'textToHexOutput' }, 'Encoded Hex:'),
               x('textarea', { class: 'form-control', id: 'textToHexOutput', rows: '4', readonly: true })
             ),
             x('button', { class: 'btn btn-primary mt-2', id: 'clearTextToHexBtn' }, 'Clear')
           )
         ),

         x('hr'),

         // Hex to Text section
         x('h3', 'Hex to Text'),
         x('div', { class: 'row mt-3' },
           x('div', { class: 'col-12 col-md-6' },
             x('div', { class: 'form-group' },
               x('label', { class: 'l-txt', for: 'hexToTextInput' }, 'Hex to Decode:'),
               x('textarea', { class: 'form-control', id: 'hexToTextInput', rows: '4' })
             ),
             x('button', { class: 'btn btn-primary mt-2', id: 'decodeFromHexBtn' }, 'Decode from Hex'),
           ),
           x('div', { class: 'col-12 col-md-6' },
             x('div', { class: 'form-group' },
               x('label', { class: 'l-txt', for: 'hexToTextOutput' }, 'Decoded Text:'),
               x('textarea', { class: 'form-control', id: 'hexToTextOutput', rows: '4', readonly: true })
             ),
             x('button', { class: 'btn btn-primary mt-2', id: 'clearHexToTextBtn' }, 'Clear')
           )
         ),
         x('hr'),

          // Text to Base64 section
          x('h3', 'Text to Base64'),
          x('div', { class: 'row mt-3' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'textToBase64Input' }, 'Text to Encode:'),
                x('textarea', { class: 'form-control', id: 'textToBase64Input', rows: '4' })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'encodeToBase64Btn' }, 'Encode to Base64'),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'textToBase64Output' }, 'Encoded Base64:'),
                x('textarea', { class: 'form-control', id: 'textToBase64Output', rows: '4', readonly: true })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'clearTextToBase64Btn' }, 'Clear')
            )
          ),
         x('hr'),
         // Base64 to Text section
          x('h3', 'Base64 to Text'),
          x('div', { class: 'row mt-3' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'base64ToTextInput' }, 'Base64 to Decode:'),
                x('textarea', { class: 'form-control', id: 'base64ToTextInput', rows: '4' })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'decodeFromBase64Btn' }, 'Decode from Base64'),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'base64ToTextOutput' }, 'Decoded Text:'),
                x('textarea', { class: 'form-control', id: 'base64ToTextOutput', rows: '4', readonly: true })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'clearBase64ToTextBtn' }, 'Clear')
            )
          ),
          x('hr'),
          x('hr'),

          // Text to Binary section
          x('h3', 'Text to Binary'),
          x('div', { class: 'row mt-3' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'textToBinaryInput' }, 'Text to Encode:'),
                x('textarea', { class: 'form-control', id: 'textToBinaryInput', rows: '4' })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'encodeToBinaryBtn' }, 'Encode to Binary'),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'textToBinaryOutput' }, 'Encoded Binary:'),
                x('textarea', { class: 'form-control', id: 'textToBinaryOutput', rows: '4', readonly: true })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'clearTextToBinaryBtn' }, 'Clear')
            )
          ),

          x('hr'),

          // Binary to Text section
          x('h3', 'Binary to Text'),
          x('div', { class: 'row mt-3' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'binaryToTextInput' }, 'Binary to Decode:'),
                x('textarea', { class: 'form-control', id: 'binaryToTextInput', rows: '4' })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'decodeFromBinaryBtn' }, 'Decode from Binary'),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'binaryToTextOutput' }, 'Decoded Text:'),
                x('textarea', { class: 'form-control', id: 'binaryToTextOutput', rows: '4', readonly: true })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'clearBinaryToTextBtn' }, 'Clear')
            )
          ),
          x('hr'),
          // URL Encoding section
          x('h3', 'URL Encoding'),
          x('div', { class: 'row mt-3' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'textToURLEncodeInput' }, 'Text to Encode:'),
                x('textarea', { class: 'form-control', id: 'textToURLEncodeInput', rows: '4' })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'encodeToURLBtn' }, 'Encode to URL'),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'textToURLEncodeOutput' }, 'Encoded URL:'),
                x('textarea', { class: 'form-control', id: 'textToURLEncodeOutput', rows: '4', readonly: true })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'clearTextToURLEncodeBtn' }, 'Clear')
            )
          ),

          x('hr'),
          // URL Decoding section
          x('h3', 'URL Decoding'),
          x('div', { class: 'row mt-3' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'urlToDecodeInput' }, 'URL to Decode:'),
                x('textarea', { class: 'form-control', id: 'urlToDecodeInput', rows: '4' })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'decodeFromURLBtn' }, 'Decode from URL'),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'urlToDecodeOutput' }, 'Decoded Text:'),
                x('textarea', { class: 'form-control', id: 'urlToDecodeOutput', rows: '4', readonly: true })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'clearURLToDecodeBtn' }, 'Clear')
            )
          ),

          x('hr'),

          // URL Component Encoding section
           x('h3', 'URL Component Encoding'),
           x('div', { class: 'row mt-3' },
             x('div', { class: 'col-12 col-md-6' },
               x('div', { class: 'form-group' },
                 x('label', { class: 'l-txt', for: 'urlComponentEncodeInput' }, 'Text to Encode:'),
                 x('textarea', { class: 'form-control', id: 'urlComponentEncodeInput', rows: '4' })
               ),
               x('button', { class: 'btn btn-primary mt-2', id: 'encodeToURLComponentBtn' }, 'Encode to URL Component'),
             ),
             x('div', { class: 'col-12 col-md-6' },
               x('div', { class: 'form-group' },
                 x('label', { class: 'l-txt', for: 'urlComponentEncodeOutput' }, 'Encoded URL Component:'),
                 x('textarea', { class: 'form-control', id: 'urlComponentEncodeOutput', rows: '4', readonly: true })
               ),
               x('button', { class: 'btn btn-primary mt-2', id: 'clearURLComponentEncodeBtn' }, 'Clear')
             )
           ),

           x('hr'),

           // URL Component Decoding section
           x('h3', 'URL Component Decoding'),
           x('div', { class: 'row mt-3' },
             x('div', { class: 'col-12 col-md-6' },
               x('div', { class: 'form-group' },
                 x('label', { class: 'l-txt', for: 'urlComponentDecodeInput' }, 'URL Component to Decode:'),
                 x('textarea', { class: 'form-control', id: 'urlComponentDecodeInput', rows: '4' })
               ),
               x('button', { class: 'btn btn-primary mt-2', id: 'decodeFromURLComponentBtn' }, 'Decode from URL Component'),
             ),
             x('div', { class: 'col-12 col-md-6' },
               x('div', { class: 'form-group' },
                 x('label', { class: 'l-txt', for: 'urlComponentDecodeOutput' }, 'Decoded Text:'),
                 x('textarea', { class: 'form-control', id: 'urlComponentDecodeOutput', rows: '4', readonly: true })
               ),
               x('button', { class: 'btn btn-primary mt-2', id: 'clearURLComponentDecodeBtn' }, 'Clear')
             )
           ),

           x('hr'),
          // HTML Encoding section
          x('h3', 'HTML Encoding'),
          x('div', { class: 'row mt-3' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'htmlToEncodeInput' }, 'HTML to Encode:'),
                x('textarea', { class: 'form-control', id: 'htmlToEncodeInput', rows: '4' })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'encodeToHtmlBtn' }, 'Encode to HTML'),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'htmlToEncodeOutput' }, 'Encoded HTML:'),
                x('textarea', { class: 'form-control', id: 'htmlToEncodeOutput', rows: '4', readonly: true })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'clearHtmlToEncodeBtn' }, 'Clear')
            )
          ),

          x('hr'),

          // HTML Decoding section
          x('h3', 'HTML Decoding'),
          x('div', { class: 'row mt-3' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'htmlToDecodeInput' }, 'HTML to Decode:'),
                x('textarea', { class: 'form-control', id: 'htmlToDecodeInput', rows: '4' })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'decodeFromHtmlBtn' }, 'Decode from HTML'),
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'htmlToDecodeOutput' }, 'Decoded Text:'),
                x('textarea', { class: 'form-control', id: 'htmlToDecodeOutput', rows: '4', readonly: true })
              ),
              x('button', { class: 'btn btn-primary mt-2', id: 'clearHtmlToDecodeBtn' }, 'Clear')
            )
          ),

          x('hr'),
          // Instructions section
          x('h3', 'Instructions'),
            x('div', { class: 'row mt-3' },
              x('div', { class: 'col-12' },
                // Use textarea to display instructions
                x('textarea', { class: 'form-control', rows: '12', readonly: true },
                  'Welcome to the Text Encoder! This tool allows you to perform various text encoding and decoding operations. Use the navigation menu on the left to access different encoding options.\n\n' +
                  'Follow the steps below to use the tool:\n' +
                  '1. Select the type of encoding/decoding you want to perform from the left menu.\n' +
                  '2. Enter the text or data you want to encode/decode in the input field.\n' +
                  '3. Click the corresponding "Encode" or "Decode" button to perform the operation.\n' +
                  '4. The result will be displayed in the output field.\n' +
                  '5. You can use the "Clear" button to reset the input and output fields and perform another operation.'
                )
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

    // Function to encode text to hexadecimal
     function textToHex(text) {
       return text.split('').map(char => char.charCodeAt(0).toString(16)).join('');
     }

     // Function to decode hexadecimal to text
     function hexToText(hex) {
       return hex.replace(/[0-9a-f]{2}/g, byte => String.fromCharCode(parseInt(byte, 16)));
     }

     // Event listener for "Encode to Hex" button
     const encodeToHexBtn = document.getElementById('encodeToHexBtn');
     const textToHexInput = document.getElementById('textToHexInput');
     const textToHexOutput = document.getElementById('textToHexOutput');

     encodeToHexBtn.addEventListener('click', function () {
       const text = textToHexInput.value;
       const hex = textToHex(text);
       textToHexOutput.value = hex;
     });

     // Event listener for "Clear" button (Text to Hex section)
     const clearTextToHexBtn = document.getElementById('clearTextToHexBtn');
     clearTextToHexBtn.addEventListener('click', function () {
       textToHexInput.value = '';
       textToHexOutput.value = '';
     });

     // Event listener for "Decode from Hex" button
     const decodeFromHexBtn = document.getElementById('decodeFromHexBtn');
     const hexToTextInput = document.getElementById('hexToTextInput');
     const hexToTextOutput = document.getElementById('hexToTextOutput');

     decodeFromHexBtn.addEventListener('click', function () {
       const hex = hexToTextInput.value;
       const text = hexToText(hex);
       hexToTextOutput.value = text;
     });

     // Event listener for "Clear" button (Hex to Text section)
     const clearHexToTextBtn = document.getElementById('clearHexToTextBtn');
     clearHexToTextBtn.addEventListener('click', function () {
       hexToTextInput.value = '';
       hexToTextOutput.value = '';
     });

     // Function to encode text to Base64
     function textToBase64(text) {
       const utf8Encoder = new TextEncoder();
       const data = utf8Encoder.encode(text);
       return window.btoa(String.fromCharCode(...data));
     }

     // Function to decode Base64 to text
     function base64ToText(base64) {
       const data = window.atob(base64);
       const utf8Decoder = new TextDecoder();
       return utf8Decoder.decode(new Uint8Array([...data].map(char => char.charCodeAt(0))));
     }

     // Event listener for "Encode to Base64" button
     const encodeToBase64Btn = document.getElementById('encodeToBase64Btn');
     const textToBase64Input = document.getElementById('textToBase64Input');
     const textToBase64Output = document.getElementById('textToBase64Output');

     encodeToBase64Btn.addEventListener('click', function () {
       const text = textToBase64Input.value;
       const base64 = textToBase64(text);
       textToBase64Output.value = base64;
     });

     // Event listener for "Clear" button (Text to Base64 section)
     const clearTextToBase64Btn = document.getElementById('clearTextToBase64Btn');
     clearTextToBase64Btn.addEventListener('click', function () {
       textToBase64Input.value = '';
       textToBase64Output.value = '';
     });

     // Event listener for "Decode from Base64" button
     const decodeFromBase64Btn = document.getElementById('decodeFromBase64Btn');
     const base64ToTextInput = document.getElementById('base64ToTextInput');
     const base64ToTextOutput = document.getElementById('base64ToTextOutput');

     decodeFromBase64Btn.addEventListener('click', function () {
       const base64 = base64ToTextInput.value;
       const text = base64ToText(base64);
       base64ToTextOutput.value = text;
     });

     // Event listener for "Clear" button (Base64 to Text section)
     const clearBase64ToTextBtn = document.getElementById('clearBase64ToTextBtn');
     clearBase64ToTextBtn.addEventListener('click', function () {
       base64ToTextInput.value = '';
       base64ToTextOutput.value = '';
     });

     // Function to encode text to binary
      function textToBinary(text) {
        return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      }

      // Function to decode binary to text
      function binaryToText(binary) {
        return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      }

      // Event listener for "Encode to Binary" button
      const encodeToBinaryBtn = document.getElementById('encodeToBinaryBtn');
      const textToBinaryInput = document.getElementById('textToBinaryInput');
      const textToBinaryOutput = document.getElementById('textToBinaryOutput');

      encodeToBinaryBtn.addEventListener('click', function () {
        const text = textToBinaryInput.value;
        const binary = textToBinary(text);
        textToBinaryOutput.value = binary;
      });

      // Event listener for "Clear" button (Text to Binary section)
      const clearTextToBinaryBtn = document.getElementById('clearTextToBinaryBtn');
      clearTextToBinaryBtn.addEventListener('click', function () {
        textToBinaryInput.value = '';
        textToBinaryOutput.value = '';
      });

      // Event listener for "Decode from Binary" button
      const decodeFromBinaryBtn = document.getElementById('decodeFromBinaryBtn');
      const binaryToTextInput = document.getElementById('binaryToTextInput');
      const binaryToTextOutput = document.getElementById('binaryToTextOutput');

      decodeFromBinaryBtn.addEventListener('click', function () {
        const binary = binaryToTextInput.value;
        const text = binaryToText(binary);
        binaryToTextOutput.value = text;
      });

      // Event listener for "Clear" button (Binary to Text section)
      const clearBinaryToTextBtn = document.getElementById('clearBinaryToTextBtn');
      clearBinaryToTextBtn.addEventListener('click', function () {
        binaryToTextInput.value = '';
        binaryToTextOutput.value = '';
      });

      // Function to encode text to URL format
      function textToURLEncode(text) {
        return encodeURIComponent(text);
      }

      // Function to decode URL format to text
      function urlDecodeToText(urlText) {
        return decodeURIComponent(urlText);
      }

      // Event listener for "Encode to URL" button
      const encodeToURLBtn = document.getElementById('encodeToURLBtn');
      const textToURLEncodeInput = document.getElementById('textToURLEncodeInput');
      const textToURLEncodeOutput = document.getElementById('textToURLEncodeOutput');

      encodeToURLBtn.addEventListener('click', function () {
        const text = textToURLEncodeInput.value;
        const urlEncoded = textToURLEncode(text);
        textToURLEncodeOutput.value = urlEncoded;
      });

      // Event listener for "Clear" button (URL Encoding section)
      const clearTextToURLEncodeBtn = document.getElementById('clearTextToURLEncodeBtn');
      clearTextToURLEncodeBtn.addEventListener('click', function () {
        textToURLEncodeInput.value = '';
        textToURLEncodeOutput.value = '';
      });

      // Event listener for "Decode from URL" button
      const decodeFromURLBtn = document.getElementById('decodeFromURLBtn');
      const urlToDecodeInput = document.getElementById('urlToDecodeInput');
      const urlToDecodeOutput = document.getElementById('urlToDecodeOutput');

      decodeFromURLBtn.addEventListener('click', function () {
        const urlText = urlToDecodeInput.value;
        const decodedText = urlDecodeToText(urlText);
        urlToDecodeOutput.value = decodedText;
      });

      // Event listener for "Clear" button (URL Decoding section)
      const clearURLToDecodeBtn = document.getElementById('clearURLToDecodeBtn');
      clearURLToDecodeBtn.addEventListener('click', function () {
        urlToDecodeInput.value = '';
        urlToDecodeOutput.value = '';
      });

      // Event listener for "Encode to HTML" button
      const encodeToHtmlBtn = document.getElementById('encodeToHtmlBtn');
      const htmlToEncodeInput = document.getElementById('htmlToEncodeInput');
      const htmlToEncodeOutput = document.getElementById('htmlToEncodeOutput');

      encodeToHtmlBtn.addEventListener('click', function () {
        const htmlText = htmlToEncodeInput.value;
        const encodedHTML = htmlEncodeText(htmlText);
        htmlToEncodeOutput.value = encodedHTML;
      });

      // Event listener for "Clear" button (HTML Encoding section)
      const clearHtmlToEncodeBtn = document.getElementById('clearHtmlToEncodeBtn');
      clearHtmlToEncodeBtn.addEventListener('click', function () {
        htmlToEncodeInput.value = '';
        htmlToEncodeOutput.value = '';
      });

      // Event listener for "Decode from HTML" button
      const decodeFromHtmlBtn = document.getElementById('decodeFromHtmlBtn');
      const htmlToDecodeInput = document.getElementById('htmlToDecodeInput');
      const htmlToDecodeOutput = document.getElementById('htmlToDecodeOutput');

      decodeFromHtmlBtn.addEventListener('click', function () {
        const encodedHTML = htmlToDecodeInput.value;
        const decodedText = htmlDecodeText(encodedHTML);
        htmlToDecodeOutput.value = decodedText;
      });

      // Event listener for "Clear" button (HTML Decoding section)
      const clearHtmlToDecodeBtn = document.getElementById('clearHtmlToDecodeBtn');
      clearHtmlToDecodeBtn.addEventListener('click', function () {
        htmlToDecodeInput.value = '';
        htmlToDecodeOutput.value = '';
      });

      // Functions for HTML encoding and decoding
      function htmlEncodeText(text) {
        const textarea = document.createElement('textarea');
        textarea.textContent = text;
        return textarea.innerHTML;
      }

      function htmlDecodeText(encodedText) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = encodedText;
        return textarea.textContent;
      }

      // URL Component Encoding function
      function encodeURLComponent(text) {
        return encodeURIComponent(text);
      }

      // URL Component Decoding function
      function decodeURLComponent(encodedText) {
        return decodeURIComponent(encodedText);
      }

      // Event listener for "Encode to URL Component" button
      const encodeToURLComponentBtn = document.getElementById('encodeToURLComponentBtn');
      const urlComponentEncodeInput = document.getElementById('urlComponentEncodeInput');
      const urlComponentEncodeOutput = document.getElementById('urlComponentEncodeOutput');

      encodeToURLComponentBtn.addEventListener('click', function () {
        const text = urlComponentEncodeInput.value;
        const encodedText = encodeURLComponent(text);
        urlComponentEncodeOutput.value = encodedText;
      });

      // Event listener for "Clear" button (URL Component Encoding section)
      const clearURLComponentEncodeBtn = document.getElementById('clearURLComponentEncodeBtn');
      clearURLComponentEncodeBtn.addEventListener('click', function () {
        urlComponentEncodeInput.value = '';
        urlComponentEncodeOutput.value = '';
      });

      // Event listener for "Decode from URL Component" button
      const decodeFromURLComponentBtn = document.getElementById('decodeFromURLComponentBtn');
      const urlComponentDecodeInput = document.getElementById('urlComponentDecodeInput');
      const urlComponentDecodeOutput = document.getElementById('urlComponentDecodeOutput');

      decodeFromURLComponentBtn.addEventListener('click', function () {
        const encodedText = urlComponentDecodeInput.value;
        const text = decodeURLComponent(encodedText);
        urlComponentDecodeOutput.value = text;
      });

      // Event listener for "Clear" button (URL Component Decoding section)
      const clearURLComponentDecodeBtn = document.getElementById('clearURLComponentDecodeBtn');
      clearURLComponentDecodeBtn.addEventListener('click', function () {
        urlComponentDecodeInput.value = '';
        urlComponentDecodeOutput.value = '';
      });




  }
}

  // Initialize the app
  app.build().init();
  window.onload = null;
};
