// settings.js

window.onload = function () {
  const vdb = new MyIndexedDB('VAULT', 'vault_items');

  vdb.openDB(function(err){

    const app = {


      build() {
        const menuitems = menu;

        // Create the 'app' div element
        this.appDiv = x('div', { id: 'app' },

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
          x('h4', 'theme'),
          x('div', { class: 'form-group' },
            x('label', {for: 'theme'}, 'Current Theme'),
            x('input', {id: 'theme', class: 'form-control'}),
            x('label', {for: 'themes'}, 'Select Theme'),
            x('select', {id: 'themes', class: 'form-control'},

            )
          ),
          x('hr'),

          x('h4','Password Protect'),
          x('hr'),

          x('h4', 'Auto-Lock'),
          x('hr'),

          x('h4', 'VAULT'),
          x('label', {for: 'vdb'}, 'DB entries'),

          x('input', {id: 'vdb', class: 'form-control'}),
          x('button', {
            class: 'btn btn-primary mt-2 me-2',
            id: 'purge',
            onclick(){
              let dest = document.getElementById('vdb');
              if(parseInt(dest.value)){
                if(confirm('Purge DB? This action cannot be undone.')){
                  vdb.deleteAllEntries(function(err){
                    if(err){return alert('Unable to purge DB')}
                    document.getElementById('vdb').value = '0';
                    alert('DB purged.')
                  })
                }
              } else {
                alert('Nothing to purge.')
              }


            }

          }, 'Purge DB'),
          x('hr'),

        )

      )


        return this;
      },

      init() {
        document.body.appendChild(this.appDiv);
        this.appDiv = null;
        this.build = null;
        delete this.appDiv;
        delete this.build;
        delete menu




        void function themeSetup(){

          let themeData = JSON.parse(sdb.get('theme'));
          const ctheme = document.getElementById('theme');
          const ntheme = document.getElementById('themes');
          let styl = document.getElementById('themeLnk');
          ctheme.value = themeData.current;

          for (var i = 0; i < themeData.themes.length; i++) {
            if(themeData.themes[i].title === themeData.current){
              ntheme.append(x('option', {value: themeData.themes[i].title}, themeData.themes[i].title))
            }

          }

          for (var i = 0; i < themeData.themes.length; i++) {
            if(themeData.themes[i].title !== themeData.current){
              ntheme.append(x('option', {value: themeData.themes[i].title}, themeData.themes[i].title))
            }

          }

          ntheme.addEventListener('change', function(){
            themeData.current = ntheme.value;

            for (var i = 0; i < themeData.themes.length; i++) {
              if(themeData.themes[i].title === themeData.current){
                styl.href = themeData.themePath + themeData.themes[i].href;
                console.log('theme ' + themes[i].title + ' added.');
                break;
              }

            }
            sdb.add('theme', themeData);
            ctheme.value = themeData.current
          })

        }()


        void function vdbSetup(){
          let dbcount = document.getElementById('vdb');
          vdb.getAllEntries(function(err,res){
            let dblen = res.length
            dbcount.value = dblen
          })

        }()






      }

    }
    // Initialize the app
    app.build().init();
    window.onload = null;

  })


};
