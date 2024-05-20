import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
//import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from '@/constants.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';

export default function index({auth, users, queryParams = null, success}){

    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
          queryParams[name] = value;
        } else {
          delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);

    }

    const onKeyPress = (name, e) => {

        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);

      };

    const sortChanged = (name) => {

        if (name === queryParams.sort_field) {

            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }

        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("user.index"), queryParams);
    };

    const deleteUser = (user) =>{

        if(!window.confirm('Você quer deletar esse projeto')){
            return;
        }
        router.delete(route("user.destroy", user.id))
    }

    return(
        <AuthenticatedLayout
        user={auth.user}
        header=
        {
        <div className="flex justify-between items-center">

            <h2 className="font-semibold text-xl text-gray-800
            dark:text-gray-200 leading-tight">
                Usuarios
            </h2>

            <Link href={route("user.create")}
            className="bg-emerald-500 py-1 px-3 text-white
            rounded shadow transition-all hover:bg-emerald-600">
                Cadastrar Usuario
            </Link>

        </div>
        }>

        <Head title="Usuarios Disponiveis" />

        {success &&
            (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded">
                {success}
            </div>
            )
        }

            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white dark:bg-gray-800
                    overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900
                        dark:text-gray-100">
                            {/**
                            <pre>
                                {JSON.stringify(Users,undefined,2)}
                            </pre>
                            */}

                            <table className="w-full text-sm text-left rtl:text-right
                            text-gray-500 dark: text-gray-400">

                            <thead className="text-xs text-white-700 uppercase bg-gray-50
                            dark:bg-gray-700 dark: text-gray-400
                            border-b-2 border-gray-500">

                                <tr className="text-nowrap">
                                    <TableHeading
                                        name="id"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        ID
                                    </TableHeading>

                                    <TableHeading
                                        name="name"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        Name
                                    </TableHeading>


                                    <TableHeading
                                        name="email"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        Email
                                    </TableHeading>

                                    <TableHeading
                                        name="created_by"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        Created By
                                    </TableHeading>

                                    <th className="px-3 py-3">
                                    </th>
                                    <th className="px-3 py-3">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <thead className="text-xs text-white-700 uppercase bg-gray-50
                                    dark:bg-gray-700 dark: text-gray-400
                                    border-b-2 border-gray-500">
                                    <tr className="text-nowrap">

                                        <th className="px-3 py-3">

                                            <TextInput className="w-full"
                                            defaultValue={queryParams.name}
                                            placeholder="User Name"
                                            onBlur={(e) =>
                                                searchFieldChanged("name", e.target.value)
                                            }
                                            onKeyPress={(e) => onKeyPress("name", e)}/>

                                        </th>
                                        <th className="px-3 py-3">

                                            <TextInput className="w-full"
                                            defaultValue={queryParams.email}
                                            placeholder="User Name"
                                            onBlur={(e) =>
                                                searchFieldChanged("email", e.target.value)
                                            }
                                            onKeyPress={(e) => onKeyPress("email", e)}/>

                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {users.data.map((user) => (
                                        <tr className="bg-white border-b dark:bg-gray-800
                                        dark:border-gray-700" key={user.id}>

                                            <td className="px-3 py-2">{user.id}</td>


                                            <td className="px-3 py-2 text-gray-100
                                            text-nowrap hover:underline">
                                                <Link href={route("user.show", user.id)}>
                                                    {user.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                                {user.email}
                                            </td>
                                            {/*
                                            <td className="px-3 py-2">
                                                <span className={`px2 py-1 rounded text-white"
                                                    ${USER_STATUS_CLASS_MAP[user.status]}`}>
                                                    {USER_STATUS_CLASS_MAP[user.status]}
                                                </span>
                                            </td>
                                            */}
                                            <td className="px-3 py-2">{user.created_at}</td>
                                            <td className="px-3 py-2">{user.updated_at}</td>

                                            <td className="px-3 py-2 text-right">

                                                <Link href={route("user.edit", user.id)}
                                                className="font-medium dark:text-blue-500
                                                hover:underline mx-1">Editar</Link>

                                                <Link onClick={(e) => deleteUser(user)}
                                                className="font-medium text-red-600 dark:text-red-
                                                500 hover:underline mx-1">Excluir</Link>

                                            </td>
                                        </tr>
                                        ))}

                                </tbody>
                            </table>
                                <Pagination links={users.meta.links} />
                            </div>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>

    );
}
