import '../../styles/input.scss';

export default function (props: {
    value?: string;
    onChange?: (value: string) => void;
    maxLength?: number;
    error?: string;
    disabled?: boolean;
}) {
    return (
        <div className='textInput'>
            <input
                type='text'
                className={props.error ? 'redBorder' : 'whiteBorder'}
                onChange={(e) => {
                    if (props.onChange) props.onChange(e.target.value);
                }}
                value={props.value}
                maxLength={props.maxLength}
                disabled={props.disabled}
            />
            {props.error ? <div className='red'>{props.error}</div> : undefined}
        </div>
    );
}
