<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'image_path' => fake()->imageUrl(),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => fake()->randomElement(['low','medium', 'high']),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'project_id' => 1,
            'created_at' => time(),
            'updated_at' => time(),
        ];
        /*
            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('image_path')->nullable();
            $table->string('status');
            $table->string('priority');
            $table->timestamp('due_date')->nullable();

            $table->string('assigned_user_id')->constraint('users');
            $table->string('created_by')->constraint('users');
            $table->string('updated_by')->constraint('users');
            $table->string('project_id')->constraint('projects');
            */
    }
}
