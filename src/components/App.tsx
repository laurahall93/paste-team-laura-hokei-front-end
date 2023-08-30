import Header from "./projectHeader";
import Footer from "./projectFooter";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import "./App.css";
import { InputArea, DataProps } from "./inputArea";

function App(): JSX.Element {
    const [recentSubmitList, setRecentSubmitList] = useState("");
    const [newSubmit, setNewSubmit] = useState<DataProps>();
    const [inputTitle, setInputTitle] = useState("");
    const [inputBody, setInputBody] = useState("");

    //firstload:
    async function fetchAllSubmit(endpoint: string) {
        try {
            const reponse = await axios.get(`${baseUrl}${endpoint}`);
            // const reponse = await axios.get(
            //     "https://jsonplaceholder.typicode.com/todos"
            // );

            const submits = reponse.data;
            setRecentSubmitList(submits[0].title);
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
                <InputArea
                    inputTitle={inputTitle}
                    setInputTitle={setInputTitle}
                    inputBody={inputBody}
                    setInputBody={setInputBody}
                    newSubmit={newSubmit}
                    setNewSubmit={setNewSubmit}
                />
                <div>{recentSubmitList}</div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
