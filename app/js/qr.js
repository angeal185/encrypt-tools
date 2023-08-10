// QR.js

window.onload = function() {


  const app = {
    build(){

      const menuitems = menu
      // Create the 'app' div element
     this.appDiv = x('div', { id: 'app' },
    // Navbar Top
    x('nav', { class: 'navbar fixed-top bg-dark' },
      x('div', { class: 'container-fluid' },
        x('span', {
          id: 'menu-bar',
          class: 'fa fa-bars',
          onclick(){
            let ele = document.getElementById('menu-toggle')
            ele.classList.toggle('show')
          }
        }),
        x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'QR Generator')
      )
    ),

    x('div', {id: 'menu-toggle', class: 'menu-side'},
      function(){
        let mnu = x('ul', {class: 'menu-sub'})

        for (var i = 0; i < menuitems.length; i++) {
          mnu.append(x('li', {class: 'menu-lnk'}, x('a', {href: menuitems[i].href}, menuitems[i].name)))
        }


        return mnu
      }
    ),

    // Main container
    x('div', { class: 'container-fluid mt-4' },
    x('h3', 'QR Code Generator'),
        // QR Code Generator Form
        x('div', {class: 'row'},
          x('div', { class: 'col-12' },
            x('label', { for: 'qr-data' }, 'Data/URL:'),
            x('textarea', { rows: '8', class: 'form-control', id: 'qr-data', placeholder: 'Enter data or url...' })
          ),
          x('div',{class: 'col-12 col-md-6'},
            x('div', { class: 'form-group' },
              x('label', { for: 'qr-size' }, 'Size:'),
              x('input', { type: 'number', class: 'form-control', id: 'qr-size', value: 200 }),
              x('label', { for: 'qr-color-dark' }, 'Color (Dark):'),
              x('input', { type: 'color', class: 'form-control', id: 'qr-color-dark', value: '#000000' }),
              x('label', { for: 'qr-color-light' }, 'Color (Light):'),
              x('input', { type: 'color', class: 'form-control', id: 'qr-color-light', value: '#FFFFFF' })
            )
          ),
          x('div',{class: 'col-12 col-md-6'},
            x('div', { class: 'form-group' },
              x('label', { for: 'qr-margin' }, 'Margin:'),
              x('input', { type: 'number', class: 'form-control', id: 'qr-margin', value: 2 }),
              x('label', { for: 'qr-type-number' }, 'Type Number:'),
              x('input', { type: 'number', class: 'form-control', id: 'qr-type-number', value: 4 }),
              x('label', { for: 'qr-mask-pattern' }, 'Mask Pattern:'),
              x('input', { type: 'number', class: 'form-control', id: 'qr-mask-pattern', value: 1 })
            )
          )
        ),
        x('div', { class: 'mb-4' },
          x('button', {
            type: 'button',
            class: 'btn btn-primary me-2',
            id: 'genBtn'
          }, 'Generate QR Code'),
          x('button', {
            type: 'button',
            class: 'btn btn-primary me-2',
            id: 'delBtn'
          }, 'Clear QR Codes')
        ),

      x('hr'),
      x('h3', 'Generated QR codes'),
        // QR Code Container
        x('div', { id: 'qrcodebox', class: 'row mt-4' }),

      x('hr'),

      // Instructions textarea
      x('div', { class: 'form-group mb-4' },
        x('label', { class: 'l-txt', for: 'Instructions' }, 'Instructions:'),
        x('textarea', { class: 'form-control', id: 'Instructions', rows: '16', readonly: true }, `
## How to Use the QR Code Generator

The QR Code Generator on this website allows you to easily create QR codes for various purposes. Follow the steps below to generate QR codes with different settings and options.

### Step 1: Access the QR Code Generator

1. Open your web browser and navigate to the website where the QR Code Generator is located.

### Step 2: Input Data

1. On the main page of the QR Code Generator, you'll find a textarea labeled "Data/URL." Click inside the textarea.

2. Enter the data or URL for which you want to generate a QR code. This could be a website URL, a plain text message, or any other information you want to encode in the QR code.

### Step 3: Customize QR Code Settings

1. After entering the data, you'll notice several customization options for the QR code.

2. **Size:** Adjust the size of the QR code by entering a numeric value in the "Size" field. The size determines the width and height of the QR code in pixels.

3. **Color (Dark):** Choose the color of the dark elements of the QR code by clicking on the color input box. A color picker will appear, allowing you to select a suitable color.

4. **Color (Light):** Similarly, choose the color of the light elements of the QR code using the color picker.

5. **Margin:** Define the margin around the QR code by entering a numeric value in the "Margin" field. This margin adds empty space around the QR code.

6. **Type Number:** Enter a numeric value in the "Type Number" field. This value determines the QR code's error correction level.

7. **Mask Pattern:** Specify a numeric value for the "Mask Pattern." The mask pattern affects the visual appearance of the QR code.

### Step 4: Generate QR Code

1. Once you've entered the data and customized the settings, you're ready to generate the QR code.

2. Click the "Generate QR Code" button. A QR code will be generated based on the data and settings you provided.

3. The generated QR code will appear in a designated area on the page. Below the QR code, you'll find the configuration details you selected, including size, colors, margin, type number, and mask pattern.

### Step 5: Generate Multiple QR Codes (Optional)

1. You can generate multiple QR codes with different data and settings. Simply repeat steps 2 to 4 for each QR code you want to create.

### Step 6: Clear QR Codes

1. If you want to clear the generated QR codes and start fresh, you can use the "Clear QR Codes" button. Clicking this button will remove all the generated QR codes from the display area.

### Step 7: Save or Use Generated QR Codes

1. Once you've generated the desired QR codes, you can save them directly, by taking screenshots or using your browser's print functionality.

2. To use the QR codes, you can download them from the screen and incorporate them into your documents, presentations, websites, or any other media.
`)
      )
    ),


  );


      return this;
    },
    init(){

      document.body.appendChild(this.appDiv);
      this.appDiv = null;
      this.build = null;
      delete this.appDiv;
      delete this.build;
      delete menu

       function generateQRCode(textData, size, colorDark, colorLight, margin, typeNumber, maskPattern, dest) {
         let ele = x('div', {class: 'qr-img'})
      try {
        let obj = {
          text: textData,
          width: size,
          height: size,
          colorDark: colorDark,
          colorLight: colorLight,
          correctLevel: QRCode.CorrectLevel.M,
          margin: margin,
          typeNumber: typeNumber,
          maskPattern: maskPattern
        }
        // Create a new QRCode instance
        var qr = new QRCode(ele, obj);
        let ta = x('textarea', {class: 'form-control mt-4'});
        ta.textContent = JSON.stringify(obj)
        dest.append(x('div',{class: 'col-12 col-md-6 mb-4'},ele, ta))
        console.log("QR Code generation successful.");
        return
      } catch (error) {
        console.error('QR Code generation error: ', error.message);
        alert('QR Code generation error: ' + error.message);
      }
    }

    function removeAllChildren(divId) {

      while (divId.firstChild) {
        divId.removeChild(divId.firstChild);
      }
    }

    let genBtn = document.getElementById('genBtn'),
    delBtn = document.getElementById('delBtn');

    delBtn.addEventListener('click', function(){
      let dest = document.getElementById('qrcodebox');
      removeAllChildren(dest);
    })

    genBtn.addEventListener('click', function(){
      let dest = document.getElementById('qrcodebox'),
      res;
      const textData = document.getElementById('qr-data').value;
      const size = parseInt(document.getElementById('qr-size').value);
      const colorDark = document.getElementById('qr-color-dark').value;
      const colorLight = document.getElementById('qr-color-light').value;
      const margin = parseInt(document.getElementById('qr-margin').value);
      const typeNumber = parseInt(document.getElementById('qr-type-number').value);
      const maskPattern = parseInt(document.getElementById('qr-mask-pattern').value);
      if(!textData.length){
        return alert('Invalid data input')
      }

      if(textData.length > 4296 ){
        return alert('Data input has a max length of 4296')
      }

      // Call the function to generate the QR code with the specified options
      generateQRCode(textData, size, colorDark, colorLight, margin, typeNumber, maskPattern, dest);

    })




    }
  }

  app.build().init();
  window.onload = null;



};
