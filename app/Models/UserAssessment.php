<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Auth;

class UserAssessment extends Model
{
    use HasFactory;
    protected $table = 'user_assessments';
    protected $fillable = [
        'user_id',
        'assessment_id',
        'attemted_at',
        'status'
    ];
    protected $appends = ['user_score'];
    protected $with = ['user_assessment_answers'];

    const PENDING = 'pending';
    const ONGOING = 'on_going';
    const FINISH = 'finished';
    
    public function user_assessment_answers(): HasMany
    {
        return $this->hasMany(UserAssessmentAnswer::class, 'user_assessment_id', 'id');
    }

    public function getUserScoreAttribute()
    {
        $user_answers = UserAssessmentAnswer::where('user_assessment_id', $this->id)->where('user_id', Auth::user()->id)->get();
        $assessment = Assessment::find($this->assessment_id);
        $total_correctness = 0;
        foreach ($assessment->sections as $section) {
            foreach($section->questions as $question) {
                $total_correctness += $question->totalCorrectAnswer();
            }
        }

        $total_correct = 0;
        foreach($user_answers as $answer) {
            if ($answer->answer->is_correct) {
                $total_correct++;
            } else if ($answer->answer->question->type == Question::MSQ) {
                $total_correct--;
            }
        }

        return $total_correct/$total_correctness * 100;
    }
}
