interface InstructionListProps {
    instructions: string[];
}

function InstructionList({ instructions }: InstructionListProps) {
    return (
        <ul className="text-gray-300 space-y-3">
            {instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">{index + 1}.</span>
                    <span>{instruction}</span>
                </li>
            ))}
        </ul>
    );
}

export default InstructionList;
