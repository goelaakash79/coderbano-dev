import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
// import { runProgramService, compileProgramService } from "../../utils/services/";
import { FaSpinner, FaSyncAlt } from "react-icons/fa";
import "./style.css";
import Navbar from "./Navbar";
import ButtonLoading from "../ButtonLoading";

export default props => {
	const [code, setCode] = useState("//write your code javascript here");
	const [compiled, setCompiled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [output, setOutput] = useState(null);

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			props.history.push("/login");
		}
	}, []);

	const handleCompile = async () => {
		setIsLoading(true);
		setOutput("/*** compiling ***/");

		try {
			// const res = await compileProgramService({ source: code });
			// if (res.message === "success")
			// 	if (res.result.compile_status === "OK") {
			// 		setIsLoading(false);
			// 		setCompiled(true);
			// 		setOutput(null);
			// 	}
			// if (res.error) {
			// 	setIsLoading(false);
			// 	setOutput("/*** some unexpected error occurred ***/");
			// }
		} catch (err) {
			console.log(err);
			// if (err.data.error) {
			// 	setIsLoading(false);
			// 	setOutput("/*** some unexpected error occurred ***/");
			// }
		}
	};
	const handleRun = async () => {
		setIsLoading(true);
		setOutput("/*** executing ***/");
		try {
			// const res = await runProgramService({ source: code });
			// if (res.message === "success")
			// 	if (
			// 		res.result.compile_status === "OK" &&
			// 		res.result.run_status.status === "AC"
			// 	) {
			// 		setIsLoading(false);
			// 		setOutput(res.result.run_status.output);
			// 	}
			// if (res.error) {
			// 	setIsLoading(false);
			// 	setOutput("/*** some unexpected error occurred ***/");
			// }
		} catch (err) {}
	};

	return (
		<>
			<div className="container">
				<Navbar />

				<div className="row mt-5">
					<div className="col-lg-8">
						<div>
							<CodeMirror
								class="react-codemirror2"
								value={code}
								options={{
									mode: "javascript",
									theme: "material",
									lineNumbers: true
								}}
								onBeforeChange={(editor, data, value) => {
									setCode(value);
								}}
								autoCursor={true}
								autoScroll={true}
								onChange={(editor, data, value) => {}}
							/>
							<button
								disabled={isLoading}
								className="mt-4 button mb-4"
								hidden={compiled}
								onClick={handleCompile}
							>
								<ButtonLoading isLoading={isLoading} />

								<span hidden={isLoading}>Compile</span>
							</button>

							<button
								disabled={isLoading}
								className="mt-4 button mb-4"
								onClick={handleRun}
								hidden={!compiled}
							>
								<ButtonLoading isLoading={isLoading} />

								<span hidden={isLoading}>Run</span>
							</button>

							<span
								className="mt-4 mb-4 ml-4"
								onClick={() => window.location.reload()}
							>
								<FaSyncAlt hidden={isLoading} />{" "}
								<ButtonLoading
									isLoading={isLoading}
									color="primary"
								/>
							</span>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="outputBox card p-4">
							<h5>Output</h5>
							{output}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
