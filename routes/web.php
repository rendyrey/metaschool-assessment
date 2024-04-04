<?php

use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\QuestionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
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
    return Redirect::route('login');
});

// Route::get('/assessment', function () {
//     return Inertia::render('Assessment');
// })->middleware(['auth', 'verified'])->name('assessment');

Route::middleware('auth')->group(function () {
    Route::controller(AssessmentController::class)->group(function () {
        Route::get('assessment', 'index')->name('assessment');
        Route::get('assessment/new', 'new')->name('assessment.new');
        Route::post('assessment/create', 'create')->name('assessment.create');
        Route::get('assessment/{id}', 'show')->name('assessment.show');

        Route::get('assessment/{id}/start', 'start')->name('assessment.start');
        Route::post('user_assessment/answer', 'questionAnswered')->name('user_assessment.answer');
        Route::patch('user_assessment/finish/{user_assessment_id}', 'assessmentFinish')->name('user_assessment.finish');
    });

    Route::controller(SectionController::class)->middleware('role:admin')->group(function () {
        Route::post('assessment/{assessment_id}/section', 'create')->name('section.create');
        Route::get('assessment/{assessment_id}/section/{section_id}', 'show')->name('section.show');
    });

    Route::controller(QuestionController::class)->middleware('role:admin')->group(function () {
        Route::post('question/{section_id}', 'create')->name('question.create');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
