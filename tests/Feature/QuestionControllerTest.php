<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Answer;
use App\Models\User;
use App\Models\Section;
use App\Models\Question;


class QuestionControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_question_can_be_created(): void
    {
        $user = User::factory()->create();
        $section = Section::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('question/' . $section->id, [
                'section_id' => $section->id,
                'type' => 'mcq',
                'content' => "What is this?",
                'answers' => ['Answer 1', 'Answer 2', 'Answer 3'],
                'true_answers' => [true, false, false]
            ]);
        
        $response->assertRedirect('question/' . $section->id);
        $this->assertDatabaseHas(Question::class, ['content' => 'What is this?', 'type' => 'mcq']);
        $this->assertDatabaseHas(Answer::class, ['content' => 'Answer 1']);
    }
}
