export default function LoginPage(props) {
  let {loginStatus} = props;
  let {user} = props;
  
  
  
  function handleLoginFormSubmit(event){
    event.preventDefault();
    props.onLoginFormSubmit(event);
    console.log(user);
    
    
    
  }
 
  return (
    <>
      {loginStatus == "success" && (
        <div className="text-center text-danger">
          Login Successfull....welcome {user.name}
         
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
                <button className="btn btn-danger mx-2">Ok</button>
                <button className="btn btn-danger my-3">Clear</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
