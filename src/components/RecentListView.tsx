import { DataProps } from "./inputArea";
export interface DataViewProps {
    submit: DataProps;
}

export function DispleyRecentListView(props: DataViewProps): JSX.Element {
    return (
        <div>
            <h3>Title: {props.submit.title}</h3>
            <h4>
                Summary :{" "}
                <pre>
                    <code>{props.submit.body}</code>
                </pre>
            </h4>
        </div>
    );
}
