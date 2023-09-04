export interface DataProps {
    id?: number;
    title: string;
    body: string;
}

interface SubmitStateprops {
    inputTitle: string;
    setInputTitle: React.Dispatch<React.SetStateAction<string>>;
    inputBody: string;
    setInputBody: React.Dispatch<React.SetStateAction<string>>;
    newSubmit: DataProps | undefined;
    setNewSubmit: React.Dispatch<React.SetStateAction<DataProps | undefined>>;
}

export function InputArea({
    inputTitle,
    setInputTitle,
    inputBody,
    setInputBody,
}: SubmitStateprops): JSX.Element {
    return (
        <div>
            <div>
                <h2 className="submit-area-title">Title: </h2>
                <input
                    className="submit-area-title-input"
                    type="text"
                    placeholder="Input title here..."
                    value={inputTitle}
                    onChange={(event) => {
                        setInputTitle(event.target.value);
                    }}
                ></input>
            </div>
            <div>
                <h2 className="submit-area-body">Summary: </h2>
                <textarea
                    className="submit-area-body-textarea"
                    placeholder="Input summary here..."
                    rows={8}
                    cols={60}
                    value={inputBody}
                    onChange={(event) => {
                        setInputBody(event.target.value);
                    }}
                ></textarea>
            </div>
        </div>
    );
}
