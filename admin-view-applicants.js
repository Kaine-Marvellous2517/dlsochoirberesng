let choristerArray = JSON.parse(localStorage.getItem('choristerArray')) || [];
let applicantList = document.querySelector('#applicant-list');
let joinChoirArray = JSON.parse(localStorage.getItem('joinChoirArray')) || [];
let totalApplicant = document.getElementById('applicant-num').innerHTML = `
  <img width="40" src="attendance.png" alt="icon">
  <span>${joinChoirArray.length}</span>
`;
if (joinChoirArray.length > 0) {
  joinChoirArray.forEach((applicant) => {
    applicantDetails = `
      <section class="applicant-details" data-id="${applicant.id}">
        <div>
          <h3>Name</h3>
          <p>${applicant.username}</p>
        </div>
        <span>
          <div>
            <h3>Group</h3>
            <p>${applicant.group}</p>
          </div>
          <div>
            <h3>District</h3>
            <p>${applicant.district}</p>
          </div>
        </span>
        <div>
          <h3>Contact</h3>
          <p>${applicant.contact}</p>
        </div>
        <div>
          <h3>Salvation</h3>
          <span>
            <p>${applicant.salvation}</p>
            <p>(${applicant.salvationDate})</p>
          </span>
        </div>
        <div>
          <h3>Salvation experience</h3>
          <p>${applicant.salvationExperience}</p>
        </div>
        <div>
          <h3>Sanctified</h3>
          <span>
            <p>${applicant.sanctification}</p>
            <p>(${applicant.sanctificationDate})</p>
          </span>
        </div>
        <div>
          <h3>Sanctified experience</h3>
          <p>${applicant.sanctificationExperience}</p>
        </div>
        <div>
          <h3>Spirit filled</h3>
          <span>
            <p>${applicant.spiritFilled}</p>
            <p>(${applicant.spiritFilledDate})</p>
          </span>
        </div>
        <div>
          <h3>Spirit filled experience</h3>
          <p>${applicant.spiritFilledExperience}</p>
        </div>
        <span>
          <div>
            <h3>Quite time</h3>
            <p>${applicant.quiteTime}</p>
          </div>
          <div>
            <h3>Parent's permit</h3>
            <p>${applicant.permit}</p>
          </div>
        </span>
        <div>
          <h3>Reason for joining the choir</h3>
          <p>${applicant.reason}</p>
        </div>
        <div>
          <h3>Chosen Instrument</h3>
          <p>${applicant.instrument}</p>
        </div>
        <div class="box">
          <button class="approve-btn">&check; Approve</button>
          <button class="disapprove-btn">&times; Disapprove</button>
        </div>
      </section>
    `;
    applicantList.insertAdjacentHTML("beforeend", applicantDetails);

    let applicantElem = applicantList.querySelector(`.applicant-details[data-id="${applicant.id}"]`);
    
    const chorister = {
      userId: Date.now(),
      username: applicant.username,
      group: applicant.group,
      district: applicant.district,
      contact: applicant.contact,
      instrument: applicant.instrument,
      category:"",
      part:"",
    };
    applicantElem.querySelector('.approve-btn').addEventListener('click', ()=>{
      approveApplicant(applicant.id, applicant.username, chorister)
    });
    applicantElem.querySelector('.disapprove-btn').addEventListener('click', ()=>{
      disapproveApplicant(applicant.id, applicant.username)
    });

  });

  function approveApplicant(id, username, chorister) {
    applicantIndex = joinChoirArray.findIndex((applicant) => applicant.id ===id);
    let password = '2517';
    const confirmApproval = prompt(`Input password to confirm the disapproval of "${username}" application`);
    if (confirmApproval === password) {
      if (joinChoirArray !== -1) {
        choristerArray.push(chorister);
        localStorage.setItem('choristerArray', JSON.stringify(choristerArray));

        setTimeout(()=>{
          joinChoirArray.splice(applicantIndex, 1);
          localStorage.setItem('joinChoirArray', JSON.stringify(joinChoirArray));
          window.location.reload();
        }, 100)
      }
    }
  }

  function disapproveApplicant(id, username) {
    applicantIndex = joinChoirArray.findIndex((applicant) => applicant.id ===id);
    let password = '2517';
    const confirmDisapproval = prompt(`Input password to confirm the disapproval of "${username}" application`);
    if (confirmDisapproval === password) {
      if (joinChoirArray !== -1) {
        joinChoirArray.splice(applicantIndex, 1);
        localStorage.setItem('joinChoirArray', JSON.stringify(joinChoirArray));
        window.location.reload();
      }
    }
  }
}
