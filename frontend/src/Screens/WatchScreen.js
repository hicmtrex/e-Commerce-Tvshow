import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
const WatchScreen = () => {
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  return (
    <div className='d-flex justify-content-center text-white'>
      <Link to='/'>
        <div className='back'>
          <i class='fas fa-arrow-left'></i>
          Home
        </div>
      </Link>
      <ReactPlayer
        width='90vw'
        height='80vh'
        url={product.trailer}
        playing={true}
        controls={true}
      />
    </div>
  );
};

export default WatchScreen;
