import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
const LoadingCard = ({height,width}) => {
  return (
    <div>
      <Skeleton height={height} style={{width:`${width}`}} baseColor="#d9d9d9" />{" "}
      {/* Adjust the dimensions as needed */}
    </div>
  );
};
export default LoadingCard;
