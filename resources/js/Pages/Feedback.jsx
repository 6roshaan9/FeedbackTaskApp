import { useState, useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback({ auth, feedback }) {
    // Static Categories for Feedback
    const categoryOptions = [
        { label: "Bug Report", value: "Bug Report" },
        { label: "Feature Request", value: "Feature Request" },
        { label: "Improvement", value: "Improvement" },
    ];

    const submit_vote = (feedback_id) => {
        post(
            route("feedback.vote", {
                id: feedback_id,
            })
        );
    };

    const handleVote = (current_feedback) => {
        var hasVote = false;
        if (current_feedback && current_feedback.votes) {
            current_feedback.votes.map((vote) => {
                if (vote.user_id == auth.user.id) {
                    hasVote = true;
                }
            });
            if (!hasVote) {
                submit_vote(current_feedback.id);
            } else {
                toast.error("You've already voted against this feedback.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    const [submittingFeedback, setSubmittingFeedback] = useState(false);
    const feedbackInput = useRef();
    const { data, setData, post, reset, errors } = useForm({
        title: "",
        description: "",
        category: categoryOptions[0].value,
    });

    const confirmFeedbackSubmission = () => {
        setSubmittingFeedback(true);
    };

    const submitFeedback = (e) => {
        e.preventDefault();

        post(route("feedback.store"), {
            title: data.title,
            description: data.description,
            category: data.category,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setSubmittingFeedback(false);
        reset();
    };

    return (
        <AuthenticatedLayout
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
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-4"
                        onClick={confirmFeedbackSubmission}
                    >
                        Submit Feedback
                    </button>
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
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedback.data.length === 0 ? (
                                    <tr className="text-center">
                                        <td colSpan="5" className="py-4 border">
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
                                                <button
                                                    className="bg-blue-500 text-white py-1 px-2 mx-1 rounded hover:bg-blue-600"
                                                    onClick={() =>
                                                        handleVote(
                                                            feedback_item
                                                        )
                                                    }
                                                >
                                                    Vote
                                                </button>
                                                {feedback_item.comments_enabled && (
                                                    <Link
                                                        href={route(
                                                            "feedback.comments",
                                                            {
                                                                id: feedback_item.id,
                                                            }
                                                        )}
                                                        className="bg-purple-500 text-white py-1 px-2 mx-1 rounded hover:bg-purple-600"
                                                    >
                                                        Comments
                                                    </Link>
                                                )}
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

            <Modal show={submittingFeedback} onClose={closeModal}>
                <form onSubmit={submitFeedback} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Submit your feedback
                    </h2>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="feedbackTitle"
                            value="Feedback Title"
                            className="sr-only"
                        />
                        <TextInput
                            id="feedbackTitle"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Feedback Title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="feedbackDescription"
                            value="Feedback Description"
                            className="sr-only"
                        />
                        <TextAreaInput
                            id="feedbackDescription"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full"
                            placeholder="Feedback Description"
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="category"
                            value="Category"
                            className="sr-only"
                        />
                        <SelectInput
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                            className="mt-1 block w-full"
                            options={categoryOptions}
                        />
                        <InputError
                            message={errors.category}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-3">
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
