<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;

class Comment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'forumId',
        'userName',
        'commentContent'
    ];

    protected $dates = ['deleted_at'];

    public function getUsername($token) {
        if(isset($token)) {
            try {
                $response = DB::table('users')->select('userName')->where('accessToken', $token)->get()->first();
            } catch(Exception $e) {
                $response = false;
            }
        }
        return $response;
    }

    public function postComment(array $data) {
        $username = $this->getUsername($data['token']);
        try {
            $response = $this->create(
                array(
                    'forumId'           => $data['forumId'],
                    'userName'          => $username->userName,
                    'commentContent'    => $data['comment']
                )
            );
        }catch(Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed add comment'], 400);
        }
        return response()->json(['success' => false, 'message' => 'Success add comment', 'data' => $response], 200);
    }

    public function getComment($id) {
        $response = null;
        try{
            $response = $this->where('forumId', $id)->get();
        }catch(Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed get comment'], 400);
        }
        return response()->json(['success' => true, 'data' => $response], 200);
    }

    public function deleteComment(array $data) {
        $username = $this->getUsername($data['token']);
        try {
            $this->where('userName', $username->userName)
                            ->where('commentId', $data['commentId'])
                            ->where('forumId', $data['forumId'])
                            ->delete();
        }catch(Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed delete comment']);
        }
        return response()->json(['success' => true], 204);
    }
}
