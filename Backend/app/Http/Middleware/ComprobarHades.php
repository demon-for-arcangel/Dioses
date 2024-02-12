<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ComprobarHades
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && $request->user()->email === 'hades@gmail.com') {
            return $next($request);
        }
        return response()->json(['error' => 'No tienes permisos para acceder a esta ruta'], 403);
    }
}
