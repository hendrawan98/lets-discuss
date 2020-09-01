<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class ForumTopic extends Model
{
    public function getForumTopic() {
        $response = null;
        try {
            $response = DB::select('select * from ForumTopic');
        } catch(Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed get forum topic']);
        }
        return response()->json(['success' => true, 'data' => $response], 200);
    }
}
