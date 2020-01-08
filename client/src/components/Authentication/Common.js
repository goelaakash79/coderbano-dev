import React from "react";
import "./style.css";
import sideImage from "../../utils/images/side-image.png";

function Common() {
    return(
        <div className="col-md-7">
          <img src={sideImage} alt="" width="100%" />
          <h3 className="fontRg mt-4 mb-0 title">coderbano {"💻"}</h3>
          <p className="fontBd tagline">
            a tribute to A2OJ; curated during nights
          </p>
        </div>
    )
}

export default Common;