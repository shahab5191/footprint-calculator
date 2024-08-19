interface PropsType {
    type: "text" | "number";
    label?: string;
}
const Input = (props: PropsType) => {
    return (
        <label className="w-full flex flex-col gap-xs">
            {props.label ? (
                <p className="text-gray-400 text-xs font-semibold leading-6">
                    {props.label}
                </p>
            ) : null}
            <input
                type={props.type}
                className={`shadow-inner shadow-innerShaddow rounded-s border-gray-200 border-solid border-[1px] w-full px-sm py-s text-sm text-gray-800 ${props.type === "number" ? "remove-arrow" : null}`}
            />
        </label>
    );
};

export default Input;
