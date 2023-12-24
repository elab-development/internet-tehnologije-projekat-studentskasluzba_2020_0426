<?php

namespace Database\Factories;

use App\Models\Profesor;
use Illuminate\Database\Eloquent\Factories\Factory;

class PredmetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'naziv' => $this->faker->word,
            'esbp' => $this->faker->numberBetween(3, 8),
            'semestar' => $this->faker->numberBetween(1, 8),
            'profesor_id' => random_int(1,Profesor::count()),
            'tip' => $this->faker->randomElement(['obavezan', 'izborni']),
        ];
    }
}
