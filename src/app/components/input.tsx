"use client";
import { ChangeEvent, useCallback } from "react";

interface PropsType {
    type: "text" | "number";
    name: string;
    defaultInput: string | number;
    label?: string;
    onChange: (value: string) => void;
}
const Input = (props: PropsType) => {
    const {type, name, defaultInput, label, onChange} = props;

    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <label className="w-full flex flex-col gap-xs">
            {label ? (
                <p className="text-gray-400 text-xs font-semibold leading-6">
                    {label}
                </p>
            ) : null}
            <input
                name={name}
                type={type}
                onChange={changeHandler}
                defaultValue={defaultInput}
                className={`shadow-inner shadow-innerShaddow rounded-s border-gray-200 border-solid border-[1px] w-full px-sm py-s text-sm text-gray-800 ${props.type === "number" ? "remove-arrow" : null}`}
            />
        </label>
    );
};

export default Input;
