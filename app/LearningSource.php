<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;

class LearningSource extends Model
{
    protected $fillable = ['sourceId'];
    protected $dates = ['deleted_at'];

    public function getList(array $data) {
        $response = null;

        if(!isset($data['search'])) {
            $data['search'] = '';
        }

        if(!isset($data['sort'])) {
            $data['sort'] = '';
        }

        switch ($data['sort']) {
            case 'search':
                $response = DB::table('LearningSource')
                            ->select('*')
                            ->where('sourceTitle', 'like', '%'.$data['search'].'%')
                            ->orderBy('created_at', 'desc');
                break;
            case 'oldest':
                $response = DB::table('LearningSource')
                            ->select('*')
                            ->where('sourceTitle', 'like', '%'.$data['search'].'%')
                            ->orderBy('created_at', 'asc');
                break;
            default:
                $response = DB::table('LearningSource')
                            ->select('*')
                            ->where('sourceTitle', 'like', '%'.$data['search'].'%')
                            ->orderBy('created_at', 'desc');
                break;
        }

        $response = $response->get();

        return response()->json(['success' => true, 'data' => $response], 200);
    }

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

    public function postSource(array $data) {
        date_default_timezone_set("Asia/Bangkok");
        $profile = $this->getUsername($data['token']);
        if($data['typeId'] == 1) {
            try{
                DB::table('LearningSource')->insert(
                    array(
                        'typeId'        => (int)$data['typeId'],
                        'userName'      => $profile->userName,
                        'sourceTitle'   => $data['title'],
                        'sourceDesc'    => $data['description'],
                        'sourceUrl'     => $data['videoUrl'],
                        'created_at'    => date("Y-m-d H:i:s", strtotime("now")),
                        'updated_at'    => date("Y-m-d H:i:s", strtotime("now"))
                    )
                );
            }catch(Exception $e) {
                return response()->json(['success' => false, 'message' => 'failed creating learning source'], 400);
            }
        } else {
            $path = $data['file']->storeAs('', $data['file']->getClientOriginalName(), 'local');
            try{
                DB::table('LearningSource')->insert(
                    array(
                        'typeId'        => (int)$data['typeId'],
                        'userName'      => $profile->userName,
                        'sourceTitle'   => $data['title'],
                        'sourceDesc'    => $data['description'],
                        'sourceUrl'     => 'learning/' . $path,
                        'created_at'    => date("Y-m-d H:i:s", strtotime("now")),
                        'updated_at'    => date("Y-m-d H:i:s", strtotime("now"))
                    )
                );
            }catch(Exception $e) {
                return response()->json(['success' => false, 'message' => 'failed creating learning source'], 400);
            }
        }
        return response()->json(['success' => true, 'message' => 'success creating learning source'], 201);
    }
}
