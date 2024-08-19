interface PropsType {
    label: "annual" | "daily";
    amount: number;
}

const ResultOutput = (props: PropsType) => {
    return (
        <div className="text-foreground text-md">
            <h3 className="font-extralight text-md leading-[32px]">
                Your <b className="font-semibold">{props.label}</b> footprint is
            </h3>
            <p className="flex items-center gap-xs">
                <span className="text-2xl font-semibold leading-[56px]">{props.amount}</span>
                <span className="text-md leading-8 font-extralight">
                    kgCO<sub>2</sub>e
                </span>
            </p>
        </div>
    );
};

export default ResultOutput;
