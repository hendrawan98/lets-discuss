<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;

class Forum extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'userName',
        'forumTitle',
        'forumDescription',
        'forumContent',
        'forumTopic'
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

    public function isLiked($username, $forumId) {
        if(isset($username)) {
            try {
                $response = DB::table('likeLogs')
                    ->where('userName', $username)
                    ->where('forumId', $forumId)
                    ->get()->first();
            }catch(Exception $e) {
                return response()->json(['success' => false, 'message' => 'error getting data']);
            }
            if($response) {
                return response()->json(['success' => true, 'isLiked' => true], 200);
            }
            return response()->json(['success' => true, 'isLiked' => false], 200);
        }
    }

    public function isSubscribe($username) {
        if(isset($username)) {
            try {
                $response = DB::table('users')->select();
            }catch(Exception $e) {
                return false;
            }
        }
    }

    public function getForum(array $data) {
        $title = str_replace('%20', ' ', $data['title']);
        $title2 = str_replace('-', ' ', $title);
        try{
            $response = $this->where('forumTitle', $title2)->get()->first();
        }catch(Exception $e) {
            return response()->json(['success' => false, 'message' => 'failed get forum']);
        }
        return response()->json(['success' => true, 'data' => $response]);
    }

    public function postForum(array $data) {
        $username = $this->getUsername($data['token']);
        // dd($data['topic']);
        try {
            $this->create(
                array(
                    'userName'          => $username->userName,
                    'forumTitle'        => $data['title'],
                    'forumDescription'  => $data['description'],
                    'forumContent'      => $data['content'],
                    'forumTopic'        => (int)$data['topic']
                )
            );
        }catch(Exception $e) {
            return response()->json(['success' => false, 'message' => 'failed creating forum'], 400);
        }
        return response()->json(['success' => true, 'message' => 'success creating forum'], 201);
    }

    public function postLike(array $data) {
        if($data['value']) {
            try {
                DB::table('likeLogs')->insert(
                    array(
                        'forumId' => $data['forumId'],
                        'userName'  => $data['username']
                    )
                );
            }catch(Exception $e) {
                return response()->json(['success' => false, 'message' => 'failed like'], 400);
            }
        } else {
            try {
                DB::table('likeLogs')
                    ->where('userName', $data['username'])
                    ->where('forumId', $data['forumId'])
                    ->delete();
            }catch(Exception $e) {
                return response()->json(['success' => false, 'message' => 'failed unlike'], 400);
            }
        }
        return response()->json(['success' => true, 'message' => 'success'], 204);
    }

    public function getList(array $data) {
        $response = null;
        if(!isset($data['search'])) {
            $data['search'] = '';
        }
        switch ($data['sort']) {
            case 'search':
                $response = $this->where('forumTitle', 'like', '%'.$data['search'].'%')
                                ->orderBy('created_at', 'desc');
                break;
            
            case 'oldest':
                $response = $this->where('forumTitle', 'like', '%'.$data['search'].'%')
                                ->orderBy('created_at', 'asc');
                break;

            case 'mostLike':
                $response = $this->where('forumTitle', 'like', '%'.$data['search'].'%')
                                ->orderBy('created_at', 'desc')
                                ->orderBy('forumLikes', 'desc');
                break;

            case 'mostView':
                $response = $this->where('forumTitle', 'like', '%'.$data['search'].'%')
                                ->orderBy('created_at', 'desc')
                                ->orderBy('forumViews', 'desc');
                break;

            default:
                $response = $this->where('forumTitle', 'like', '%'.$data['search'].'%')
                                ->orderBy('created_at', 'desc');
                break;
        }
        if(isset($data['topic'])) {
            $response = $response->where('forumTopic', '=', $data['topic']);
        }
        $response = $response->get();
        return response()->json(['success' => true, 'data' => $response], 200);
    }

    public function deleteForum(array $data) {
        $username = $this->getUsername($data['token']);
        try {
            $this->where('userName', $username->userName)
                            ->where('id', $data['id'])
                            ->delete();
        }catch(Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed delete forum']);
        }
        return response()->json(['success' => true], 500);
    }
}
