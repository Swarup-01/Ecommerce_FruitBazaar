import { useState } from "react";

export default function NavBar(props) {


    //  let [View, setView] = useState("Product");
     let {cnt}=props;
     let {p} = props;
     let {totalprice} = props

     let {cItems} = props;
     console.log(cItems[0]);
     console.log(totalprice);
     
    
    //  for(let i=0; i<cItems.length ; i++){
    //     totalprice = totalprice + cItems[i].qty * cItems[i].mrp;

    //  }
    //  console.log(totalprice);
     
    
    function handleFormButtonClick(view){
        props.onFormButtonClick(view);

}
    
    
  return (
    <>
      <div className="row myborder align-items-center">
        <div className="col-2 myborder">
          <button
            className="logobtn "
            onClick={() => handleFormButtonClick("product")}
          >
            <img src="./shop_logo.jpg" alt="shopLogo" />
          </button>
        </div>
        <div className="col-8 myborder justify-content-center my-5">
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
        </div>
        <div className="col-2 cart myborder">
        
                <div className="cartbtn">
             <i className="bi bi-cart3 fs-1 " >{cItems.length}</i>
            <div className="text-center">Rs. {totalprice}</div>
             </div>
            
        </div>
      </div>

      {/* sign up form */}

      {/* Login-form */}
    </>
  );
}
