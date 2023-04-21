import React from "react";
import "../../styles/input.scss";

export default function (props: {
    value?: string;
    options: { value: string; label: string }[];
    onChange?: (v: string | undefined) => void;
    clearable?: boolean;
}) {
    const [hidden, setHidden] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<string | undefined>(props.value);
    return (
        <div className="select white">
            <div
                className="selected"
                onClick={() => {
                    hidden ? setHidden(false) : setHidden(true);
                }}
            >
                <div className="value">
                    {(() => {
                        const o = props.options.find((o) => o.value === value);
                        if (!o)
                            return (
                                <span className="gray">
                                    Nada Selecionado...
                                </span>
                            );
                        return o.label;
                    })()}
                </div>
                <div className="images">
                    <img
                        src="/open.png"
                        style={{ rotate: hidden ? "0deg" : "180deg" }}
                    />
                </div>
            </div>
            <div className="options" style={{ zIndex: hidden ? "-1" : "10" }}>
                {props.clearable ? (
                    <div
                        className="gray"
                        onClick={() => {
                            setValue(undefined);
                            if (props.onChange)
                                clicked(undefined, props.onChange);
                            hide(setHidden);
                        }}
                    >
                        Nada Selecionado...
                    </div>
                ) : undefined}
                {props.options.length > 0 ? (
                    props.options.map((o) => (
                        <div
                            key={o.value}
                            onClick={() => {
                                setValue(o.value);
                                if (props.onChange)
                                    clicked(o.value, props.onChange);
                                hide(setHidden);
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

async function clicked(
    value: string | undefined,
    onChange: (v: string | undefined) => void
) {
    onChange(value);
}

async function hide(setHidden: (v: boolean) => void) {
    setHidden(true);
}
