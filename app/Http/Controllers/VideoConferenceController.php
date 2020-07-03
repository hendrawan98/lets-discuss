<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Conference;

class VideoConferenceController extends Controller
{
    public function viewConference($title = null) {
        if(!isset($_COOKIE['acct'])) return redirect('/login');
        if(!isset($title)) return view('listConference');
        return view('roomConference');
    }

    public function createConference() {
        if(!isset($_COOKIE['acct'])) return redirect('/login');
        return view('createConference');
    }

    public function getList(Conference $conference, Request $request) {
        $result = $conference->getList($request->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json($response['data'], $result->getStatusCode());
        }
    }

    public function getRemote(Conference $conference, $id) {
        $result = $conference->getRemote($id);
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json($response['data'], $result->getStatusCode());
        }
    }

    public function postConference(Conference $conference, Request $request) {
        $result = $conference->postConference($request->all());
        $response = json_decode($result->getContent(), true);
        return response()->json('', $result->getStatusCode());
    }
}
