import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createReview, editReview } from "../../store/reviews";


const ReviewEditForm = ({filteredReviews, posts, currentpost, star,shops,thisUser }) => {
    const thisReview = filteredReviews.filter(review => review.post_id ==currentpost)[0]

  console.log("le current", thisReview)
  const dispatch = useDispatch()
  const [rating, setRating] = useState(thisReview?.rating)
  const [description, setDescription] = useState(thisReview.description)
  const filteredPost = (posts.filter((post) => post.id == +currentpost))[0]
  console.log("le filtered post ", filteredPost)
  const [shop_id, setshop] = useState(filteredPost?.shop_id)
  const [post_id, setpost] = useState(thisReview.post_id)
  const [image, setImage] = useState(thisReview?.image)
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false)
  const [formrate, setformrate] = useState(true)
  const [formdesc, setformdesc] = useState(false)
  const [formimg, setformimg] = useState(false)
console.log("ratinggg",rating)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("image", image);
    payload.append("rating", rating)
    payload.append("description", description)
    // if (filteredPost?.shop_id) {
    //   payload.append("shop_id", shop_id)
    // }
    // if (filteredPost?.post_id) {
      payload.append("post_id", post_id)
    // }
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    const res = await dispatch(editReview(payload,thisReview.id))

    if (res) {
      // await res.json();
      if (res.image) {
        setImageLoading(false);
        // history.push("/");
      }
      else {
        setImageLoading(false);
        // a real app would probably use more advanced
        // error handling
        setErrors([res])
      }
    }
  }
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }
  return (
    <div className="wholerevwrap">
      <div className="wholerevwrapinner">
      {formrate &&
        <form>
          <div className="leavearevwrap">
            <div className='leavearev'>Leave a Review</div>
            <div className='objwrap'>
              <div className='obj1'>
              </div>
              <div className='obj2wrap'>
                <div className='obj2'>
                </div></div>
              <div className='obj3'>
              </div>
              <div className='obj2wrap'>
                <div className='obj4'>
                </div></div>
              <div className='obj5'>
              </div>
            </div>
          </div>
          <div className="revgrid1">
            <div className="revgrid1inner1">
              <img className="revgrid1inner1image" src={filteredPost.image}></img>
            </div>
              <div className="revgrid1inner2">
                  <div className="filteredpostname">
                    <div>{filteredPost.name}</div>
                    <div className="ledotts">...</div>
                    </div>
                  <div className="purchasedfrom">Purchased from <NavLink className="revformnav" to={`/${filteredPost.shop_id}`}><b>{shops.filter(shop=> shop.id==filteredPost.shop_id)[0].name}</b></NavLink></div>
                  <div className="lestars"><div class="rating">
                <input
                  type="radio"
                  name="star"
                  id="star1"
                  value={5}
                  onChange={e => (setRating(e.target.value))}
                  defaultChecked={rating == 5}
                />

                <input
                  type="radio"
                  name="star"
                  id="star2"
                  value={4}
                  onChange={e => (setRating(e.target.value))}
                  defaultChecked={rating == 4}
                />

                <input
                  type="radio"
                  name="star"
                  id="star3"
                  value={3}
                  onChange={e => (setRating(e.target.value))}
                  defaultChecked={rating == 3}
                />

                <input
                  type="radio"
                  name="star" id="star4"
                  value={2}
                  onChange={e => (setRating(e.target.value))}
                  defaultChecked={rating == 2}
                />

                <input
                  type="radio"
                  name="star"
                  id="star5"
                  value={1}
                  onChange={e => (setRating(e.target.value))}
                  defaultChecked={rating == 1}
                />

              </div>
              </div>
                  <div>My Review Rating *</div>
              </div>
          </div>
          {/* <div className='g'>
            <div>
              
            </div>
          </div> */}
          <div className="postsub1wrap">
          <button className="postsub1" onClick={() => (setformrate(false), setformdesc(true))} >Next</button></div>
        </form>}
      {formdesc &&
        <form>
          <div className="leavearevwrap">
            <div className='leavearev'>Almost done!</div>
            <div className='objwrap'>
              <div className='obj1'>
              </div>
              <div className='obj2wrap'>
                <div className='obj2'>
                </div></div>
              <div className='obj6'>
              </div>
              <div className='obj2wrap'>
                <div className='obj4'>
                </div></div>
              <div className='obj5'>
              </div>
            </div>
          </div>
          <div>
            <div  className="uldesc">Helpful reviews on Etsy mention:*</div>
            <ul  className="uldesc2"> 
              <li className="lidesc">the quality of the product</li>
              <li className="lidesc">if the product matched the desciption</li>
              <li className="lidesc">if the product met your expectations</li>
            </ul>
          </div>
          <textarea
          className="text"
            // placeholder="Write description here"
            type="text"
            // minLength={50}
            // maxLength={200}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="postsub2wrap">
          <button className="postsub2" onClick={() => (setformdesc(false), setformimg(true))} >Next</button></div>
        </form>}
      {formimg &&
        <form className="postformwra" onSubmit={handleSubmit}>
          <div className="leavearevwrap">
            <div className='leavearev'>Upload an Image</div>
            <div className='objwrap'>
              <div className='obj1'>
              </div>
              <div className='obj2wrap'>
                <div className='obj2'>
                </div></div>
              <div className='obj6'>
              </div>
              <div className='obj2wrap'>
                <div className='obj4'>
                </div></div>
              <div className='obj6'>
              </div>
            </div>
          </div>
          <div className="imagefluff">
            One Last Step! Provide an image to show your appreciation and inspire the community!
          </div>
          <div className="errors">
            {errors?.map((error, ind) => (
              <div className="errors" key={ind}>{error}</div>
            ))}
          </div>
          <div className='wrapyy'>Image File</div>
          <input className="fileyoo"
            type="file"
            accept="image/*"
            onChange={updateImage}

          />
          <div className="publicc">Your review and profile information will be publicly displayed</div>
          <div className="publiccwrapa">
            <div>
              <img className="tisusaimage" src={thisUser.image}></img>
            </div>
            <div className="publiccwrapa2">
              <div>
                Reviewed By
              </div>
              <div>
                {thisUser.firstname}
              </div>
            </div>
          </div>
          <div className="postsubwrap">
            <button className="postsub" type="submit">Submit Your Review</button>
          </div>
          {(imageLoading) && <p>Loading...</p>}
        </form>}
        </div>
    </div>
  )
}

export default ReviewEditForm