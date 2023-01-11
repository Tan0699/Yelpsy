import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createShop } from "../../store/shops";
import { NavLink } from "react-router-dom";
import './Added.css'

const AddedModal = ({thisShopposts,thisPost,setAdded}) => {
    const {shopId} = useParams()
    const history = useHistory() // so that we can redirect after the image upload is successful
    const shopState = useSelector((state) => state.shops)
    const userState = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([]);
   


    return (
       <div className="AddedModalContainer">
            <div className="AddedModalGrid">
                <div className="Addedgrid1">
                <strong>🗸</strong> Added to Cart
                </div>
                <div className="Addedgrid2">
                 <img className="addedthispostimage" src={thisPost.image}>
                    
                 </img>
                 <div className="addedthispostnamewrap">
                        <div className="addedthispostname">
                        {thisPost.name}
                        </div>
                        <div><b>
                        {!(thisPost.price.toString().includes(".")) &&
                                                        <div>${thisPost.price.toString() + ".00"}</div>
                                                    }
                                                    {(thisPost.price.toString().indexOf(".") == (thisPost.price.toString().length - 2)) &&
                                                        <div>${thisPost.price.toString() + "0"}</div>
                                                    }
                                                    {(thisPost.price.toString().indexOf(".") == (thisPost.price.toString().length - 3)) && !Number.isInteger(thisPost.price) &&
                                                        <div>${thisPost.price.toString()}</div>
                                                    }
                        </b></div>
                        <div className="addedtocartbuttonwrap">
                        <button className="addedtocartbutton" onClick={()=> history.push("/cart")}> Go to cart

                        </button>
                        </div>
                 </div>
                </div>
                <div className="Addedgrid3">
                You have qualified for free shipping from <NavLink className="thisshop" onClick={() => window.scrollTo(0, 0)} to={`/${shopId}`}><u>this shop</u></NavLink>!
                </div>
                <div className="addedgrid4wrap">
                <div className="Addedgrid4">
                {thisShopposts.filter((array, index) => index < 8).map(post =>(
                    <NavLink className="addo" onClick={() => (window.scrollTo(0, 0),setAdded(false))} to={`/${post.shop_id}/posts/${post.id}`}>
                    <div className="Addedpostgrid">
                        <div className="leimageswrap">
                        <img className="leimages" src={post.image}></img>
                        <div className="addedpostnamewrap">
                        <div className="addedpostname">{post.name}</div>
                        <div className="dots">...</div>
                        </div>
                        <div className="addprices">{!(post.price.toString().includes(".")) &&
                                                        <div>${post.price.toString() + ".00"}</div>
                                                    }
                                                    {(post.price.toString().indexOf(".") == (post.price.toString().length - 2)) &&
                                                        <div>${post.price.toString() + "0"}</div>
                                                    }
                                                    {(post.price.toString().indexOf(".") == (post.price.toString().length - 3)) && !Number.isInteger(post.price) &&
                                                        <div>${post.price.toString()}</div>
                                                    }</div>
                                                    </div>
                    </div>
                    </NavLink>))}
                </div></div>
            </div>
       </div>
    )
}

export default AddedModal;