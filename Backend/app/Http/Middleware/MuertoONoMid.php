<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MuertoONoMid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $usuario = $request->user();

        if ($usuario && $usuario->fecha_muerte !== null) {
            // Agrega mensajes de depuración
            Log::info('El usuario ' . $usuario->id . ' está muerto');
            // o usa dd() para detener la ejecución y mostrar información
            dd('El usuario ' . $usuario->id . ' está muerto');

            // También puedes retornar una respuesta JSON con un código de estado
            return response()->json('El usuario está muerto', 403);
        }

        return $next($request);
    }
}
