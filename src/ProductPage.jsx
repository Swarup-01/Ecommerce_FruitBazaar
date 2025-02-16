import Product from "./Product";

export default function ProductPage(props) {
  let { productList } = props;

  function handleAddButtonClick(p,action){
    props.onAddButtonClick(p,action)

  }
  
  return (
    <>
      {
        <div className="container-fluid myborder">
          <div className="row product row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {productList.map((e, index) => (
              <Product
                p={e}
                key={index}
                onAddButtonClick={handleAddButtonClick}
              />
            ))}
          </div>
        </div>
      }
    </>
  );
}
