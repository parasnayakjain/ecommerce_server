import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import getProductDetails from "../../actions/productAction";
import { useParams, useMatch } from "react-router-dom";
//import ReviewCard from "./ReviewCard.js";
import Loader from "../Layout/Loader";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
// import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
//import { NEW_REVIEW_RESET } from "../../constants/productConstants";


const ProductDetails = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();
  
  const state= useSelector(
    (state) => state.productDetails
  );
  const { product, loading, error } =state;
  console.log(state);
  const {quantity , setQuantity}=useState(0);

    const increaseQuantity = () => {
      if (product.Stock <= quantity) return;

      const qty = quantity + 1;
      setQuantity(qty);
    };

    const decreaseQuantity = () => {
      if (1 >= quantity) return;

      const qty = quantity - 1;
      setQuantity(qty);
    };

     const addToCartHandler = () => {
      alert.success("Item Added To Cart");
    };
      const options = {
      size: "large",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProductDetails(id))
  }, [dispatch]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              {/* <Carousel> */}
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={"https://picsum.photos/200/300"}
                      alt={`${i} Slide`}
                    />
                  ))}
              {/* </Carousel> */}
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                     onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
             </div>
            </div>
        </Fragment>)
      }
    </Fragment>)


  // const ProductDetails = ({ match }) => {
  //   const dispatch = useDispatch();




  //   const { success, error: reviewError } = useSelector(
  //     (state) => state.newReview
  //   );



  //   const [quantity, setQuantity] = useState(1);
  //   const [open, setOpen] = useState(false);
  //   const [rating, setRating] = useState(0);
  //   const [comment, setComment] = useState("");



 

  //   const submitReviewToggle = () => {
  //     open ? setOpen(false) : setOpen(true);
  //   };

  //   const reviewSubmitHandler = () => {
  //     const myForm = new FormData();

  //     myForm.set("rating", rating);
  //     myForm.set("comment", comment);
  //     myForm.set("productId", match.params.id);

  //     dispatch(newReview(myForm));

  //     setOpen(false);
  //   };

  //   useEffect(() => {
  //    

  //     if (reviewError) {
  //       alert.error(reviewError);
  //       dispatch(clearErrors());
  //     }

  //     if (success) {
  //       alert.success("Review Submitted Successfully");
  //       dispatch({ type: NEW_REVIEW_RESET });
  //     }
  //     dispatch(getProductDetails(match.params.id));
  //   }, [dispatch, match.params.id, error, alert, reviewError, success]);



  {/* <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment> */}
  // );

}

export default ProductDetails;