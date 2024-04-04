<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Section;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $section = Section::factory()->create();

        return [
            'section_id' => $section->id,
            'type' => array_rand(['mcq', 'msq'], 1),
            'content' => fake()->paragraph(2)
        ];
    }
}
