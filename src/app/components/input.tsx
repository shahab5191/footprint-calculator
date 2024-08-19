"use client";
import { ChangeEvent, useCallback } from "react";

interface PropsType<T> {
    type: T;
    label?: string;
    onChange: (value: string) => void;
}
const Input = (props: PropsType<"text" | "number">) => {
    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    }, []);

    return (
        <label className="w-full flex flex-col gap-xs">
            {props.label ? (
                <p className="text-gray-400 text-xs font-semibold leading-6">
                    {props.label}
                </p>
            ) : null}
            <input
                type={props.type}
                onChange={changeHandler}
                className={`shadow-inner shadow-innerShaddow rounded-s border-gray-200 border-solid border-[1px] w-full px-sm py-s text-sm text-gray-800 ${props.type === "number" ? "remove-arrow" : null}`}
            />
        </label>
    );
};

export default Input;
