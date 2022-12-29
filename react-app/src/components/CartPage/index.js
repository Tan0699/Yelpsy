import { useEffect } from "react"
import { useSelector } from "react-redux"
import { addToCartThunk } from "../../store/cart"




function Cart(){

    const products= useSelector((state)=> state?.cart.cart)
    console.log( products)
   const productsObj = {}
    products.forEach(product =>{
        productsObj[product.id] = (productsObj[product.id] || 0) + 1
    })
    const productArray = []
    const idArry =[]
    const filteredProducts = products.forEach(product =>{
        if(!(idArry.includes(product.id))){
            idArry.push(product.id)
            productArray.push(product)
        }
    })
    console.log("le id filt4r",idArry)
    console.log("le FILTEREd",productArray)
    console.log("le",productsObj)
    const keys = Object.keys(productsObj);
    console.log("keyy",keys) //['12', '17', '18']
    return (
        <>
        {/* {keys?.map((key)=>(
        <div>
            <div> {`${key}: ${productsObj[key]}`}</div>
          <div>
          </div>
           </div>
        ))
        } */}
        {productArray.map((product)=>(
            <div>
            {product.name}{product.price}quantity:{productsObj[product.id]}total:{product.price *productsObj[product.id] }
            </div>
        ))}
        </>
    )
}
export default Cart