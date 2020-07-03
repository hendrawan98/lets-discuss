<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');
Route::get('/login', 'LoginController@index');
Route::get('/register', 'RegisterController@index');
Route::get('/create-forum', 'ForumController@createForum');
Route::get('/view-forum/{title?}', 'ForumController@viewForum');
Route::get('/list', 'ForumController@listForum');
Route::get('/conference/{title?}', 'ConferenceController@viewConference');
Route::get('/create-conference', 'ConferenceController@createConference');
