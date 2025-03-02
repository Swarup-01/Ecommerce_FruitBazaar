import React, { useEffect, useState } from "react";
import ProductPage from "./ProductPage";
import NavBar from "./NavBar";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Product from "./Product";
import CartPage from "./CartPage";
import axios from "axios";
import AdminProductsPage from "./AdminProductsPage";

export function Ecom() {
  let [view, setView] = useState("product");
  let [cnt, setCnt] = useState(0);
  let [CartItems, setCartItems] = useState([]);
  let [totalprice, setTotalPrice] = useState(0);
  let [successmessage, setSuccessMessage] = useState(false);
  let [adminview, setAdminView] = useState("list");
  let [cartmessage, setCartMessage] = useState("");
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

  //local storage operation

   useEffect(() => {
     getDataFromServer();
     //code... get data from backend
     let storedUser = localStorage.getItem("user");
     let storedCart = localStorage.getItem("cartItems");
     let storedTotalPrice = localStorage.getItem("cartItems");
     let storedLoginStatus = localStorage.getItem("cartItems");

     if(storedUser){
      setUser(JSON.parse(storedUser));
      setLoginStatus(storedLoginStatus || "no");
     }

      // if (storedCart) {
      //   setCartItems(JSON.parse(storedCart));
      //   setCnt(JSON.parse(storedCart).length);
      // }

      if(storedTotalPrice){
        setTotalPrice(parseFloat(storedTotalPrice));
      }


   }, []);

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
    console.log(user.role);

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
        let u = filteredData[0];

        localStorage.setItem("user" , JSON.stringify(filteredData[0]));
        localStorage.setItem("loginStatus","success")

        if (u.role == "admin") {
          setView("adminPage");
        } else if (u.role == "user") {
        }
        // addDataToServer(user)
        setSuccessMessage(true);

        setTimeout(() => {
          setSuccessMessage(false);
          console.log("Login Successful");
          setTimeout(() => {
            // setView("product");
          }, 1000);
        }, 1000);
      } else {
        setLoginStatus("failed");
      }
    }
  }

  function handleCartItems() {
    console.log("Cart button clicked");
    console.log(CartItems.length);

    if (!user) {
      setCartMessage("You need to login first!");
      console.log("you need to login first");

      setTimeout(() => {
        setCartMessage("");

        setView("Login");
      }, 1000); // Clear message after 2 seconds
    } else {
      setView("cart");
    }
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
    let index = temp.findIndex((item) => item.id === p.id);

    if (index !== -1) {
      let newProduct = { ...temp[index] };
      newProduct.qty--;

      if (newProduct.qty === 0) {
        setCnt(cnt - 1); // Reduce cart count
        console.log(cnt);

        let updatedCart = CartItems.filter((item) => item.id !== p.id); // Remove item from cart
        setCartItems(updatedCart);

        // ✅ Reset qty in productList
        newProduct.qty = 0;
        temp[index] = newProduct;
        setProductList([...temp]);
        // If cart is empty, reset total price to 0
        if (updatedCart.length === 0) {
          setTotalPrice(0);
        } else {
          setTotalPrice(totalprice - p.mrp * (1 - p.discount / 100));
        }
      } else {
        temp[index] = newProduct;
        setProductList([...temp]);

        let updatedCart = CartItems.map((item) =>
          item.id === p.id ? { ...item, qty: item.qty - 1 } : item
        );
        setCartItems(updatedCart);
        setTotalPrice(totalprice - p.mrp * (1 - p.discount / 100));
      }
    }
  }

  // function handleRemoveFromCart(p) {
  //   let updatedCart = CartItems.filter((item) => item.id !== p.id);

  //   let temp = [...productList];
  //   let index = temp.findIndex((item) => item.id === p.id);
  //   if (index !== -1) {
  //     temp[index].qty = 0; // ✅ Reset qty in productList
  //     setProductList([...temp]);
  //   }

  //   setTotalPrice(totalprice - p.mrp * (1 - p.discount / 100) * p.qty);
  //   setCartItems(updatedCart);
  // }

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

    localStorage.removeItem("user");
    localStorage.removeItem("loginStatus");
    // localStorage.removeItem("cartItems");
    // localStorage.removeItem("totalprice");
    // localStorage.removeItem("cnt");

    //  setView("Login");
  }

  // login click button after signup form
  function handleLoginClick(event) {
    setView(event);
    // setView("product");
    console.log(view);
  }

  // function handleProductListClick() {
  //   setAdminView("adminPage")
  // }

  //Delete Operation--------
  async function getDataFromServer() {
    let response = await axios("http://localhost:3000/fruits");
    let pList = response.data;
    setProductList(pList);
  }

  async function handleDeleteButtonClick(product) {
    console.log("delete button clicked");
    let ans = window.confirm(
      "Do you really want to delete the product " + product.name + "??"
    );

    if (ans == true) {
      let response = await axios.delete(
        "http://localhost:3000/fruits/" + product.id
      );
      let pList = productList.filter((e, index) => e.id !== product.id);
      setProductList(pList);
    } else {
      setMessage("Delete operation cancelled");
    }
  }

  //edit button submit opration......
  async function handleProductEditFormSubmit(product) {
    let response = await axios.put(
      "http://localhost:3000/fruits/" + product.id,
      product
    );
    let pList = productList.map((e, index) => {
      if (e.id == product.id) {
        return product;
      } else {
        return e;
      }
    });
    setProductList(pList);
  }

  async function handleProductAddFormSubmit(product) {
    let response = await axios.post("http://localhost:3000/fruits", product);
    let pList = productList.push(product);
    setProductList(pList);
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
          loginStatus={loginStatus}
          cartmessage={cartmessage}
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
          <CartPage
            onCartItems={handleCartItems}
            CartItems={CartItems}
            view={view}
            cartmessage={cartmessage}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}

        {view == "adminPage" && (
          <AdminProductsPage
            productList={productList}
            onDeleteButtonClick={handleDeleteButtonClick}
            onProductEditFormSubmit={handleProductEditFormSubmit}
            onProductAddFormSubmit={handleProductAddFormSubmit}
          />
        )}
      </div>
    </>
  );
}
