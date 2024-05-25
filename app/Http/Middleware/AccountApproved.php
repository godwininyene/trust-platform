<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AccountApproved
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user= auth()->user();

        if($user->role === 'admin'|| (!isset($user->approval_status) || $user->approval_status === 'approved') ) {
            return $next($request);
        }

        return redirect()->route('pending_approval');
    }
}
