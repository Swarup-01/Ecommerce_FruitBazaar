import { useState } from "react";
import NavBar from "./NavBar";

export default function SignUpPage(props) {
  let { signupStatus } = props;

  function handleSignupFormSubmit(event) {
    event.preventDefault();
    props.onSignupFormSubmit(event);
  }
  function handleLoginClick() {
    props.onLoginClick("Login");
    console.log("...");
  }

  return (
    <>
      {signupStatus == "success" && (
        <div className="text-center text-danger">
          SignUp Successfull{" "}
          <a href="#" onClick={handleLoginClick}>
            Login Now
          </a>
        </div>
      )}

      {signupStatus == "failed" && (
        <div className="text-center text-danger">
          Sorry... This email-id is already registered.
        </div>
      )}

      {(signupStatus == "no" || signupStatus == "failed") && (
        <div className="row signup-container">
          <form action="" onSubmit={handleSignupFormSubmit}>
            <h2> Welcome To Sign-Up Form</h2>

            <div className="row">
              <div className="col-6 text-end my-2">
                <label htmlFor="">UserName:</label>
              </div>
              <div className="col-6 text-start">
                <input type="text" placeholder="Username" name="UserName" />
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end my-2">
                <label htmlFor="">EmailId:</label>
              </div>
              <div className="col-6 text-start">
                <input type="email" placeholder="email-id" name="email" />
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end my-2">
                <label htmlFor="">Password:</label>
              </div>
              <div className="col-6 text-start">
                <input type="password" placeholder="password" name="password" />
              </div>
              <div className=" offset-6 col-6 text-start">
                <input
                  type="submit"
                  className="my-2 mx-2"
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    transition: "0.3s",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <input
                  type="reset"
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    transition: "0.3s",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                  }}
                />
                {/* <button className="btn btn-danger mx-2">Submit</button>
                <button className="btn btn-danger">Clear</button> */}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
