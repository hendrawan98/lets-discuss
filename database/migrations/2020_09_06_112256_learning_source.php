<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LearningSource extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('LearningSource', function (Blueprint $table) {
            $table->integer('sourceId')->autoIncrement();
            $table->integer('typeId', 10);
            $table->string('userName', 100);
            $table->string('sourceTitle', 100);
            $table->string('sourceDesc', 100);
            $table->string('sourceUrl', 100);
            $table->timestamps();
            $table->softDeletes('deleted_at', 0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('LearningSource');
    }
}
