<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        "title",
        "description",
        "category"
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function votes() {
        return $this->hasMany(FeedbackVote::class);
    }

}
