import { DataProps } from "./inputArea";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export interface DataViewProps {
    submit: DataProps;
}

// interface CommentProps {
//     id?: number;
//     pasteBinId?: number;
//     comment: string;
// }

// interface CommentViewProps {
//     comment: CommentProps;
// }

export function DispleyRecentListView(props: DataViewProps): JSX.Element {
    const [popupButton, setpopupButton] = useState<boolean>(false);
    const [popup, setPopup] = useState<string>("");
    const [viewButton, setViewButton] = useState<boolean>(false);
    //useState string is temp, hard coded at the moment
    const [showAllComments, setShowAllComments] = useState<string>("");

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

    function handleViewClick() {
        setViewButton(!viewButton);
        const getComments = async (endpoint: string) => {
            try {
                const pasteId = props.submit.id;
                const response = await axios.get(
                    `${baseUrl}/pastes/${pasteId}/${endpoint}`
                );
                const result = response.data;
                console.log(result[0].comment + "comment is fetched");
                //each comment is temp, hard coded at the moment
                const eachComment = result[0].comment;
                console.log(eachComment);
                setShowAllComments(eachComment);
            } catch (err) {
                console.log(err);
            }
        };
        getComments("comments");
    }

    return (
        <div className="submit">
            <div className="recent-submit-content">
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

            <div className="popup">
                {popupButton === true ? (
                    <div>
                        <h3>Full summary: </h3>
                        <pre>
                            <code>{popup}</code>
                        </pre>
                        <button onClick={handleViewClick}>View comments</button>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div className="view-comment">
                {popupButton === true && viewButton === true ? (
                    <div>
                        <h3>Comments: </h3>
                        {/* current state is temporary  */}
                        {showAllComments}
                        {/* {showAllComments.map(
                            (e) => e.comment.comment
                        )} */}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <hr className="breakline"></hr>
        </div>
    );
}
