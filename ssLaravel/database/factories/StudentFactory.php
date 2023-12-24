<?php

namespace Database\Factories;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
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
         
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
         
            'jmbg' => $this->faker->numerify('###########'),
            'adresa' => $this->faker->address(),
            'kontakt' => $this->faker->phoneNumber(),
            'godina' => $this->faker->numberBetween(2010,2024),
            'broj' => $this->faker->numberBetween(1,1500),
            'prosek' => $this->faker->randomFloat(2, 6, 10),
            'esbp' => $this->faker->numberBetween(0, 240),

        ];
    }
}
