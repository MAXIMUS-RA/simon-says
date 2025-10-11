interface InfoCardProps {
    title: string;
    children: React.ReactNode;
}

function InfoCard({ title, children }: InfoCardProps) {
    return (
        <div className="bg-gray-800 rounded-lg p-8 mb-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">{title}</h2>
            {children}
        </div>
    );
}

export default InfoCard;
