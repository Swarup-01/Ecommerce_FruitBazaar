export default function CartPage(props){
    let {view} = props;
    let {p} = props;
    let {CartItems} = props;
    function handleCartItems(){
        props.onClick();
         console.log("....");
         console.log(CartItems.length);
    }
    return (
      <>
      <h3>You are now in cart page</h3>
      
        <div className="text-center" onClick={handleCartItems}>{CartItems.length}</div>
        

      </>
    );

}