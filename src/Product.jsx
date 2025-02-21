import React, { useState } from "react";
//rafc

export default function Product(props) {
  let { p } = props;
  let { cItems } = props;

  let Dprice = p.mrp - p.discount * 0.01 * p.mrp;

  // function handleAddButtonClick(action) {
  //   props.onAddButtonClick(p, action);
  //   console.log(p);
  // }
  function handleAddToCart(){
    props.onAddToCart(p)

  }
  function handleIncrement(){
    props.onIncrement(p)

  }
  function handleDecrement(){
     props.onDecrement(p)

  }


  return (
    <>
      {
        <div className=" col-12 col-sm-6 col-md-4 col-lg-3 text-center mx-auto p-2 my-2 ">
          <div className="myborder p-3 product1">
            {p.discount > 0 && (
              <div className="discount p-2"> {p.discount}%</div>
            )}
            <div className="image-container">
              {" "}
              <img
                src={"./productImages/" + p.image}
                alt={p.name}
                className="img-fluid  p-3"
              />
            </div>
            <h4>Fruit Name: {p.name}</h4>
            {p.discount == 0 && (
              <p>
                Price: ₹{p.mrp} per {p.unit}
              </p>
            )}

            {p.discount != 0 && (
              <p>
                Rs.{" "}
                <span className="text-decoration-line-through">{p.mrp} </span>
                {Dprice} - per {p.unit}
              </p>
            )}
            <p>Type: {p.type}</p>
            <p>In Stock: {p.inStock ? "Yes" : "No"}</p>

            {p.qty == 0 && p.inStock && (
              <button
                className="btn btn-success"
                onClick={() => {
                  handleAddToCart(p);
                }}
              >
                Add To Cart
              </button>
            )}
            {!p.inStock && (
              <button className="btn btn-secondary">Out Of Stock</button>
            )}

            {p.qty != 0 && (
              <div className="text-center mx-auto">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleIncrement(p);
                  }}
                >
                  +
                </button>{" "}
                {p.qty}
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleDecrement(p);
                  }}
                >
                  -
                </button>
              </div>
            )}
            <div>{p.qty > 0 && <p>{Dprice * p.qty}</p>}</div>
          </div>
        </div>
      }
    </>
  );
}
