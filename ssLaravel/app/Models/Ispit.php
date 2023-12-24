<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ispit extends Model
{
    use HasFactory;
    protected $fillable = [ 
        
        'student_id',
        'predmet_id',
        'datum',  
        'ocena',  
        'opisnaOcena',   
    ];

    public function student()   {
        return $this->belongsTo(Student::class);
    }

    public function predmet()   {
        return $this->belongsTo(Predmet::class);
    }

}
