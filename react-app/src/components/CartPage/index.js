import { useEffect } from "react"
import { useSelector } from "react-redux"
import { addToCartThunk } from "../../store/cart"
import "./CartPage.css"


function Cart() {

    const products = useSelector((state) => state?.cart.cart)
    console.log(products)
    const productsObj = {}
    products?.forEach(product => {
        productsObj[product.id] = (productsObj[product.id] || 0) + 1
    })
    const productArray = []
    const idArry = []
    const filteredProducts = products.forEach(product => {
        if (!(idArry.includes(product.id))) {
            idArry.push(product.id)
            productArray.push(product)
        }
    })
    console.log("le id filt4r", idArry)
    console.log("le FILTEREd", productArray)
    console.log("le", productsObj)
    const keys = Object.keys(productsObj);
    console.log("keyy", keys) //['12', '17', '18']
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
            <div className="keepwrap">
                <div className="itemsincart">{productArray.length} items in your cart</div>
                <button className="keepshop">Keep Shopping</button>
            </div>
            <div className='mojop'>
                <i id='moji' class="fa-solid fa-handshake"></i>
                <div className='yaya'><strong>Etsy Purchase Protection:</strong> Shop confidently on Etsy knowing if something goes wrong with an order, we've got your back for all eligible purchases</div>
            </div>
            <div className="cartpagegrid">
                <div className="cartitemsgrid">
                    <div className="shopnamegrid">

                    </div>

                    <div className="bottomgrid">
                        <div className="cartimage">

                        </div>
                        <div className="cartnames">

                        </div>
                        <div className="lastgrid">
                            <div className="pricequan">
                                <div className="changequan">

                                </div>
                                <div className="addcartprice">

                                </div>
                            </div>
                            <div className="buynow">

                            </div>
                            <div className="delivery">

                            </div>
                        </div>

                    </div>




                </div>
                <div className="payheregrid">




                </div>
            </div>



            {productArray.map((product) => (
                <div>
                    {product.name}{product.price}quantity:{productsObj[product.id]}total:{product.price * productsObj[product.id]}
                </div>
            ))}
        </>
    )
}
export default Cart