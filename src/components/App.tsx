import Header from "./projectHeader";
import Footer from "./projectFooter";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <Header />
            <div>
                <h2>Main body goes here</h2>
            </div>
            <Footer />
        </div>
    );
}

export default App;
