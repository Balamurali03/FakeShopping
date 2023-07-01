import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Nav from "./Nav";
import Items from "./Items";
import { Link } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import cssu


const MainPage = (props) => {
  let [data, setData] = useState([]);
  let history = useHistory();
  let handleLogout = () => {
    props.setUserDetails(null);

    sessionStorage.clear();
    history.push("/");
  }
  let showConfirmationPopup = () => {
    confirmAlert({
      title: "Confirm to Logout",
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: "Yes",
          onClick: () => handleLogout(),
        },
        {
          label: "No",
        },
      ],
    });
  }

  useEffect(() => {

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => { console.log(data); setData(data) })

  }, [])
  return (
    <div>
      <nav>
        <div>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand" >Navbar</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link to='/login' class="nav-link active" aria-current="page" href="#">Home</Link>
                  </li>
                  <li class="nav-item  pr-4 ">
                    <Nav handleLogout={handleLogout}></Nav>
                  </li>
                  <li class="dropdown  pr-4">

                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                    </button>
                   {data !=null && <ul class="dropdown-menu">
                    {data.map((datum) => {
                        return (
                          <li><a class="dropdown-item">{datum}</a></li>
                        )})}
                      {/* <li><a class="dropdown-item" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                    </ul>}

                  </li>
                  <li><button class="btn btn-secondary" onClick={showConfirmationPopup}>Logout</button></li>
                </ul>

              </div>
            </div>
          </nav>
        </div>
      </nav>
      <section>
        <Items></Items>
      </section>
    </div>
  )
}

export default MainPage;