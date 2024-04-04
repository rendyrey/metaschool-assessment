<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Assessment;
use App\Models\Section;
use App\Models\UserAssessment;
use App\Models\UserAssessmentAnswer as UserAnswer;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Auth;

class AssessmentController extends Controller
{
    const PAGE = 'Assessment';
    const PAGINATE = 10;

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:admin', ['only' => ['create']]);
    }

    public function index(Request $request)
    {
        $data['assessments'] = Assessment::latest()->paginate(self::PAGINATE);
        if (auth()->user()->isAdmin()) {
            return Inertia::render(self::PAGE . '/Assessment', $data);
        }

        return Inertia::render(self::PAGE . '/UserAssessment', $data);
    }

    public function show(Request $request, $id)
    {
        $data['assessment'] = Assessment::findOrFail($id);
        $data['sections'] = Section::where('assessment_id', $id)->paginate(self::PAGINATE);
        return Inertia::render(self::PAGE . '/AssessmentDetail', $data);
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

    public function start(Request $request, $id)
    {
        $data['assessment'] = Assessment::find($id);
        $checkUserAssessment = UserAssessment::where('user_id', auth()->user()->id)
            ->where('assessment_id', $id)->first();

        if ($checkUserAssessment == null) {
            UserAssessment::create([
                'user_id' => auth()->user()->id,
                'assessment_id' => $id,
                'attempted_at' => Carbon::now(),
                'status' => UserAssessment::ONGOING
            ]);
        } else {
            if ($checkUserAssessment->status == UserAssessment::FINISH) {
                return Redirect::back();
            }
        }

        return Inertia::render(self::PAGE . '/AssessmentStart', $data);
    }

    public function questionAnswered(Request $request)
    {
        if ($request->type == 'mcq') {
            $answer = UserAnswer::where('user_id', auth()->user()->id)
                ->where('question_id', $request->question_id)
                ->firstOrNew();

            $answer->user_id = auth()->user()->id;
            $answer->user_assessment_id = $request->user_assessment_id;
            $answer->question_id = $request->question_id;
            $answer->answer_id = $request->answer_id;
            $answer->save();
        } else {
            $answer = UserAnswer::where('user_id', auth()->user()->id)
                ->where('question_id', $request->question_id)
                ->where('answer_id', $request->answer_id)
                ->firstOrNew();

            if ($answer->id != null) {
                if (!$request->is_checked) {
                    $answer->delete();
                }
            } else {
                UserAnswer::create([
                    'user_id' => auth()->user()->id,
                    'user_assessment_id' => $request->user_assessment_id,
                    'question_id' => $request->question_id,
                    'answer_id' => $request->answer_id
                ]);
            }
        }
    }

    public function assessmentFinish(Request $request, $user_assessment_id)
    {
        UserAssessment::find($user_assessment_id)->update(['status' => UserAssessment::FINISH]);

        return Redirect::route('assessment');
    }
}
