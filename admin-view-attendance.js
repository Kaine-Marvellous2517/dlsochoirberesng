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
          <button class="del-btn">Delete</button>
        </div>
      `;
      attendanceDetails.insertAdjacentHTML('beforeend', attDetails)

      attElem = attendanceDetails.querySelector(`.att-list[data-id="${att.id}"]`)

      attElem.querySelector('.del-btn').addEventListener('click', () => {
        deleteAttendance(att.id, att.date);
      });
    })
  }
  renderAttendance(filteredValue = attArray) 

  function deleteAttendance(id, date) {
    const attIndex = attArray.findIndex((att) => att.id === id);
    let password = '2517';
    const confirmDelete = prompt(`Input password to confirm the delete of attendance documented on "${date}"`);
    if (confirmDelete === password) {
      if (attIndex !== -1) {
        attArray.splice(attIndex, 1);
        localStorage.setItem('attArray', JSON.stringify(attArray));
        window.location.reload();
      }
    }
  }
}
