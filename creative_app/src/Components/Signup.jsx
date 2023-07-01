import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {

  let lastname = useRef();
  let firstname = useRef();
  let Email = useRef();
  let Password = useRef();
  let ConfirmPassword = useRef();
  let DOB = useRef();
  let address = useRef();
  let Phno = useRef();
  let pin = useRef();
  let city = useRef();
  let history = useHistory();

  const handleInput = (e) => {
    e.preventDefault();

    if (firstname.current.value === "" || lastname.current.value === "" ||Email.current.value === "" || Password.current.value==="") {
      notifyMsgFieldEmpty();
      console.log("worng password");
    } else if( Password.current.value !== ConfirmPassword.current.value){
      notifyMsgPasswordMismatch();
    }  else {
      let signupInfo = {
        firstname: firstname.current.value, lastname: lastname.current.value,
        Email: Email.current.value, Password: Password.current.value, DOB: DOB.current.value,
        address: address.current.value, Phno: Phno.current.value, pin: pin.current.value,
        city: city.current.value
      }

      const existingData = localStorage.getItem('signupInfo');
      console.log(existingData)
      let storedData = existingData ? JSON.parse(existingData) : [];
      const index = storedData.findIndex(obj => obj.Email === signupInfo.Email);
      if(index > -1) {
        notifyUserAlreadyExist();
      } else {
      storedData.push(signupInfo);
      localStorage.setItem('signupInfo', JSON.stringify(storedData));
      notifySignup();
      }
      
    }
  }

  let notifyUserAlreadyExist= ()=> {
    toast.dismiss();
    toast(<b>
        &nbsp;&nbsp;User already exist sign up with another mailid</b>, {
        position: "top-center",
    });
    }
 let notifyMsgFieldEmpty= ()=> {
    toast.dismiss();
    toast(<b>
        &nbsp;&nbsp;Please fill all the fields</b>, {
        position: "top-center",
    });
    }

    let notifyMsgPasswordMismatch= ()=> {
      toast.dismiss();
      toast(<b>
          &nbsp;&nbsp;Password doesn't match </b>, {
          position: "top-center"
      });}

      let notifySignup=() => {
        toast.success(<b>&nbsp;&nbsp;Account created successfully</b>, {
          onClick: () => {
            history.push('/login');
          },position: "top-center",
         });
    }

  return (
    <div >
      <h3 className='heading' style={{ textAlign: "center" }}>Signup</h3>
      <hr />
      <form class="row g-3" onSubmit={handleInput}>
        <div class="row g-3">
          <div class="col">
          <label for="inputAddress" class="form-label"  >First name</label>
            <input type="text" class="form-control" placeholder="First name" aria-label="First name" ref={firstname}></input>
          </div>
          <div class="col">
          <label for="inputAddress" class="form-label"  >Last name</label>
            <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" ref={lastname}></input>
          </div>
        </div>
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Email</label>
          <input type="email" class="form-control" id="inputEmail4" ref={Email}></input>
        </div>
        <div class="col-md-3">
          <label for="inputPassword4" class="form-label">Password</label>
          <input type="password" class="form-control" id="inputPassword4" ref={Password}></input>
        </div>
        <div class="col-md-3">
          <label for="inputPassword4" class="form-label" >Confirm Password</label>
          <input type="password" class="form-control" id="inputPassword4" ref={ConfirmPassword}></input>
        </div>

        <div class="col-4">
          <label for="inputAddress" class="form-label"  >Address</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" ref={address}></input>
        </div>
        <div class="col-4">
          <label for="inputAddress2" class="form-label">PhNo</label>
          <input type="text" class="form-control" id="inputAddress2" ref={Phno}></input>
        </div>
        <div class="col-4">
          <label for="entry_date" class="form-label">Date of Birth:</label>
          <input type="date" name='entry_date' class="form-control" id="entry_date" ref={DOB}></input>

        </div>
        <div class="col-md-6">
          <label for="inputCity" class="form-label">City</label>
          <input type="text" class="form-control" id="inputCity" ref={city}></input>
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">State</label>
          <select id="inputState" class="form-select">
            <option selected>Select State</option>
            <option >Karnataka</option>
            <option >Tamilnadu</option>
            <option >Andhrapradesh</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">Pin code</label>
          <input type="number" class="form-control" id="inputZip" ref={pin}></input>
        </div>
        <div class="col-6">
          <button type="submit" class="btn btn-primary">Signup</button>
        </div>
        <div class="col-6">
          <Link to="/login"><button type="submit" class="btn btn-primary">Login</button></Link>
        </div>

      </form>
      <ToastContainer className="Toast-at-center" />
    </div>
  )
}
export default Signup;