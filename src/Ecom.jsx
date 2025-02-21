import React, { useEffect, useState } from "react";
import ProductPage from "./ProductPage";
import NavBar from "./NavBar";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Product from "./Product";
import CartPage from "./CartPage";
import axios from "axios";

export function Ecom() {
  let [view, setView] = useState("product");
  let [cnt, setCnt] = useState(0);
  let [CartItems, setCartItems] = useState([]);
  let [totalprice, setTotalPrice] = useState(0);
  let [successmessage, setSuccessMessage] = useState(false);
  // let [islogin, setIsLogin] = useState(loginStatus=="success");
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
  let [signupStatus, setSignupStatus] = useState("no");
  let [loginStatus, setLoginStatus] = useState("no");
  let [message, setMessage] = useState("");
  let [target, setTarget] = useState("");
  let [user, setUser] = useState("");

  //  useEffect(() => {
  //    //code... get data from backend
  //    addDataToServer(user);
  //  }, []);

  //Sign-up operations...
  function handleSignupFormSubmit(event) {
    let formData = new FormData(event.target);
    let user = {};
    for (let data of formData) {
      user[data[0]] = data[1];
    }
    user["role"] = "user";
    console.log(user);
    checkUserExists(user);
  }

  async function checkUserExists(user) {
    let response = await axios("http://localhost:3000/users");
    let data = await response.data;
    let filteredData = data.filter((e, index) => e.email == user.email);
    if (filteredData.length >= 1) {
      console.log("Already Exists");
      setSignupStatus("failed");
      setMessage("Sorry... This email-id is already registered.");
    } else {
      console.log("new user");
      addUser(user);
      // addDataToServer(user)
    }
  }
  async function addUser(user) {
    let response = await axios.post("http://localhost:3000/users", user);
    setSignupStatus("success");
  }

  //Login Operation
  function handleLoginFormSubmit(event) {
    let formData = new FormData(event.target);
    let user = {};
    for (let data of formData) {
      user[data[0]] = data[1];
    }
    console.log("ok");
    console.log(user);
    setUser(user);

    checkUser(user);

    async function checkUser(props) {
      let response = await axios("http://localhost:3000/users");
      let data = await response.data;
      let filteredData = data.filter(
        (e, index) => e.email == user.email && e.password == user.password
      );
      if (filteredData.length == 1) {
        setLoginStatus("success");
        setUser(filteredData[0]);
        // addDataToServer(user)
        setSuccessMessage(true);

        setTimeout(() => {
          setSuccessMessage(false);
          console.log("Login Successful");
          setTimeout(() => {
            setView("product");
          }, 1000);
        }, 1000);
      } else {
        setLoginStatus("failed");
      }
    }
  }

  // async function addDataToServer(user) {
  //   let response = await axios("http://localhost:3000/users",user);
  //   console.log(response.data);

  // }

  function handleCartItems(view) {
    console.log("Cart button clicked");
    setView("cart");
    console.log(CartItems.length);
  }

  //Handle Add to cart operation
  function handleAddToCart(p) {
    console.log(CartItems);

    let temp = [...productList];
    let index = temp.indexOf(p);
    let newProduct = { ...temp[index] };

    if (newProduct.qty === 0) {
      newProduct.qty++;
      setCnt(cnt + 1);
      temp[index] = newProduct;
      setProductList([...temp]);

      setCartItems([...CartItems, newProduct]);
      setTotalPrice(
        totalprice + newProduct.mrp * (1 - newProduct.discount / 100)
      );
    }
    let updatedCart;
    if (CartItems && CartItems.length > 0) {
      updatedCart = [...CartItems];
    } else {
      updatedCart = [];
    }
    updatedCart.push(newProduct);
    setCartItems(updatedCart);
  }
  //Handle "+"
  function handleIncrement(p) {
    let temp = [...productList];
    let index = temp.indexOf(p);
    let newProduct = { ...temp[index] };
    newProduct.qty++;
    temp[index] = newProduct;
    setProductList([...temp]);

    //Update Cart Items and total price
    let updatedCart = CartItems.map((item) =>
      item.id === p.id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updatedCart);

    setTotalPrice(totalprice + p.mrp * (1 - p.discount / 100));
    console.log(updatedCart);
  }
  //Handle "-"
  function handleDecrement(p) {
    let temp = [...productList];
    let index = temp.indexOf(p);
    let newProduct = { ...temp[index] };
    newProduct.qty--;
    temp[index] = newProduct;
    setProductList([...temp]);

    let updatedCart;
    console.log(updatedCart);

    if (newProduct.qty === 0) {
      setCnt(cnt - 1); // Reduce cart count
      updatedCart = CartItems.filter((item) => item.id !== p.id); // Remove item from cart
    } else {
      updatedCart = CartItems.map((item) =>
        item.id === p.id ? { ...item, qty: item.qty - 1 } : item
      );
    }

    setCartItems(updatedCart);

    // If cart is empty, reset total price to 0
    if (updatedCart.length === 0) {
      setTotalPrice(0);
    } else {
      setTotalPrice(totalprice - p.mrp * (1 - p.discount / 100));
    }
    console.log(updatedCart);
  }

  //Sign_UP & Login Button Handle
  function handleFormButtonClick(view) {
    console.log(view);
    setView(view);
  }

  //handle logout button clicked
  function handleLogoutClick() {
    setUser(null); // Clear user data
    setView("product");
    setLoginStatus("no"); // Reset login status
    setSignupStatus("no"); // Reset signup status (if needed)
    setMessage(""); // Clear any messages

    //  setView("Login");
  }

  // login click button after signup form
  function handleLoginClick(event) {
    setView(event);
    // setView("product");
    console.log(view);
  }

  return (
    <>
      <div className="content-page ">
        <NavBar
          onFormButtonClick={handleFormButtonClick}
          onCartItems={handleCartItems}
          cnt={cnt}
          totalprice={totalprice}
          cItems={CartItems}
          user={user}
          onLogoutClick={handleLogoutClick}
        />
        {view == "SignUp" && (
          <SignUpPage
            onClick={handleFormButtonClick}
            onSignupFormSubmit={handleSignupFormSubmit}
            view={view}
            signupStatus={signupStatus}
            onLoginClick={handleLoginClick}
          />
        )}
        {view == "Login" && (
          <LoginPage
            onClick={handleFormButtonClick}
            loginStatus={loginStatus}
            onLoginFormSubmit={handleLoginFormSubmit}
            user={user}
            view={view}
            onLoginClick={handleLoginClick}
          />
        )}
        {view == "product" && (
          <ProductPage
            productList={productList}
            onFormButtonClick={handleFormButtonClick}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}
        {view == "cart" && (
          <CartPage onCartItems={handleCartItems} CartItems={CartItems}  />
        )}
      </div>
    </>
  );
}
