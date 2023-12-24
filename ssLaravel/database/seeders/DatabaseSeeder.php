<?php

namespace Database\Seeders;

use App\Models\Ispit;
use App\Models\Predmet;
use App\Models\Profesor;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(3)->create();
        Profesor::factory(5)->create();
        Student::factory(20)->create();
        Predmet::factory(10)->create();
        Ispit::factory(3)->create();
    }
}
