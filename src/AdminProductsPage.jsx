import { useState } from "react";
import AdminProduct from "./AdminProduct";
import AdminProductForm from "./AdminProductForm";

export default function AdminProductsPage(props) {
  let [adminview, setAdminView] = useState("list");
  let [adminSelectedProduct, setAdminSelectedProduct] = useState("");
  let [message, setMessage] = useState("");

  //
  let { productList } = props;
  //    let filteredProductList = [...productList];

  function handleAddProductClick() {
    console.log(adminview);
    setAdminView("add");
  }

  function handleProductListClick() {
    setAdminView("list");
    console.log(adminview);
  }

  //edit operation..........
  function handleEditButtonClick(product) {
    setAdminView("edit");
    setAdminSelectedProduct(product);
    console.log("edit button clicked" + product.name);
  }

  function handleDeleteButtonClick(product) {
    props.onDeleteButtonClick(product);
  }
  function handleProductEditFormSubmit(product) {
    props.onProductEditFormSubmit(product);
  }

  function handleProductAddFormSubmit(product) {
    props.onProductAddFormSubmit(product);
  }

  return (
    <>
      {adminview == "list" && (
        <button
          className=" btn btn-primary my-2"
          onClick={handleAddProductClick}
        >
          Add a product
        </button>
      )}
      <div className="container-fluid myborder">
        <div className="row product">
          {adminview == "list" &&
            productList.map((e, index) => (
              <AdminProduct
                product={e}
                key={index}
                onEditButtonClick={handleEditButtonClick}
                onDeleteButtonClick={handleDeleteButtonClick}
              />
            ))}
          {(adminview == "edit" || adminview == "add") && (
            <AdminProductForm
              adminview={adminview}
              product={adminSelectedProduct}
              onProductListClick={handleProductListClick}
              onProductEditFormSubmit={handleProductEditFormSubmit}
              onProductAddFormSubmit={handleProductAddFormSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
}
