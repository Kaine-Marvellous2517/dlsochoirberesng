let messageBox = document.querySelector('.message-box');
let markAttBtn1 = document.querySelector('.mark-att-btn-1');
let markAttBtn2 = document.querySelector('.mark-att-btn-2');
let closeMarkAttBtn = document.querySelector('.mark-att .close-btn');
let markAtt = document.querySelector('.mark-att');
markAttBtn1.addEventListener('click', () => {
  markAtt.classList.toggle('visibility')
});
markAttBtn2.addEventListener('click', () => {
  markAtt.classList.toggle('visibility')
});
closeMarkAttBtn.addEventListener('click', () => {
  markAtt.classList.toggle('visibility')
});

let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];
if (choristerArray.length > 0) {
  choristerArray.forEach((chorister) => {
    if (chorister.name) {
      let nameBox = document.querySelector('.name-box');
      nameElem = `
          <div class="mem-name">
            <label for="${chorister.id}">${chorister.name}</label>
            <input type="checkbox" name="${chorister.id}" id="${chorister.id}" value="${chorister.name}">
          </div>
          `;
      nameBox.insertAdjacentHTML('beforeend', nameElem);
    }
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
      choristerArray.push(attObj);
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));

      setTimeout(()=>{
        messageBox.style.display = 'block';
        messageBox.innerHTML = 'Attendance Successfully Documented';
        setTimeout(()=>{
          window.location.reload();
        }, 1400)
      }, 500)
    }
  })
}


if (choristerArray.length > 0) {
  // filter attendance
  let searchAttendance = document.getElementById('search-attendance');
  searchAttendance.addEventListener('input', (e) => {
    attendanceFilter();
  })
  function attendanceFilter() {
    let searchTerm = searchAttendance.value;

    const filteredValue = choristerArray.filter((att) => {
      if (att.date) {
        let value = att.date.includes(searchTerm);
        return value;
      }
    })
    renderAttendance(filteredValue);
  }

  // render attendance
  function renderAttendance(filteredValue = choristerArray) {
    let attendanceDetails = document.querySelector('.attendance-details');
    attendanceDetails.innerHTML = '';
    filteredValue.forEach((att) => {
      if (att.date) {
        // let totalAtt = document.getElementById('attendance-num').innerHTML = `Total ${choristerArray.length}`;
        attDetails = `
          <div class="att-detail" data-id="${att.id}">
            <h3>${att.date}</h3>
            <pre class="list">${att.checkbox}</pre>
            <button class="del-btn">Delete</button>
          </div>
        `;
        attendanceDetails.insertAdjacentHTML('beforeend', attDetails)
        
        attElem = attendanceDetails.querySelector(`.att-detail[data-id="${att.id}"]`)

        attElem.querySelector('.del-btn').addEventListener('click', () => {
          deleteAttendance(att.id, att.date);
        });
      }
    })
  }
  renderAttendance(filteredValue = choristerArray) 

  function deleteAttendance(id, date) {
    const attIndex = choristerArray.findIndex((att) => att.id === id);
    let password = '2517';
    const confirmDelete = prompt(`Input password to confirm the delete of attendance documented on "${date}"`);
    if (confirmDelete === password) {
      if (attIndex !== -1) {
        choristerArray.splice(attIndex, 1);
        localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
        setTimeout(()=>{
          messageBox.style.display = 'block';
          messageBox.innerHTML = 'Successfully Deleted';
          setTimeout(()=>{
            window.location.reload();
          }, 1400)
        }, 500)
      }
    } else {
      setTimeout(() => {
        messageBox.style.display = 'block';
        messageBox.innerHTML = 'Wrong Password!';
        setTimeout(() => {
          window.location.reload();
        }, 1400)
      }, 500)
    }
  }
}
