//index.js

window.onload = function () {

  const vdb = new MyIndexedDB('VAULT', 'vault_items');

  vdb.openDB(function(err){
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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'Dashboard')
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
          x('div', {id: 'info', class: 'row'},

            x('div', { class: 'col-md-3 mb-3' },
              x('div', { class: 'card h-100', style: 'cursor: pointer'},
                x('div', { class: 'card-body text-center' },
                  x('h5', { class: 'card-title mt-4' }, 'Version'),
                  x('i', {class: 'fa fa-3x fa-code-fork mt-4 mb-4'}),
                  x('h4', {class: ' mt-4 mb-4'}, sdb.get('appVersion'))
                )
              )
            ),
            x('div', { class: 'col-md-3 mb-3' },
              x('div', { class: 'card h-100', style: 'cursor: pointer'},
                x('div', { class: 'card-body text-center' },
                  x('h5', { class: 'card-title mt-4' }, 'Last Visit'),
                  x('i', {class: 'fa fa-3x fa-clock-o mt-4 mb-4'}),
                  x('h4', {class: ' mt-4 mb-4'}, Time.timestampToDate(sdb.get('lastVisit'), sdb.get('timeFormat')))
                )
              )
            ),
            x('div', { class: 'col-md-3 mb-3' },
              x('div', { class: 'card h-100', style: 'cursor: pointer'},
                x('div', { class: 'card-body text-center' },
                  x('h5', { class: 'card-title mt-4' }, 'Vault Entries'),
                  x('i', {class: 'fa fa-3x fa-database mt-4 mb-4'}),
                  x('h4', {id: 'vl', class: ' mt-4 mb-4'})
                )
              )
            ),
            x('div', { class: 'col-md-3 mb-3' },
              x('div', { class: 'card h-100', style: 'cursor: pointer'},
                x('div', { class: 'card-body text-center' },
                  x('h5', { class: 'card-title mt-4' }, 'Vault Entries'),
                  x('i', {class: 'fa fa-3x fa-database mt-4 mb-4'}),
                  x('h4', {id: 'isOnline', class: ' mt-4 mb-4'})
                )
              )
            )


          ),
          x('hr'),
          // Input row
          x('div', { class: 'intro-section' },
            x('h3','Intro'),
            x('textarea', { class: 'form-control', readonly: true, rows: 14 },
              "----------------------\n< Welcome, Wanderer! >\n----------------------\n\nThis web app provides various cryptographic functionalities to help secure your data and communications. You can explore the following features:\n\n- One-Time Password (OTP) Generation\n- Hashing Algorithms\n- Advanced Encryption Standard (AES)\n- RSA Encryption using Optimal Asymmetric Encryption Padding (RSA-OAEP)\n- Elliptic Curve Digital Signature Algorithm (ECDSA)\n\nAll cryptographic operations are performed locally in your browser. This means that your sensitive data never leaves your device, providing an extra layer of security and privacy.\n"
            )
          ),
          x('hr'),

          // Clickable Cards for each linked page
          function () {
            let ele = x('div', { class: 'row mt-3' })


            for (var i = 0; i < menuitems.length; i++) {


              ele.append(x('div', { class: 'col-md-4 mb-3' },
                x('a', {href: menuitems[i].href},x('div', { class: 'card h-100', style: 'cursor: pointer'},
                  x('div', { class: 'card-body' },
                    x('h5', { class: 'card-title' }, menuitems[i].name)
                  )
                )
              )))

            }

            return ele;
          }
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

      vdb.getLength(function(err,res){

        let dest = document.getElementById('vl')
        if(err){
          return dest.textContent = '0'
        }
          dest.textContent = res;
      })
    }
  };

    app.build().init();
    setTimeout(function(){
      sdb.add('lastVisit', Date.now())
    },1000)

  })
  // Initialize the app

  window.onload = null;

};
