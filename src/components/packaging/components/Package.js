import React from "react";

const Package = props => {
  return (
    <div className="PackageContainer">
      <img
        className="BoxImage"
        src="https://res.cloudinary.com/https-scannarserver-herokuapp-com/image/upload/c_scale,w_60/v1554325466/UI%20Assets/shipper-kraft-kraft-open.png"
        alt="thumbnail image of a box"
      />
      <p className="PackagedBoxSize">Box Size: {props.box.size}</p>
      <p>Contents:</p>
      <div className="PackagedItemList">
        {props.box.items.map(item => {
          return (
            <div className="PackagedItem">
              <p>{item.id}</p>
              <p>{item.orig_size}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Package;
