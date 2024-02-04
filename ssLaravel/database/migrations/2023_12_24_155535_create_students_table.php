<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('ime');
            $table->string('prezime');
            $table->string('email')->unique();          
            $table->string('password');
            $table->string('jmbg');
            $table->string('adresa');
            $table->string('kontakt');
            $table->integer('godina');
            $table->integer('broj');
            $table->double('prosek',8,2);
            $table->integer('esbp');
            $table->string('upis'); //skolska godina kad je student upisan
            $table->integer('trenutnaGodina');//prva druga..
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
        Schema::dropIfExists('students');
    }
}
