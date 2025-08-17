<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

// ByteMaster dice: Los seeders agregan datos de ejemplo a tus tablas
class EstudiantesSeeder extends Seeder {
    public function run() {
        DB::table('estudiantes')->insert([
            ['nombre' => 'Jorge', 'edad' => 25],
            ['nombre' => 'Ana', 'edad' => 22],
            ['nombre' => 'Luis', 'edad' => 30],
        ]);
    }
}
