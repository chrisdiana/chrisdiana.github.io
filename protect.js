var decryptButton = document.getElementById('decrypt');
var accessCodeInput = document.getElementById('access-code');
var accessCodeGroup = document.getElementById('access-code-group');
var hintEl = document.getElementById('hint');
var protectedEl = document.getElementById('protected');
var loginEl = document.getElementById('login');
var notifyEl = document.getElementById('notify');

function error(message) {
  hint.innerText = message;
  hint.classList.add('is-error');
  accessCodeInput.classList.add('is-error');
}

function decrypt(ciphertext, key) {
  var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
  if(!bytes.toString(CryptoJS.enc.Utf8)) error('sdfsdf')
  return bytes.toString(CryptoJS.enc.Utf8);
}

function setProtectedContent(content) {
  loginEl.classList.add('hide');
  protectedEl.classList.remove('hide');
  protectedEl.classList.add('show');
  
  var converter = new showdown.Converter();
  var html = converter.makeHtml(content);
  protectedEl.innerHTML = html;
}

decryptButton.addEventListener('click', function(e) {
  var key = accessCodeInput.value.trim();
  if(key) {
    var decryption = decrypt(ciphertext, key);
    if(decryption) {
      setProtectedContent(decryption);  
    } else {
      error('Please enter a valid access code');
    }
  } else {
   error('Please enter an access code');
  }
});