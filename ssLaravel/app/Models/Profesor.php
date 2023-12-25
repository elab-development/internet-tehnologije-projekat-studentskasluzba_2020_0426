<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profesor extends User
{
    use HasFactory;
    protected $fillable = [ 
        'ime',
        'prezime',
        'email',
        'password',
        'jmbg',
        'adresa',
        'kontakt',
        'titula', //docent, red. prof.
        'katedra',
        'kabinet',  //407a
        'konsultacije', //utorak 15-17h
       
    ];

    public function predmeti()   {
        return $this->hasMany(Predmet::class);
    }




}
