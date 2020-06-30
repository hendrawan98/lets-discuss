<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Conference;

class ConferenceController extends Controller
{
    public function index() {
        return view('roomConference');
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
        $result = $conference->postConference($result->all());
        $response = json_decode($result->getContent(), true);
        if($response['success']) {
            return response()->json($response['data'], $result->getStatusCode());
        }
    }
}
