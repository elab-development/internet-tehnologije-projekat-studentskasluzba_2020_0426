<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfesorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesors', function (Blueprint $table) {
            $table->id();
            $table->string('ime');
            $table->string('prez');
            $table->string('email')->unique();          
            $table->string('password');
            $table->string('jmbg');
            $table->string('adresa');
            $table->string('kontakt');

            $table->string('titula');
            $table->string('katedra');
            $table->string('konsultacije');
            $table->string('kabinet');

            $table->text('biografija');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profesors');
    }
}
