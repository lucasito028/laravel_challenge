// Importa o componente AuthenticatedLayout do diretório "@/Layouts/AuthenticatedLayout"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// Importa o componente Head e Link do pacote "@inertiajs/react"
import { Head, Link } from "@inertiajs/react";

// Importa constantes PROJECT_STATUS_CLASS_MAP e PROJECT_STATUS_TEXT_MAP do arquivo "@/constants.jsx"
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";

// Importa o componente TasksTable do diretório "../Task/TasksTable"
import TasksTable from "../Task/TasksTable";

// Declaração da função do componente "show"
export default function show({ auth, success, project, tasks, queryParams }) {
    // Renderiza o componente AuthenticatedLayout, passando props
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                // Cabeçalho do layout contendo título do projeto e link para edição
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Project "${project.name}"`}
                    </h2>
                    <Link
                        href={route("project.edit", project.id)}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            {/* Define o título da página */}
            <Head title={`Project "${project.name}"`} />

            {/* Conteúdo principal da página */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Exibe a imagem do projeto */}
                        <div>
                            <img
                                src={project.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Exibe informações do projeto */}
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    {/* Exibe ID do projeto */}
                                    <div>
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className="mt-1">{project.id}</p>
                                    </div>
                                    {/* Exibe nome do projeto */}
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Name</label>
                                        <p className="mt-1">{project.name}</p>
                                    </div>
                                    {/* Exibe status do projeto */}
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Status</label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    PROJECT_STATUS_CLASS_MAP[project.status]
                                                }
                                            >
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </p>
                                    </div>
                                    {/* Exibe criador do projeto */}
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1">{project.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    {/* Exibe data de vencimento do projeto */}
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1">{project.due_date}</p>
                                    </div>
                                    {/* Exibe data de criação do projeto */}
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Create Date</label>
                                        <p className="mt-1">{project.created_at}</p>
                                    </div>
                                    {/* Exibe quem atualizou o projeto */}
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p className="mt-1">{project.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Exibe descrição do projeto */}
                            <div className="mt-4">
                                <label className="font-bold text-lg">Project Description</label>
                                <p className="mt-1">{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exibe tabela de tarefas */}
            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Renderiza o componente TasksTable */}
                            <TasksTable
                                tasks={tasks}
                                success={success}
                                queryParams={queryParams}
                                hideProjectColumn={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
