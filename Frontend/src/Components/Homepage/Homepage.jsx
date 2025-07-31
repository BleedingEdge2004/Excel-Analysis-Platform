import React from "react";
import logo1 from "../../assets/logo1.svg";
import img1 from '../../assets/blue.png';
import "./Homepage.css";

const Homepage = () => {
    return (
        <div className="App">
            <div className="navbar">
                <img src={logo1} className="App-logo" alt="App Logo" />
                <div className="nav">
                    <ul className="nav-list">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </div>
                <a className="login" href="/signin">Log In</a>
            </div>

            <div className="image">
                <img src={img1} className="img" alt="3D visual" />
            </div>

            <div className="content">
                <h1 className="wel"></h1>
                <p className="para">
                    Unlock the full potential of your Excel data with our powerful and intuitive analytics tool...
                    {/* truncated for brevity */}
                </p>
            </div>

            <div className="howto">
                <h2 className="howto-title">Steps To Upload Your File</h2>
                <ol className="howto-grid">
                    <li className="howto-column">
                        <span className="step-number">1</span>
                        <h3 className="title1">Upload</h3>
                        <span className="step-text">
                            Select the Excel File (.XLSX, .XLS). PDF or other files are not accepted.
                        </span>
                    </li>
                    <li className="howto-column">
                        <span className="step-number">2</span>
                        <h3 className="title2">Start Processing</h3>
                        <span className="step-text">
                            Get automatic charts: bar, line, pie — and configure axes as needed.
                        </span>
                    </li>
                    <li className="howto-column">
                        <span className="step-number">3</span>
                        <h3 className="title3">Download</h3>
                        <span className="step-text">
                            Download the results. Files will be safely removed post-download.
                        </span>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default Homepage;
