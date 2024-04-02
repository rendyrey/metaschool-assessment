<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->string('title');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });

        Schema::create('sections', function(Blueprint $table) {
            $table->id();
            $table->bigInteger('assessment_id')->unsigned();
            $table->string('title');
            $table->timestamps();

            $table->foreign('assessment_id')->references('id')->on('users')->cascadeOnDelete();
        });

        Schema::create('questions', function(Blueprint $table) {
            $table->id();
            $table->bigInteger('section_id')->unsigned();
            $table->enum('type', ['mcq', 'msq']);
            $table->text('content');
            $table->timestamps();

            $table->foreign('section_id')->references('id')->on('sections')->cascadeOnDelete();
        });

        Schema::create('answers', function(Blueprint $table) {
            $table->id();
            $table->bigInteger('question_id')->unsigned();
            $table->text('content');
            $table->boolean('is_correct');
            $table->timestamps();

            $table->foreign('question_id')->references('id')->on('questions')->cascadeOnDelete();
        });

        Schema::create('user_assessments', function(Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('assessment_id')->unsigned();
            $table->timestamp('attempted_at')->useCurrent();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('assessment_id')->references('id')->on('assessments')->cascadeOnDelete();
        });

        Schema::create('user_assessment_answers', function(Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('user_assessment_id')->unsigned();
            $table->bigInteger('question_id')->unsigned();
            $table->bigInteger('answer_id')->unsigned();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('user_assessment_id')->references('id')->on('user_assessments')->cascadeOnDelete();
            $table->foreign('question_id')->references('id')->on('questions')->cascadeOnDelete();
            $table->foreign('answer_id')->references('id')->on('answers')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessments');
        Schema::dropIfExists('sections');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('answers');
        Schema::dropIfExists('user_assessments');
    }
};
