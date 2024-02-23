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
    
    Route::post('subirImagen',[UsuarioController::class,'subirImagen']);
    Route::put('actualizarImagen',[UsuarioController::class,'actualizarImagenUsuario']);
    Route::put('modificar-password/{id}', [UsuarioController::class, 'modificarPassword']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::middleware('HumanoMid')->group(function () {
            Route::prefix('humano')->group(function () {
                Route::get('consultar-user/{id}', [UsuarioController::class, 'consultarUserHumano']);
                Route::get('consultarHumano/{id}', [UsuarioController::class, 'consultarHumano']);
                Route::get('obtener-id-humano/{usuarioId}', [UsuarioController::class, 'obtenerIdHumano']);
                Route::middleware(['MuertoONo'])->group(function () {
                    Route::get('/pruebas-asignadas/{userId}', [AsignacionController::class, 'mostrarAsignacionesUsuario']);
                    Route::post('/guardar-respuesta', [AsignacionController::class, 'guardarRespuesta']);
                    Route::get('pruebas-resueltas/{id}', [AsignacionController::class, 'pruebasResueltasHumano']);
                });
            });
        });

        Route::middleware('DiosMid')->group(function() {
            Route::prefix('dios')->group(function () {
                //Humanos
                Route::get('listar-humanos', [UsuarioController::class, 'listarHumanos']);
                Route::get('listar-humanos-protegidos/{id}', [UsuarioController::class, 'listarHumanosProtegidos']);
                Route::get('listar-humano/{id}', [UsuarioController::class, 'consultarHumano']);
                Route::post('crear-usuario/{id}', [UsuarioController::class, 'nuevoHumano']);
                Route::put('modificar-humano/{id}', [UsuarioController::class, 'modificarHumano']);
                Route::middleware(['comprobarHades'])->group(function () {
                    Route::delete('eliminar-humano/{id}', [UsuarioController::class, 'eliminarHumano']);
                    Route::delete('eliminar-humamos', [UsuarioController::class, 'eliminarMultiplesHumanos']);
                });
                
                //Dios
                Route::get('obtener-id-dios/{usuarioId}', [UsuarioController::class, 'obtenerIdDelDios']);

                Route::get('consultar-user/{id}', [UsuarioController::class, 'consultarUserDios']);
                
                //Pruebas
                Route::get('mostrar-pruebas', [OraculoController::class, 'mostrarOraculos']);
                Route::get('listar-oraculo/{id}', [OraculoController::class, 'listarOraculoId']);
                Route::post('crear-prueba', [OraculoController::class, 'crearOraculo']);
                Route::put('modificar-prueba/{id}', [OraculoController::class, 'actualizarOraculo']);
                Route::delete('eliminar-prueba/{id}', [OraculoController::class, 'eliminarOraculo']);
                Route::post('/asignar-oraculos/{dios_id}/{oraculo_id}', [AsignacionController::class, 'asignarPruebaMultiple']);
            });
        });
    });
});
