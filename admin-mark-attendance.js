let attArray = JSON.parse(localStorage.getItem('attArray')) || [];
let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];
if (choristerArray.length > 0) {
  choristerArray.forEach((chorister) => {
    let nameBox = document.querySelector('.name-box');
    nameElem = `
        <div class="mem-name">
          <label for="${chorister.userId}">${chorister.username}</label>
          <input type="checkbox" name="${chorister.userId}" id="${chorister.userId}" value="${chorister.username}">
        </div>
        `;
    nameBox.insertAdjacentHTML('beforeend', nameElem);
  })

  choristerArray.forEach((chorister) => {
    let attForm = document.querySelector('.add-att-form');
    attForm.onsubmit = (e)=>{
      e.preventDefault();
      const date = document.querySelector('#practice-date');
      let checkboxs = attForm.querySelectorAll('input[type="checkbox"]');
      let elem = document.createElement('pre');
      checkboxs.forEach((checkbox)=>{
        if(checkbox.checked) {
          elem.append(checkbox.value + ',' + '\n');
          console.log(checkbox.value);
        }
      })
      attObj = {
        id: Date.now(),
        date: date.value,
        checkbox: elem.innerHTML
      }
      attArray.push(attObj);
      localStorage.setItem('attArray', JSON.stringify(attArray));

      let validateSubmit = document.querySelector('.validate-att-submit');
      setTimeout(()=>{
        validateSubmit.style.display = 'block';
        validateSubmit.innerHTML = 'Attendance Successfully Documented';
        setTimeout(()=>{
          window.location.reload();
        }, 2000)
      }, 400)
    }
  })
}