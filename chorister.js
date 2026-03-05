let messageBox = document.querySelector('.message-box');

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
          <div class="details">
            <h3>Name: ${chorister.name}</h3>
            <p>Group: ${chorister.group}</p>
            <p>District: ${chorister.district}</p>
            <p>Instrument: ${chorister.instrument}</p>
            <p>Contact: ${chorister.contact}</p>
            <p>Part: ${chorister.part}</p>
          </div>
          `;
        choristerDetails.insertAdjacentHTML('beforeend', choristerElem);
      }
    })
  }
  renderChoristers(filteredValue = choristerArray);
}