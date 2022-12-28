import { useEffect } from "react"
import { useSelector } from "react-redux"




function Cart(){

    const products= useSelector((state)=> state?.cart.cart)
    console.log( products)

    
    return (
        <>{products?.map((product)=>(
        <div>
           {product.name}{product.price}</div>
        ))
        }
        </>
    )
}
export default Cart