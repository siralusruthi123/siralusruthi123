import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "./Store";

function Cart() {
    // Use the selector to get the cart items from the Redux store
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  
    // Map through the items to display them or show a message if the cart is empty
    const itemsList = cartItems.length > 0 ? (
        cartItems.map((item) => (
            <li key={item.name}>
                {item.name}, ${(item.price * item.quantity).toFixed(2)}, Quantity: {item.quantity}
                <button onClick={() => dispatch(incrementQuantity({ name: item.name }))}>+</button>
                <button onClick={() => dispatch(decrementQuantity({ name: item.name }))}>-</button>
                <button onClick={() => dispatch(removeFromCart({ name: item.name }))}>Remove</button>
            </li>
        ))
    ) : (
        "Cart is empty"
    );

    // Discount calucation using useState
    const [disperce, setDisPerc] = useState(0);
    
    const handleDisPercentage = (dvalue) => {
        // Store as a fraction for calculations
        setDisPerc(dvalue / 100); 
    };
    const[couponCode,setCouponCode]=useState('');
    const[couponDiscountPercentage,setCouponDiscountPercentage]=useState(0);
    const handleApplyCoupon=()=>{
        switch (couponCode){
        case "SRUTHI10":
            setCouponDiscountPercentage(10);
            break;
        case "SRUTHI20":
            setCouponDiscountPercentage(20);
            break;
            case  "SRUTHI30":
                setCouponDiscountPercentage(30);
                break;
                default:
                    alert('invalid coupon code');
                    setCouponDiscountPercentage(0);
    }
    }
    const calculateTotal = () => {
        //calucate total amount  using reduce 
        const finalTotal = cartItems.reduce((finalTotal, item) => finalTotal + (item.price * item.quantity), 0);
        // Use dAmount for discount calculation
        const disAmount = finalTotal * disperce; 
        
       const couponAmount= finalTotal * couponDiscountPercentage /100;
       const netAmount =finalTotal - disAmount-couponAmount;
        return {
            finalTotal,
            disAmount,
            couponAmount,
            netAmount
        };
    };

    // Calculate totals based on current cart and discount amount using array d structuring
    const { finalTotal, disAmount,couponAmount,netAmount } = calculateTotal();

    return (
        <>
            <h2>This is the cart page</h2>
            <ul>{itemsList}</ul>
            <h2>Total before discount: ${finalTotal.toFixed(2)}</h2>
            <button onClick={() => handleDisPercentage(10)}>Apply 10% Discount</button>
            <button onClick={() => handleDisPercentage(20)}>Apply 20% Discount</button>
            <button onClick={() => handleDisPercentage(30)}>Apply 30% Discount</button>
           <h2>discount percentage:{disperce}%</h2>
            <h2>Discount Amount: ${disAmount.toFixed(2)}</h2>
            <input type="text" value={couponCode}
            onChange={(e)=>setCouponCode(e.target.value)}
            placeholder="enter coupon code" />
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
            <h2>couponAmount:{couponAmount}</h2>
            <h2>Net Amount: ${netAmount.toFixed(2)}</h2>

        </>
    );
}

export default Cart;