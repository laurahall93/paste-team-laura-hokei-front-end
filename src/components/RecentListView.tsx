import { DataProps } from "./inputArea";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export interface DataViewProps {
    submit: DataProps;
}

export function DispleyRecentListView(props: DataViewProps): JSX.Element {
    //state for button default = false -> popup will not show, onclick = true ->popup shows
    const [popup, SetPopup] = useState<string>("");

    function handlePopupClick() {
        const getPopupInfo = async (endpoint: string) => {
            try {
                const id = props.submit.id;

                const response = await axios.get(`${baseUrl}${endpoint}${id}`);
                const result = response.data;
                console.log(
                    `fetch submit: ${id} and display as a popup, title: ${result.title}`
                );
                SetPopup(result[0].body);
                console.log(`result: ${result[0].id}`); //result[0].id = id:2
            } catch (err) {
                console.log(err);
            }
        };
        getPopupInfo("/pastes/");
    }

    // function DisplayPopup(data: any): JSX.Element {
    //     const fullBody = data[0].body;

    //     return (
    //         <div>
    //             <p>Full summary: {fullBody}</p>
    //         </div>
    //     );
    // }

    return (
        <div>
            <div>
                <h3>Title: {props.submit.title}</h3>
                <h4>
                    Summary :{" "}
                    <pre>
                        <code>{props.submit.body}</code>
                    </pre>
                    <button onClick={handlePopupClick}>Get All Code</button>
                </h4>
            </div>
            <div>
                {/* change popup !== undefined to button state once implemented */}
                {popup !== undefined ? (
                    <div>Full summary: {popup}</div>
                ) : (
                    <p> </p>
                )}
            </div>
        </div>
    );
}
