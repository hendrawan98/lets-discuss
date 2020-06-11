<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('userName', 100)->primary();
            $table->string('userFullname', 50);
            $table->string('userEmail', 50);
            $table->string('password', 100);
            $table->string('userType', 20);
            $table->dateTime('userDOB');
            $table->string('userAddress', 100);
            $table->string('userPhoneNumber', 20);
            $table->dateTime('userStartDatePremium')->nullable();
            $table->dateTime('userEndDatePremium')->nullable();
            $table->timestamps();
            $table->string('accessToken', 1000);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
