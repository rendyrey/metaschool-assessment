<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $password = Hash::make('password');
        $data = [
            ['name' => 'Admin', 'email' => 'admin@metaschool.so', 'password' => $password, 'role' => 'admin'],
            ['name' => 'Student User 1', 'email' => 'student_user_1@metaschool.so', 'password' => $password, 'role' => 'user'],
            ['name' => 'Student User 2', 'email' => 'student_user_2@metaschool.so', 'password' => $password, 'role' => 'user']
        ];

        DB::table('users')->insert($data);
    }
}
