<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::post('/studenti',[StudentController::class,'store']);
// Route::get('/studenti',[StudentController::class,'index']);

// Route::get('/studenti/{id}',[StudentController::class,'show']);
// Route::delete('/studenti/{id}',[StudentController::class,'destroy']);
// Route::put('/studenti/{id}',[StudentController::class,'update']);


Route::resource('/studenti',StudentController::class);
