<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;
use JWTAuth;
use JWTAuthException;
use JWTFactory;

class Users extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'userName',
        'userFullname',
        'userEmail',
        'password',
        'userType',
        'userDOB',
        'userAddress',
        'userPhoneNumber',
        'accessToken'
    ];

    protected $hidden = ['password'];

    private function getToken($username, $password)
    {
        $token = null;
        try {
            if (! $token = JWTAuth::attempt(['userName'=>$username, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or username is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    
    public function postRegistration(array $data) {
        try {
            $this->create(
                array(
                    'userName' => $data['username'],
                    'userFullname' => $data['fullName'],
                    'userEmail' => $data['email'],
                    'password' => \Hash::make($data['password']),
                    'userType' => $data['userType'],
                    'userDOB' => $data['date'],
                    'userAddress' => $data['address'],
                    'userPhoneNumber' => $data['phone']
                )
            );
        }catch(Exception $e) {
            return response()->json(['success'=>false, 'message'=>'failed insert data']);
        }

            $token = $this->getToken($data['username'], $data['password']); // generate user token
        
            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
            
            $user = $this->where('userName', $data['username'])->get()->first();

            $this->where('userName', $data['username'])->update(['accessToken' => $token]);
            
            $response = ['success'=>true, 'data'=>['username'=>$user->userName, 'auth_token'=>$token]];
            
        return response()->json($response, 201);
    }

    public function postLogin(array $data) {
        $token = $this->getToken($data['username'], $data['password']); // generate user token
        
        if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
        
        $user = $this->where('userName', $data['username'])->get()->first();

        $this->where('userName', $data['username'])->update(['accessToken' => $token]);
        
        $response = ['success'=>true, 'data'=>['profile'=>$user, 'auth_token'=>$token]];
            
        return response()->json($response, 200);
    }
}
