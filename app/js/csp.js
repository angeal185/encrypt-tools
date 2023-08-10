// csp.js

window.onload = function () {
  const app = {
    csp: {},
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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'CSP Generator')
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
        x('div', { class: 'container-fluid mt-4', id: 'main-div'},
        x('h3', 'CSP Generator'),
          function(){
            // Input rows for directives
            const directivesInputs = [
  { directive: 'default-src', placeholder: "'self' 'unsafe-inline' 'unsafe-eval' data: https://example.com", id: 'defaultSrc' },
  { directive: 'script-src', placeholder: "'self' 'unsafe-inline' 'unsafe-eval' https://example.com", id: 'scriptSrc' },
  { directive: 'style-src', placeholder: "'self' 'unsafe-inline' https://example.com", id: 'styleSrc' },
  { directive: 'img-src', placeholder: "'self' data: https://example.com", id: 'imgSrc' },
  { directive: 'connect-src', placeholder: "'self' https://example.com api.example.com", id: 'connectSrc' },
  { directive: 'font-src', placeholder: "'self' https://example.com", id: 'fontSrc' },
  { directive: 'object-src', placeholder: "'none'", id: 'objectSrc' },
  { directive: 'media-src', placeholder: "'self' https://example.com", id: 'mediaSrc' },
  { directive: 'frame-src', placeholder: "'none'", id: 'frameSrc' },
  { directive: 'sandbox', placeholder: "allow-forms allow-same-origin allow-scripts allow-popups", id: 'sandbox' },
  { directive: 'report-uri', placeholder: 'https://example-report-uri.com', id: 'reportUri' },
  { directive: 'upgrade-insecure-requests', placeholder: 'upgrade-insecure-requests', id: 'upgradeInsecureRequests' },
  { directive: 'block-all-mixed-content', placeholder: 'block-all-mixed-content', id: 'blockAllMixedContent' },
  { directive: 'base-uri', placeholder: "'self' https://cdn.example.com", id: 'baseUri' },
  { directive: 'form-action', placeholder: "'self' https://example.com", id: 'formAction' },
  { directive: 'frame-ancestors', placeholder: "'self' https://example.com", id: 'frameAncestors' },
  { directive: 'plugin-types', placeholder: 'application/pdf image/png', id: 'pluginTypes' },
  { directive: 'reflected-xss', placeholder: 'block', id: 'reflectedXss' },
  { directive: 'report-to', placeholder: 'https://example-report-to.com', id: 'reportTo' },
  { directive: 'navigate-to', placeholder: "https://example.com", id: 'navigateTo' },
];

            const inputsContainer = x('div', { class: 'row' });

            for (const { directive, placeholder, id } of directivesInputs) {
              const inputRow = x('div', {class: 'col-12 col-md-6'},
                x('div', { class: 'form-group mb-2' },
                  x('label', { class: 'l-txt', for: id }, `${directive}:`),
                  x('input', {
                    class: 'form-control',
                    id,
                    placeholder,
                    oninput(){
                      this.value = this.value.replace(/"/g, "'")
                      app.csp[id] = this.value;
                      if(this.value === ''){
                        delete app.csp[id]
                      }
                      let ele = document.getElementById('cspta')

                      ele.value = JSON.stringify(app.csp, 0, 2);
                      ele.click()
                    }
                  })
                )
              )

              inputsContainer.appendChild(inputRow);
            }

            // Generate CSP and Clear buttons
            const buttonsContainer = x('div', {class: 'col-12 col-md-6'},
              x('div', { class: 'form-group mb-4' },

                x('button', {
                  class: 'btn btn-primary mt-2',
                  id: 'clearInputs',
                  onclick(){
                    for (const input of directivesInputs) {
                      let inputElement = document.getElementById(input.id);
                      inputElement.value = '';
                      app.csp = {};
                    }
                    document.getElementById('cspta').value = '';
                    document.getElementById('cspfin').value = '';
                  }

                }, 'Clear CSP')
              )
            )
            inputsContainer.appendChild(buttonsContainer);
            return inputsContainer
          }(),
          x('hr'),
          x('div', {class: 'row'},
            x('div', {class: 'col-12 col-md-6'},
              x('div', { class: 'form-group mb-4' },
                x('label', { class: 'l-txt', for: 'cspta' }, 'CSP Object'),
                x('textarea', { class: 'form-control', id: 'cspta', rows: '8' })
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', { class: 'form-group mb-4' },
                x('label', { class: 'l-txt', for: 'cspfin' }, 'CSP Header'),
                x('textarea', { class: 'form-control', id: 'cspfin', rows: '8' })
              )
            ),
            x('div', {class: 'col-12 col-md-6'},
              x('div', { class: 'form-group mb-4' },
                x('label', { class: 'l-txt', for: 'cspfin' }, 'CSP HTML Header'),
                x('textarea', { class: 'form-control', id: 'csphtml', rows: '8' })
              )
            )
          )
        ),
        x('hr'),
        x('div', { class: 'form-group mb-4' },
          x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
          x('textarea', { class: 'form-control', id: 'instructions', rows: '16', readonly: true },
`
Welcome to the CSP Generator!

This tool allows you to easily create Content Security Policy (CSP) headers for your web applications. Follow these steps to generate your CSP header:

1. Enter your desired values for each directive in the input fields on the left.
2. As you input values, the CSP Object field will update to show your current settings.
3. Click the "Generate CSP" button to create the CSP header based on your settings.
4. The CSP Header and CSP HTML Header fields will display the generated CSP header.
5. You can copy the CSP header and add it to your web server's configuration or HTML meta tag.

Note: Make sure to test your CSP header thoroughly in a development environment to ensure it doesn't break your application's functionality.

Available Directives:
- default-src
- script-src
- style-src
- img-src
- connect-src
- font-src
- object-src
- media-src
- frame-src
- sandbox
- report-uri
- upgrade-insecure-requests
- block-all-mixed-content
- base-uri
- form-action
- frame-ancestors
- plugin-types
- reflected-xss
- report-to
- navigate-to

Available Values:
- 'self': Allow resources from the same origin.
- 'unsafe-inline': Allow inline scripts/styles.
- 'unsafe-eval': Allow eval functions.
- 'none': Disallow resources.
- 'data:': Allow data URLs.
- URL: Allow resources from a specific URL.

Example: To allow scripts from your domain and Google Analytics, set script-src to "'self' www.google-analytics.com".
`
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




        function createCSPHeader(i) {
          const directives = [];
          // Add directives with their values
          if (i.defaultSrc){
            directives.push(`default-src ${i.defaultSrc}`);
          }
          if (i.scriptSrc){
            directives.push(`script-src ${i.scriptSrc}`);
          }
          if (i.styleSrc){
            directives.push(`style-src ${i.styleSrc}`);
          }
          if (i.imgSrc){
            directives.push(`img-src ${i.imgSrc}`);
          }
          if (i.connectSrc){
            directives.push(`connect-src ${i.connectSrc}`);
          }
          if (i.fontSrc){
            directives.push(`font-src ${i.fontSrc}`);
          }
          if (i.objectSrc){
            directives.push(`object-src ${i.objectSrc}`);
          }
          if (i.mediaSrc){
            directives.push(`media-src ${i.mediaSrc}`);
          }
          if (i.frameSrc){
            directives.push(`frame-src ${i.frameSrc}`);
          }
          if (i.sandbox) {
            directives.push(`sandbox ${i.sandbox}`);
          }
          if (i.reportUri){
            directives.push(`report-uri ${i.reportUri}`);
          }
          if (i.upgradeInsecureRequests){
            directives.push(`upgrade-insecure-requests`);
          }
          if (i.blockAllMixedContent){
            directives.push(`block-all-mixed-content`);
          }
          if (i.baseUri){
            directives.push(`base-uri ${i.baseUri}`);
          }
          if (i.formAction){
            directives.push(`form-action ${i.formAction}`);
          }
          if (i.frameAncestors){
            directives.push(`frame-ancestors ${i.frameAncestors}`);
          }
          if (i.pluginTypes){
            directives.push(`plugin-types ${i.pluginTypes}`);
          }
          if (i.reflectedXss) {
            directives.push(`reflected-xss ${i.reflectedXss}`);
          }
          if (i.reportTo){
            directives.push(`report-to ${i.reportTo}`);
          }
          if (i.navigateTo){
            directives.push(`navigate-to ${i.navigateTo}`);
          }

          return directives.join('; ');
        }




        let cspfin = document.getElementById('cspfin');
        let cspta = document.getElementById('cspta');
        let csphtml = document.getElementById('csphtml');
        let isValid = document.getElementById('isValid')
        cspta.addEventListener('click', function(e){

            let fin = createCSPHeader(app.csp)
            cspfin.value = 'Content-Security-Policy: '+ fin;
            csphtml.value = '<meta http-equiv="Content-Security-Policy" content="'+ fin + ';" />'


        })


    }
  };

  // Initialize the app
  app.build().init();
  window.onload = null;
};
