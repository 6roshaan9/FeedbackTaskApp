import { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HTMLReactParser from 'html-react-parser';

export default function Comments({ auth, feedback, comments }) {


    const [savingComment, setSavingComment] = useState(false);
    const feedbackInput = useRef();
    const {
        data,
        setData,
        post,
        reset,
        errors,
      } = useForm({
        comment: '',
    });

    const confirmCommentSubmission = () => {
        setSavingComment(true);
    };

    const saveComment = (e) => {
        e.preventDefault();
        post(route('feedback.comment.store', {id: feedback.id}), {
          comment: data.comment,
          onSuccess: () => closeModal(),
        })
    };

    const closeModal = () => {
        setSavingComment(false);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Comments</h2>}
        >
            <Head title="Comments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow-sm sm:rounded-lg">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-4"
                        onClick={confirmCommentSubmission}
                    >
                        Leave a Comment
                    </button>
                    <ul className="list-none">
                        {comments.data.map((comment) => (
                        <li key={comment.id} className="mb-4 p-4 border rounded-md">
                            <div className="flex items-center mb-2">
                            <strong className="text-blue-500">{comment.user.name}</strong>
                            {auth.user.id === comment.user_id && (
                                <span className="ml-2 text-gray-500">[You]</span>
                            )}
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

            <Modal show={savingComment} onClose={closeModal}>
                <form onSubmit={saveComment} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">{feedback.title}</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        {feedback.description}
                    </p>

                    <div className="mt-6">
                    <InputLabel value="Comment" className="sr-only" />
                    <ReactQuill
                        value={data.comment}
                        onChange={(value) => setData('comment', value)}
                        className="mt-1 block w-full"
                        placeholder="Comment"
                    />
                    <InputError message={errors.comment} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-3">
                        Comment
                    </button>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
}
