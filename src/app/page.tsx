import ResultSide from "./components/result";
import SideBar from "./components/side-bar";
import AuthSchema from "./lib/auth-schema";
import EmissionResponseSchema from "./lib/data-schema";

interface GetEmissionArgs {
    income: number;
    adults: number;
    children: number;
}

export default async function Home() {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    let token: string = "";

    try {
        const body = JSON.stringify({
            client_id,
            client_secret,
            audience: "ducky-api-prod",
            grant_type: "client_credentials",
        });
        const authenticate = await fetch(
            "https://ducky-prod.eu.auth0.com/oauth/token",
            {
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await authenticate.json();
        const parsedResponse = AuthSchema.parse(data);

        token = parsedResponse.access_token;
    } catch (error) {
        return <div>Error</div>;
    }

    async function getEmission(args: GetEmissionArgs): Promise<number | null> {
        "use server";
        try {
            const body = JSON.stringify({
                household: {
                    monthlyIncomeAfterTax: args.income,
                    members: {
                        adults: args.adults,
                        children: args.children,
                    },
                },
            });
            const response = await fetch(
                "https://api.ducky.eco/v3/calculator?scope=individual",
                {
                    method: "POST",
                    headers: {
                        authorization: `bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body,
                    cache: "no-cache",
                }
            );

            const data = await response.json();
            const parsedData = EmissionResponseSchema.parse(data);

            return parsedData.totalCo2Kg;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    return (
        <main className="w-screen h-dvh grid grid-cols-6">
            <SideBar fetchData={getEmission} />
            <ResultSide />
        </main>
    );
}
