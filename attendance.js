let editBoxContainer = document.getElementById('edit-details-box');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == editBoxContainer) {
    editBoxContainer.style.display = "none";
    document.querySelector('#edit-box').innerHTML = ''
  }
}

let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];
if (choristerArray.length === 0 || !choristerArray) {
  let totalChoristers = document.getElementById('choristers-num').innerHTML = `
    <img width="40" src="attendance.png" alt="icon">
    <span>${choristerArray.length}</span>
  `;
}
if (choristerArray.length > 0) {
  // filter chorister details
  let searchName = document.getElementById('search-name');
  searchName.addEventListener('input', (e)=>{
    nameFilter()  
  })
  function nameFilter() {
    let searchTerm = searchName.value.toLowerCase();
  
    const filteredValue = choristerArray.filter((chorister) => {
      const value = chorister.username.toLowerCase().includes(searchTerm);
      return value;
    });
    renderChoristers(filteredValue);
  }

  // render chorister details
  function renderChoristers(filteredValue = choristerArray) {
    let attBox = document.querySelector('.att-box');
    attBox.innerHTML = '';
    filteredValue.forEach((chorister) => {
      choristerElem = `
        <div class="details" data-id="${chorister.userId}">
          <div>Name: ${chorister.username}</div>
          <p>Group: ${chorister.group}</p>
          <p>District: ${chorister.district}</p>
          <p>Instrument: ${chorister.instrument}</p>
          <p>Contact: ${chorister.contact}</p>
          <p>Category: ${chorister.category}</p>
          <p>Part: ${chorister.part}</p>
          <button class="edit-details-btn">&#9998; Edit</button>
        </div>
        `;
      attBox.insertAdjacentHTML('beforeend', choristerElem);
      let totalChoristers = document.getElementById('choristers-num').innerHTML = `
        <img width="40" src="attendance.png" alt="icon">
        <span>${filteredValue.length}</span>
      `;
      let choristerElement = attBox.querySelector(`.details[data-id="${chorister.userId}"]`)

      choristerElement.querySelector('.edit-details-btn').addEventListener('click', () => {
        editChoristerDetails(chorister.userId);
      })
    })
  }
  renderChoristers(filteredValue = choristerArray);

  function editChoristerDetails(userId) {
    const choristerIndex = choristerArray.findIndex((chorister) => chorister.userId === userId);

    if (choristerIndex !== -1) {
      let obj = choristerArray[choristerIndex];
      const editHTML = `
          <form class="edit-item" data-id="${obj.userId}">
            <fieldset>
              <legend>Edit Details</legend>
              <label for="edit-name">Name</label>
              <input name="edit-name" id="edit-name" type="text" value="${obj.username}" data-index="${choristerIndex}">
              
              <label for="edit-group">Group</label>
              <input name="edit-group"  id="edit-group" type="text" value="${obj.group}" data-index="${choristerIndex}">
              
              <label for="edit-district">District</label>
              <input name="edit-district" id="edit-district" type="text" value="${obj.district}" data-index="${choristerIndex}">
              
              <label for="edit-contact">Contact</label>
              <input name="edit-contact" id="edit-contact" type="tel" value="${obj.contact}" data-index="${choristerIndex}">
              
              <label for="edit-instrument">Instrument</label>
              <select name="edit-instrument" id="edit-instrument" data-index="${choristerIndex}">
                <option value="Select" selected>Select the instrument you play</option>
                <option value="Keyboard(PIano)">Keyboard(PIano)</option>
                <option value="Violin">Violin</option>
                <option value="Viola">Viola</option>
                <option value="Saxophone">Saxophone</option>
                <option value="Clarenet">Clarenet</option>
                <option value="Flute">Flute</option>
                <option value="Trumpet">Trumpet</option>
                <option value="Trumbone">Trumbone</option>
                <option value="Euphonium">Euphonium</option>
              </select>

              <label for="edit-category">Category</label>
              <select name="edit-category" id="edit-category" data-index="${choristerIndex}">
                <option value="Select" selected>Select the category you belong</option>
                <option value="Choir leader">Choir leader</option>
                <option value="Choir member">Choir member</option>
              </select>

              <label for="edit-part">Parts</label>
              <select name="edit-part"  id="edit-part" data-index="${choristerIndex}">
                <option value="Select" selected>Select the part you belong</option>
                <option value="Treble">Treble</option>
                <option value="Auto">Auto</option>
                <option value="Tenor">Tenor</option>
                <option value="Bass">Bass</option>
              </select>
            </fieldset>
            <input type="submit" class="save-edit-btn" value="Save Changes" data-index="${choristerIndex}">
            <div class="message"></div>
          </form>
      `;
      let editDetailsBox = document.querySelector('#edit-details-box');
      editDetailsBox.style.display = 'block';
      let editBox = document.querySelector('#edit-box');
      editBox.insertAdjacentHTML("beforeend", editHTML)

      let editElement = editBox.querySelector(`.edit-item[data-id="${obj.userId}"]`)
      editElement.addEventListener('submit', (e)=>{
        e.preventDefault();
        saveDetailsEdit(obj.userId);
      })
    }
  }

  function saveDetailsEdit(userId) {
    let username = document.getElementById('edit-name').value;
    let group = document.getElementById('edit-group').value;
    let district = document.getElementById('edit-district').value;
    let contact = document.getElementById('edit-contact').value;
    let instrument = document.getElementById('edit-instrument').value;
    let category = document.getElementById('edit-category').value;
    let part = document.getElementById('edit-part').value;

    const choristerIndex = choristerArray.findIndex((chorister) => chorister.userId === userId);
    if (choristerIndex !== -1) {
      let obj = choristerArray[choristerIndex];
      obj.username = username;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.group = group;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.district = district;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.instrument = instrument;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.contact = contact;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.category = category;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.part = part;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));

      let message = document.querySelector('.message')
      setTimeout(()=>{
        message.innerHTML = 'Details successfully edited';
        message.style.transition = 'all 1s';
        setTimeout(()=>{
          window.location.reload()
        }, 1400)
      }, 500)
    }
  }
}

// Attendance section
let attArray = JSON.parse(localStorage.getItem('attArray')) || [];

if (attArray.length > 0) {
  // filter attendance
  let searchAttendance = document.getElementById('search-attendance');
  searchAttendance.addEventListener('input', (e) => {
    attendanceFilter();
  })
  function attendanceFilter() {
    let searchTerm = searchAttendance.value;

    const filteredValue = attArray.filter((att) => {
      let value = att.date.includes(searchTerm);
      return value;
    })
    renderAttendance(filteredValue);
  }

  // render attendance
  function renderAttendance(filteredValue = attArray) {
    let attendanceDetails = document.querySelector('.attendance-details');
    attendanceDetails.innerHTML = '';
    filteredValue.forEach((att) => {
      attDetails = `
        <div class="att-list-details att-list" data-id="${att.id}">
          <h3>${att.date}</h3>
          <pre class="list">${att.checkbox}</pre>
        </div>
      `;
      attendanceDetails.insertAdjacentHTML('beforeend', attDetails)
    })
  }
  renderAttendance(filteredValue = attArray) 
}

//console.log(localStorage)
// localStorage.removeItem('choristerArray');
// localStorage.removeItem('attArray');
