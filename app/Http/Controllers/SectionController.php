<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Section;
use App\Models\Question;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class SectionController extends Controller
{
    public const PAGE = 'Section';
    public function create(Request $request)
    {
        Validator::make(
            $request->all(),
            [
                'title' => 'required'
            ]
        )->validate();

        Section::create($request->all());
        
        return Redirect::route('assessment.show', ['id' => $request->assessment_id]);
    }

    public function show(Request $request, $assessment_id, $section_id)
    {
        $data['section'] = Section::with('assessment')->find($section_id);
        $data['questions'] = Question::where('section_id', $section_id)->paginate(10);
        return Inertia::render(self::PAGE . '/SectionDetail', $data);
    }
}
