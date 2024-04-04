<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAssessmentAnswer extends Model
{
    use HasFactory;
    protected $table = 'user_assessment_answers';
    protected $fillable = [
        'user_id',
        'user_assessment_id',
        'question_id',
        'answer_id'
    ];

    protected $with = ['answer'];

    public function answer(): BelongsTo
    {
        return $this->belongsTo(Answer::class, 'answer_id', 'id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }
}
