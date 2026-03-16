<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// ByteMaster explica: Las migraciones crean tablas en tu base de datos
return new class extends Migration {
    public function up() {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id(); 
            $table->string('nombre'); 
            $table->integer('edad'); 
            $table->timestamps(); 
        });
    }

    public function down() {
        Schema::dropIfExists('estudiantes'); 
    }
};
s