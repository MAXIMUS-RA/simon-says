import PageHeader from "../components/about/PageHeader";
import InfoCard from "../components/about/InfoCard";
import InstructionList from "../components/about/InstructionList";
import FeatureGrid from "../components/about/FeatureGrid";

function About() {
    const instructions = [
        "Watch the sequence of colors that light up",
        "Repeat the sequence by clicking the colors in the correct order",
        "Each round adds one more color to the sequence",
        "Keep going until you make a mistake!",
    ];

    const features = ["Progressive difficulty", "Sound effects", "Visual feedback", "Score tracking"];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <PageHeader title="About Simon Says" />

            <InfoCard title="What is Simon Says?">
                <p className="text-gray-300 leading-relaxed mb-4">
                    Simon Says is a classic memory game where you need to remember and repeat increasingly complex sequences of colors and sounds.
                    Test your memory and see how far you can go!
                </p>
            </InfoCard>

            <InfoCard title="How to Play">
                <InstructionList instructions={instructions} />
            </InfoCard>

            <InfoCard title="Features">
                <FeatureGrid features={features} />
            </InfoCard>

            <div className="text-center mt-8">
                <p className="text-gray-400 text-sm">Built with React, TypeScript, and Tailwind CSS</p>
            </div>
        </div>
    );
}

export default About;
