import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { Modal } from "../../context/Modal"
import { addToCartThunk, deleteFromCartThunk, deleteOneFromCartAction, emptyCartThunk, getAllcartThunk } from "../../store/cart"
import { addPurchaseThunk, fetchPurchases } from "../../store/purchases"
import { fetchShops } from "../../store/shops"
import LoginForm from "../auth/LoginForm"
import "./CartPage.css"


function Cart() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState("")
    const [circle , setCircle] = useState(0)
    // const isUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(getAllcartThunk())
        dispatch(fetchShops())
        // dispatch(fetchPurchases(isUser.id))
    }, [dispatch])
    const [log, setLog] = useState(false);
    const thisUser = useSelector((state)=> state.session.user)
    const products = useSelector((state) => state?.cart.cart)
    const shopState = useSelector((state) => state.shops)
    const shops = Object.values(shopState)
    const productsObj = {}
    products?.forEach(product => {
        productsObj[product.id] = (productsObj[product.id] || 0) + 1
    })
    console.log("olelamo", productsObj)
    const productArray = []
    const idArry = []
    const filteredProducts = products?.forEach(product => {
        if (!(idArry.includes(product.id))) {
            idArry.push(product.id)
            productArray.push(product)
        }
    })
    const initial = 0
    const totalPrice = products.map(product => product.price).reduce((accumulator, currentValue) => accumulator + currentValue,
        initial)
    console.log("hnhnhnh", products)
    productArray.map((product) => {
        product["quantity"] = productsObj[product.id]
    })
    let logModal = (
        <div>
          {log && (
            <Modal onClose={() => setLog(false)}>
              <LoginForm setLog={setLog} />
            </Modal>
          )}
        </div>)
    console.log("oldprarary", productArray)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!thisUser){
            setLog(true)
        }
        else{
        const payload = {
            total_price: totalPrice.toFixed(2),
            details: productArray
        }
        const purchaseSuccess = await dispatch(addPurchaseThunk(payload))
        if (purchaseSuccess) {
            dispatch(emptyCartThunk())
            history.push('/')
        }
    }
    }

    const keys = Object.keys(productsObj);
    const numsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const helperAdd = (num, product) => {
        for (let i = 0; i < num; i++) {
            dispatch(addToCartThunk(product))
        }
    }
    const helperDel = (num, product) => {
        for (let i = 0; i < num; i++) {
            dispatch(deleteOneFromCartAction(product))
        }
    }



    return (
        <div className="wholecartwrap">
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
                <button className="keepshop" onClick={() => history.push("/")}>Keep Shopping</button>
            </div>
            <div className='mojop'>
                <i id='moji' class="fa-solid fa-handshake"></i>
                <div className='yaya'><strong>Etsy Purchase Protection:</strong> Shop confidently on Etsy knowing if something goes wrong with an order, we've got your back for all eligible purchases</div>
            </div>
            {products.length>1 &&
            <div className="cartpagegrid">
                <div className="cartitemsgridgrid">
                    {productArray?.map(product => (
                        <div className="cartitemsgrid">
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
                                <NavLink className="priceroo" onClick={() => window.scrollTo(0, 0)} to={`/${product.shop_id}/posts/${product.id}`}>
                                    <img className="cartimage" src={product.image}>

                                    </img></NavLink>
                                <div className="cartnames">

                                    <div className="nameincartnames"> {product.name}</div>
                                    <button className="removebutton" onClick={() => { dispatch(deleteFromCartThunk(product)) }}>Remove</button>
                                    {/* <button onClick={() => dispatch(deleteOneFromCartAction(product))} >DELETE ONE</button> */}
                                </div>
                                <div className="lastgrid">
                                    <div className="pricequan">
                                        {/* <div className="changequan">

                                        </div> */}
                                        <div className="addcartprice">
                                            <div><select
                                                className='count'
                                                value={productsObj[product.id]}
                                                // onChange={e => (!!productsObj[product.id]>e.target.value))?dispatch(addToCartThunk(product):null)}
                                                onChange={(e) => { productsObj[product.id] < (e.target.value) ? helperAdd((e.target.value) - productsObj[product.id], product) : helperDel(productsObj[product.id] - (e.target.value), product) }}
                                            >
                                                {quantityArray?.map(number => (
                                                    <option key={number.id}>
                                                        {number}
                                                    </option>
                                                ))}
                                            </select>
                                            </div>

                                        </div>
                                        <div className="totheright">{productsObj[product.id] == 1 &&
                                            <div>
                                                {!(product.price.toString().includes(".")) &&
                                                    <div>${product.price.toString() + ".00"}</div>
                                                }
                                                {(product.price.toString().indexOf(".") == (product.price.toString().length - 2)) &&
                                                    <div>${product.price.toString() + "0"}</div>
                                                }
                                                {(product.price.toString().indexOf(".") == (product.price.toString().length - 3)) && !Number.isInteger(product.price) &&
                                                    <div>${product.price.toString()}</div>
                                                }</div>}
                                            {productsObj[product.id] > 1 &&
                                                <div>
                                                    {!((product.price * productsObj[product.id]).toString().includes(".")) &&
                                                        <div>${(product.price * productsObj[product.id]).toString() + ".00"}</div>
                                                    }
                                                    {((product.price * productsObj[product.id]).toString().indexOf(".") == ((product.price * productsObj[product.id]).toString().length - 2)) &&
                                                        <div>${(product.price * productsObj[product.id]).toString() + "0"}</div>
                                                    }
                                                    {((product.price * productsObj[product.id]).toString().indexOf(".") == ((product.price * productsObj[product.id]).toString().length - 3)) && !Number.isInteger((product.price * productsObj[product.id])) &&
                                                        <div>${(product.price * productsObj[product.id]).toString()}</div>
                                                    }
                                                    {!(product.price.toString().includes(".")) &&
                                                        <div>(${product.price.toString() + ".00"} each)</div>
                                                    }
                                                    {(product.price.toString().indexOf(".") == (product.price.toString().length - 2)) &&
                                                        <div>(${product.price.toString() + "0"} each)</div>
                                                    }
                                                    {(product.price.toString().indexOf(".") == (product.price.toString().length - 3)) && !Number.isInteger(product.price) &&
                                                        <div>(${product.price.toString()} each)</div>
                                                    }
                                                </div>
                                            }</div>
                                    </div>
                                    <div className="buynow">
                                        Limited Quanity available and it's in {Math.floor(((product.id * 3) % 20)) + 1} person(s) carts
                                    </div>
                                    <div className="delivery">
                                        Estimated delivery: 1 day from United States
                                    </div>
                                </div>
                            </div>
                            <div className="justaline">

                            </div>
                        </div>

                    ))}
                </div>

                <div className="payheregrid">
                    <div className="payhereboxwrap">
                    <div className="payherebox">
                        <div className="upay">How you'll pay</div>


                        <div class="fakecash">
                            <div className="radiowrapper">
                                <input type="radio" name="circle" id="circle" value={1} onChange={e => (setCircle(e.target.value))}/><div className="radioinnerwrapper"><img className="cards" src="/card1.PNG"></img><img className="cards" src="/card2.PNG"></img><img className="cards" src="/card3.PNG"></img></div></div>
                            <div className="radiowrapper">
                                <input type="radio" name="circle" id="circle" value={2} onChange={e => (setCircle(e.target.value))}/><div className="radioinnerwrapper"><img className="cards" src="/card4.PNG"></img></div></div>
                            <div className="radiowrapper">
                                <input type="radio" name="circle" id="circle" value={3} onChange={e => (setCircle(e.target.value))}/><div className="radioinnerwrapper"><img className="cards" src="/card5.PNG"></img></div></div>
                            <div className="radiowrapper">
                                <input type="radio" name="circle" id="circle" value={4} onChange={e => (setCircle(e.target.value))} /><div className="radioinnerwrapper"><img className="cards" src="/card6.PNG"></img></div></div>
                        </div>
                        <div className="payment">*These payment options are fake and dont work*</div>
                        <div className="paymentspace">
                            <div className="leftspace">Item(s) total</div>
                            <div> ${totalPrice.toFixed(2)}</div>
                        </div>
                        <div className="paymentspace">
                            <div className="leftspace">
                                Holiday discount(10%)
                            </div>
                            <div>
                                -${(totalPrice.toFixed(2) * .10).toFixed(2)}
                            </div>
                        </div>
                        <div className="zelinewrap">
                            <div className="zeline"></div></div>
                        <div className="paymentspace">
                            <div className="leftspace">
                                Subtotal
                            </div>
                            <div>
                                ${(totalPrice.toFixed(2) - (totalPrice.toFixed(2) * .10)).toFixed(2)}
                            </div>
                        </div>

                        <form className="payywrap"  onSubmit={handleSubmit}>
                            {circle==1 &&
                            <button type="submit" className="payy">Pay with<b> Visa</b></button>}
                            {circle==2 &&
                            <button  type="submit" className="payy">Pay with<b> Discover</b></button>}
                            {circle==3 &&
                            <button type="submit" className="payy">Pay with<b> Paypal</b></button>}
                            {circle==4 &&
                            <button type="submit" className="payy">Pay with <b>GooglePay</b></button>}
                            {logModal}
                        </form>
                    </div>
                    </div>
            </div>
            </div>}
            {products.length ==0 &&
            <div className="yoemptywrap">
                <div className="yoempty">Your Cart is Empty.</div>
                <div className="discova" 
                ><NavLink to={`/${Math.ceil(Math.random()*shops.length)}`}>Discover something unique to fill it up.</NavLink> </div>
                <div className="mocarbon">*Etsy offsets carbon emissions from every delivery*</div>
            </div>}


            {/* {productArray.map((product) => (
                <div>
                    {product.name}{product.price}quantity:{productsObj[product.id]}total:{product.price * productsObj[product.id]}
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <button type="submit">Confirm Order</button>
            </form> */}
        </div>
    )
}
export default Cart