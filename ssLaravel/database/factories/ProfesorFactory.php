<?php

namespace Database\Factories;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfesorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'ime' => $this->faker->firstName(),
            'prezime' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
          
            'lozinka' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            
            'jmbg' => $this->faker->numerify('###########'),
            'adresa' => $this->faker->address(),
            'kontakt' => $this->faker->phoneNumber(),
            'titula' => $this->faker->randomElement(['docent', 'red. prof.', 'asistent']),
            'katedra' => $this->faker->word,
            'kabinet' => $this->faker->numerify('###a'),
            'konsultacije' => $this->faker->dayOfWeek . ' ' . $this->faker->time($format = 'H:i', $max = 'now'),
 
        ];
    }
}
