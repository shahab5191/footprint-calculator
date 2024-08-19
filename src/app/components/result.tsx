"use client";

import Image from "next/image";
import ResultOutput from "./result-output";
import useFormStore from "../lib/form-store";

const ResultSide = () => {
    const { annual, username, changed } = useFormStore();
    return (
        <div className="col-span-4 bg-primary flex justify-center items-center">
            <div className="w-primary grid gap-2xl">
                {changed || annual === undefined ? null : (
                    <>
                        <h2 className="text-foreground text-md font-extralight w-full">
                            Hi {username}
                        </h2>
                        <div className="flex flex-col gap-md">
                            <ResultOutput label="annual" amount={annual} />
                            <hr className="border-seperator w-primary" />
                            <ResultOutput label="daily" amount={annual / 360} />
                        </div>
                    </>
                )}
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
