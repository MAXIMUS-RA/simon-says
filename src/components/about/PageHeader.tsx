interface PageHeaderProps {
    title: string;
}

function PageHeader({ title }: PageHeaderProps) {
    return <h1 className="text-4xl font-bold text-white mb-8 text-center">{title}</h1>;
}

export default PageHeader;
