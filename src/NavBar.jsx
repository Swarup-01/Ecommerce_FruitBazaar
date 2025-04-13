import { useState } from "react";

export default function NavBar(props) {
  //  let [View, setView] = useState("Product");
  
  let { cnt } = props;
  let { p } = props;
  // let { totalprice } = props;
  //  let { cItems } = props;
  let { cItems = [] } = props;
  let totalprice = cItems.reduce((sum, item) => {
    const discounted = item.mrp * (1 - item.discount / 100);
    return sum + item.qty * discounted;
  }, 0);


  let { view } = props;
  let { user } = props;
  let {loginStatus} = props;
  let {cartmessage} = props;


 
  //  console.log(cItems[0]);
  //console.log(totalprice);

  //  for(let i=0; i<cItems.length ; i++){
  //     totalprice = totalprice + cItems[i].qty * cItems[i].mrp;

  //  }
  //  console.log(totalprice);

  function handleFormButtonClick(view) {
    props.onFormButtonClick(view);
  }
  function handleCartItems() {
    props.onCartItems();
   }
  function handleLogoutClick(){
    props.onLogoutClick()
  }

  return (
    <>
      <div className="row myborder align-items-center ">
        <div className="col-2">
          <button
            className="logobtn "
            onClick={() => handleFormButtonClick("product")}
          >
            <img src="./shop_logo.jpg" alt="shopLogo" />
          </button>
        </div>

        {/* login success message */}
        <div className="col-2">
          {loginStatus == "success" && (
          <div className="text-center text-dark">
            Welcome <h1>{user.UserName}</h1> start shopping...
          </div>
            )} 

          {loginStatus == "failed" && (
            <div className="text-center text-danger">
              Sorry... Wrong Credentials
            </div>
          )}

          {cartmessage && (
            <div className="text-danger text-center ">{cartmessage}</div>
          )}
        </div>

        <div className=" col-sm-12 col-lg-6 justify-content-center my-5">
          {/* if user is filled its information successfully then show them logout button for exit */}
          {user ? (
            <button
              className="btn btn-primary m-2"
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
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary m-2 "
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "0.3s",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => {
                  handleFormButtonClick("SignUp");
                }}
              >
                SignUp
              </button>
              <button
                className="btn btn-primary m-2"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "0.3s",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => {
                  handleFormButtonClick("Login");
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
        <div className=" cart col-sm-12 col-lg-1">
          <div className="">
            <button
              className="cartbtn"
              onClick={() => {
                handleCartItems("cart");
              }}
            >
              <i className="bi bi-cart3 fs-1 ">{cnt}</i>
            </button>
            <div className="text-center">Rs. {totalprice}</div>
          </div>
        </div>
      </div>

      {/* sign up form */}

      {/* Login-form */}
    </>
  );
}
