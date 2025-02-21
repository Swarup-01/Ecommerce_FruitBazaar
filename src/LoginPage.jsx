export default function LoginPage(props) {
  let { loginStatus } = props;
  let { user } = props;

  function handleLoginFormSubmit(event) {
    event.preventDefault();
    props.onLoginFormSubmit(event);
    console.log(user);
  }

  return (
    <>
      {loginStatus == "success" && (
        <div className="text-center text-danger">
          <h3>Login Successful...</h3>
          <h3>Welcome {user.UserName}, Start Shopping!!!</h3>
        </div>
      )}

      {loginStatus == "failed" && (
        <div className="text-center text-danger">
          Sorry... Wrong Credentials
        </div>
      )}

      {(loginStatus == "failed" || loginStatus == "no") && (
        <div className="row login-container">
          <form action="" onSubmit={handleLoginFormSubmit}>
            <h2> Welcome To Login Form</h2>

            <div className="row">
              <div className="col-6 text-end my-2">
                <label htmlFor="">Username:</label>
              </div>
              <div className="col-6 text-start my-2">
                <input type="name" name="UserName" />
              </div>
            </div>
            <div className="row">
              <div className="col-6 text-end my-2">
                <label htmlFor="">EmailId:</label>
              </div>
              <div className="col-6 text-start my-2">
                <input type="email" name="email" />
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                <label htmlFor="">Password:</label>
              </div>
              <div className="col-6 text-start">
                <input type="password" name="password" />
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
                {/* <button className="btn btn-danger mx-2">Ok</button>
                <button className="btn btn-danger my-3">Clear</button> */}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
