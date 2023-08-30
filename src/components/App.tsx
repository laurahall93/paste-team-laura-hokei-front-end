import Header from "./projectHeader";
import Footer from "./projectFooter";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import "./App.css";
import { InputArea, DataProps } from "./inputArea";
import { DispleyRecentListView } from "./RecentListView";

function App(): JSX.Element {
    const [recentSubmitList, setRecentSubmitList] = useState<DataProps[]>([]);
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
            setRecentSubmitList(submits);
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

    function handleSubmit() {
        if (inputTitle.length === 0 || inputBody.length === 0) {
            console.error("Title and Body cant be empty.");
        } else {
            setNewSubmit({ title: inputTitle, body: inputBody });

            console.log(newSubmit?.title);
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
    };

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
                <button onClick={handleSubmit}>Submit</button>
                <div>
                    <h2>Recent Submits: </h2>
                    {recentSubmitList.map((e) => (
                        <DispleyRecentListView key={e.id} submit={e} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
