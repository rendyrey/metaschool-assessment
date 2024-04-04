<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use App\Rules\AtLeastOneTrue;
use DB;

class QuestionController extends Controller
{
    public function create(Request $request, $section_id)
    {
        Validator::make(
            $request->all(),
            [
                'content' => 'required',
                'answers.*' => 'required',
                'true_answers' => new AtLeastOneTrue
            ],
            [
                'content.required' => 'The question content is required',
                'answers.*.required' => 'Answer is required'
            ]
        )->validate();
        try {
            DB::beginTransaction();
            $question = new Question();
            $question->content = $request->content;
            $question->type = $request->type;
            $question->section_id = $request->section_id;
            $question->save();
    
            foreach($request->answers as $key => $value) {
                $answerData[] = ['question_id' => $question->id, 'content' => $value, 'is_correct' => $request->true_answers[$key]];
            }
    
            Answer::insert($answerData);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }

        return Redirect::route('section.show', ['assessment_id' => $question->section->assessment_id,'section_id' => $request->section_id]);
    }
}
