import './Star.css'


const StarThing = () => {


    return (
        <>

            <div class="rating">
                <input type="radio" name="star" id="star1" />
                <label for="star1"></label>
                <input type="radio" name="star" id="star2" />
                <label for="star2"></label>
                <input type="radio" name="star" id="star3" />
                <label for="star3"></label>
                <input type="radio" name="star" id="star4" />
                <label for="star4"></label>
                <input type="radio" name="star" id="star5" />
                <label for="star5"></label>
            </div>

        </>
    )
}
export default StarThing