export default function SignUpPage() {
  return (
    <>
      <div className="row signup-container">
        <form action="">
          <h2> Welcome To Sign-Up Form</h2>

          <div className="row">
            <div className="col-6 text-end">
              <label htmlFor="">UserName:</label>
            </div>
            <div className="col-6 text-start">
              <input type="text" />
            </div>
          </div>

          <div className="row">
            <div className="col-6 text-end">
              <label htmlFor="">EmailId:</label>
            </div>
            <div className="col-6 text-start">
              <input type="email" />
            </div>
          </div>

          <div className="row">
            <div className="col-6 text-end">
              <label htmlFor="">Password:</label>
            </div>
            <div className="col-6 text-start">
              <input type="password" />
            </div>
            <div className=" offset-6 col-6 text-start">
              <button className="btn btn-danger">Submit</button>
              <button className="btn btn-danger">Clear</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
