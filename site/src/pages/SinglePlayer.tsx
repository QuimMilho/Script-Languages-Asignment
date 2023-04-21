import MultipleSelect from "../components/input/MultipleSelect";
import Select from "../components/input/Select";

export default function (props: {}) {
    return (
        <div className="body">
            <Select
                value="normal"
                options={[
                    { label: "Normal", value: "normal" },
                    { label: "Ultimate", value: "hard" },
                ]}
                clearable={false}
            />
            <MultipleSelect
                options={[
                    { label: "Normal", value: "normal" },
                    { label: "Ultimate", value: "hard" },
                    { label: "teste", value: "teste" },
                ]}
            />
        </div>
    );
}
