<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Assessment;

class AssessmentControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('login');

        $response->assertStatus(200);
    }

    public function test_assessment_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/assessment');

        $response->assertOk();
    }

    public function test_assessment_can_be_created(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/assessment/create', [
                'title' => 'Assessment A'
            ]);

        $response->assertRedirect('/assessment');

        $this->assertDatabaseHas(Assessment::class, ['title' => 'Assessment A']);
    }
}
