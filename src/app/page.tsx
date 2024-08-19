import ResultSide from "./components/result";
import SideBar from "./components/side-bar";

export default function Home() {
    return (
        <main className="w-screen h-dvh grid grid-cols-6">
            <SideBar />
            <ResultSide />
        </main>
    );
}
