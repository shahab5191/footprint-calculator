"use client";

import Image from "next/image";
import ResultOutput from "./result-output";
import useEmissionStore from "../lib/emission-store";
import useFormStore from "../lib/form-store";

const ResultSide = () => {
    const { daily, annual } = useEmissionStore();
    const { username } = useFormStore();
    return (
        <div className="col-span-4 bg-primary flex justify-center items-center">
            <div className="w-primary grid gap-2xl">
                <h2 className="text-foreground text-md font-extralight w-full">
                    Hi {username}
                </h2>
                <div className="flex flex-col gap-md">
                    <ResultOutput label="annual" amount={annual} />
                    <hr className="border-seperator w-primary" />
                    <ResultOutput label="daily" amount={daily} />
                </div>
                <div className="text-center w-full">
                    <Image
                        src="/glob.webp"
                        width={150}
                        height={150}
                        alt="Earth Globe"
                        className="mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default ResultSide;
