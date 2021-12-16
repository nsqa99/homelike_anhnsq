import Headers from "components/Headers";
import React from "react";

const CommonLayout = ({ children }) => {
  return (
    <div className="">
      <Headers />
      {children}
    </div>
  );
};

export default CommonLayout;
