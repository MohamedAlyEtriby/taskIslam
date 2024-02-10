import React from "react";

const HeaderPhoto = ({imgscr}) => {
  return (
    <div style={{width:"100%",marginBottom:"2rem"}} >
      <img src={`/assets/${imgscr}`} alt="" style={{width:"100%"}} />
    </div>
  );
};

export default HeaderPhoto;
