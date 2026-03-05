let messageBox = document.querySelector('.message-box');
let addMemBtn1 = document.querySelector('.add-mem-btn-1');
let addMemBtn2 = document.querySelector('.add-mem-btn-2');
let closeAddMemBtn = document.querySelector('.add-mem .close-btn');
let addMem = document.querySelector('.add-mem');
addMemBtn1.addEventListener('click', () => {
  addMem.classList.toggle('visibility')
});
addMemBtn2.addEventListener('click', () => {
  addMem.classList.toggle('visibility')
});
closeAddMemBtn.addEventListener('click', () => {
  addMem.classList.toggle('visibility')
});

/* Filter inputs */
let filterMem = document.getElementById('filter-mem');
let searchName = document.getElementById('search-name');
let searchGroup = document.getElementById('search-group');
let searchDistrict = document.getElementById('search-district');
let searchInstrument = document.getElementById('search-instrument');
let searchPart = document.getElementById('search-part');
filterMem.addEventListener('change', ()=>{
  if (filterMem.value === 'name') {
    searchName.style.display = 'block';
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'none';
  } else if (filterMem.value === 'group') {
    searchName.style.display = 'none';
    searchGroup.style.display = 'block';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'none';
  } else if (filterMem.value === 'district') {
    searchName.style.display = 'none';
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'block';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'none';
  } else if (filterMem.value === 'instrument') {
    searchName.style.display = 'none';
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'block';
    searchPart.style.display = 'none';
  } else if (filterMem.value === 'part') {
    searchName.style.display = 'none';
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'block';
  } else {
    searchName.style.display = 'none';
    searchGroup.style.display = 'none';
    searchDistrict.style.display = 'none';
    searchInstrument.style.display = 'none';
    searchPart.style.display = 'none';
  }
})

/* Add choristers */
let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];
let form = document.querySelector('#add-chorister-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let name = document.getElementById('name').value;
  let group = document.getElementById('group').value;
  let district = document.getElementById('district').value;
  let contact = document.getElementById('contact').value;
  let instrument = document.getElementById('instrument').value;
  let part = document.getElementById('part').value;

  const chorister = {
    id: Date.now(),
    name,
    group,
    district,
    contact,
    instrument,
    part
  }

  choristerArray.push(chorister);
  localStorage.setItem('choristerArray', JSON.stringify(choristerArray));

  setTimeout(()=>{
    messageBox.style.display = 'block';
    messageBox.innerHTML = 'Documentation successful';
    setTimeout(()=>{
      window.location.reload()
    }, 1400)
  }, 500)

});


/* Display choristers */
if (choristerArray.length > 0) {
  // filter chorister details
  searchName.addEventListener('input', (e)=>{
    nameFilter();
  })
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
  function nameFilter() {
    let searchTerm = searchName.value.toLowerCase();
  
    const filteredValue = choristerArray.filter((chorister) => {
      if (chorister.name) {
        const value = chorister.name.toLowerCase().includes(searchTerm);
        return value;
      }
    });
    renderChoristers(filteredValue);
  }
  function groupFilter() {
    let searchTerm = searchGroup.value.toLowerCase();
  
    const filteredValue = choristerArray.filter((chorister) => {
      if (chorister.group) {
        const value = chorister.group.toLowerCase().includes(searchTerm);
        return value;
      }
    });
    renderChoristers(filteredValue);
  }
  function districtFilter() {
    let searchTerm = searchDistrict.value.toLowerCase();

    const filteredValue = choristerArray.filter((chorister) => {
      if (chorister.district) {
        const value = chorister.district.toLowerCase().includes(searchTerm);
        return value;
      }
    })
    renderChoristers(filteredValue);
  }
  function instrumentFilter() {
    let searchTerm = searchInstrument.value.toLowerCase();

    const filteredValue = choristerArray.filter((chorister) => {
      if (chorister.instrument) {
        let value = chorister.instrument.toLowerCase().includes(searchTerm);
        return value;
      }
    })
    renderChoristers(filteredValue);
  }
  function partFilter() {
    let searchTerm = searchPart.value.toLowerCase();

    const filteredValue = choristerArray.filter((chorister) => {
      if (chorister.part) {
        let value = chorister.part.toLowerCase().includes(searchTerm);
        return value;
      }
    })
    renderChoristers(filteredValue);
  }

  // render chorister details
  function renderChoristers(filteredValue = choristerArray) {
    let choristerDetails = document.querySelector('.chorister-details');
    choristerDetails.innerHTML = '';
    filteredValue.forEach((chorister) => {
      if (chorister.name) {
        // let totalChoristers = document.getElementById('choristers-num').innerHTML = `Total ${filteredValue.length}`;
        choristerElem = `
          <div class="details" data-id="${chorister.id}">
            <h3>Name: ${chorister.name}</h3>
            <p>Group: ${chorister.group}</p>
            <p>District: ${chorister.district}</p>
            <p>Instrument: ${chorister.instrument}</p>
            <p>Contact: ${chorister.contact}</p>
            <p>Part: ${chorister.part}</p>
            <button class="edit-btn">&#9998; Edit</button>
            <button class="del-btn">Delete</button>
          </div>
          `;
        choristerDetails.insertAdjacentHTML('beforeend', choristerElem);

        let choristerElement = choristerDetails.querySelector(`.details[data-id="${chorister.id}"]`)

        choristerElement.querySelector('.edit-btn').addEventListener('click', () => {
          editChoristerDetails(chorister.id);
        });

        choristerElement.querySelector('.del-btn').addEventListener('click', () => {
          deleteChoristerDetails(chorister.id, chorister.name);
        });
      }
    })
  }
  renderChoristers(filteredValue = choristerArray);

  function editChoristerDetails(id) {
    const choristerIndex = choristerArray.findIndex((chorister) => chorister.id === id);

    if (choristerIndex !== -1) {
      let obj = choristerArray[choristerIndex];
      const editHTML = `
        <form class="edit-form" data-id="${obj.id}">
          <div>
            <h2>Edit Details</h2>
            <button class="close-btn" type="button">&times;</button>
          </div>
          <label for="edit-name">Name</label>
          <input name="edit-name" id="edit-name" type="text" value="${obj.name}" data-index="${choristerIndex}" autocomplete="both">
          
          <label for="edit-group">Group</label>
          <input name="edit-group"  id="edit-group" type="text" value="${obj.group}" data-index="${choristerIndex}">
          
          <label for="edit-district">District</label>
          <input name="edit-district" id="edit-district" type="text" value="${obj.district}" data-index="${choristerIndex}">
          
          <label for="edit-contact">Contact</label>
          <input name="edit-contact" id="edit-contact" type="tel" value="${obj.contact}" data-index="${choristerIndex}" autocomplete="both">
          
          <label for="edit-instrument">Instrument</label>
          <select name="edit-instrument" id="edit-instrument" data-index="${choristerIndex}" autocomplete="both" required>
            <option value="" selected>Select the instrument you play</option>
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

          <label for="edit-part">Parts</label>
          <select name="edit-part" id="edit-part" data-index="${choristerIndex}" autocomplete="both" required>
            <option value="" selected>Select the part you belong</option>
            <option value="Treble">Treble</option>
            <option value="Auto">Auto</option>
            <option value="Tenor">Tenor</option>
            <option value="Bass">Bass</option>
          </select>

          <input type="submit" class="save-edit-btn" value="Save Changes">
        </form>
      `;
      let editDetailsBox = document.querySelector('.edit-box');
      editDetailsBox.classList.toggle('visibility')
      let editBox = document.querySelector('.edit-box');
      editBox.insertAdjacentHTML("beforeend", editHTML)

      // close edit box
      let editBoxCloseBtn = document.querySelector('.edit-box .close-btn');
      editBoxCloseBtn.addEventListener('click', () => {
        editDetailsBox.innerHTML = '';
        editDetailsBox.classList.toggle('visibility');
      });

      let editElement = editBox.querySelector(`.edit-form[data-id="${obj.id}"]`)
      editElement.addEventListener('submit', (e)=>{
        e.preventDefault();
        saveDetailsEdit(obj.id);
      })
    }
  }

  function saveDetailsEdit(id) {
    let name = document.getElementById('edit-name').value;
    let group = document.getElementById('edit-group').value;
    let district = document.getElementById('edit-district').value;
    let contact = document.getElementById('edit-contact').value;
    let instrument = document.getElementById('edit-instrument').value;
    let part = document.getElementById('edit-part').value;

    const choristerIndex = choristerArray.findIndex((chorister) => chorister.id === id);
    if (choristerIndex !== -1) {
      let obj = choristerArray[choristerIndex];
      obj.name = name;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.group = group;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.district = district;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.instrument = instrument;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.contact = contact;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
      obj.part = part;
      localStorage.setItem('choristerArray', JSON.stringify(choristerArray));

      setTimeout(()=>{
        messageBox.style.display = 'block';
        messageBox.innerHTML = 'Details successfully edited';
        setTimeout(()=>{
          window.location.reload()
        }, 1400)
      }, 500)
    }
  }

  function deleteChoristerDetails(id, name) {
    choristerIndex = choristerArray.findIndex((chorister) => chorister.id === id);
    let password = '2517';
    const confirmDelete = prompt(`Input password to confirm the delete of "${name}" details`);
    if (confirmDelete === password) {
      if (choristerArray !== -1) {
        choristerArray.splice(choristerIndex, 1);
        localStorage.setItem('choristerArray', JSON.stringify(choristerArray));
        setTimeout(()=>{
          messageBox.style.display = 'block';
          messageBox.innerHTML = 'Successfully Deleted';
          setTimeout(()=>{
            window.location.reload()
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

