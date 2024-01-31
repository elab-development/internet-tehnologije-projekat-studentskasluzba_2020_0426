<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Predmet extends Model
{
    use HasFactory;
    protected $fillable = [ 
        
        'naziv',
        'esbp',
        'semestar',  
        'profesor_id',  
        'tip', //obavezan, izborni 
    ];

    public function profesor()   {
        return $this->belongsTo(Profesor::class);
    }


}
