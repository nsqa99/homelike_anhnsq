import React from "react";
import SocialHeaders from "../SocialHeaders";

const CommonSocialLayout = ({ children }) => {
  return (
    <div className="">
      <SocialHeaders />
      {children}
    </div>
  );
};

export default CommonSocialLayout;
