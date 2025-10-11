interface FeatureGridProps {
    features: string[];
}

function FeatureGrid({ features }: FeatureGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>{feature}</span>
                </div>
            ))}
        </div>
    );
}

export default FeatureGrid;
