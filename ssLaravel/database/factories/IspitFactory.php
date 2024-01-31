<?php

namespace Database\Factories;

use App\Models\Predmet;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class IspitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'student_id' => random_int(1,Student::count()),
            'predmet_id' => random_int(1,Predmet::count()),
            'datum' => $this->faker->date(),
            'ocena' => $this->faker->numberBetween(5, 10),
            'opisnaOcena' => $this->faker->randomElement(['odličan', 'vrlo dobar', 'dobar', 'dovoljan', 'nedovoljan']),

        ];
    }
}
