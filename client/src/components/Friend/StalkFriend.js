import React from "react";
import "./style.css";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

function StalkFriend() {
	return (
		<div className="container">
			<h4 className="mt-5 fontBd">Stalking Friend</h4>
			<hr />
			<div className="row mt-5">
				<div className="col-lg-4 col-md-6">
					<div class="profile-details p-4">
						<div className="row">
							<div className="col-4">
								<img
									className="friend-image"
									src="https://avatars3.githubusercontent.com/u/30005684?v=4"
									width="100%"
									alt=""
								></img>
							</div>
							<div className="col-8">
								<h5 className="fontMd mb-0">Aakash Goel</h5>
								<p className="mb-3">goelaakash79@gmail.com</p>
								<p className="mb-2">Ghaziabad, India</p>
							</div>
						</div>
						KIET Group of Institutions
						<hr />
						<h6 class="fontMd mb-1">Rating: 1456 (Newbie)</h6>
						<h6 class="fontMd mb-3">Max-Rating: 1456 (Newbie)</h6>
						<hr />
						Joined: Date
						<br />
						Last Online: date, time

						<h6 className="mt-2 fontBd">more information...</h6>
					</div>

				</div>
				<div className="col-lg-8 col-md-6">
					<div className="recent-actions profile-details p-4">
						<h5 className="fontMd">
							Recent Actions
							<hr />
						</h5>
						<div className="action-ok pt-2 pb-2 pl-4 pr-4 mb-2">
							<span className="mr-4">
								<FaCheck className="action-status" />
							</span>
							<span className="mr-4 fontBd">
								Xenia and Ringroad Kings
							</span>
							<div className="floatRt">
								<span className="mr-4 language">GNU C++14</span>
								<span className="mr-4 points fontMd">0010/1200</span>
								<span className="time-ago">2 hours ago</span>
							</div>
						</div>
						<div className="action-not-ok pt-2 pb-2 pl-4 pr-4 mb-2">
							<span className="mr-4">
								<FaExclamationTriangle className="action-status-wrong" />
							</span>{" "}
							<span className="mr-4 fontBd">
								Xenia and Ringroad
							</span>
							<div className="floatRt">
								<span className="mr-4 language">GNU C++14</span>
								<span className="mr-4 points fontMd">0010/1200</span>
								<span className="time-ago">2 hours ago</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StalkFriend;
