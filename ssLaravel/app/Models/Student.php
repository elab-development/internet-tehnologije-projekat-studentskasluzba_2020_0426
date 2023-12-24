<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends User
{
    use HasFactory;
    protected $fillable = [ 
        // 'ime',
        // 'prezime',
        // 'email',
        // 'password',
        // 'jmbg',
        // 'adresa',
        // 'kontakt'
        'godina',
        'broj',
        'prosek',
        'esbp',
       
    ];
    public function ispiti()   {
        return $this->hasMany(Ispit::class);
    }

}
