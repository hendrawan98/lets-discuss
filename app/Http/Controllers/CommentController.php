<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function postComment(Request $request, Comment $comment) {
        $result = $comment->postComment($request->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json($response['data'], $result->getStatusCode());
        }
    }

    public function getComment(Comment $comment, $id) {
        $result = $comment->getComment($id);
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json($response['data'], $result->getStatusCode());
        }
    }

    public function deleteComment(Request $request, Comment $comment) {
        $result = $comment->deleteComment($request->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json(null, $result->getStatusCode());
        }
    }
}
