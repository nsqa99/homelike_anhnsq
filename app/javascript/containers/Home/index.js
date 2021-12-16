import React from "react";
import { useSelector } from "react-redux";
import LeftPanel from "./Component/LeftPanel";
import RightPanel from "./Component/RightPanel";

const index = () => {
  return (
    <div>
      <LeftPanel />

      <RightPanel />
    </div>
  );
};

export default index;
