<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Auth;

class Assessment extends Model
{
    use HasFactory;
    protected $table = 'assessments';
    protected $fillable = [
        'title',
        'user_id'
    ];
    protected $with = ['sections', 'users'];
    protected $appends = ['user_assessment'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_assessments', 'assessment_id', 'user_id');
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class, 'assessment_id', 'id');
    }

    public function getUserAssessmentAttribute()
    {
        return UserAssessment::where('user_id', Auth::user()->id)->where('assessment_id', $this->id)->first();
    }
}
