<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Conference extends Model
{
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
                                    ->orderBy('created_at', 'desc')
                                    ->get();
                    break;
                
                case 'oldest':
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
                                    ->orderBy('created_at', 'asc')
                                    ->get();
                    break;

                case 'mostLike':
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
                                    ->orderBy('created_at', 'desc')
                                    ->orderBy('forumLikes', 'desc')
                                    ->get();
                    break;

                case 'mostView':
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
                                    ->orderBy('created_at', 'desc')
                                    ->orderBy('forumViews', 'desc')
                                    ->get();
                    break;

                default:
                    $response = DB::table('videoConference')
                                    ->where('viConTitle', 'like', '%'.$data['search'].'%')
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
}
