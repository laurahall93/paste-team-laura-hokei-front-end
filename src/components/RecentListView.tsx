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

export function DispleyRecentListView(props: DataViewProps): JSX.Element {
    const [popupButton, setpopupButton] = useState<boolean>(false);
    const [popup, setPopup] = useState<string>("");
    const [viewButton, setViewButton] = useState<boolean>(false);
    const [showAllComments, setShowAllComments] = useState<CommentProps[]>([]);
    const [addNewCommentButton, setAddNewCommentButton] =
        useState<boolean>(false);
    const [addNewComment, setAddNewComment] = useState("");

    function handlePopupClick() {
        setpopupButton(!popupButton);
        if (popupButton === false) {
            setViewButton(false);
        }
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
                setShowAllComments(result);
            } catch (err) {
                console.log(err);
            }
        };
        getComments("comments");
    }

    function handleAddComment() {
        setAddNewCommentButton(!addNewCommentButton);
        TestAddComment();
    }

    function TestAddComment(): JSX.Element {
        return (
            <div>
                <textarea
                    placeholder="Add your comment here..."
                    rows={8}
                    cols={60}
                    value={addNewComment}
                    onChange={(event) => {
                        setAddNewComment(event.target.value);
                    }}
                ></textarea>
                <button onClick={handleSaveComment}>Save comment</button>
            </div>
        );
    }

    function handleSaveComment() {
        console.log("Save button is clicked");
        const addNewComment = async (endpoint: string) => {
            try {
                const id = props.submit.id;
                const response = await axios.post(
                    `${baseUrl}/pastes/${id}/${endpoint}`,
                    { comment: `${addNewComment}` }
                );
                const result = response.data;
                setShowAllComments((prev) => [...prev, result]);
            } catch (err) {
                console.log(err);
            }
        };
        addNewComment("comments");
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
            {popupButton && (
                <div className="popup">
                    <h3>Full summary: </h3>
                    <pre>
                        <code>{popup}</code>
                    </pre>
                    <button onClick={handleViewClick}>View comments</button>
                </div>
            )}

            {popupButton && viewButton && (
                <div className="view-comment">
                    <h3>Comments: </h3>
                    {showAllComments.map((e) => {
                        return <p key={e.id}>{e.comment}</p>;
                    })}
                    <button onClick={handleAddComment}>Add Comment</button>
                    {addNewCommentButton && <TestAddComment />}
                </div>
            )}

            <hr className="breakline"></hr>
        </div>
    );
}
