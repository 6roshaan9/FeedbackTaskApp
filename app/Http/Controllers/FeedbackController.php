<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feedback;
use App\Models\FeedbackVote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index() {
        $feedback = Feedback::with(['user', 'votes'])->withCount('votes')->paginate(10);

        return Inertia::render('Feedback', ['feedback' => $feedback]);
    }

    public function store(Request $request) {
        $request->validate([
            'title' => "required",
            'description' => "required",
            'category' => "required"
        ]);

        $feedback = new Feedback();
        $feedback->fill($request->all());
        $feedback->user_id = Auth::user()->id;
        $feedback->save();

        return redirect("feedback");
    }

    public function vote($id) {
        $feedback = Feedback::findOrFail($id);

        $vote = new FeedbackVote();
        $vote->feedback_id = $feedback->id;
        $vote->user_id = Auth::user()->id;
        $vote->save();

        return redirect("feedback");
    }

    public function comments($id) {
        $feedback = Feedback::findOrFail($id);

        if(!$feedback->comments_enabled) {
            return redirect('feedback');
        }

        $comments = Comment::with('user')->where("feedback_id", $id)->paginate(10);

        return Inertia::render('Comments', ['feedback' => $feedback, 'comments' => $comments]);
    }

    public function storeComment(Request $request, $id) {
        $request->validate([
            'comment' => "required"
        ]);
        $comment = new Comment();
        $comment->comment = $request->comment;
        $comment->feedback_id = $id;
        $comment->user_id = Auth::user()->id;
        $comment->save();
        return back();
    }
}
