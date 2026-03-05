let messageBox = document.querySelector('.message-box');
let signinForm = document.querySelector('#signin-form');
let signinBtn = document.querySelector('.signin-btn');
let signinBox = document.querySelector('.signin-box');
let closeSigninBoxBtn = document.querySelector('.signin-box .close-btn');
signinBtn.addEventListener('click', () => {
  signinBox.classList.toggle('visibility')
});
closeSigninBoxBtn.addEventListener('click', () => {
  signinBox.classList.toggle('visibility')
});

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let psw = document.querySelector('#psw');
  if (psw.value === '2517') {
    messageBox.style.display = 'block';
    messageBox.innerHTML = 'Signin was successful!';
    setTimeout(()=>{
    window.location.href = 'add-chorister.html';
    }, 2000)
  } else {
    messageBox.style.display = 'block';
    messageBox.innerHTML = 'Wrong Password!';
    setTimeout(()=>{
    window.location.reload();
    }, 2000)
  }
})