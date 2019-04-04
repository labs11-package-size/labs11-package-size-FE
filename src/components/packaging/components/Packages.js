import React from "react";
import Package from "./Package";

const Packages = props => {
  return (
    <div className="PackagesContainer">
      {props.previewBoxes.map((box, index) => {
        return <Package key={box.id} box={box} boxindex={index} />;
      })}
    </div>
  );
};

export default Packages;
