import { Link } from "@inertiajs/react";
import HTMLReactParser from "html-react-parser";
export default function Pagination({items}) {
    return (
        <div className="relative flex justify-center">
            {items.links.map((link, key) => (
                <Link
                    preserveScroll
                    key={key}
                    href={link.url}
                    className={`flex items-center justify-center px-3 py-2 text-sm rounded-lg text-gray-600 ${link.active ? 'bg-gray-200' : ''}`}
                >
                {HTMLReactParser(link.label)}
                </Link>
            ))}
        </div>
    );
}
