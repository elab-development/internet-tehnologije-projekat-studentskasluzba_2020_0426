<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Predmet extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [ 
        
        'naziv',
        'esbp',
        'semestar',  
        'profesor_id',  
        'tip', //obavezan, izborni 
    ];
    protected $dates = ['deleted_at'];

    public function profesor()   {
        return $this->belongsTo(Profesor::class);
    }
    public function ispiti() {
        return $this->hasMany(Ispit::class);
    }
}
