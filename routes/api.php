<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt-auth', 'api']], function() {
    Route::post('/create-forum', 'ForumController@postCreateForum');
    Route::post('/delete-forum', 'ForumController@deleteForum');
    Route::post('/like', 'ForumController@postLike');
    Route::post('/comment', 'CommentController@postComment');
    Route::post('/delete-comment', 'CommentController@deleteComment');
    Route::post('/create-conference', 'VideoConferenceController@postConference');
    Route::post('/source', 'LearningSourceController@postSource');
});

Route::group(['middleware' => 'api'], function () {
    Route::get('/validate-username', 'RegisterController@getValidateUsername');
    Route::get('/view-forum', 'ForumController@getForum');
    Route::get('/forum-topic', 'ForumController@getForumTopic');
    Route::get('/check-like', 'ForumController@getIsliked');
    Route::get('/list-forum', 'ForumController@getList');
    Route::get('/comment/{id}', 'CommentController@getComment');
    Route::get('/list-conference', 'VideoConferenceController@getList');
    Route::get('/conference/{id}', 'VideoConferenceController@getRemote');
    Route::get('/list-learning-source', 'LearningSourceController@getList');
    Route::post('/registration', 'RegisterController@postRegistration');
    Route::post('/login', 'LoginController@postLogin');
});
