<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $users = User::whereNot('id', Auth::user()->id)->paginate(10);
        return Inertia::render('Admin/Users', ['users' => $users]);
    }

    public function delete($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect('admin/users');
    }
}
