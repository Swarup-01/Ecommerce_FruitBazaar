import Product from "./Product";

export default function ProductPage(props) {
  let { productList } = props;


 function handleAddToCart(p) {
   props.onAddToCart(p);
 }
 function handleIncrement(p) {
   props.onIncrement(p);
 }
 function handleDecrement(p) {
   props.onDecrement(p);
 }


  return (
    <>
      {
        <div className="container-fluid myborder">
          <div className="row product">
            {productList.map((e, index) => (
              <Product
                p={e}
                key={index}
                onAddToCart = {handleAddToCart}
                onIncrement={handleIncrement}
                onDecrement = {handleDecrement}

              />
            ))}
          </div>
        </div>
      }
    </>
  );
}
