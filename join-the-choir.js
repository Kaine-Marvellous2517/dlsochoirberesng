// When the user clicks anywhere outside of the modal, close it
let registerModal = document.getElementById('register-modal');
window.onclick = function(event) {
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
}

let form = document.getElementById('join-choir-form');
let applicantList = document.getElementById('applicant-list');

let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];
let userCount = 0;
let joinChoirArray = JSON.parse(localStorage.getItem('joinChoirArray')) || [];
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let username = document.getElementById('user-name').value;
  let group = document.getElementById('group').value;
  let district = document.getElementById('district').value;
  let contact = document.getElementById('contact').value;
  let salvation = document.getElementById('salvation').value;
  let salvationDate = document.getElementById('salvation-date').value;
  let salvationExperience = document.getElementById('salvation-experience').value;
  let sanctification = document.getElementById('sanctification').value;
  let sanctificationDate = document.getElementById('sanctification-date').value;
  let sanctificationExperience = document.getElementById('sanctification-experience').value;
  let spiritFilled = document.getElementById('spirit-filled').value;
  let spiritFilledDate = document.getElementById('spirit-filled-date').value;
  let spiritFilledExperience = document.getElementById('spirit-filled-experience').value;
  let quiteTime = document.getElementById('quite-time').value;
  let permit = document.getElementById('permit').value;
  let reason = document.getElementById('reason').value;
  let instrument = document.getElementById('instrument').value;
  
  const applicant = {
    id: Date.now(),
    username,
    group,
    district,
    contact,
    salvation,
    salvationDate,
    salvationExperience,
    sanctification,
    sanctificationDate,
    sanctificationExperience,
    spiritFilled,
    spiritFilledDate,
    spiritFilledExperience,
    quiteTime,
    permit,
    reason,
    instrument,
  };
  
  joinChoirArray.push(applicant);
  localStorage.setItem('joinChoirArray', JSON.stringify(joinChoirArray));
  
  registerModal.style.display = 'none';
  let valid = document.getElementById('sign-up-valid')
  setTimeout(()=>{
    valid.innerHTML = 'Registration successful';
    valid.style.transition = 'all 1s';
    setTimeout(()=>{
      window.location.reload()
    }, 1400)
  }, 500)

});

