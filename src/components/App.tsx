import Header from "./projectHeader";
import Footer from "./projectFooter";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import "./App.css";

function App(): JSX.Element {
    //on click submit button - should update
    const [recentSubmits, setRecentSubmits] = useState("");

    //firstload:
    async function fetchAllSubmit(endpoint: string) {
        try {
            const reponse = await axios.get(`${baseUrl}${endpoint}`);
            // const reponse = await axios.get(
            //     "https://jsonplaceholder.typicode.com/todos"
            // );

            const submits = reponse.data;
            setRecentSubmits(submits[0].title);
            console.log(submits);
            console.log("fetched all recentSubmits");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // populate data on first load
        fetchAllSubmit("/pastes");
    }, []);

    return (
        <div className="App">
            <Header />
            <div>
                <h2>Main body goes here</h2>
                <h3>1- input area</h3>
                <h3>2- List view</h3>
                <div>{recentSubmits}</div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
