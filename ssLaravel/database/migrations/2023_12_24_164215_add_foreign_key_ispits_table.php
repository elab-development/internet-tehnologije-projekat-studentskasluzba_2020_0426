<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyIspitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ispits', function (Blueprint $table) {
          
            $table->foreignId('student_id')->constrained('students');
            $table->foreignId('predmet_id')->constrained('predmets');

          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ispits', function (Blueprint $table) {
          

            $table->dropForeign(['student_id']);
            $table->dropColumn('student_id');

            $table->dropForeign(['predmet_id']);
            $table->dropColumn('predmet_id');

            

          
        });
    }
}
