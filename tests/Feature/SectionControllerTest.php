<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Assessment;
use App\Models\Section;

class SectionControllerTest extends TestCase
{
    public function test_section_page_is_displayed(): void
    {
        $user = User::factory()->create();
        $assessment = Assessment::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('assessment/' . $assessment->id);

        $response->assertOk();
    }

    public function test_section_can_be_created(): void
    {
        $user = User::factory()->create();
        $assessment = Assessment::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('assessment/' . $assessment->id . '/section', [
                'title' => 'First Section',
                'assessment_id' => $assessment->id
            ]);

        $response->assertRedirect('assessment/' . $assessment->id);

        $this->assertDatabaseHas(Section::class, ['title' => 'First Section']);
    }

    public function test_section_detail_page_is_displayed(): void
    {
        $user = User::factory()->create();
        $section = Section::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('assessment/' . $section->assessment->id . '/section/' . $section->id);

        $response->assertOk();
    }
}
