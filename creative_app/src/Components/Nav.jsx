import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import cssu

function Nav(props) {
  let user = sessionStorage.getItem("userdetails");
  user = JSON.parse(user);
  let allUser = localStorage.getItem("signupInfo");
  allUser = JSON.parse(allUser);
  let handleDeleteUser = () => {
    console.log("hello");
    const index = allUser.findIndex(obj => obj.Email === user.Email);
    if (index > -1) {
      allUser.splice(index, 1);
      localStorage.setItem("signupInfo", JSON.stringify(allUser));
      props.handleLogout();
    }
  }

  let showConfirmationPopup = () => {
    confirmAlert({
      title: "Confirm to Delete Account",
      message: 'Are you sure you want to Delete Account?',
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteUser(),
        },
        {
          label: "No",
        },
      ],
    });}

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button type="button" class="btn btn-secondary pr-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Profile
      </button>

      {/* <!-- Modal --> */}
      <div class="modal " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Profile</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <span>Username : </span>
              <h1>{user.firstname}</h1><br />
              <span>PhNo : </span>
              <h1>{user.Phno}</h1><br />
              <span>Email : </span>
              <h1>{user.Email}</h1><br />
              <span>DOB : </span>
              <h1>{user.DOB}</h1><br />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" onClick={showConfirmationPopup}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Nav;