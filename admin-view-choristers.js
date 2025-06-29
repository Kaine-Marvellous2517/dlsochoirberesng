let editBoxContainer = document.getElementById('edit-details-box');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == editBoxContainer) {
    editBoxContainer.style.display = "none";
    document.querySelector('#edit-box').innerHTML = ''
  }
}

let filterBox = document.getElementById('details-filter');
let searchGroup = document.getElementById('search-group');
let searchDistrict = document.getElementById('search-district');
let searchInstrument = document.getElementById('search-instrument');
let searchPart = document.getElementById('search-part');
filterBox.addEventListener('change', ()=>{
  if (filterBox.value === 'group') {
    searchGroup.style.display = 'block';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'none';
  } else if (filterBox.value === 'district') {
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'block';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'none';
  } else if (filterBox.value === 'instrument') {
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'block';
    searchPart.style.display = 'none';
  } else if (filterBox.value === 'part') {
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'block';
  } else {
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'none';
  }
})

let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];
if (choristerArray.length === 0 || !choristerArray) {
  let totalChoristers = document.getElementById('choristers-num').innerHTML = `
    <img width="40" src="attendance.png" alt="icon">
    <span>${choristerArray.length}</span>
  `;
}
if (choristerArray.length > 0) {
  // filter chorister details
  searchGroup.addEventListener('input', (e)=>{
    groupFilter();
  })
  searchDistrict.addEventListener('input', (e)=>{
    districtFilter();
  })
  searchInstrument.addEventListener('input', (e)=>{
    instrumentFilter();
  })
  searchPart.addEventListener('input', (e)=>{
    partFilter();
  })
  function groupFilter() {
    let searchTerm = searchGroup.value.toLowerCase();
  
    const filteredValue = choristerArray.filter((chorister) => {
      const value = chorister.group.toLowerCase().includes(searchTerm);
      return value;
    });
    renderChoristers(filteredValue);
  }
  function districtFilter() {
    let searchTerm = searchDistrict.value.toLowerCase();

    const filteredValue = choristerArray.filter((chorister) => {
      const value = chorister.district.toLowerCase().includes(searchTerm);
      return value;
    })
    renderChoristers(filteredValue);
  }
  function instrumentFilter() {
    let searchTerm = searchInstrument.value.toLowerCase();

    const filteredValue = choristerArray.filter((chorister) => {
      let value = chorister.instrument.toLowerCase().includes(searchTerm);
      return value;
    })
    renderChoristers(filteredValue);
  }
  function partFilter() {
    let searchTerm = searchPart.value.toLowerCase();

    const filteredValue = choristerArray.filter((chorister) => {
      let value = chorister.part.toLowerCase().includes(searchTerm);
      return value;
    })
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
          <button class="del-details-btn">Delete</button>
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

      choristerElement.querySelector('.del-details-btn').addEventListener('click', () => {
        deleteChoristerDetails(chorister.userId, chorister.username);
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

  function deleteChoristerDetails(userId, username) {
    choristerIndex = choristerArray.findIndex((chorister) => chorister.userId ===userId);
    let password = '2517';
    const confirmDelete = prompt(`Input password to confirm the delete of "${username}" details`);
    if (confirmDelete === password) {
      if (choristerArray !== -1) {
        choristerArray.splice(choristerIndex, 1);
        localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
        window.location.reload();
      }
    }
  }
}
