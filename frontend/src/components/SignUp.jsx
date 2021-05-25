
//import "../styles/signup.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import API_URL from "../APIconfig";

export default function SignUp() {
  const history = useHistory();

  const [user, setUser] = useState({}); // user info
  const [register, setRegister] = useState(true); // to show aleart

  //to add the input inside user
  const onChangeInput = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  // to add the user info to database
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/api/user/signup`, user)
      .then((res) => {
        const user = res.data.user;
        console.log("res",res.data.user)
        if (user) {
          console.log("user logined in ")
          history.push("/signin");
         
        } else {
          setTimeout(() => {
            setRegister(false);
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };





    return (
    <div>
         {!register && (
        <Alert variant={"danger"}>
          The email is already in use. Please change the email
        </Alert>
      )}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY=" crossOrigin="anonymous" />
            <div className="container">
    <div className="row">
        <div className="col-md-11 mt-60 mx-md-auto">
            <div className="login-box bg-white pr-lg-5 pr-0">
                <div className="row no-gutters align-items-center">

                    <div className="col-md-6 order-md-last">
                        <div className="form-wrap bg-white">
                            <h4 className="btm-sep pb-3 mb-5">Register</h4>
                            <form className="form" method="post" action="#">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group position-relative">
                                            <span className="zmdi zmdi-account"></span>
                                            <input type="text" id="username" className="form-control"  placeholder="Username" required
                                            name="userName"
                                            onChange={(e) => onChangeInput(e)} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group position-relative">
                                            <span className="zmdi zmdi-email"></span>
                                            <input type="email" id="email" className="form-control" placeholder="Email Address" required
                                            name="email"
                                            onChange={(e) => onChangeInput(e)} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group position-relative">
                                            <span className="zmdi zmdi-lock"></span>
                                            <input type="password" id="password" className="form-control" placeholder="Password" required
                                            name="password"
                                            onChange={(e) => onChangeInput(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" id="submit" className="btn btn-lg btn-custom btn-dark btn-block"
                                        onClick={(e) => onSubmit(e)}>
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-md-6 order-md-first">
                        <div className="content text-center">
                            <div className="border-bottom pb-5 mb-5">
                                <h3 className="c-black">Already have an account?</h3>
                                <Link to ="/signin"> <a className="btn btn-custom">sign In</a> </Link>
                            </div>
                            {/* <h5 className="c-black mb-4 mt-n1">Or Sign Up With</h5>
                            <div className="socials">
                                <a href="#" className="zmdi zmdi-facebook"></a>
                                <a href="#" className="zmdi zmdi-twitter"></a>
                                <a href="#" className="zmdi zmdi-google"></a>
                                <a href="#" className="zmdi zmdi-instagram"></a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</div>
    )
}
