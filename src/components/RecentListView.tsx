import { DataProps } from "./inputArea";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export interface DataViewProps {
    submit: DataProps;
}

interface CommentProps {
    id?: number;
    pasteBinId?: number;
    comment: string;
}

interface CommentViewProps {
    comment: CommentProps;
}

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
        <div>
            <div className="recent-submit-list">
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
                    <div className="popup">
                        Full summary:{" "}
                        <pre>
                            <code>{popup}</code>
                        </pre>
                        <div className="view-comment">
                            <button onClick={handleViewClick}>
                                View comments
                            </button>
                            {viewButton === true ? (
                                <div>
                                    Comments:
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
                    </div>
                ) : (
                    <p> </p>
                )}
            </div>
        </div>
    );
}
