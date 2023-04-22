import "../../styles/input.scss";

export default function (props: {
    value?: string;
    onChange?: (str: string) => void;
    maxLength?: number;
    error?: string;
}) {
    return (
        <div className="textInput">
            <input
                type="text"
                className={props.error ? "redBorder" : "whiteBorder"}
                onChange={(e) => {
                    if (props.onChange) props.onChange(e.target.value);
                }}
                value={props.value}
                maxLength={props.maxLength}
            />
            {props.error ? <div className="red">{props.error}</div> : undefined}
        </div>
    );
}
