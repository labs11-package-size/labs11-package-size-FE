import React from "react";
import Package from "./Package";

const Packages = props => {
  return (
    <div className="PackagesContainer">
      {props.previewBoxes.map(box => {
        return <Package key={box.id} box={box} />;
      })}
    </div>
  );
};

export default Packages;
