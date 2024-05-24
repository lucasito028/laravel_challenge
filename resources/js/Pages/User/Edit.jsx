import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';

export default function edit({auth, user}){

    const {data,
        setData,
        post,
        errors,
        reset} =
        useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        _method: 'PUT'
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("user.update", user.id));
    }

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">

                    <h2 className="font-semibold text-xl text-gray-800
                    dark:text-gray-200 leading-tight">
                    Editar Usuario
                    </h2>

                </div>
            }>

            <Head title="Editar Usuario" />

            {/*<pre>{JSON.stringify(data, undefined, 2)}</pre>*/
            }
            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white dark:bg-gray-800
                    overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900
                        dark:text-gray-100">

                            <form
                            onSubmit={submit}
                            className={"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"}>

                                <div className="mt-4">

                                    <InputLabel
                                    htmlFor="User_name"
                                    value="User Name"/>

                                    <TextInput
                                    id="User_name"
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
                                    htmlFor="user_email"
                                    value="Email do Usuario"/>

                                    <TextAreaInput
                                    id="user_email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("email", e.target.value)}
                                    />

                                    <InputError message={errors.email} className='mt-2'/>

                                </div>

                                <div className="mt-4">

                                    <InputLabel
                                    htmlFor="user_password"
                                    value="User Password"/>

                                    <TextInput
                                    id="user_password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("password", e.target.value)}
                                    />

                                    <InputError message={errors.password} className='mt-2'/>

                                </div>

                                <div className="mt-4">

                                    <InputLabel
                                    htmlFor="user_password_confirmation"
                                    value="User Password Confirmation"/>

                                    <TextInput
                                    id="user_password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    />

                                    <InputError message={errors.password_confirmation} className='mt-2'/>

                                </div>

                                <div className="mt-4 text-right">

                                    <Link href={route("user.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-700
                                    rounded shadow transition-all hover:bg-gray-200
                                    mr-2 text-sm">
                                    Voltar
                                    </Link>

                                    <button className="bg-blue-500 py-1 px-3 text-white
                                    rounded shadow transition-all hover:bg-blue-600
                                    mr-2 text-sm">
                                    Editar Projeto
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
