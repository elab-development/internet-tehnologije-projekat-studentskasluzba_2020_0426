<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends User
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
        'godina',
        'broj',
        'prosek',
        'esbp',
        'upis', // skolska godina kada se student upisao u trenutnu godinu (npr 2018/19 sam ja upisala prvu godinu)
        'trenutnaGodina' //1,2,3,4 
        
       
    ];
    public function ispiti()   {
        return $this->hasMany(Ispit::class);
    }

}
