<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Wallet;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'fullname' => ['required', 'string', 'max:255', 'min:5'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'string', 'confirmed', Rules\Password::defaults()],
        ]);

        date_default_timezone_set($request->time_zone);

        // return $request->all();

        $fullnameArray = explode(" ", $request->fullname);
        $firstname = isset($fullnameArray[0]) ? $fullnameArray[0] : $request->fullname;
        $lastname = isset($fullnameArray[1]) ? $fullnameArray[1] : null;

        $user = User::create([
            'firstname' => $firstname,
            'lastname' => (isset($lastname) && $lastname != $request->fullname) ? $lastname : null,
            'email' => $request->email,
            'referral_id' => (isset($request->referral_id) && $request->referral_id != 'null') ? $request->referral_id : null,
            'account_id' => 'tpf-' . time(),
            'password' => Hash::make($request->password),
            'timezone' => isset($request->time_zone) ? $request->time_zone : null,
        ]);

        Wallet::create([
            'user_id' => $user->id
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
