import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users({ auth, users }) {
    const { delete: destroy } = useForm();
    const deleteUser = (user_id) => {
        destroy(route("admin.users.delete", { id: user_id }), {
            onSuccess: () => {
                toast.success("A user has been deleted successfully.", {
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
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Email</th>
                                    <th className="py-2 px-4 border">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.length === 0 ? (
                                    <tr className="text-center">
                                        <td colSpan="3" className="py-4 border">
                                            No users found.
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="text-center"
                                        >
                                            <td className="py-2 px-4 border">
                                                {user.name}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {user.email}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                <button
                                                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                                    onClick={() =>
                                                        deleteUser(user)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <div className="p-4">
                            <Pagination items={users} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
