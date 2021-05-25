

import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import API_URL from "../APIconfig";

export default function SignIn(props) {
    const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/api/user/login`, credentials)
      .then((res) => {
        console.log("Express backend /login response", res);

        const token = res.data.token;
        const msg = res.data.msg;

        if (token) {
          localStorage.setItem("jwtToken", token);
          props.loginCallback();
          history.push("/profile");
        } else {
          console.log("Login error: ", msg);
        }
      });
  };







    return (
        <div>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY=" crossOrigin="anonymous" />
            <div className="container">
    <div className="row">
        <div className="col-md-11 mt-60 mx-md-auto">
            <div className="login-box bg-white pr-lg-5 pr-0">
                <div className="row no-gutters align-items-center">
            <div className="col-md-6 order-md-last">
                        <div className="form-wrap bg-white">
                           
                            <h4 className="btm-sep pb-3 mb-5">Sign in</h4>
                            <form className="form" method="post" >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group position-relative">
                                            <span className="zmdi zmdi-email"></span>
                                            <input type="email" id="email" className="form-control" placeholder="Email Address"
                                            name="email"
                                            onChange={(e) => onChangeInput(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group position-relative">
                                            <span className="zmdi zmdi-lock"></span>
                                            <input type="password" id="password" className="form-control" placeholder="Password"
                                            name="password"
                                            onChange={(e) => onChangeInput(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" id="submit" className="btn btn-lg btn-custom btn-dark btn-block"
                                        onClick={(e) => onSubmit(e)}>
                                        Sign in
                                        </button>
                                        
                                    </div>
                                </div>
                            </form>
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
