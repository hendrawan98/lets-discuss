<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Conference extends Model
{
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

    public function getList(Array $data) {
        try {
            $response = null;
            if(!isset($data['search'])) {
                $data['search'] = '';
            }
            switch ($data['sort']) {
                case 'search':
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
                                    ->where('deleted_at', null)
                                    ->orderBy('created_at', 'desc')
                                    ->get();
                    break;
                
                case 'oldest':
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
                                    ->where('deleted_at', null)
                                    ->orderBy('created_at', 'asc')
                                    ->get();
                    break;

                case 'mostLike':
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
                                    ->where('deleted_at', null)
                                    ->orderBy('created_at', 'desc')
                                    ->orderBy('forumLikes', 'desc')
                                    ->get();
                    break;

                case 'mostView':
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
                                    ->where('deleted_at', null)
                                    ->orderBy('created_at', 'desc')
                                    ->orderBy('forumViews', 'desc')
                                    ->get();
                    break;

                default:
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
                                    ->where('deleted_at', null)
                                    ->orderBy('created_at', 'desc')
                                    ->get();
                    break;
            }
        } catch(Exception $e) {
            return response()->json(['success' => false], 400);
        }
        return response()->json(['success' => true, 'data' => $response], 200);
    }

    public function getRemote($id) {
        return response()->json(['success' => true, 'data' => 'test'], 200);
    }

    public function postConference(array $data) {
        $username = $this->getUsername($data['token']);
        try {
            DB::table('videoConference')->insert(
                array(
                    'userName'          => $username->userName,
                    'viConTitle'        => $data['title'],
                    'viConType'         => 'public',
                    'created_at'        => date('Y-m-d H:i:s'),
                    'updated_at'        => date('Y-m-d H:i:s')
                )
            );
        }catch(Exception $e) {
            return response()->json(['success' => false, 'message' => 'failed creating conference'], 400);
        }
        return response()->json(['success' => true, 'message' => 'success creating conference'], 201);
    }
}
