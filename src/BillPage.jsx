import React, { useState } from "react";
import { addBillsToBackend } from "./FireBaseBillsService";
import {
  getLastBillNumberFromBackend,
  updateBackendLastBillNumber,
} from "./FireBaseLastBillNumberService";
import { BeatLoader, PacmanLoader, RingLoader } from "react-spinners";
// import { updateBackendProduct } from "./FirebaseProductServices";
import { logEvent } from "firebase/analytics";
// import {getProductsFromBackend} from './FirebaseProductServices';

export default function BillPage(props) {
  let { CartItems } = props;
  // let { totalprice } = props;
  let { name } = props;
  let { user } = props;
  let { message } = props;
  console.log(user);
 // console.log("Total Price:", totalprice, typeof totalprice);

  // let [price,setPrice]=useState("")
  // const phonenumber = 8999181372;

  let totalprice = CartItems.reduce((acc, item) => {
    let discounted = item.mrp * (1 - item.discount / 100);
    return acc + discounted * item.qty;
  }, 0);

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return "0.00";
    return amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const calculateDiscountedPrice = (mrp, discount) => {
    return mrp * (1 - discount / 100);
  };
  let [flagLoader, setFlagLoader] = useState(false);
  const currentDate = new Date().toLocaleDateString();
  async function handleBillCreateClick() {
    setFlagLoader(true);
    let b = await getLastBillNumberFromBackend();
    let currentBillNumber = b.lastbillnumber + 1;
    console.log(currentBillNumber);

    let BillObj = {};
    BillObj.billNumber = currentBillNumber;
    BillObj.customer = user.UserName;
    BillObj.date = new Date();
    BillObj.amount = totalprice;
    console.log(totalprice);
    
    BillObj.soldProducts = CartItems;
    console.log(BillObj);
    
    BillObj = await addBillsToBackend(BillObj);
     console.log(BillObj);

    b.lastbillnumber = currentBillNumber;
    console.log(b);
    
    await updateBackendLastBillNumber(b);
    let billId = BillObj.id;
    console.log(billId);

    window.localStorage.setItem("cartItems", JSON.stringify([]));
    let message = `I am ${user.UserName}.My Bill Number is ${currentBillNumber}.Its link is ${window.location}?id=${billId} `;
    // let billUrl = https://siddreactapp1.netlify.app/?id=${billId};
    // let message = I am ${user.name}.My Bill Number is ${currentBillNumber}.Its link is ${billUrl};
    // let encodedMessage = encodeURIComponent(message);
    setFlagLoader(false);
    console.log(message);

    window.location =`http://api.whatsapp.com/send?phone=9527454072&text=${message}`;
  }
  if (flagLoader) {
    return (
      <div className=" justify-content-center d-flex my-3">
        <RingLoader size={50} color={"green"} className="text-center" />
      </div>
    );
  }
 

return (
  <>
    <div className="container-fluid p-3">
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <button className="btn btn-success" onClick={handleBillCreateClick}>
            Share Bill on WhatsApp
          </button>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="row mb-3">
            <div className="col-12 col-md-6 text-start">
              <h1
                className="fw-bold"
                style={{
                  fontSize: "2.5rem",
                  color: "#28a745",
                  letterSpacing: "1px",
                }}
              >
                FruitBazaar
              </h1>
              <div className="h6 mb-0">Ahilyanagar, Maharashtra</div>
              <div className="h6">Date: {currentDate}</div>
            </div>

            <div className="col-12 col-md-6 text-end mt-3 mt-md-0">
              <div className="fw-bold" style={{ fontSize: "1.2rem" }}>
                Bill To:
              </div>
              <div className="me-2" style={{ fontSize: "1rem" }}>
                {user.UserName}
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Sr.no</th>
                  <th>Product</th>
                  <th>Rate</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {CartItems.map((e, index) => {
                  const discountedPrice = calculateDiscountedPrice(
                    e.mrp,
                    e.discount
                  );
                  const totalPrice = discountedPrice * e.qty;
                  return (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{e.name}</td>
                      <td>{formatCurrency(discountedPrice)}</td>
                      <td>{e.qty}</td>
                      <td>{formatCurrency(totalPrice)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row mt-3">
            <div className="col-6 text-end h5">Grand Total:</div>
            <div className="col-6 text-start h5">
              Rs. {formatCurrency(Number(totalprice || 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

}




 //  async function calculateTotal(){
  //   setFlagLoader(true)
  //   let list=await getProductsFromBackend()
  //   setFlagLoader(false)
  //   let total = 0;

  //     list.forEach((e, index) => {
  //       total += e.totalprice * e.qty;
  //     });
  //     setPrice(total)
  //   //   setTotalPrice(total);
  //   return price
  // }

//   return (
//     <>
//       <div className="my-4 p-5 myborder"></div>

//       <div className=" col-12    col-lg-12   text-center myborder">
//         <button className="btn log btn-success" onClick={handleBillCreateClick}>
//           Share Bill on WhatsApp
//         </button>
//       </div>

//       <div className="row myborder ">
//         <div className="col-2"></div>
//         <div className="col-8 ">
//           <div className="row">
//             <div className="col-4 h1 myborder text-start mx-2 ">
//               {" "}
//               FruitBazaar{" "}
//               <div className="text-start h5 myborder">Date: {currentDate} </div>
//             </div>
//             <div className=" h6 col-4 p-2 my-2 myborder text-start ">
//               Ahilyanagar, Maharashtra
//             </div>
//             <div className="h5 col-3  text-end myborder">
//               <span style={{ fontSize: "30px" }}>Bill To:</span> {user.UserName}
//               {/* Email:{user.email} */}
//             </div>
//           </div>

//           <div className="myborder">
//             <table className="myborder">
//               <thead className="myborder">
//                 <tr className="myborder">
//                   <th className="myborder px-4 py-2 col-2">Sr.no</th>
//                   <th className="myborder px-4 py-2 col-2">Product</th>
//                   <th className="myborder px-4 py-2 col-2">Rate</th>
//                   <th className="myborder px-4 py-2 col-2">Quantity</th>
//                   <th className="myborder px-4 py-2 col-2">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {CartItems.map((e, index) => {
//                   const discountedPrice = calculateDiscountedPrice(
//                     e.mrp,
//                     e.discount
//                   );
//                   const totalPrice = discountedPrice * e.qty;
//                   return (
//                     <tr key={index} className="text-center">
//                       <td className="myborder px-4 py-2">{index + 1}</td>
//                       <td className="myborder px-4 py-2">{e.name}</td>
//                       <td className="myborder px-4 py-2">
//                         {formatCurrency(discountedPrice)}
//                       </td>
//                       <td className="myborder px-4 py-2">{e.qty}</td>
//                       <td className="myborder px-4 py-2">
//                         {formatCurrency(totalPrice)}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//             <div className="row  my-1 myborder">
//             <div className="col-9  text-end  col-lg-9 h5 myborder">
//               Grand Total :{" "}
//             </div>
//             <div className="col-3 col-lg- text-start  ps-0 align-items-center  p-1 h6 myborder">
//               {/* Rs. {totalprice.toFixed(0)}{" "} */}
//               Rs{formatCurrency(totalprice)}
//             </div>
//           </div>
//           </div>  
//         </div>
//         <div className="col-2"></div>
//       </div>

    
//     </>
//   );
