import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';

export default function Edit({ auth, projects, task, users }) {
    const { data, setData, post, errors, reset } = useForm({
        image_path: task.image_path || "",
        image: null,
        name: task.name || "",
        status: task.status || "",
        description: task.description || "",
        project_id: task.project_id || "",
        priority: task.priority || "",
        due_date: task.due_date || "",
        assigned_user_id: task.assigned_user_id || "",
        _method: 'PUT'
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');

        Object.keys(data).forEach(key => {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        if (data.image) {
            formData.append('image', data.image);
        }

        post(route("task.update", task.id), {
            data: formData,
            forceFormData: true,
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Editar Tarefa
                    </h2>
                </div>
            }
        >
            <Head title="Editar Tarefa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                    {data.image ? (
                                        <img
                                            src={URL.createObjectURL(data.image)}
                                            alt="Task Image"
                                            className="w-full h-64 object-cover mt-4"
                                        />
                                    ) : (
                                        data.image_path && (
                                            <img
                                                src={data.image_path}
                                                alt="Task Image"
                                                className="w-full h-64 object-cover mt-4"
                                            />
                                        )
                                    )}
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_image" value="Imagem da Tarefa" />
                                    <TextInput
                                        id="project_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setData("image", file ? file : null);
                                        }}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_project_id" value="Projeto" />
                                    <SelectInput
                                        id="task_project_id"
                                        name="project_id"
                                        value={data.project_id}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("project_id", e.target.value)}
                                    >
                                        <option value="">Selecionar o Projeto</option>
                                        {projects.data.map((project) => (
                                            <option value={project.id} key={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.project_id} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_user_id" value="Usuários" />
                                    <SelectInput
                                        id="task_user_id"
                                        name="assigned_user_id"
                                        value={data.assigned_user_id}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("assigned_user_id", e.target.value)}
                                    >
                                        <option value="">Selecionar Usuário</option>
                                        {users.data.map((user) => (
                                            <option value={user.id} key={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_name" value="Nome da Tarefa" />
                                    <TextInput
                                        id="task_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    <InputError message={errors.name} className='mt-2' />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_description" value="Descrição da Tarefa" />
                                    <TextAreaInput
                                        id="task_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("description", e.target.value)}
                                    />
                                    <InputError message={errors.description} className='mt-2' />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_due_date" value="Data de Conclusão" />
                                    <TextInput
                                        id="task_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("due_date", e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className='mt-2' />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_status" value="Status da Tarefa" />
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("status", e.target.value)}
                                    >
                                        <option value="">Selecionar Status</option>
                                        <option value="pending">Pendente</option>
                                        <option value="in_progress">Em Progresso</option>
                                        <option value="completed">Concluído</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className='mt-2' />
                                </div>

                                <div className="mt-4 text-right">
                                    <Link href={route("project.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-700 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm">
                                        Voltar
                                    </Link>
                                    <button className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600 mr-2 text-sm">
                                        Editar Tarefa
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
