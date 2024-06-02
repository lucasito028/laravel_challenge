<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $user = auth()->user();


        $totalPendingTasks = Task::query()->where('status', 'pending')->count();

        $myPendingTasks = Task::query()->where('status', 'pending')->where('assigned_user_id', $user->id)->count();


        $totalProgressTasks = Task::query()->where('status', 'in_progress')->count();

        $myProgressTasks = Task::query()->where('status', 'in_progress')
        ->where('assigned_user_id', $user->id)->count();


        $totalCompleteTasks = Task::query()->where('status', 'completed')->count();

        $myCompleteTasks = Task::query()->where('status', 'completed')
        ->where('assigned_user_id', $user->id)->count();


        $activeTasks = Task::query()->where('status', ['pending', 'in_progress'])
        ->where('assigned_user_id', $user->id)->limit(10)->get();

        $activeTasks = TaskResource::collection($activeTasks);

        return inertia('Dashboard', compact(
            'totalPendingTasks',
            'myPendingTasks',
            'totalProgressTasks',
            'myProgressTasks',
            'totalCompleteTasks',
            'myCompleteTasks',
            'activeTasks'
        ));
    }

}
