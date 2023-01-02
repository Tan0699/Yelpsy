import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";

const ReviewForm = ({posts,currentpost})=>{
  console.log("le current",currentpost)
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const filteredPost = (posts.filter((post)=> post.id == +currentpost))[0]
    console.log("le filtered post ", filteredPost)
    const [shop_id, setshop] = useState(filteredPost?.shop_id)
    const [post_id, setpost] = useState(filteredPost?.post_id)
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([]);
    const [imageLoading, setImageLoading] = useState(false)
    const [formrate, setformrate] = useState(true)
    const [formdesc, setformdesc] = useState(false)
    const [formimg, setformimg] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("image", image);
        payload.append("rating",rating)
        payload.append("description",description)
        if (filteredPost?.shop_id){
        payload.append("shop_id",shop_id)}
        if (filteredPost?.post_id){
        payload.append("post_id",post_id)}
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        const res = await dispatch(createReview(payload))
        
        if (res) {
            // await res.json();
            if(res.image){
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
    <>
    {formrate &&
    <form>
      
    <label className='wrapyo'>Post Rating</label>
            <input className="wrapya"
            // placeholder="Write name here"
            type="text"
            maxLength={20}
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <div>
        {filteredPost.id}
      </div>
           <button className="postsub" onClick={()=>(setformrate(false),setformdesc(true))} >Go next</button>
    </form>}
    {formdesc &&
    <form>
     <label className='wrapyo'>Post Description</label>
          <input className="wrapya"
            // placeholder="Write description here"
            type="text"
            minLength={50}
            maxLength={200}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
           <button className="postsub"onClick={()=>(setformdesc(false),setformimg(true))} >Go next</button>
    </form>}
{formimg &&
    <form className="postformwrap" onSubmit={handleSubmit}>
          <div className="posttop">Have something to sell?</div>
          <div className="posttop">Make a Post!</div>
          <div className="errors">
        {errors?.map((error, ind) => (
          <div  className="errors" key={ind}>{error}</div>
        ))}
      </div>
      <label className='wrapyo'>Image File</label>
            <input className="fileya"
              type="file"
              accept="image/*"
              onChange={updateImage}
             
            />
         <div className="postsubwrap">
            <button className="postsub" type="submit">Create a Post</button>
            </div>
            {(imageLoading)&& <p>Loading...</p>}
        </form>}
    </>
)
}

export default ReviewForm