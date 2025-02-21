import { useState } from "react";

export default function NavBar(props) {
  //  let [View, setView] = useState("Product");
  let { cnt } = props;
  let { p } = props;
  let { totalprice } = props;
  let { view } = props;
  let { user } = props;

  let { cItems } = props;
  //  console.log(cItems[0]);
  console.log(totalprice);

  //  for(let i=0; i<cItems.length ; i++){
  //     totalprice = totalprice + cItems[i].qty * cItems[i].mrp;

  //  }
  //  console.log(totalprice);

  function handleFormButtonClick(view) {
    props.onFormButtonClick(view);
  }
  function handleCartItems() {
    props.onCartItems(view);
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
        <div className=" col-sm-12 col-lg-8 justify-content-center my-5 ">

          {/* if user is filled its information successfully then show them logout button for exit */}
          {user ? (
            <button
              className="btn btn-primary m-2"
              onClick= {
                handleLogoutClick
              }
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary m-2 "
                onClick={() => {
                  handleFormButtonClick("SignUp");
                }}
              >
                SignUp
              </button>

              <button
                className="btn btn-primary m-2"
                onClick={() => {
                  handleFormButtonClick("Login");
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
        <div className=" cart col-sm-12 col-lg-1 ">
          <div className="cartbtn">
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
