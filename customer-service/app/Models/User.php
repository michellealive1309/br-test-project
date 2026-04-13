<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "User",
    title: "User Model",
    required: ["email", "password"],
    properties: [
        new OA\Property(property: "id", type: "integer", example: 1),
        new OA\Property(property: "email", type: "string", example: "email@example.com"),
        new OA\Property(property: "password", type: "string", format: "password", example: "123456"),
        new OA\Property(property: "created_at", type: "string", format: "date-time", example: "2026-07-23 10:47:29"),
        new OA\Property(property: "updated_at", type: "string", format: "date-time", example: "2026-07-23 10:47:29")
    ]
)]
#[Fillable(['id', 'name', 'email', 'password', 'created_at', 'updated_at'])]
#[Hidden(['password'])]
#[Table('users', key: 'id')]
class User extends Authenticatable implements JwtSubject
{
    /** @use HasFactory<UserFactory> */
    use Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'email' => 'string',
            'password' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}
