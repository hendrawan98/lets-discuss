<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Users;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use JWTAuthException;
use JWTFactory;
use Cookie;

class RegisterController extends BaseController
{
    public function index() {
        if(isset($_COOKIE['acct'])) return redirect('/');
        return view('register');
    }

    public function getValidateUsername(Request $request) {
        $result = Users::where('userName', $request->get('username'))->first();
        return response()->json($result, 200);
    }

    public function postRegistration(Request $request) {
        $users = new Users();
        $result = $users->postRegistration($request->all());
        $content = json_decode($result->getContent(), true);
        if ($content['success']) {
            $data = $content['data'];
            $cookie = Cookie::make('acct', $data['auth_token'], 120, null, null , false, false);
            return response()->json($content['data'], $result->getStatusCode())->cookie($cookie);
            // return redirect('/')->cookie($cookie);
        }
    }
}
