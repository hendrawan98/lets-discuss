<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Forum extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forums', function (Blueprint $table) {
            $table->id();
            $table->string('userName');
            $table->string('forumTitle');
            $table->string('forumDescription');
            $table->string('forumContent');
            $table->string('forumTag');
            $table->decimal('forumLikes');
            $table->decimal('forumComments');
            $table->decimal('forumViews');
            $table->decimal('forumSubscriber');
            $table->decimal('forumType');
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
        Schema::dropIfExists('forums');
    }
}
