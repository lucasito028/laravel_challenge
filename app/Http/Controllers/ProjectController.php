<?php

namespace App\Http\Controllers;

use App\Models\Project;
//use App\Models\User;
use App\Http\Resources\TaskResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Str;
use illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10);

        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('Project/Create', [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request){
        // Obtém os dados da requisição
        $data = $request->validated();
        /**@var $image UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }

        Project::create($data);

        return to_route('project.index')
        ->with('success', 'Project was created');;
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project){

        // Obtém uma instância de query para as tarefas relacionadas ao projeto
        $query = $project->tasks();

        // Obtém os campos de ordenação da requisição, ou define valores padrão se não fornecidos
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // Verifica se foi fornecido um parâmetro "name" na requisição e adiciona uma cláusula de filtro à query se sim
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        // Verifica se foi fornecido um parâmetro "status" na requisição e adiciona uma cláusula de filtro à query se sim
        if (request("status")) {
            $query->where("status", request("status"));
        }

        // Executa a consulta, ordena os resultados e paginas, limitando a 10 registros por página e exibindo 1 link de paginação em cada lado
        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        // Retorna a resposta usando Inertia.js, passando dados para a página 'Project/Show'
        return inertia('Project/Show', [
            'project' => new ProjectResource($project),    // Converte o projeto para um recurso antes de passá-lo para a view
            "tasks" => TaskResource::collection($tasks),   // Converte a coleção de tarefas para recursos antes de passá-las para a view
            'queryParams' => request()->query() ?: null,   // Passa os parâmetros da query da requisição para a view, ou null se não houver parâmetros
            'success' => session('success'),                // Passa a mensagem de sucesso da sessão para a view
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project){
        //
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),    // Converte o projeto para um recurso antes de passá-lo para a view
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project){
        //
        // Obtém os dados da requisição
        $data = $request->validated();
        /**@var $image UploadedFile */
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if ($image) {

            if($project->image_path){
                Storage::disk('public')
                ->deleteDirectory(dirname($project->image_path));
            }

            $data['image_path'] = $image->store('project/' . Str::random(),
            'public');
        }

        $project->update($data);

        return to_route('project.index')
        ->with('success', 'Project was succed');;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
        $name = $project->name;

        if($project->image_path){
            Storage::disk('public')
            ->deleteDirectory(dirname($project->image_path));
        }

        $project->delete();
        return to_route('project.index')->with('success', "Project \"$name\" deleted");
    }
}
