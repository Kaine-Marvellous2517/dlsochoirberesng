let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];
let form = document.querySelector('#add-chorister-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let username = document.getElementById('user-name').value;
  let group = document.getElementById('group').value;
  let district = document.getElementById('district').value;
  let contact = document.getElementById('contact').value;
  let instrument = document.getElementById('instrument').value;
  let category = document.getElementById('category').value;
  let part = document.getElementById('part').value;
  const chorister = {
    userId: Date.now(),
    username,
    group,
    district,
    contact,
    instrument,
    category,
    part
  }

  choristerArray.push(chorister);
  localStorage.setItem('choristerArray', JSON.stringify(choristerArray));

  let valid = document.querySelector('.message')
  setTimeout(()=>{
    valid.innerHTML = 'Documentation successful';
    valid.style.transition = 'all 1s';
    setTimeout(()=>{
      window.location.reload()
    }, 1400)
  }, 500)

});

