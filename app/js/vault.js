//vault.js

window.onload = function () {
  // Usage example:
  const vdb = new MyIndexedDB('VAULT', 'vault_items');

  vdb.openDB(function(err,res){

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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'VAULT')
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
          x('h3', 'VAULT'),
          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'message' }, 'Data:'),
                x('textarea', { class: 'form-control', id: 'message', rows: '6' }),
                x('label', { class: 'l-txt mt-2', for: 'dataTitle' }, 'Message Title:'),
                x('input', { class: 'form-control mt-2', id: 'dataTitle', type: 'text', placeholder: 'Enter title...'}),
                x('label', { class: 'l-txt', for: 'selectMessage' }, 'Select Message:'),
                x('select', { class: 'form-control', id: 'selectMessage' })
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
                x('input', { class: 'form-control', type: 'text', id: 'key', placeholder: 'Enter key...'}),
                x('label', { class: 'l-txt' }, 'Key size:'),
                x('input', { class: 'form-control', readonly: 'readonly', value: '256-bit' }),
                x('label', { class: 'l-txt' }, 'Mode of operation:'),
                x('input', { class: 'form-control', type: 'text', readonly: 'readonly', value: 'GCM (Galois/Counter Mode)'}),
                x('label', { class: 'l-txt' }, 'Iterations:'),
                x('input', { class: 'form-control', type: 'text', min: '1', value: '10000', readonly: 'readonly'}),
                x('label', { class: 'l-txt' }, 'KDF:'),
                x('input', { class: 'form-control', type: 'text', min: '1', value: 'PKDF2', readonly: 'readonly'})
              )
            )
          ),

          // Encrypt and Decrypt buttons
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'encrypt' }, 'Save'),
          x('button', { class: 'btn btn-primary mt-2 me-2', id: 'decrypt' }, 'Load'),
          x('button', { class: 'btn btn-primary mt-2', id: 'delete' }, 'Delete'),

          x('hr'),

          // Output row
          x('div', { class: 'row' },
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'ciphertext' }, 'DB Import:'),
                x('textarea', { class: 'form-control', id: 'ciphertext', rows: '6' }),
                x('button', { class: 'btn btn-primary mt-2 me-2', id: 'import' }, 'Import'),
                x('button', { class: 'btn btn-primary mt-2', id: 'clearImport' }, 'Clear Import Data')
              )
            ),
            x('div', { class: 'col-12 col-md-6' },
              x('div', { class: 'form-group' },
                x('label', { class: 'l-txt', for: 'decrypted' }, 'DB Export:'),
                x('textarea', { class: 'form-control', id: 'decrypted', rows: '6', readonly: true }),
                x('button', { class: 'btn btn-primary mt-2 me-2', id: 'export' }, 'Export'),
                x('button', { class: 'btn btn-primary mt-2 me-2', id: 'downloadexport' }, 'download'),
                x('button', { class: 'btn btn-primary mt-2', id: 'clearExport' }, 'Clear Export Data')
              )
            )
          )
        ),

        x('hr'),

        // Instructions textarea
        x('div', { class: 'form-group mb-4' },
          x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
          x('textarea', { class: 'form-control', id: 'instructions', rows: '16', readonly: true },
          'Welcome to VAULT - Secure Data Encryption and Storage!\n\n' +
          'Instructions:\n\n' +
          '1. Enter the data you want to encrypt in the "Data" field. This could be any sensitive information such as passwords, personal notes, or confidential messages.\n\n' +
          '2. Enter a strong AES key in the "AES Key" field. The AES key is crucial for encrypting and decrypting data securely. Make sure to use a long, complex, and unique passphrase. Store this key securely, as it cannot be recovered if lost.\n\n' +
          '3. Enter a title for your message in the "Message Title" field. This will help you identify the encrypted messages in the VAULT.\n\n' +
          '4. Click the "Save" button to encrypt and securely store your data in the VAULT. The data will be encrypted using AES-GCM (Galois/Counter Mode) encryption, which provides strong security against unauthorized access.\n\n' +
          '5. To load and decrypt a message, select the message title from the "Select Message" dropdown. Enter the correct AES key used during encryption into the "AES Key" field and click the "Load" button. The decrypted data will be displayed in the "Data" field.\n\n' +
          '6. You can manage multiple encrypted messages in the VAULT. To view the list of all stored messages, click the "Load" button without selecting a message title. The "Select Message" dropdown will populate with all available message titles.\n\n' +
          '7. You can also import and export data using the "DB Import" and "DB Export" sections. To import data, paste a valid JSON array of encrypted messages into the "DB Import" textarea and click the "Import" button. Ensure the JSON format is correct, and the data has the required fields (id, date, title, and data).\n\n' +
          '8. The "DB Export" button will generate a JSON array containing all the encrypted messages currently stored in the VAULT. This allows you to create backups or transfer the encrypted data to other devices securely.\n\n' +
          '9. For security reasons, ensure you remember your AES key and keep it in a safe place. If you forget the AES key, you will lose access to your encrypted data, as it cannot be recovered.\n\n' +
          '10. When you are done using the VAULT, always remember to click the "Clear Import Data" and "Clear Export Data" buttons to remove any sensitive information from the application interface.\n\n' +
          '11. VAULT does not store your AES key or any personal data on the server or the cloud. All encryption and decryption processes occur locally within your web browser, providing you with full control over your data security.\n\n' +
          '12. If you encounter any issues or have questions, please refer to the documentation or contact the support team for assistance.\n\n' +
          'Keep your data safe and secure with VAULT!'
        ),

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

    // Event listener for the "Encrypt" button
    const encryptBtn = document.getElementById('encrypt');
    const ciphertextArea = document.getElementById('ciphertext');
    // Event listener for the "Decrypt" button
    const decryptBtn = document.getElementById('decrypt');
    const importBtn = document.getElementById('import');
    const exportBtn = document.getElementById('export');
    const clearImport = document.getElementById('clearImport');
    const clearExport = document.getElementById('clearExport');

    const downloadexport = document.getElementById('downloadexport');
    const delBtn = document.getElementById('delete');


    downloadexport.addEventListener('click', function () {
      let ele = document.getElementById('decrypted')
      if(ele.value === ''){
        return alert('Nothing to download.')
      }
      ele = JSON.stringify(JSON.parse(ele.value),0,2)
      const dl = 'vault_db.txt';
      downloadFile(dl, ele);
    })



    clearImport.addEventListener('click', function () {
      let ele = document.getElementById('ciphertext')
      ele.value = '';
    })

    clearExport.addEventListener('click', function () {
      let ele = document.getElementById('decrypted');
      ele.value = '';
    })


    function updateSelect(){
      vdb.getAllEntries(function(err,res){
        if(err){
          alert('failed to update message select.')
          return console.error(err);
        }
        const dest = document.getElementById('selectMessage');
        removeAllChildren(dest);
        setTimeout(function(){
          for (var i = 0; i < res.length; i++) {
            dest.append(x('option', {value: res[i].id }, res[i].title))
          }
        },1000)

      })
    }


    function removeAllChildren(divId) {

      while (divId.firstChild) {
        divId.removeChild(divId.firstChild);
      }
    }

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
    function deriveAESKey(password, salt, callback) {
      const encoder = new TextEncoder();
      const encodedPassword = encoder.encode(password);

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
            iterations: 10000,
            hash: 'SHA-256'
          },
          baseKey,
          256
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

    function performAESEncryption(message, password, callback) {
      const salt = generateSecureSalt(16);
      deriveAESKey(password, salt, function (error, derivedKey) {
        if (error) {
          callback(error);
          return;
        }

        const iv = generateRandomIV();

        const algorithm = { name: 'AES-GCM', iv };
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
    function performAESDecryption(encryptedMessage, password, callback) {
      const parts = encryptedMessage.split(':');
      if (parts.length !== 3) {
        callback(new Error('Invalid encrypted message format'));
        return;
      }



      const salt = parts[0];
      const iv = hexStringToUint8Array(parts[1]);
      const ciphertext = hexStringToUint8Array(parts[2]);
      deriveAESKey(password, salt, function (error, derivedKey) {
        if (error) {
          callback(error);
          return;
        }

        const algorithm = { name: 'AES-GCM', iv };

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


    delBtn.addEventListener('click', function () {
      const dest = document.getElementById('selectMessage');

      if(dest.value === ''){
        alert('Nothing to delete');
      } else {
        if(confirm('Delete message: '+ dest.textContent +'? This action cannot be undone.')){
        vdb.deleteData(parseInt(dest.value),function(err){
          if(err){return console.error(err)}
          removeAllChildren(dest);

          vdb.getAllEntries(function(err,res){
            if(err){return console.error(err)}
            alert('DB item deleted')
            if(res.length){
              setTimeout(function(){
                let opt;
                for (var i = 0; i < res.length; i++) {
                  opt = x('option', {value: res[i].id }, res[i].title);
                  dest.append(opt)
                }
              },1000)
            }


          })

        })
        }
      }


    })


  encryptBtn.addEventListener('click', function () {
    const messageInput = document.getElementById('message').value;
    const keyInput = document.getElementById('key').value;
    const ttl = document.getElementById('dataTitle').value;


    if(!keyInput){
      return alert('no key provided')
    }
    if(!messageInput){
      return alert('no message provided')
    }
    if(!ttl){
      return alert('no title provided')
    }

    performAESEncryption(messageInput, keyInput, function (error, encryptedMessage) {
      if (error) {
        console.error('Encryption error:', error);
        return;
      }

      encryptedMessage = {
        title: ttl,
        data: encryptedMessage,
        date: Date.now()
      }

      vdb.getAllEntries(function(err,res){
        if(err){return console.error(err)}


        for (var i = 0; i < res.length; i++) {

          if(res[i].title === ttl){
            res[i].data = encryptedMessage.data
            res[i].date = encryptedMessage.date
            vdb.replaceDataById(res[i].id, res[i], function(err){
              if(err){return console.error(err)}
              alert('message update success!');
            })
            return;
          }

        }

        vdb.addData (encryptedMessage, function(err,res){
          if(err){
            return console.error(err);

          }
          const dest = document.getElementById('selectMessage');

          removeAllChildren(dest);
          vdb.getAllEntries(function(err,res){
            if(err){return console.error(err)}
            setTimeout(function(){
              let opt;
              for (var i = 0; i < res.length; i++) {
                opt = x('option', {value: res[i].id }, res[i].title);
                if(res[i].title === encryptedMessage.title){
                  opt.setAttribute('selected', 'selected')
                }
                dest.append(opt)
              }
            },1000)
            alert('message save success!');
          })

        })

      })


    });
  });



  decryptBtn.addEventListener('click', function () {
    const keyInput = document.getElementById('key').value;
    const msg = document.getElementById('message');

    let ele = document.getElementById('selectMessage').value;
    const ttl = document.getElementById('dataTitle');

    if(!keyInput){
      alert('No key given to decrypt data.');
      return;
    }


    if(ele){
      ele = parseInt(ele);
    } else {
      alert('No messages to decrypt.');
      return;
    }

    vdb.getData(ele, function(err,res){
      if(err){
        console.error(err);
        return alert('error loading message');
      }

      performAESDecryption(res.data, keyInput, function (error, decryptedMessage) {
        if (error) {
          console.error('Decryption error:', error);
          return;
        }

        msg.value = decryptedMessage;
        ttl.value = res.title;
        alert('message '+ ttl.value +' loaded.');

      });

    })

  });

  exportBtn.addEventListener('click', function () {

    vdb.getAllEntries(function(err,res){
      if(err){return console.error(err)}
      const dest = document.getElementById('decrypted');

      if(!res.length){
        return alert('Nothing to export.')
      }
      dest.value = JSON.stringify(res);
      alert('export success');





    })

  })

  importBtn.addEventListener('click', function () {
    let src = document.getElementById('ciphertext'),
    val = src.value
    try {
      val = JSON.parse(val);
      if(!val.length){
        throw Error();
      }
      for (var i = 0; i < val.length; i++) {
        if(!val[i].id || !val[i].date || !val[i].title || !val[i].data || !val[i].data.length || !val[i].title.length){
          console.error('import data validation failed')
          throw Error();
        }

      }

    } catch (e) {
      return alert('Invalid import data')
    }

    vdb.replaceAllData(val, function (error, count) {
      if (error) {
        console.error('Error replacing data:', error);
        alert('Import DB failed.');
        return;
      }
      updateSelect();
      console.log('Successfully replaced ' + count + ' entries.');
      alert('Successfully imported ' + count + ' entries.');


    });


  })

  function downloadFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


  setTimeout(function(){
    updateSelect();
  },1000)

  }
}
  // Initialize the app
  app.build().init();
  window.onload = null;

  })
};
