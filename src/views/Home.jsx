import GradientText from "../components/GradientText";
import TextType from "../components/TextType";
import ShapeGrid from "../components/ShapeGrid";

const Home = () => {
    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-white px-6">
            <div className="fixed inset-0 -z-10">
                <ShapeGrid
                    direction="diagonal"
                    speed={0.3}
                    borderColor="#2a2a2a"
                    squareSize={40}
                    hoverFillColor="#1a1a1a"
                    shape="square"
                    hoverTrailAmount={5}
                />
            </div>

            <div className="max-w-4xl text-center z-10">
                <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter">
                    <GradientText colors={['#4285F4', '#DB4437', '#F4B400', '#0F9D58']} animationSpeed={5}>
                        GDG Campus
                    </GradientText>
                </h1>

                <div className="mb-12">
                    <TextType
                        text={[
                            "Build. Innovate. Lead.",
                            "Code the Future.",
                            "Create Impact."
                        ]}
                        className="text-2xl md:text-4xl font-mono text-slate-400"
                        typingSpeed={70}
                        pauseDuration={2000}
                    />
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    <button className="px-10 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-transform uppercase text-sm tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Explore Events
                    </button>
                    <button className="px-10 py-5 bg-white/5 border border-white/20 backdrop-blur-xl text-white font-black rounded-full hover:bg-white/10 transition-all uppercase text-sm tracking-widest">
                        Join Community
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 left-10 hidden md:block opacity-50 font-mono text-[10px] tracking-[0.5em] uppercase">
                System_Status: Online // Node: GDG_HUB_01
            </div>
        </div>
    );
};

export default Home;
