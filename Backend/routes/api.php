<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AsignacionOraculoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(['middleware' => ['cors']], function () {
    Route::post('registro', [UsuarioController::class, 'crearUsuario']);
    Route::post('login', [AuthController::class, 'inicioSesion']);
    Route::post('cerrarSesion/{id}', [AuthController::class, 'cerrarSesion']);


    Route::get('', function () {
        return response()->json("No logeado", 203);
    })->name('nologin');          

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware('HumanoMid')->group(function () {
        Route::prefix('humano')->group(function () {
            Route::get('/asignaciones/{humanoId}', [AsignacionOraculoController::class, 'getAsignacionesPorHumano']);
        });
    });
});