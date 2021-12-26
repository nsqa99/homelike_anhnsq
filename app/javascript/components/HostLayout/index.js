import Header from "./Header";
import React from "react";

const HostLayout = ({ children }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default HostLayout;
