import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchRandomPosts } from "../../store/posts"
import { clearAction, fetchShops } from "../../store/shops"
import ShopForm from "../Shopform"
import "./ManageAcc.css"

function Manage() {
const dispatch = useDispatch()
const history = useHistory()
useEffect(() => {
    Promise.all(
    [dispatch(clearAction()),
    dispatch(fetchShops()),
    dispatch(fetchRandomPosts())]
    ).then(()=>{
      setisLoaded(true)
    })
  }, [dispatch])
  const [isloaded , setisLoaded] = useState(false)
  const isUser = useSelector((state)=> state.session.user)
  const shopState = useSelector((state) => state.shops)
  const shops = Object.values(shopState)
  const filteredShops = shops.filter(shop => shop?.user_id == isUser?.id)

    return( isloaded &&

<>
<div className="managee">
THIS IS A WORK IN PROGRESSSS THESE ARE YOUR SHOPS</div>
<div>{filteredShops.map(shop => (
    <div className="managegridinner" onClick={()=> history.push( `${shop.id}`)}> 
        {shop.name}
        <div> 
        {shop.description}
    </div>
    <img className="manageimage" src={shop.image}> 
       
    </img>
    </div>
    
))}</div>
</>)



}

export default Manage