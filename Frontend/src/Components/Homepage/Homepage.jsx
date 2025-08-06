import logo1 from "../../assets/logo1.svg";
import img1 from "../../assets/blue.png";
import "./Homepage.css";

const Homepage = () => {
    return (
        <div className="homepage">
            <header className="homepage-navbar">
                <img src={logo1} className="homepage-logo" alt="App Logo" />
                <nav className="homepage-nav">
                    <ul className="homepage-nav-list">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </nav>
                <a className="homepage-login" href="/signin">Login / Sign Up</a>
            </header>

            <section className="homepage-hero">
                <div className="homepage-text">
                    <h1 className="homepage-welcome"></h1>
                    <p className="homepage-description">
                        Unlock the full potential of your Excel data with our powerful and intuitive analytics tool.
                    </p>
                </div>
                <img src={img1} className="homepage-image" alt="3D visual" />
            </section>

            <section className="homepage-howto">
                <h2 className="homepage-howto-title">Steps To Upload Your File</h2>
                <ol className="homepage-howto-list">
                    <li className="homepage-howto-step">
                        <span className="homepage-step-number">1</span>
                        <h3 className="homepage-step-title">Upload</h3>
                        <p className="homepage-step-text">
                            Select the Excel File (.XLSX, .XLS). PDF or other files are not accepted.
                        </p>
                    </li>
                    <li className="homepage-howto-step">
                        <span className="homepage-step-number">2</span>
                        <h3 className="homepage-step-title">Start Processing</h3>
                        <p className="homepage-step-text">
                            Get automatic charts: bar, line, pie — and configure axes as needed.
                        </p>
                    </li>
                    <li className="homepage-howto-step">
                        <span className="homepage-step-number">3</span>
                        <h3 className="homepage-step-title">Download</h3>
                        <p className="homepage-step-text">
                            Download the results. Files will be safely removed post-download.
                        </p>
                    </li>
                </ol>
            </section>
        </div>
    );
};

export default Homepage;
