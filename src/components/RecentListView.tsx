import { DataProps } from "./inputArea";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export interface DataViewProps {
    submit: DataProps;
}

export function DispleyRecentListView(props: DataViewProps): JSX.Element {
    const [popupButton, setpopupButton] = useState<boolean>(false);
    const [popup, setPopup] = useState<string>("");

    function handlePopupClick() {
        setpopupButton(!popupButton);
        const getPopupInfo = async (endpoint: string) => {
            try {
                const id = props.submit.id;
                const response = await axios.get(`${baseUrl}${endpoint}${id}`);
                const result = response.data;
                setPopup(result[0].body);
            } catch (err) {
                console.log(err);
            }
        };
        getPopupInfo("/pastes/");
    }

    return (
        <div>
            <div>
                <h3>Title: {props.submit.title}</h3>
                <h4>
                    Summary :{" "}
                    <pre>
                        <code>{props.submit.body}</code>
                    </pre>
                    <button onClick={handlePopupClick}>
                        {popupButton !== false ? "Close code" : "Get All Code"}
                    </button>
                </h4>
            </div>
            <div>
                {popupButton === true ? (
                    <div>
                        Full summary:{" "}
                        <pre>
                            <code>{popup}</code>
                        </pre>
                    </div>
                ) : (
                    <p> </p>
                )}
            </div>
        </div>
    );
}
