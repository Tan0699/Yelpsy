import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { addToCartThunk, getAllcartThunk } from "../../store/cart"
import { fetchShops } from "../../store/shops"
import "./CartPage.css"


function Cart() {
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllcartThunk())
        dispatch(fetchShops())
    }, [dispatch])
    const products = useSelector((state) => state?.cart.cart)
    console.log(products)
    const shopState = useSelector((state) => state.shops)
    const shops = Object.values(shopState)
    const productsObj = {}
    products?.forEach(product => {
        productsObj[product.id] = (productsObj[product.id] || 0) + 1
    })
    const productArray = []
    const idArry = []
    const filteredProducts = products?.forEach(product => {
        if (!(idArry.includes(product.id))) {
            idArry.push(product.id)
            productArray.push(product)
        }
    })

    console.log("le filtered productsr", filteredProducts)
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
                <button className="keepshop" onClick={()=> history.push("/")}>Keep Shopping</button>
            </div>
            <div className='mojop'>
                <i id='moji' class="fa-solid fa-handshake"></i>
                <div className='yaya'><strong>Etsy Purchase Protection:</strong> Shop confidently on Etsy knowing if something goes wrong with an order, we've got your back for all eligible purchases</div>
            </div>
            <div className="cartpagegrid">
               
                    <div className="cartitemsgridgrid">
                    {productArray?.map(product => (
                            <div  className="cartitemsgrid">
                                <div className="shopnamegrid">
                                    {shops?.filter(shop => shop.id == product.shop_id).map(shop => (
                                        <div className="cartshopimagenamewrap">
                                            <NavLink onClick={() => window.scrollTo(0, 0)} className="navls" to={`/${shop.id}`}>                                            
                                                <div className="cartshopimagename">
                                                    <div className="cartimageswrap">
                                                    <img src={shop.image} className="cartimages"></img></div>
                                                    <div className="cartshopname">{shop.name}</div>
                                                    </div>
                                                </NavLink>
                                        </div>
                                    ))}
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
                    ))}
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