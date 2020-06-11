<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Forum;

class ForumController extends Controller
{
    public function createForum() {
        if(!isset($_COOKIE['acct'])) return redirect('/login');
        return view('createForum');
    }

    public function viewForum($title = null) {
        if(!isset($title)) return view('listForum');
        return view('viewForum');
    }

    public function postCreateForum(Request $request) {
        $forum = new Forum();
        $result = $forum->postForum($request->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json(null, $result->getStatusCode());
        }
    }

    public function getForum(Request $request) {
        $forum = new Forum();
        $result = $forum->getForum($request->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json($response['data'], $result->getStatusCode());
        }
    }

    public function getIsliked(Request $request, Forum $forum) {
        $result = $forum->isliked($request->get('username'), $request->get('forumId'));
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json($response['isLiked'], $result->getStatusCode());
        }
    }

    public function postLike(Request $request, Forum $forum) {
        $result = $forum->postLike($request->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json(null, $result->getStatusCode());
        }
    }

    public function getList(Request $request, Forum $forum) {
        $result = $forum->getList($request->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json($response['data'], $result->getStatusCode());
        }
    }

    public function deleteForum(Request $request, Forum $forum) {
        $result = $forum->deleteForum($request->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json(null, $result->getStatusCode());
        }
    }
}
