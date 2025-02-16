import React, { useState } from "react";
import ProductPage from "./ProductPage";
import NavBar from "./NavBar";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Product from "./Product";

export function Ecom() {
  let [view, setView] = useState("product");
  let [cnt, setCnt] = useState(0);
  let [CartItems, SetCartItems] = useState([]);
  let [totalprice, setTotalPrice] = useState(0);
  // let [Dprice,setDprice] = useState(0)

  let pList = [
    {
      id: "2",
      name: "Alphanso Mango",
      image: "mango.jpg",
      unit: "doz",
      mrp: "500",
      discount: "20",
      inStock: true,
      qty: 0,
      type: "Organic",
      finalPrice: 540,
    },
    {
      id: "4",
      name: "Apple",
      image: "apple.jpg",
      unit: "kg",
      mrp: "200",
      discount: 7,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
      finalPrice: 186,
    },
    {
      id: "5",
      name: "Anjeer",
      image: "anjeer.jpg",
      unit: "kg",
      mrp: 100,
      discount: 0,
      inStock: true,
      qty: 0,
      type: "Organic",
    },
    {
      id: "6",
      name: "Strawberry",
      image: "strawberry.jpg",
      unit: "kg",
      mrp: 200,
      discount: 20,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "7",
      name: "Papaya",
      image: "papaya.jpg",
      unit: "kg",
      mrp: 50,
      discount: 15,
      inStock: true,
      qty: 0,
      type: "Organic",
    },
    {
      id: "8",
      name: "Cherry",
      image: "cherry.jpg",
      unit: "kg",
      mrp: 300,
      discount: 5,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "9",
      name: "Chikoo",
      image: "Chikoo.jpg",
      unit: "kg",
      mrp: 60,
      discount: 5,
      inStock: false,
      qty: 0,
      type: "Organic",
    },
    {
      id: "10",
      name: "Kiwi",
      image: "Kiwi.jpg",
      unit: "piece",
      mrp: 20,
      discount: 0,
      inStock: false,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "11",
      name: "Orange",
      image: "orange.jpg",
      unit: "kg",
      mrp: 200,
      discount: 10,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "12",
      name: "Pear",
      image: "pear.jpg",
      unit: "kg",
      mrp: "250",
      discount: 7,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
      finalPrice: 186,
    },
    {
      id: "13",
      name: "Pineapple",
      image: "pineapple.jpg",
      unit: "piece",
      mrp: "80",
      discount: "0",
      inStock: true,
      qty: 0,
      type: "Non-Organic",
      finalPrice: 90,
    },
    {
      id: "14",
      name: "Pomegranete",
      image: "pomegranete.jpg",
      unit: "kg",
      mrp: 200,
      discount: 5,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "15",
      name: "Sitaphal",
      image: "sitaphal.jpg",
      unit: "kg",
      mrp: 100,
      discount: 10,
      inStock: true,
      qty: 0,
      type: "Organic",
    },
    {
      id: "16",
      name: "Watermelon",
      image: "watermelon.jpg",
      unit: "piece",
      mrp: 80,
      discount: 50,
      inStock: true,
      qty: 0,
      type: "Organic",
    },
    {
      id: "17",
      name: "Sweetlime",
      image: "sweetlime.jpg",
      unit: "kg",
      mrp: 200,
      discount: 5,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "18",
      name: "Peach",
      image: "peach.jpg",
      unit: "kg",
      mrp: 200,
      discount: 10,
      inStock: false,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "19",
      name: "Dragon",
      image: "dragon.jpg",
      unit: "piece",
      mrp: 60,
      discount: 0,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
  ];
  let [FilteredList, setFilteredList] = useState(pList);
  let [productList, setProductList] = useState(pList);
  

  function handleAddButtonClick(p, action) {
    // addtocart
    let temp = [...productList];
    let index = temp.indexOf(p);
    let Tprice = 0;
    //  cItems.push(p);
    //  SetCartItems(cItems);
    if (action == "+") {
      temp[index].qty++;
      setProductList(temp);
      setCnt(cnt + 1);
    } else if (action == "-") {
      temp[index].qty--;
      setProductList(temp);
      setCnt(cnt - 1);
    }

    let cItems = [...CartItems];
    // whenever +,- clicked
    if (p.qty == 0) {
      cItems = cItems.filter((e, index) => e.id != p.id);
      SetCartItems(cItems);
    } else {
      if (p.qty == 1) {
        cItems.push(p);
      } else {
        cItems = cItems.map((e, index) => {
          if (e.id == p.id) {
            return p;
          } else {
            return e;
          }
        });
      }
    }

    SetCartItems(cItems);
    if (cItems.length != 0) {
      for (let i = 0; i < cItems.length; i++) {
        Tprice =
          Tprice +
          (cItems[i].mrp - cItems[i].discount * 0.01 * cItems[i].mrp) *
            cItems[i].qty;
        console.log(Tprice);
      }
    } 
    else 
    { Tprice = 0;}
    setTotalPrice(Tprice);
  }
  

  function handleFormButtonClick(view) {
    setView(view);
  }

   

  return (
    <>
      <div className="content-page ">
        <NavBar
          onFormButtonClick={handleFormButtonClick}
          cnt={cnt}
          totalprice={totalprice}
          cItems={CartItems}
          
        />
        {view == "SignUp" && <SignUpPage onClick={handleFormButtonClick} />}
        {view == "Login" && <LoginPage onClick={handleFormButtonClick} />}
        {view == "product" && (
          <ProductPage
            productList={productList}
            onFormButtonClick={handleFormButtonClick}
            onAddButtonClick={handleAddButtonClick}
          />
        )}
      </div>
    </>
  );
}
