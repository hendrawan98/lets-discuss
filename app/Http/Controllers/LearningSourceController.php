<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\LearningSource;

class LearningSourceController extends Controller
{
    public function contributeLearningSource() {
        if(!isset($_COOKIE['acct'])) return redirect('/login');
        return view('contributeLearningSource');
    }

    public function listLearningSource($title = null) {
        if(!isset($title)) return view('listLearningSource');
        return view('viewLearningSource');
    }

    public function getList(Request $request, LearningSource $learningSoruce) {
        $result = $learningSoruce->getList($request->all());
        $response = json_decode($result->getContent(), true);
        if ($response['success']) {
            return response()->json($response['data'], $result->getStatusCode());
        }
        return null;
    }

    public function postSource(Request $request, LearningSource $learningSoruce) {
        $result = $learningSoruce->postSource($request->all());
        $response = json_decode($result->getContent(), true);
        if ($response['success']) {
            return response()->json(null, $result->getStatusCode());
        }
        return null;
    }
}
