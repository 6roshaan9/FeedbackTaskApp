import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback({ auth, feedback }) {
    const { post, delete: destroy } = useForm();
    const updateCommentStatus = (feedback_id) => {
        post(route("admin.comments.status", { id: feedback_id }), {
            onSuccess: () => {
                toast.success("Comment status has been updated successfully.", {
                    position: "top-right",
                    autoClose: 3000, // 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
        });
    };
    const deleteFeedback = (feedback_id) => {
        destroy(route("admin.feedback.delete", { id: feedback_id }), {
            onSuccess: () => {
                toast.success("Feedback has been deleted successfully.", {
                    position: "top-right",
                    autoClose: 3000, // 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
        });
    };

    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Feedback
                </h2>
            }
        >
            <Head title="Feedback" />

            <ToastContainer />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border">Title</th>
                                    <th className="py-2 px-4 border">
                                        Category
                                    </th>
                                    <th className="py-2 px-4 border">Votes</th>
                                    <th className="py-2 px-4 border">User</th>
                                    <th className="py-2 px-4 border">
                                        Comment Status
                                    </th>
                                    <th className="py-2 px-4 border">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedback.data.length === 0 ? (
                                    <tr className="text-center">
                                        <td colSpan="6" className="py-4 border">
                                            No feedback found.
                                        </td>
                                    </tr>
                                ) : (
                                    feedback.data.map((feedback_item) => (
                                        <tr
                                            key={feedback_item.id}
                                            className="text-center"
                                        >
                                            <td className="py-2 px-4 border">
                                                {feedback_item.title}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {feedback_item.category}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {feedback_item.votes_count ?? 0}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {feedback_item.user.name}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                <span className="inline-block bg-blue-500 text-white mx-1 text-sm font-semibold px-2 py-1 rounded-lg">
                                                    {feedback_item.comments_enabled
                                                        ? "Enabled"
                                                        : "Disabled"}
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 border">
                                                <button
                                                    className="bg-blue-500 text-white mx-1 py-1 px-2 rounded hover:bg-blue-600"
                                                    onClick={() =>
                                                        updateCommentStatus(
                                                            feedback_item.id
                                                        )
                                                    }
                                                >
                                                    {feedback_item.comments_enabled
                                                        ? "Disable"
                                                        : "Enable"}{" "}
                                                    Comments
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white mx-1 py-1 px-2 rounded hover:bg-red-600"
                                                    onClick={() =>
                                                        deleteFeedback(
                                                            feedback_item.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <Link
                                                    href={route(
                                                        "admin.feedback.comments",
                                                        { id: feedback_item.id }
                                                    )}
                                                    className="bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-600"
                                                >
                                                    Comments
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <div className="p-4">
                            <Pagination items={feedback} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
