<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index() {
        $feedback = Feedback::with(['user', 'votes'])->withCount('votes')->paginate(10);
        return Inertia::render('Admin/Feedback', ['feedback' => $feedback]);
    }

    public function delete($id) {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        return redirect('admin/feedback');
    }

    public function comments($id) {
        $comments = Comment::with('user')->where("feedback_id", $id)->paginate(10);
        return Inertia::render('Admin/Comments', ['comments' => $comments]);
    }

    public function updateCommentStatus($id) {
        $feedback = Feedback::findOrFail($id);
        $feedback->comments_enabled = !$feedback->comments_enabled;
        $feedback->save();
        return redirect('admin/feedback');
    }
}
