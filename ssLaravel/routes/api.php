<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IspitController;
use App\Http\Controllers\PredmetController;
use App\Http\Controllers\ProfesorController;
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
//------------------------------------------------------------------
// Route::post('/login', [AuthController::class, 'login']);

// Route::get('/ispiti/predmet/{predmet_id}',[IspitController::class,'ispitiPoPredmetu']);
// Route::get('/ispiti/student/{student_id}',[IspitController::class,'ispitiPoStudentu']);
// Route::get('/ispiti/rok',[IspitController::class,'ispitiPoRoku']);


// Route::resource('/studenti',StudentController::class);
// Route::resource('/profesori',ProfesorController::class);

// Route::resource('/predmeti',PredmetController::class);

// Route::resource('/ispiti',IspitController::class);


// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
//------------------------------------------------------------------


 

Route::post('/login', [AuthController::class, 'login']);

Route::resource('/studenti', StudentController::class)->except(['index', 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/ispiti/predmet/{predmet_id}', [IspitController::class, 'ispitiPoPredmetu']);
    Route::get('/ispiti/student/{student_id}', [IspitController::class, 'ispitiPoStudentu']);
    Route::get('/ispiti/rok', [IspitController::class, 'ispitiPoRoku']);


  
    Route::resource('/profesori', ProfesorController::class)->except(['index', 'show']);
    Route::resource('/predmeti', PredmetController::class)->except(['index', 'show']);
    Route::resource('/ispiti', IspitController::class)->except(['index', 'show']);



});

 
Route::resource('/studenti', StudentController::class)->only(['index', 'show']);
Route::resource('/profesori', ProfesorController::class)->only(['index', 'show']);
Route::resource('/predmeti', PredmetController::class)->only(['index', 'show']);
Route::resource('/ispiti', IspitController::class)->only(['index', 'show']);
