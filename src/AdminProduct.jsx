import { useState } from "react";

export default function AdminProduct(props) {
  let { product } = props;
  let { cItems } = props;


  let Dprice = product.mrp - product.discount * 0.01 * product.mrp;

  function handleIncrement() {
    props.onIncrement(product);
  }
  function handleDecrement() {
    props.onDecrement(product);
  }

  function handleEditButtonClick() {
    props.onEditButtonClick(product);

  }

  function handleDeleteButtonClick(){
    // let flag=confirm("");

    props.onDeleteButtonClick(product);
  }

  return (
    <>
      {
        <div className=" col-12 col-sm-6 col-md-4 col-lg-3 text-center mx-auto p-2 my-2 ">
          <div className="myborder p-3 product1">
            {product.discount > 0 && (
              <div className="discount p-2"> {product.discount}%</div>
            )}
            <div className="image-container">
              {" "}
              <img
                src={"./productImages/" + product.image}
                alt={product.name}
                className="img-fluid  p-3"
              />
            </div>
            <h4>Fruit Name: {product.name}</h4>
            {product.discount == 0 && (
              <p>
                Price: ₹{product.mrp} per {product.unit}
              </p>
            )}

            {product.discount != 0 && (
              <p>
                Rs.{" "}
                <span className="text-decoration-line-through">
                  {product.mrp}{" "}
                </span>
                {Dprice} - per {product.unit}
              </p>
            )}
            <p>Type: {product.type}</p>
            <p>In Stock: {product.inStock ? "Yes" : "No"}</p>

            {/* {p.qty == 0 && p.inStock && (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleAddToCart(p);
                  }}
                >
                  Add To Cart
                </button>
              )} */}

            {product.qty == 0 && (
              <div className="text-center">
                <button
                  className="button mx-3 my-2"
                  onClick={handleEditButtonClick}
                >
                  <i className="bi bi-pen-fill"></i>
                </button>
                <button
                  className="button mx-3 my-2"
                  onClick={handleDeleteButtonClick}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            )}
            {!product.inStock && (
              <button className="btn btn-secondary">Out Of Stock</button>
            )}

            
            <div>{product.qty > 0 && <p>{Dprice * product.qty}</p>}</div>
          </div>
        </div>
      }
    </>
  );
}
