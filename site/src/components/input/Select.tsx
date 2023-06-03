import React from 'react';
import '../../styles/input.scss';
import { option } from '../../types';

export default function (props: {
    value?: string;
    options: option[];
    onChange?: (value: string | undefined) => void;
}) {
    const [hidden, setHidden] = React.useState<boolean>(true);
    return (
        <div className='select white'>
            <Selected
                hidden={hidden}
                options={props.options}
                setHidden={(value) => setHidden(value)}
                value={props.value}
            />
            <Options
                hidden={hidden}
                onChange={(value) => {
                    setHidden(true);
                    if (props.onChange) props.onChange(value);
                }}
                options={props.options}
            />
        </div>
    );
}

function Selected(props: {
    hidden: boolean;
    setHidden: (value: boolean) => void;
    options: option[];
    value?: string;
}) {
    return (
        <div
            className='selected'
            onClick={() =>
                props.hidden ? props.setHidden(false) : props.setHidden(true)
            }
        >
            <div className='value'>{getValue(props.options, props.value)}</div>
            <img
                src='/open.png'
                style={{ rotate: props.hidden ? '0deg' : '180deg' }}
                className='images'
            />
        </div>
    );
}

function Options(props: {
    hidden: boolean;
    options: option[];
    onChange: (value: string) => void;
}) {
    if (props.options.length === 0) return <NoOptions hidden={props.hidden} />;
    return (
        <OptionList
            hidden={props.hidden}
            onChange={props.onChange}
            options={props.options}
        />
    );
}

function NoOptions(props: { hidden: boolean }) {
    return (
        <div className='options' style={{ zIndex: props.hidden ? '-1' : '10' }}>
            <div className='gray'>Não há opções disponíveis...</div>
        </div>
    );
}

function OptionList(props: {
    hidden: boolean;
    options: option[];
    onChange: (value: string) => void;
}) {
    return (
        <div className='options' style={{ zIndex: props.hidden ? '-1' : '10' }}>
            {props.options.map((o) => (
                <Option
                    key={o.value}
                    label={o.label}
                    onClick={() => props.onChange(o.value)}
                />
            ))}
        </div>
    );
}

function Option(props: { label: string; onClick: () => void }) {
    return <div onClick={props.onClick}>{props.label}</div>;
}

function getValue(options: option[], value?: string) {
    const o = options.find((o) => o.value === value);
    if (!o) return <span className='gray'>Nada Selecionado...</span>;
    return o.label;
}
