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

class LoginController extends BaseController
{
    public function index() {
        if(isset($_COOKIE['acct'])) return redirect('/');
        return view('login');
    }

    public function postLogin(Request $request) {
        $users = new Users();
        $result = $users->postLogin($request->all());
        $content = json_decode($result->getContent(), true);
        if ($content['success']) {
            $data = $content['data'];
            $cookie = Cookie::make('acct', $data['auth_token'], 120, null, null , false, false);
            return response()->json($content['data'], $result->getStatusCode())->cookie($cookie);
            // return redirect('/');
        }
    }
}
