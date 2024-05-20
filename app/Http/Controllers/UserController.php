<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10);

        return inertia("User/Index", [
            "users" => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('User/Create', [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        // Obtém os dados da requisição
        $data = $request->validated();
        /**@var $image UploadedFile */
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        User::create($data);

        return to_route('user.index')
        ->with('success', 'User was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
        return inertia('User/Show', [
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
        return inertia('User/Edit', [
            'user' => new UserResource($user),    // Converte o projeto para um recurso antes de passá-lo para a view
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $name = $user->name;

        $user->delete();
        return to_route('user.index')->with('success', "Usuario \"$name\" foi deletado");
    }
}
