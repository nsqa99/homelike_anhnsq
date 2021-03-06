import Header from "./Header";
import React from "react";

const HostLayout = ({ children }) => {
  return (
    <div className="pb-3">
      <Header />
      {children}
    </div>
  );
};

export default HostLayout;
