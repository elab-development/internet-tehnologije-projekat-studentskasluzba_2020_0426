<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColumnsProfesorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('profesors', function (Blueprint $table) {           
            $table->renameColumn('prez','prezime');           
           // $table->renameColumn('password','lozinka');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('profesors', function (Blueprint $table) {           
            $table->renameColumn('prezime','prez');           
           // $table->renameColumn('lozinka','password');
            
        });
    }
}
