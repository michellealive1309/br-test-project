<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use OpenApi\Attributes as OA;

#[OA\Tag(name: "Authentication", description: "User login and registration")]
class AuthController extends ApiController
{
    #[OA\Post(
        path: '/api/auth/register',
        summary: 'Register a new user',
        tags: ['Authentication'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'user@example.com'),
                    new OA\Property(property: 'password', type: 'string', format: 'password', example: 'secret123')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'User registered successfully'),
            new OA\Response(response: 400, description: 'Bad Request')
        ]
    )]
    public function register(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);

        return response()->json(compact('user', 'token'));
    }

    #[OA\Post(
        path: '/api/auth/login',
        summary: 'Login user and get token',
        tags: ['Authentication'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'user@example.com'),
                    new OA\Property(property: 'password', type: 'string', format: 'password', example: 'secret123')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Login successful'),
            new OA\Response(response: 400, description: 'Bad Request')
        ]
    )]
    public function login(LoginRequest $loginRequest)
    {
        $loginRequest->validated();

        if (!$token = Auth::attempt($loginRequest->only('email', 'password'))) {
            Log::info('Login failed for email or password');
            return response()->json(['error' => 'Invalid user or password'], 401);
        }

        return response()->json([
            'token' => $token
        ]);
    }

    #[OA\Get(
        path: '/api/aute/me',
        summary: 'Get authenticated user data',
        security: [['bearerAuth' => []]],
        tags: ['Authentication'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'User data',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'id', type: 'integer', example: 1),
                        new OA\Property(property: 'email', type: 'string', example: 'user@example.com')
                    ]
                )
            ),
            new OA\Response(response: 403, description: 'Unauthorized')
        ]
    )]
    public function me()
    {
        return response()->json(Auth::user());
    }

    #[OA\Post(
        path: '/api/auth/logout',
        summary: 'Logout user and invalidate token',
        security: [['bearerAuth' => []]],
        tags: ['Authentication'],
        responses: [
            new OA\Response(response: 200, description: 'Logged out successfully'),
            new OA\Response(response: 403, description: 'Unauthorized')
        ]
    )]
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out']);
    }
}
