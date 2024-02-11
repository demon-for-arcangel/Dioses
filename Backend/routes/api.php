<?php

use App\Http\Controllers\AsignacionController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OraculoController;
use App\Models\AsignacionOraculo;

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
    Route::post('registro', [UsuarioController::class, 'registrar']);
    Route::post('login', [AuthController::class, 'inicioSesion']);
    Route::post('cerrarSesion/{id}', [AuthController::class, 'cerrarSesion']);

    Route::post('restablecer-pass', [UsuarioController::class, 'restablecerPass']);
    Route::post('email-existente', [UsuarioController::class, 'listarUsuariosPorEmail']);
    
    Route::get('', function () {
        return response()->json("No logeado", 203);
    })->name('nologin');          

    Route::middleware('auth:sanctum')->group(function () {
        Route::middleware('HumanoMid')->group(function () {
            Route::prefix('humano')->group(function () {
                Route::get('/pruebas-asignadas/{userId}', [AsignacionController::class, 'mostrarAsignacionesUsuario']);
            });
        });

        Route::middleware('DiosMid')->group(function() {
            Route::prefix('dios')->group(function () {
                //Humanos
                Route::get('listar-humanos', [UsuarioController::class, 'listarHumanos']);
                Route::get('listar-humanos-protegidos/{id}', [UsuarioController::class, 'listarHumanosProtegidos']);
                Route::post('crear-usuario', [UsuarioController::class, 'crearUsuario']);
                Route::put('modificar-humano/{id}', [UsuarioController::class, 'modificarHumano']);

                //Dios
                Route::get('obtener-id-dios/{usuarioId}', [UsuarioController::class, 'obtenerIdDelDios']);
                
                //Pruebas
                Route::get('mostrar-pruebas', [OraculoController::class, 'mostrarOraculos']);
                Route::get('listar-oraculo/{id}', [OraculoController::class, 'listarOraculoId']);
                Route::post('crear-prueba', [OraculoController::class, 'crearOraculo']);
                Route::put('modificar-prueba/{id}', [OraculoController::class, 'actualizarOraculo']);
                Route::delete('eliminar-prueba/{id}', [OraculoController::class, 'eliminarOraculo']);
                Route::post('/asignar-oraculo', [AsignacionController::class, 'asignarPrueba']); //mirar si es necesaria o no
                Route::post('/asignar-oraculos/{dios_id}/{oraculo_id}', [AsignacionController::class, 'asignarPruebaMultiple']);
            });
        });
    });
});
