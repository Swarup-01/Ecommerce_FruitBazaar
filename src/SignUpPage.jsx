import { useState } from "react";

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
                <input type="text" name="UserName" />
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end my-2">
                <label htmlFor="">EmailId:</label>
              </div>
              <div className="col-6 text-start">
                <input type="email" name="email" />
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end my-2">
                <label htmlFor="">Password:</label>
              </div>
              <div className="col-6 text-start">
                <input type="password" name="password" />
              </div>
              <div className=" offset-6 col-6 text-start">
                <button className="btn btn-danger mx-2">Submit</button>
                <button className="btn btn-danger">Clear</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
