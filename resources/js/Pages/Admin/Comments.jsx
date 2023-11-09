import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head  } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import 'react-quill/dist/quill.snow.css';
import HTMLReactParser from 'html-react-parser';

export default function Comments({ auth, comments }) {

    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Comments</h2>}
        >
            <Head title="Comments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow-sm sm:rounded-lg">
                    <ul className="list-none">
                        {comments.data.map((comment) => (
                        <li key={comment.id} className="mb-4 p-4 border rounded-md">
                            <div className="flex items-center mb-2">
                            <strong className="text-blue-500">{comment.user.name}</strong>
                            </div>
                            <div className="text-gray-700">{HTMLReactParser(comment.comment)}</div>
                            <p className="text-sm text-gray-500 mt-2">{comment.date}</p>
                        </li>
                        ))}
                    </ul>
                    <Pagination items={comments} />
                    </div>
                </div>
            </div>

        </AdminAuthenticatedLayout>
    );
}
