import React from "react";
import HighLightText from "../Homepage/HighLightText";

const Quote = () => {
  return (
    <div className="text-center mt-10 text-3xl p-5 text-white">
      We are passionate about revolutionising the way we learn . Our innovation
      platform
      <HighLightText text={" combines technology "} />
      <span className="text-orange-600"> experties</span>, and community to
      create an
      <span className="text-orange-600">
        {" "}
        unparalleled educational experience .
      </span>
    </div>
  );
};

export default Quote;
