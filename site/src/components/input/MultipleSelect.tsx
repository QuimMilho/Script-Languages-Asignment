import React from "react";
import "../../styles/input.scss";

export default function (props: {
    value?: string[];
    options: { value: string; label: string }[];
    onChange?: (v: string[]) => void;
}) {
    const [hidden, setHidden] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<string[]>(
        props.value ? props.value : []
    );
    const opt = props.options.filter((o) => !value.includes(o.value));
    return (
        <div className="select">
            <div
                className="selected"
                onClick={() => {
                    hidden ? setHidden(false) : setHidden(true);
                }}
            >
                <div className="multipleValue">
                    {value.length === 0 ? (
                        <span className="gray">Nada Selecionado...</span>
                    ) : (
                        value.map((v) => (
                            <div key={v} className="white">
                                {
                                    props.options.find((o) => o.value === v)
                                        ?.label
                                }
                                <img
                                    src="/cross.png"
                                    onClick={() => {
                                        const temp = [...value];
                                        const t = temp.filter((o) => o !== v);
                                        setValue(t);
                                    }}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="images">
                    <img src="/cross.png" onClick={() => setValue([])} />
                    <img
                        src="/open.png"
                        style={{ rotate: hidden ? "0deg" : "180deg" }}
                        onClick={() => {
                            hidden ? setHidden(false) : setHidden(true);
                        }}
                    />
                </div>
            </div>
            <div className="options" style={{ zIndex: hidden ? "-1" : "10" }}>
                {opt.length > 0 ? (
                    opt.map((o) => (
                        <div
                            className="white"
                            key={o.value}
                            onClick={() => {
                                const temp = [...value];
                                temp.push(o.value);
                                setValue(temp);
                                if (props.onChange)
                                    clicked(temp, props.onChange);
                            }}
                        >
                            {o.label}
                        </div>
                    ))
                ) : (
                    <div className="gray">Não há opções disponíveis...</div>
                )}
            </div>
        </div>
    );
}

async function clicked(value: string[], onChange: (v: string[]) => void) {
    onChange(value);
}
