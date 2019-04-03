import React from "react";

const Package = props => {
  return (
    <div className="PackageContainer">
      <img
        src="https://res.cloudinary.com/https-scannarserver-herokuapp-com/image/upload/c_scale,w_60/v1554325466/UI%20Assets/shipper-kraft-kraft-open.png"
        alt="thumbnail image of a box"
      />
      <h5>Box Size: {props.box.size}</h5>
    </div>
  );
};

export default Package;
