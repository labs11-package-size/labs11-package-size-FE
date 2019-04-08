import React from "react";

const Package = props => {
  return (
    <div className="PackageContainer">
      <div className="PackageContainerTopSection">
        <div className="PackageButtonsContainer">
          <button className="PackageButton" onClick={() => props.savePackage(props.boxindex)}>Save Package Config</button>
          <button
            className="PackageButton"
            onClick={() => props.getModel(props.box)}
          >
            View 3d Model
          </button>
        </div>
        <div className="PackageBoxDetailsContainer">
          {props.box.size === "6 x 6 x 6" ||
          props.box.size === "8 x 6 x 4" ||
          props.box.size === "8 x 8 x 8" ||
          props.box.size === "10 x 8 x 6" ||
          props.box.size === "10 x 10 x 10" ||
          props.box.size === "12 x 6 x 6" ||
          props.box.size === "12 x 12 x 8" ||
          props.box.size === "12 x 12 x 12" ||
          props.box.size === "16 x 12 x 8" ? (
            <img
              className="BoxImage"
              src="https://res.cloudinary.com/https-scannarserver-herokuapp-com/image/upload/c_scale,w_60/v1554325466/UI%20Assets/shipper-kraft-kraft-open.png"
              alt="thumbnail image of a shipper box"
            />
          ) : (
            <img
              className="BoxImage"
              src="https://res.cloudinary.com/https-scannarserver-herokuapp-com/image/upload/c_scale,w_60/v1554348722/UI%20Assets/mailer-glossy-white-open.png"
              alt="thumbnail image of a mailer box"
            />
          )}
          {props.box.size === "6 x 6 x 6" ||
          props.box.size === "8 x 6 x 4" ||
          props.box.size === "8 x 8 x 8" ||
          props.box.size === "10 x 8 x 6" ||
          props.box.size === "10 x 10 x 10" ||
          props.box.size === "12 x 6 x 6" ||
          props.box.size === "12 x 12 x 8" ||
          props.box.size === "12 x 12 x 12" ||
          props.box.size === "16 x 12 x 8" ? (
            <p>Shipper-Style Box</p>
          ) : (
            <p>Mailer-Style Box</p>
          )}

          <p className="PackagedBoxSize">{props.box.size}</p>
        </div>
      </div>
      <p>Contents:</p>
      <div className="PackagedItemList">
        {props.box.items.map(item => {
          const parseId = () => {
            if (item.id.length > 2) {
              if (item.id.lastIndexOf("0") === item.id.length - 2) {
                return item.id.slice(item.id.length - 1);
              } else {
                return item.id.slice(item.id.length - 2);
              }
            } else {
              return item.id;
            }
          };
          return (
            <div className="PackagedItem">
              <p className="PackagedItemId">Item #{parseId()}</p>
              <p className="PackagedItemSize">{item.orig_size}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Package;
