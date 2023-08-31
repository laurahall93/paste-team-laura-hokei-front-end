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
            <h2>Title: </h2>
            <input
                type="text"
                placeholder="Input title here..."
                value={inputTitle}
                onChange={(event) => {
                    setInputTitle(event.target.value);
                }}
            ></input>
            <h2>Body: </h2>
            <textarea
                placeholder="Input body here..."
                rows={20}
                cols={50}
                value={inputBody}
                onChange={(event) => {
                    setInputBody(event.target.value);
                }}
            ></textarea>
        </div>
    );
}
