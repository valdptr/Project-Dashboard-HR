<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id_number')->unique();
            $table->string('full_name');
            $table->enum('gender', ['Male', 'Female']);
            $table->enum('employment_status', ['PKWT', 'PKWTT']);
            $table->foreignId('poh_id')->constrained('master_poh')->onDelete('restrict');
            $table->foreignId('level_id')->constrained('master_level')->onDelete('restrict');
            $table->date('join_date');
            $table->date('resign_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
