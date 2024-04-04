<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Assessment;
use App\Models\Section;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Auth;

class AssessmentController extends Controller
{
    const PAGE = 'Assessment';
    const PAGINATE = 10;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $data['assessments'] = Assessment::latest()->paginate(self::PAGINATE);
        return Inertia::render(self::PAGE . '/Assessment', $data);
    }

    public function show(Request $request, $id)
    {
        $data['assessment'] = Assessment::findOrFail($id);
        $data['sections'] = Section::where('assessment_id', $id)->paginate(self::PAGINATE);
        return Inertia::render(self::PAGE . '/AssessmentDetail', $data);
    }

    public function new(Request $request)
    {
        return Inertia::render(self::PAGE . '/NewAssessment');
    }

    public function create(Request $request)
    {
        Validator::make(
            $request->all(),
            [
                'title' => 'required'
            ]
        )->validate();

        $new_assessment = new Assessment();
        $new_assessment->title = $request->title;
        $new_assessment->user_id = Auth::user()->id;
        $new_assessment->save();

        return Redirect::route('assessment')->with('success', 'Assessment with ' . $new_assessment->title . ' title successfully created!');
    }
}
