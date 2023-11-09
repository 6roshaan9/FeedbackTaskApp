<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/AdminLogin', [
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request)
    {
        $request->authenticateAdmin();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::ADMIN_HOME);
    }

    public function logout(Request $request) {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('admin');
    }

    public function dashboard() {
        return Inertia::render('Admin/Dashboard');
    }
}
