export default function BillLink(props){
//  let {user} = props;
//  let { CartItems} = props;
let {bill} = props;


 const formatCurrency = (amount) => {
   return amount.toLocaleString("en-IN", {
     maximumFractionDigits: 2,
     minimumFractionDigits: 2,
   });
 };
 const calculateDiscountedPrice = (mrp, discount) => {
   return mrp * (1 - discount / 100);
 };
console.log(bill);


    return (
  <>
    <div className="container-fluid p-3">
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
              {/* <div className="h6">Date: {currentDate}</div> */}
            </div>

            <div className="col-12 col-md-6 text-end mt-3 mt-md-0">
              <div className="fw-bold" style={{ fontSize: "1.2rem" }}>
                Bill To:
              </div>
              <div className="me-2" style={{ fontSize: "1rem" }}>
                {bill.customer}
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
                {bill.soldProducts.map((e, index) => {
                  const discountedPrice = calculateDiscountedPrice(
                    e.mrp,
                    e.discount
                  );
                  const totalPrice = discountedPrice * e.qty;
                  return (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{e.name}</td>
                      <td>{bill.price}</td>
                      <td>{e.qty}</td>
                      <td>{bill.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row mt-3">
            <div className="col-6 text-end h5">Grand Total:</div>
            <div className="col-6 text-start h5">
              Rs. {bill.amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}
