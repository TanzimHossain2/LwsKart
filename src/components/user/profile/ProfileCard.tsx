import Link from "next/link";

interface CardProps {
  title: string;
  link: string;
  children: React.ReactNode;
}

const Card = ({ title, link, children }: CardProps) => (
  <div className="max-w-md p-6 bg-white rounded-md shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium text-gray-800 text-lg">{title}</h3>
      <Link href={link} className="text-blue-500 hover:underline">
        Edit
      </Link>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

export default Card;
