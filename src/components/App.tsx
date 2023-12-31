import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../utils/baseUrl";
import Header from "./projectHeader";
import { InputArea, DataProps } from "./inputArea";
import { DispleyRecentListView } from "./RecentListView";
import Footer from "./projectFooter";

function App(): JSX.Element {
    const [recentSubmitList, setRecentSubmitList] = useState<DataProps[]>([]);
    const [newSubmit, setNewSubmit] = useState<DataProps>();
    const [inputTitle, setInputTitle] = useState("");
    const [inputBody, setInputBody] = useState("");

    async function fetchAllSubmit(endpoint: string) {
        try {
            const reponse = await axios.get(`${baseUrl}${endpoint}`);
            const submits = reponse.data;
            setRecentSubmitList(submits);
        } catch (err) {
            console.log(err);
        }
    }

    // populate data on first load
    useEffect(() => {
        fetchAllSubmit("/pastes");
    }, []);

    function handleSubmit() {
        if (inputTitle.length === 0 || inputBody.length === 0) {
            alert("Title and Body cant be empty.");
        } else {
            setNewSubmit({ title: inputTitle, body: inputBody });
            addNewSubmit("/pastes");
        }
    }

    // POST new submit
    const addNewSubmit = async (endpoint: string) => {
        try {
            const response = await axios.post(`${baseUrl}${endpoint}`, {
                title: inputTitle,
                body: inputBody,
            });
            console.log("New submit has been added" + response.data.title);
        } catch (err) {
            console.log(err);
        }
        fetchAllSubmit("/pastes");
        setInputTitle("");
        setInputBody("");
    };

    return (
        <div className="App">
            <Header />
            <div>
                <div className="input-area">
                    <InputArea
                        inputTitle={inputTitle}
                        setInputTitle={setInputTitle}
                        inputBody={inputBody}
                        setInputBody={setInputBody}
                        newSubmit={newSubmit}
                        setNewSubmit={setNewSubmit}
                    />
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                <div className="recent-submits-list">
                    <h2 className="list-title">Recent Submits: </h2>
                    <div className="all-submits">
                        {recentSubmitList.map((e) => (
                            <DispleyRecentListView key={e.id} submit={e} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
