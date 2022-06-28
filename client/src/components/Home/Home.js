import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard"
import { getProduct } from "../../actions/product"
import { useEffect, Fragment } from "react";
import "./Home.css"
import Loader from "../Layout/Loader"
import MetaData from "../Layout/MetaData"
import { useAlert } from "react-alert";

const Home = () => {
  const alert=useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.productsArray);
  console.log(error);
  useEffect(() => {
    if(error)
       alert.error(error);

    dispatch(getProduct());
  }, [dispatch,error]);

 
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
          
          <a href="#container">
            <button>
              SCROLL
            </button>
          </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );


}

export default Home;