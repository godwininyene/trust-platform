<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user= auth()->user();

        if($user->role === 'admin') {
            return $next($request);
        }

        abort(401, 'Permission not granted! You do not have permission to access this page.');
        // return response()->json(['Permission not granted'],404);
    }
}
