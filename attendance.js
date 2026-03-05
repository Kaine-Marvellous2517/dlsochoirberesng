let messageBox = document.querySelector('.message-box');

let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];

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
          </div>
        `;
        attendanceDetails.insertAdjacentHTML('beforeend', attDetails);
      }
    })
  }
  renderAttendance(filteredValue = choristerArray) 
}
