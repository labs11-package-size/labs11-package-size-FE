import React from "react";
import Package from "./Package";

const Packages = props => {
  return (
    <div className="OuterPackagesContainer">
    {props.limitError && (
          <p className="LimitErrorWarning">
            Your packaging list contains too many items to process the boxes
            preview. Please click some items to remove them from the list, and
            then try again.
          </p>
        )}
        {(props.previewBoxes.length > 0) && (
          <div className="SuggestedPackagesTitle">
          <p>Suggested Packages Preview</p>
          <button className="SaveAllPackagesButton" onClick={() => props.savePackageArray()}>Save All Packages</button>
          {(props.addedPackages.length > 0) && <a className="PackageListLink"href="#">You've added packages, click here to view the list</a>}
          </div>
        )}
     
    <div className="PackagesContainer">
      {props.previewBoxes.map((box, index) => {
        return (
          <Package
            key={box.id}
            box={box}
            boxindex={index}
            addedPackages={props.addedPackages}
            addedAll={props.addedAll}
            getModel={props.getModel}
            savePackage={props.savePackage}
          />
        );
      })}
    </div>
    </div>
  );
};

export default Packages;
