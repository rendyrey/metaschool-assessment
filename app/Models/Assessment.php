<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assessment extends Model
{
    use HasFactory;
    protected $table = 'assessments';
    protected $fillable = [
        'title',
        'user_id'
    ];
    protected $with = ['sections'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_assessments', 'assessment_id', 'user_id');
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class, 'assessment_id', 'id');
    }
}
