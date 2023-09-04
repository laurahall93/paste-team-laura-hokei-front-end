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
interface AddCommentProps {
    newComment: string;
    setNewComment: React.Dispatch<React.SetStateAction<string>>;
    handleSaveComment: () => void;
}
function AddComment(props: AddCommentProps): JSX.Element {
    return (
        <div>
            <textarea
                className="comment-area-body-textarea"
                placeholder="Add your comment here..."
                rows={8}
                cols={60}
                value={props.newComment}
                onChange={(event) => {
                    event.preventDefault();
                    props.setNewComment(event.target.value);
                }}
            ></textarea>
            <button className="save-button" onClick={props.handleSaveComment}>
                Save comment
            </button>
        </div>
    );
}
export function DispleyRecentListView(props: DataViewProps): JSX.Element {
    const [popupButton, setpopupButton] = useState<boolean>(false);
    const [popup, setPopup] = useState<string>("");
    const [viewButton, setViewButton] = useState<boolean>(false);
    const [showAllComments, setShowAllComments] = useState<CommentProps[]>([]);
    const [addNewCommentButton, setAddNewCommentButton] =
        useState<boolean>(false);
    const [newComment, setNewComment] = useState("");

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
    }

    function handleSaveComment() {
        const addNewComment = async (endpoint: string) => {
            try {
                const id = props.submit.id;
                const response = await axios.post(
                    `${baseUrl}/pastes/${id}/${endpoint}`,
                    { comment: newComment }
                );
                const result = response.data;
                if (result.length > 0) {
                    setShowAllComments((prev) => [...prev, result[0]]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        addNewComment("comments");
        setNewComment("");
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
                    <button className="add-button" onClick={handleAddComment}>
                        Add Comment
                    </button>
                    {addNewCommentButton && (
                        <AddComment
                            newComment={newComment}
                            setNewComment={setNewComment}
                            handleSaveComment={handleSaveComment}
                        />
                    )}
                </div>
            )}

            <hr className="breakline"></hr>
        </div>
    );
}
