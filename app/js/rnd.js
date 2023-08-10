// rnd.js

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
            x('span', { class: 'navbar-brand text-light mb-0 h1' }, 'Secure Random Generation')
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

        x('h3', 'Secure Random Numbers Generator'),
        x('div', { class: 'row mt-3' },
          x('div', { class: 'col-12 col-md-6' },
            x('div', { class: 'form-group' },
              x('label', { class: 'l-txt', for: 'randomOutputLength' }, 'Output Length:'),
              x('input', { class: 'form-control', type: 'number', id: 'randomOutputLength', value: '6', min: '1'})
            ),
            x('div', { class: 'form-group mt-2' },
              x('label', { class: 'l-txt', for: 'generatedRandomNumber' }, 'Generated Random Number:'),
              x('input', { class: 'form-control', type: 'text', id: 'generatedRandomNumber', readonly: true })
            ),
            x('button', { class: 'btn btn-primary mt-2', id: 'generateRandomNumber' }, 'Generate Random Number'),
            x('button', {
              class: 'btn btn-primary mt-2 ms-2',
              onclick(){
                document.getElementById('generatedRandomNumber').value = ''
              }
            }, 'Clear')
          )
        ),
        x('hr'),
        x('h3', 'Secure Password Generator (ASCII)'),
        x('div', { class: 'row mt-3' },
          x('div', { class: 'col-12 col-md-6' },
            x('div', { class: 'form-group' },
              x('label', { class: 'l-txt', for: 'passwordLength' }, 'Password Length:'),
              x('input', { class: 'form-control', type: 'number', id: 'passwordLength', min: '12', value: '12' })
            ),
            x('div', { class: 'form-group' },
              x('label', { class: 'l-txt', for: 'passwordCount' }, 'Password Count:'),
              x('input', {
                class: 'form-control',
                type: 'number',
                id: 'passwordCount',
                min: '1', max: '1000',
                value: '1',
                oninput(){
                  let n = parseInt(this.value);
                  if (n > 1000){
                    this.value = '1000'
                    return;
                  }
                  if (!n){
                    this.value = '1'
                  }

                }
              })
            ),
            x('div', { class: 'form-group' },
              x('label', { class: 'l-txt' }, 'Include Uppercase Letters:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'uppercaseCheck', checked: true })
            ),
            x('div', { class: 'form-group' },
              x('label', { class: 'l-txt' }, 'Include Lowercase Letters:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'lowercaseCheck', checked: true })
            ),
            x('div', { class: 'form-group' },
              x('label', { class: 'l-txt' }, 'Include Numbers:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'numbersCheck', checked: true })
            ),
            x('div', { class: 'form-group' },
              x('label', { class: 'l-txt' }, 'Include Special Characters:'),
              x('input', { class: 'form-check-input', type: 'checkbox', id: 'specialCharsCheck', checked: true })
            ),

            x('div', { class: 'form-group mt-2' },
              x('label', { class: 'l-txt', for: 'generatedPassword' }, 'Generated Password:'),
              x('textarea', { class: 'form-control', type: 'text', id: 'generatedPassword', readonly: true, rows: '8' })
            ),
            x('button', { class: 'btn btn-primary mt-2', id: 'generatePassword' }, 'Generate Password'),
            x('button', {
              class: 'btn btn-primary mt-2 ms-2',
              onclick(){
                document.getElementById('generatedPassword').value = ''
              }
            }, 'Clear')
          )
        )
        ),
      x('hr'),

      // Password strength evaluation section
      x('div', { id: 'passwordStrengthSection', class: 'form-group mt-4' },
        x('h3', 'Password Strength'),
        x('label', { class: 'l-txt', for: 'testpassword' }, 'Password To Check:'),
        x('input', { class: 'form-control', type: 'text', id: 'testpassword'}),
        x('textarea', { class: 'form-control mt-2', id: 'respassword', readonly: 'readonly', rows: '9'}),
        x('button', {
          class: 'btn btn-primary mt-2',
          onclick(){
            document.getElementById('testpassword').value = ''
            document.getElementById('respassword').value = ''
          }
        }, 'Clear')
      ),
     x('hr'),
     // Password common evaluation section
     x('div', { class: 'form-group mt-4' },
       x('h3', 'Common Password Check (100,000 most common NCSC)'),
       x('label', { class: 'l-txt', for: 'pwdcheck' }, 'Password To Check:'),
       x('input', { class: 'form-control', type: 'text', id: 'pwdcheck'}),
       x('label', { class: 'l-txt', for: 'pwdres' }, 'Result:'),
       x('input', { class: 'form-control', type: 'text', id: 'pwdres', readonly: 'readonly'}),
       x('button', {
         class: 'btn btn-primary mt-2',
         onclick(){
           document.getElementById('pwdcheck').value = ''
           document.getElementById('pwdres').value = ''
         }
       }, 'Clear')
     ),
    x('hr'),
      // Instructions section
      x('div', { class: 'form-group mb-4' },
        x('label', { class: 'l-txt', for: 'instructions' }, 'Instructions:'),
        x('textarea', { class: 'form-control', id: 'instructions', rows: '32', readonly: true },
        'Welcome to the Secure Random Generation tool!\n\n' +
         'With this tool, you can generate secure random passwords and random numbers using the Web Crypto API, which provides high-quality and cryptographically secure random values.\n\n' +
         'Here\'s how to use the Secure Password Generator:\n\n' +
         '- Enter the desired password length and select the character types you want to include in the generated password.\n' +
         '- Click the "Generate Password" button to get a strong and random password.\n\n' +
         'Here\'s how to use the Secure Random Numbers Generator:\n\n' +
         '- Enter the desired output length for the random numbers.\n' +
         '- Click the "Generate Random Numbers" button to get a sequence of cryptographically secure random numbers.\n\n' +
         'Password Strength Evaluation:\n\n' +
         '- To evaluate the strength of a password, enter the password in the "Password To Check" field under "Password Strength" section.\n' +
         '- The tool will calculate the strength of the password based on its length, character types (uppercase, lowercase, numbers, special characters), and password entropy (bits).\n' +
         '- The password strength will be displayed in the "Password Strength" section.\n\n' +
         'Common Password Check:\n\n' +
         '- To check if a password is in the list of commonly used passwords, enter the password in the "Password To Check" field under "Common Password Check" section.\n' +
         '- The tool will compare the entered password with a list of 100,000 most common passwords and provide the result.\n' +
         '- If the password is found in the list, it means it is a commonly used password and may not be secure.\n' +
         '- If the password is not found in the list, it means it is not commonly used and may be more secure.\n\n' +
         'Please make sure to store your generated passwords and random values securely and avoid sharing them over insecure channels.\n' +
         'Use this tool responsibly and enjoy secure random generation!\n'
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

    // Secure Password Generator function
    function generateSecurePassword() {
      const length = parseInt(document.getElementById('passwordLength').value);
      const includeUppercase = document.getElementById('uppercaseCheck').checked;
      const includeLowercase = document.getElementById('lowercaseCheck').checked;
      const includeNumbers = document.getElementById('numbersCheck').checked;
      const includeSpecialChars = document.getElementById('specialCharsCheck').checked;
      const passwordCount = parseInt(document.getElementById('passwordCount').value)
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars = '0123456789';
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

      let charset = '';
      if (includeUppercase) charset += uppercaseChars;
      if (includeLowercase) charset += lowercaseChars;
      if (includeNumbers) charset += numberChars;
      if (includeSpecialChars) charset += specialChars;

      if (charset === '') {
        alert('Please select at least one character type.');
        return;
      }

      let str = ''
      for (var e = 0; e < passwordCount; e++) {
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);

        let password = '';
        for (let i = 0; i < randomValues.length; i++) {
          const randomIndex = randomValues[i] % charset.length;
          password += charset.charAt(randomIndex);
        }
        str += password + '\n'
      }

      document.getElementById('generatedPassword').value = str;
    }

    // Event listener for the "Generate Random Number" button
      const generateRandomNumberBtn = document.getElementById('generateRandomNumber');
      const generatedRandomNumberInput = document.getElementById('generatedRandomNumber');

      generateRandomNumberBtn.addEventListener('click', function () {
        const outputLength = parseInt(document.getElementById('randomOutputLength').value);

        if (isNaN(outputLength) || outputLength <= 0) {
          alert('Please enter a valid output length.');
          return;
        }

        let randomNumber = '';

        for (let i = 0; i < outputLength; i++) {
          const randomValue = new Uint8Array(1);
          window.crypto.getRandomValues(randomValue);
          randomNumber += randomValue[0] % 10; // Keep the value between 0-9
        }

        generatedRandomNumberInput.value = randomNumber;
      });

    // Add event listener to the "Generate Password" button
    const generatePasswordBtn = document.getElementById('generatePassword');
    const respassword = document.getElementById('respassword');
    generatePasswordBtn.addEventListener('click', generateSecurePassword);


    function getPasswordStrength(password) {
      // Check password length
      const lengthScore = Math.min(10, password.length) * 4;

      // Check if password contains uppercase letters
      const uppercaseRegex = /[A-Z]/;
      const uppercaseScore = uppercaseRegex.test(password) ? 10 : 0;

      // Check if password contains lowercase letters
      const lowercaseRegex = /[a-z]/;
      const lowercaseScore = lowercaseRegex.test(password) ? 10 : 0;

      // Check if password contains numbers
      const numberRegex = /\d/;
      const numberScore = numberRegex.test(password) ? 10 : 0;

      // Check if password contains special characters
      const specialCharRegex = /[!@#$%^&*()_+-=[\]{}|;:,.<>?]/;
      const specialCharScore = specialCharRegex.test(password) ? 15 : 0;

      // Calculate password entropy (bits)
      const charset = (uppercaseRegex.test(password) ? 26 : 0) +
        (lowercaseRegex.test(password) ? 26 : 0) +
        (numberRegex.test(password) ? 10 : 0) +
        (specialCharRegex.test(password) ? 15 : 0);
      const entropy = password.length * Math.log2(charset);

      // Check overall password strength
      const strengthScore = lengthScore + uppercaseScore + lowercaseScore + numberScore + specialCharScore;

      // Return an object with password strength details
      let res = {
        lengthScore,
        uppercaseScore,
        lowercaseScore,
        numberScore,
        specialCharScore,
        entropy,
        strengthScore,
      }
      respassword.textContent = JSON.stringify(res,0,2)
    }

    const testpassword = document.getElementById('testpassword');
    testpassword.addEventListener('input', function(){
      getPasswordStrength(testpassword.value)
    });

    function debounce(func, delay) {
      let timeoutId;

      return function (...args) {
        const context = this;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
      };
    }

    const pwdcheck = document.getElementById('pwdcheck'),
    pwdres = document.getElementById('pwdres');

    function pwdIsCommon(){
      let p = pwdcheck.value;
      for (var i = 0; i < pwl.length; i++) {
        if(pwl[i] === p){
          pwdres.value = 'Password "'+ p +'" "is" in the list of commonly used passwords'
          return;
        }

      }
      pwdres.value = 'Password "'+ p +'" is "not" in the list of commonly used passwords'
    }



    const debouncedCheck = debounce(pwdIsCommon, 1000);
    pwdcheck.addEventListener('input', debouncedCheck)




  }
}

  // Initialize the app
  app.build().init();
  window.onload = null;
};
