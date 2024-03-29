<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use App\Models\Profesor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //kada radimo login moramo da prosledimo param. type kroz upit
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        $userType = $request->input('type'); // tip korisnika (student ili profesor ili user)
      
        switch ($userType) {
            case 'student':
                $user = Student::where('email', $request->email)->first();
                $guard = 'student';
                break;
            case 'profesor':
                $user = Profesor::where('email', $request->email)->first();
                $guard = 'profesor';
                break;
            case 'user':   
                    $user = User::where('email', $request->email)->first();
                    $guard = 'user';
                    break;
            default:
                return response()->json(['message' => 'Invalid user type'], 401);
        }

        if ($user && Hash::check($request->password, $user->password)) {
            Auth::guard($guard)->login($user);
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }


    public function logout(Request $request)
    {
        $user = Auth::guard($this->getGuard())->user();
        $user->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }

    // Helper method to get the current guard
    private function getGuard()
    {
        if (Auth::guard('student')->check()) {
            return 'student';
        } elseif (Auth::guard('profesor')->check()) {
            return 'profesor';
        } 

        return null;
    }
    public function getUser() //metoda vraca trenutno ulogovanog korisnika
    {
        $user = Auth::guard($this->getGuard())->user();
    
        if ($user) {
            if ($user instanceof Student) {
                // Ako je ulogovani korisnik student, koristi StudentResource za formatiranje odgovora
                return new StudentResource($user);
            } else {
                // Inače, vratite korisnika bez resursa (možete koristiti UserResource ako ga imate)
                return $user;
            }
        }
    
        return response()->json(['message' => 'User not found'], 404);
    }




}
