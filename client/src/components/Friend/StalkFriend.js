import React from "react";
import "./style.css";

function StalkFriend() {
	return (
		<div className="container">
			<h4 className="mt-5 fontBd">Stalking Friend</h4>
			<hr />
            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="basic-details">
                        {/* <div className="col-3"> */}
                            <img className="friend-image" src="https://avatars3.githubusercontent.com/u/30005684?v=4" width="60" ></img>
                        {/* </div> */}
                        <div className="">
                            <h5 class="fontMd mb-0">Aakash Goel</h5>
                            <p>goelaakash79@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default StalkFriend;
