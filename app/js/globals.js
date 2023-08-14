

/*
function redirectToHTTPS() {
  // Check if the current protocol is not HTTPS
  if (window.location.protocol !== 'https:') {
    // Redirect to the same URL with HTTPS protocol
    window.location.href = 'https://' + window.location.host + window.location.pathname + window.location.search;
  }
}

// Call the function to check and redirect if needed
redirectToHTTPS();
*/

// Call the decode function after the DOM is loaded

//console.log(customEncode('test'))


void function initGlobals(){


  window.addEventListener('online', function() {
    console.print([
      { msg: '[NETWORK]: ', color: 'magenta' },
      { msg: 'Status change ', color: 'brightCyan' },
      { msg: 'online', color: 'brightGreen' }
    ])
  });

  window.addEventListener('offline', function() {
    console.print([
      { msg: '[NETWORK]: ', color: 'magenta' },
      { msg: 'Status change ', color: 'brightCyan' },
      { msg: 'offline', color: 'red' }
    ])

  });

  void function consolePrint() {


    const colors = {
      red: 'color: red;',
      green: 'color: green;',
      blue: 'color: blue;',
      yellow: 'color: yellow;',
      magenta: 'color: magenta;',
      cyan: 'color: cyan;',
      black: 'color: black;',
      gray: 'color: gray;',
      orange: 'color: orange;',
      purple: 'color: purple;',
      pink: 'color: pink;',
      brightRed: 'color: #FF0000;',
      brightGreen: 'color: #00FF00;',
      brightBlue: 'color: #0000FF;',
      brightYellow: 'color: #FFFF00;',
      brightMagenta: 'color: #FF00FF;',
      brightCyan: 'color: #00FFFF;',
    };



    console.print = function (messages) {
      let concatenatedMessage = '';
      let styles = [];

      messages.forEach(function ({ msg, color }) {
        const style = colors[color] || '';
        concatenatedMessage += `%c${msg} `;
        styles.push(style);
      });

      this.log.apply(this, [concatenatedMessage, ...styles]);

    };

  }();


  console.print([
    { msg: '--------------------------------------------------\n', color: 'brightCyan' },
    { msg: '                 Encrypt-Tools\n', color: 'brightYellow' },
    { msg: '--------------------------------------------------\n\n', color: 'brightCyan' },
    { msg: 'Initializing PIP-OS...\n', color: 'brightGreen' },
    { msg: 'Connection to Vault-Tec Mainframe established.\n', color: 'brightGreen' },
    { msg: 'System Status: Optimal\n\n', color: 'brightGreen' },
    { msg: 'Vault-Tec welcomes you to the Dashboard!\n', color: 'brightCyan' },
    { msg: 'Here you can access various cryptographic functions\n', color: 'brightCyan' },
    { msg: 'and secure your data with advanced algorithms.\n\n', color: 'brightCyan' },
    { msg: 'Remember, your safety is our top priority.\n', color: 'brightYellow' },
    { msg: 'Enjoy your secure journey through the wasteland!\n\n', color: 'brightYellow' },
    { msg: '--------------------------------------------------\n\n', color: 'brightCyan' }
  ]);



  void function monitorCommunication() {

    window.addEventListener('message', function(event) {
      console.print([
        { msg: '[DANGER]: ', color: 'brightRed' },
        { msg: 'Unauthorized external message attempt detected', color: 'brightCyan' }
      ])
    });

    console.print([
      { msg: '[listener]: ', color: 'brightGreen' },
      { msg: 'Message listener listening for unauthorized access.', color: 'brightCyan' }
    ])


    if (typeof chrome !== 'undefined' && chrome.runtime) {

      if(chrome.runtime.hasListener)
      chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.print([
          { msg: '[DANGER]: ', color: 'brightRed' },
          { msg: 'Unauthorized external Chrome message attempt detected', color: 'brightCyan' }
        ])
      });

      console.print([
        { msg: '[listener]: ', color: 'brightGreen' },
        { msg: 'Chrome Message listener listening for unauthorized access.', color: 'brightCyan' }
      ])

    } else if (typeof browser !== 'undefined' && browser.runtime) {
      browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.print([
          { msg: '[DANGER]: ', color: 'brightRed' },
          { msg: 'Unauthorized external Firefox message attempt detected', color: 'brightCyan' }
        ])
      });

      console.print([
        { msg: '[listener]: ', color: 'brightGreen' },
        { msg: 'Firefox Message listener listening for unauthorized access.', color: 'brightCyan' }
      ])

    } else if (typeof msBrowser !== 'undefined' && msBrowser.runtime) {
      msBrowser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.print([
          { msg: '[DANGER]: ', color: 'brightRed' },
          { msg: 'Unauthorized external message attempt detected from Microsoft Edge extension', color: 'brightCyan' }
        ])

      });

      console.print([
        { msg: '[listener]: ', color: 'brightGreen' },
        { msg: 'Microsoft Edge Message listener listening for unauthorized access.', color: 'brightCyan' }
      ])

    } else if (typeof safari !== 'undefined' && safari.extension) {
      safari.self.addEventListener("message", function(event) {
        console.print([
          { msg: '[DANGER]: ', color: 'brightRed' },
          { msg: 'Unauthorized external message attempt detected from Safari extension', color: 'brightCyan' }
        ])
      }, false);
      console.print([
        { msg: '[listener]: ', color: 'brightGreen' },
        { msg: 'Safari Message listener listening for unauthorized access.', color: 'brightCyan' }
      ])

    }
  }();

  void function globals(){

    function handleCopyEvent(event) {
      console.print([
        { msg: '[WARNING]: ', color: 'brightRed' },
        { msg: 'Text copy detected', color: 'brightCyan' }
      ])

    }

    document.addEventListener('copy', handleCopyEvent);

    function handleCopyEvent(event) {
      console.print([
        { msg: '[WARNING]: ', color: 'brightRed' },
        { msg: 'Text paste detected', color: 'brightCyan' }
      ]);
    }

    document.addEventListener('paste', handleCopyEvent);

    let href = location.href.split('/').pop();

    const menu = [
      {
        href: './index',
        name: 'Dashboard'
      },
      {
        href: './otp',
        name: 'OTP'
      },
      {
        href: './hash',
        name: 'HASH'
      },
      {
        href: './aes',
        name: 'AES'
      },
      {
        href: './shift-ciphers',
        name: 'Shift Ciphers'
      },
      {
        href: './rsa-oaep',
        name: 'RSA-OAEP'
      },
      {
        href: './ecdsa',
        name: 'ECDSA'
      },
      {
        href: './rnd',
        name: 'Random Generation'
      },
      {
        href: './encode',
        name: 'Encode'
      },
      {
        href: './hmac',
        name: 'HMAC'
      },
      {
        href: './vault',
        name: 'VAULT'
      },
      {
        href: './qr',
        name: 'QR Generator'
      },
      {
        href: './csp',
        name: 'CSP Generator'
      },
      {
        href: './settings',
        name: 'Settings'
      }

    ]

    // Helper function to convert a string to hexadecimal
    function stringToHex(input) {
      if(typeof input === 'object' || typeof input === 'number'){
        input = JSON.stringify(input);
      }
      return Array.from(input)
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
    }

    // Helper function to convert a hexadecimal back to the original string
    function hexToString(hex) {
      const bytes = [];
      for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
      }
      return String.fromCharCode(...bytes);
    }

    function TimeProto() {
      this.sessionStart = Date.now();
    }

    TimeProto.prototype = {
      stamp: function() {
        return Date.now();
      },
      timestampToDate: function(timestamp, format) {
        if(typeof timestamp === 'string'){
           timestamp = parseInt(timestamp)
        }
        format = format || 'yyyy-mm-dd';
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');

        var formattedDate = format
          .replace('yyyy', year)
          .replace('mm', month)
          .replace('dd', day);

        return formattedDate;
      },
    };

    window.Time = new TimeProto()



    function LocalStorageDB(databaseName) {
      this.databaseName = databaseName;
      this.database = {
        appVersion: stringToHex('V1.0.0'),
        lastVisit: stringToHex(Date.now()),
        theme: stringToHex({
          default: 'Dark-Amber',
          current: 'Dark-Blue',
          themePath: './app/css/',
          themes: [
            { title: 'Dark-Amber', href: 'dark-amber.css' },
            { title: 'Dark-Blue', href: 'dark-blue.css' },
            { title: 'Dark-Green', href: 'dark-green.css' },
          ]
        }),
        timeFormat: stringToHex('dd/mm/yyyy')
      }
      this.init();
    }

    LocalStorageDB.prototype = {
      init: function () {
        if (!localStorage.getItem(this.databaseName)) {
          console.print([
            { msg: '[sdb]: ', color: 'brightGreen' },
            { msg: 'creating setting db...', color: 'brightCyan' }
          ])
          const $this = this
          localStorage.setItem($this.databaseName, JSON.stringify($this.database));
        }
      },

      add: function (key, value) {
        const database = JSON.parse(localStorage.getItem(this.databaseName));
        // Convert the value to hexadecimal before saving
        const hexValue = stringToHex(value);
        database[key] = hexValue;
        localStorage.setItem(this.databaseName, JSON.stringify(database));
      },

      get: function (key) {
        const database = JSON.parse(localStorage.getItem(this.databaseName));
        const hexValue = database[key];
        // Convert the hexadecimal value back to the original string
        return hexToString(hexValue);
      },

      del: function (key) {
        const database = JSON.parse(localStorage.getItem(this.databaseName));
        if (database.hasOwnProperty(key)) {
          delete database[key];
          localStorage.setItem(this.databaseName, JSON.stringify(database));
          return true;
        }
        return false;
      },
    };




    window.sdb = new LocalStorageDB('settings');

    // myIndexedDB.js
    if(href === '' || href === 'index' || href === 'vault' || href === 'settings'){

      function MyIndexedDB(databaseName, storeName) {
        this.databaseName = databaseName;
        this.storeName = storeName;
        this.db = null;
      }

      MyIndexedDB.prototype = {
        openDB: function (callback) {
          const request = window.indexedDB.open(this.databaseName);

          request.onerror = function (event) {
            callback(event.target.error);
          };

          request.onsuccess = function (event) {
            this.db = event.target.result;
            callback(null);
          }.bind(this);

          request.onupgradeneeded = function (event) {
            this.db = event.target.result;
            if (!this.db.objectStoreNames.contains(this.storeName)) {
              this.db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
            }
          }.bind(this);
        },

        closeDB: function () {
          if (this.db) {
            this.db.close();
            this.db = null;
          }
        },

        addData: function (data, callback) {
          if (!this.db) {
            callback(new Error('Database not open.'));
            return;
          }

          const transaction = this.db.transaction([this.storeName], 'readwrite');
          const objectStore = transaction.objectStore(this.storeName);

          const request = objectStore.add(data);

          request.onsuccess = function (event) {
            callback(null, event.target.result);
          };

          request.onerror = function (event) {
            callback(event.target.error);
          };
        },

        getData: function (id, callback) {
          if (!this.db) {
            callback(new Error('Database not open.'));
            return;
          }

          const transaction = this.db.transaction([this.storeName], 'readonly');
          const objectStore = transaction.objectStore(this.storeName);

          const request = objectStore.get(id);

          request.onsuccess = function (event) {
            callback(null, event.target.result);
          };

          request.onerror = function (event) {
            callback(event.target.error);
          };
        },

        updateData: function (data, callback) {
          if (!this.db) {
            callback(new Error('Database not open.'));
            return;
          }

          const transaction = this.db.transaction([this.storeName], 'readwrite');
          const objectStore = transaction.objectStore(this.storeName);

          const request = objectStore.put(data);

          request.onsuccess = function (event) {
            callback(null, event.target.result);
          };

          request.onerror = function (event) {
            callback(event.target.error);
          };
        },

        deleteData: function (id, callback) {
          if (!this.db) {
            callback(new Error('Database not open.'));
            return;
          }

          const transaction = this.db.transaction([this.storeName], 'readwrite');
          const objectStore = transaction.objectStore(this.storeName);

          const request = objectStore.delete(id);

          request.onsuccess = function () {
            callback(null);
          };

          request.onerror = function (event) {
            callback(event.target.error);
          };
        },

        getAllEntries: function (callback) {
          if (!this.db) {
            callback(new Error('Database not open.'));
            return;
          }

          const transaction = this.db.transaction([this.storeName], 'readonly');
          const objectStore = transaction.objectStore(this.storeName);

          const request = objectStore.getAll();

          request.onsuccess = function (event) {
            const entries = event.target.result;
            callback(null, entries);
          };

          request.onerror = function (event) {
            callback(event.target.error);
          };
        },
        getLength: function (callback) {
          if (!this.db) {
            callback(new Error('Database not open.'));
            return;
          }

          const transaction = this.db.transaction([this.storeName], 'readonly');
          const objectStore = transaction.objectStore(this.storeName);

          const request = objectStore.getAll();

          request.onsuccess = function (event) {
            const entries = event.target.result;
            callback(null, Object.keys(entries).length);
          };

          request.onerror = function (event) {
            callback(event.target.error);
          };
        },

        replaceDataById(id, newData, callback) {
          if (!this.db) {
            callback(new Error('Database not open.'));
            return;
          }

          const transaction = this.db.transaction([this.storeName], 'readwrite');
          const objectStore = transaction.objectStore(this.storeName);

          const getRequest = objectStore.get(id);

          getRequest.onsuccess = function (event) {
            const existingData = event.target.result;

            if (!existingData) {
              callback(new Error('Entry with ID ' + id + ' not found.'));
              return;
            }

            const putRequest = objectStore.put({ ...newData, id: existingData.id });

            putRequest.onsuccess = function (event) {
              callback(null, event.target.result);
            };

            putRequest.onerror = function (event) {
              callback(event.target.error);
            };
          };

          getRequest.onerror = function (event) {
            callback(event.target.error);
          };
        },
        deleteAllEntries(callback) {
          if (!this.db) {
            callback(new Error('Database not open.'));
            return;
          }

          const transaction = this.db.transaction([this.storeName], 'readwrite');
          const objectStore = transaction.objectStore(this.storeName);

          const clearRequest = objectStore.clear();

          clearRequest.onsuccess = function () {
            callback(null);
          };

          clearRequest.onerror = function (event) {
            callback(event.target.error);
          };
        },
        replaceAllData(newDataArray, callback) {
        if (!this.db) {
          callback(new Error('Database not open.'));
          return;
        }

        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const objectStore = transaction.objectStore(this.storeName);

        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = function () {
          let successCount = 0;

          function addNextData() {
            if (successCount === newDataArray.length) {
              callback(null, successCount);
              return;
            }

            const data = newDataArray[successCount];
            const addRequest = objectStore.add(data);

            addRequest.onsuccess = function () {
              successCount++;
              addNextData();
            };

            addRequest.onerror = function (event) {
              callback(event.target.error);
            };
          }

          addNextData();
        };

        clearRequest.onerror = function (event) {
          callback(event.target.error);
        };
      }



      };

      window.MyIndexedDB = MyIndexedDB;
    }



    window.menu = menu;

    void function protoExtend(){
      // Custom function to subscribe to an event
      EventTarget.prototype.on = function (eventName, callback) {
        this.addEventListener(eventName, callback);
      };

      // Custom function to unsubscribe from an event
      EventTarget.prototype.off = function (eventName, callback) {
        this.removeEventListener(eventName, callback);
      };

      /* Usage
      const myElement = document.getElementById('myElement');

      function eventHandler(event) {
        console.log(`Event '${event.type}' triggered`);
      }

      myElement.on('click', eventHandler);

      // After some time or condition
      myElement.off('click', eventHandler);
      */

      EventTarget.prototype.clearEventListeners = function () {
        const allEventListeners = this.cloneEventListeners();
        for (const [eventName, listeners] of allEventListeners) {
          for (const listener of listeners) {
            this.removeEventListener(eventName, listener);
          }
        }
      };

      EventTarget.prototype.cloneEventListeners = function () {
        const eventListeners = new Map();
        const eventListenerObjects = this.getEventListeners();

        for (const [eventName, listeners] of eventListenerObjects) {
          eventListeners.set(eventName, listeners.slice());
        }

        return eventListeners;
      };

      EventTarget.prototype.getEventListeners = function () {
        const allEvents = [...this.getAttributeNames()].filter(name => name.startsWith('on'));
        const eventListeners = new Map();

        for (const eventName of allEvents) {
          const listeners = this.getEventListenersForEvent(eventName);
          eventListeners.set(eventName, listeners);
        }

        return eventListeners;
      };

      EventTarget.prototype.getEventListenersForEvent = function (eventName) {
        const eventListeners = [];
        const eventHandlerAttribute = this.getAttribute(eventName);

        if (eventHandlerAttribute) {
          const listeners = eventHandlerAttribute.split(';');
          for (const listener of listeners) {
            eventListeners.push(new Function(listener));
          }
        }

        return eventListeners;
      };

      /* Usage
      const myElement = document.getElementById('myElement');

      function eventHandler1() {
        console.log('Event handler 1');
      }

      function eventHandler2() {
        console.log('Event handler 2');
      }

      myElement.addEventListener('click', eventHandler1);
      myElement.addEventListener('click', eventHandler2);

      // Clear all event listeners
      myElement.clearEventListeners();
      */



    }()

    void function updateTheme(){
      let ctheme = sdb.get('theme');
      if(ctheme.current !== ctheme.default){
        let styl = document.getElementById('themeLnk'),
        themes = ctheme.themes;

        for (var i = 0; i < themes.length; i++) {
          if(themes[i].title === ctheme.current){
            styl.href = ctheme.themePath + themes[i].href;
            console.print([
              { msg: '[Theme]: ', color: 'brightGreen' },
              { msg: themes[i].title + ' added.', color: 'brightCyan' }
            ])
            break;
          }

        }
        styl = null;
        themes = null;

      }
      ctheme = null;

    }();

  }()

}()
