<?php

use App\Http\Controllers\Admin\FeedbackController as AdminFeedbackController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AdminController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// User Panel Routes

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'admin.auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'admin.auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('feedback', [FeedbackController::class, 'index'])->name('feedback');
    Route::get('feedback/create', [FeedbackController::class, 'create'])->name('feedback.create');
    Route::post('feedback/store', [FeedbackController::class, 'store'])->name('feedback.store');
    Route::post('feedback/vote/{id}', [FeedbackController::class, 'vote'])->name('feedback.vote');

    Route::get('feedback/comments/{id}', [FeedbackController::class, 'comments'])->name('feedback.comments');
    Route::post('feedback/comment/{id}', [FeedbackController::class, 'storeComment'])->name('feedback.comment.store');
});

// Admin Panel Routes

// Admin Auth
Route::prefix('admin')->middleware('admin.auth')->group(function () {
    Route::get('/', [AdminController::class, 'create'])->name('admin');
    Route::post('/', [AdminController::class, 'store'])->name('admin.login');
});

// Admin Panel
Route::prefix('admin')->name('admin.')->middleware('admin')->group(function() {
    Route::post('logout', [AdminController::class, 'logout'])->name('logout');
    Route::get('dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('feedback', [AdminFeedbackController::class, 'index'])->name('feedback');
    Route::delete('feedback/delete/{id}', [AdminFeedbackController::class, 'delete'])->name('feedback.delete');
    Route::get('feedback/comments/{id}', [AdminFeedbackController::class, 'comments'])->name('feedback.comments');
    Route::post('feedback/comments/status/{id}', [AdminFeedbackController::class, 'updateCommentStatus'])->name('comments.status');

    Route::get('users', [UserController::class, 'index'])->name('users');
    Route::delete('users/delete/{id}', [UserController::class, 'delete'])->name('users.delete');
});

require __DIR__.'/auth.php';
