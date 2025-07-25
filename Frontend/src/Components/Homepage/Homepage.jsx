import React from "react";
import logo1 from "../../assets/logo1.svg";
import img1 from '../../assets/img1.jpg';     
import img2 from '../../assets/img2.png';
import "./Homepage.css";


const Homepage = () => {
    return (
        <div className="App">
            <div className="profile">
                {/* <button>Profile</button> */}
            </div>
            <div className="navbar">
                <img src={logo1} className="App-logo" alt="App Logo" />
                <div className="nav">
                    <ul className="nav-list">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="/signin">Log In</a></li>
                    </ul>
                </div>
            </div>
    
            <div className="image">
                <img src={img1} className="img" alt="3D" />
            </div>
    
            <div className="content">
                <h1 className="wel"></h1>
                <p className="para">
                    Unlock the full potential of your Excel data with our powerful and intuitive analytics tool.
                    Whether you're a student, professional, or data analyst, our platform helps you analyze, visualize,
                    and gain insights from your spreadsheets effortlessly.
                    With just a few clicks, turn raw Excel files into clear graphs, tables, and dashboards — no complex coding required.
                    Start your data journey today and make smarter decisions faster!
                </p>
            </div>
    
            <div className="file-upload">
                <div className="upload-container">
                    <div className="upload-icon">
                        <img src={img2} className="upload-img" alt="Upload Icon" />
                        <p className="drag">Drag and Drop or Upload</p>
                    </div>
                    <input type="file" className="file-input" accept=".xls,.xlsx" />
                    <span className="upload-text">Upload Excel File</span>
                </div>
            </div>
    
            <div className="howto">
                <h2 className="howto-title">Steps To Upload Your File</h2>
                <ol className="howto-grid">
                    <li className="howto-column">
                        <span className="step-number">1</span>
                        <h3><span className="title1">Upload</span></h3>
                        <span className="step-text">
                            Select the Excel File, .XLSX, .XLS you wish to convert. PDF or other files are not accepted.
                        </span>
                    </li>
                    <li className="howto-column">
                        <span className="step-number">2</span>
                        <h3><span className="title2">Start Processing</span></h3>
                        <span className="step-text">
                            Excel Analytics File will convert your document to Bar charts, Line charts, Pie charts, and more.
                            You can select X-Axis and Y-Axis for your Bar charts.
                        </span>
                    </li>
                    <li className="howto-column">
                        <span className="step-number">3</span>
                        <h3><span className="title3">Download</span></h3>
                        <span className="step-text">
                            You can download the charts immediately. After clicking the download button, any uploaded files
                            will be purged from our server.
                        </span>
                    </li>
                </ol>
            </div>
    
        </div>
    );
};

export default Homepage;