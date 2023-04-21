export default function (props: {
    text: string;
    color: "red" | "blue" | "green" | "gray";
    onClick?: () => void;
    width?: number;
}) {
    return (
        <div
            className={`button ${props.color}`}
            onClick={() => {
                if (props.onClick) props.onClick();
            }}
            style={{width: props.width}}
        >
            {props.text}
        </div>
    );
}
