import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';

export default function create({auth}){

    const {data,
        setData,
        post,
        errors,
        reset} = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
    });

    /*
    const handleImageChange = (e) => {
        setData("image", e.target.files[0]); // Atualiza o estado com o arquivo de imagem selecionado
    };
    */

    const submit = (e) => {
        e.preventDefault();

        post(route("project.store"));
    }

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">

                    <h2 className="font-semibold text-xl text-gray-800
                    dark:text-gray-200 leading-tight">
                    Cadastrar Projeto
                    </h2>

                </div>
            }>

            <Head title="Cadastro de Projeto" />

            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white dark:bg-gray-800
                    overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900
                        dark:text-gray-100">

                            <form
                            onSubmit={submit}
                            className={"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"}>

                                <div>
                                    <img
                                        src={data.image ? URL.createObjectURL(data.image) : ''}
                                        alt=""
                                        className="w-full h-64 object-cover"
                                    />
                                </div>

                                <div className="mt-4">

                                    {/**
                                     *
                                    <InputLabel
                                    htmlFor="project_image_path"
                                    value="Project Image"/>

                                    <TextInput
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    value={data.image}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                    />

                                    <InputError message={errors.image} className='mt-2'/>

                                    */}

                                    <InputLabel
                                    htmlFor="project_image_path"
                                    value="Project Image"
                                    />
                                    <TextInput
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />

                                </div>

                                <div className="mt-4">

                                    <InputLabel
                                    htmlFor="project_name"
                                    value="Project Name"/>

                                    <TextInput
                                    id="project_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                    />

                                    <InputError message={errors.name} className='mt-2'/>

                                </div>

                                <div className="mt-4">

                                    <InputLabel
                                    htmlFor="project_description"
                                    value="Project Description"/>

                                    <TextAreaInput
                                    id="project_description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                    />

                                    <InputError message={errors.description} className='mt-2'/>

                                </div>

                                <div className="mt-4">

                                    <InputLabel
                                    htmlFor="project_due_date"
                                    value="Project Due Date"/>

                                    <TextInput
                                    id="project_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("due_date", e.target.value)}
                                    />

                                    <InputError message={errors.due_date} className='mt-2'/>

                                </div>

                                <div className="mt-4">

                                    <InputLabel
                                    htmlFor="project_status"
                                    value="Project Status"/>

                                    <SelectInput
                                    id="project_status"
                                    className="mt-1 block w-full"
                                    name="status"
                                    onChange={(e) => setData("status", e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="pending">In progress</option>
                                        <option value="pending">Completed</option>
                                    </SelectInput>

                                    <InputError message={errors.due_date} className='mt-2'/>

                                </div>

                                <div className="mt-4 text-right">

                                    <Link href={route("project.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-700
                                    rounded shadow transition-all hover:bg-gray-200
                                    mr-2 text-sm">
                                    Voltar
                                    </Link>

                                    <button className="bg-emerald-500 py-1 px-3 text-white
                                    rounded shadow transition-all hover:bg-emerald-600
                                    mr-2 text-sm">
                                    Cadastrar Projeto
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
