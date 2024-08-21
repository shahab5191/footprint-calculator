"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface PropsType {
    type: "text" | "number";
    name: string;
    defaultInput: string | number;
    label?: string;
    min?: number;
    max?: number;
    onChange: (value: string) => void;
}

const Input = (props: PropsType) => {
    const {type, name, defaultInput, label, min, max, onChange} = props;
    const [value, setValue] = useState<number | string>(defaultInput)

    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let inputValue: string | number = e.target.value;
        if (type === "number"){
            const num = parseInt(inputValue)
            if (max !== undefined && num > max){
                inputValue = max
            }

            if (min !== undefined && num < min){
                inputValue = min
            }
        }
        setValue(inputValue)
        onChange(String(inputValue));
    }, [onChange, max, min, type]);

    useEffect(()=>{
        setValue(defaultInput)
    },[defaultInput])
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
                value={value}
                className={`shadow-inner shadow-innerShaddow rounded-s border-gray-200 border-solid border-[1px] w-full px-sm py-s text-sm text-gray-800 ${props.type === "number" ? "remove-arrow" : null}`}
            />
        </label>
    );
};

export default Input;
