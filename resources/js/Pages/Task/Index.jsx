import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';

export default function index({auth, tasks, queryParams = null}){

    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
          queryParams[name] = value;
        } else {
          delete queryParams[name];
        }

        router.get(route("task.index"), queryParams);

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

        router.get(route("task.index"), queryParams);
    };

    return(
        <AuthenticatedLayout
        user={auth.user}
        header=
        {<div className="flex justify-between items-center">

        <h2 className="font-semibold text-xl text-gray-800
        dark:text-gray-200 leading-tight">
        Tarefas
        </h2>

        <Link href={route("task.create")}
        className="bg-emerald-500 py-1 px-3 text-white
        rounded shadow transition-all hover:bg-emerald-600">
            Cadastrar Tarefa
        </Link>

        </div>
        }>

        <Head title="tasks" />

                <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white dark:bg-gray-800
                    overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900
                        dark:text-gray-100">
                            {/**
                            <pre>
                                {JSON.stringify(projects,undefined,2)}
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

                                    <th className="px-3 py-3">Image</th>

                                    <TableHeading
                                        name="task_name"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        Task Name
                                    </TableHeading>

                                    <TableHeading
                                        name="name"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        Name
                                    </TableHeading>

                                    <TableHeading
                                        name="status"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        Status
                                    </TableHeading>

                                    <TableHeading
                                        name="created_at"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        Create Date
                                    </TableHeading>

                                    <TableHeading
                                        name="due_date"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>
                                        Due Date
                                    </TableHeading>

                                    <th className="px-3 py-3">
                                        Created By
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

                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">

                                            <TextInput className="w-full"
                                            defaultValue={queryParams.name}
                                            placeholder="Project Name"
                                            onBlur={(e) =>
                                                searchFieldChanged("name", e.target.value)
                                            }
                                            onKeyPress={(e) => onKeyPress("name", e)}/>

                                        </th>
                                        <th className="px-3 py-3">

                                            <SelectInput
                                            className="w-full"
                                            defaultValue={queryParams.status}
                                            onChange={(e) =>
                                            searchFieldChanged("status", e.target.value)
                                            }>

                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>

                                            </SelectInput>

                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => (
                                        <tr className="bg-white border-b dark:bg-gray-800
                                        dark:border-gray-700" key={task.id}>

                                            <td className="px-3 py-2">{task.id}</td>

                                            <td className="px-3 py-2">
                                                <img src={task.image_path} alt="" style={{width:60}}/>
                                            </td>

                                            <td className="px-3 py-2">
                                                {task.project.name}
                                            </td>

                                            <td className="px-3 py-2 text-gray-100
                                            hover:underline">
                                                <Link href={route("task.show", task.id)}>
                                                        {task.name}
                                                </Link>
                                            </td>

                                            <td className="px-3 py-2">
                                                <span className={`px2 py-1 rounded text-white"
                                                    ${PROJECT_STATUS_CLASS_MAP[task.status]}`}>
                                                    {PROJECT_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                                </td>
                                            <td className="px-3 py-2">{task.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                            {/*
                                            <td className="px-3 py-2 ">{task.createdBy.name}</td>
                                            */}

                                            <td className="px-3 py-2 text-right">

                                                <Link href={route("project.edit", task.id)}
                                                className="font-medium dark:text-blue-500
                                                hover:underline mx-1">Editar</Link>

                                                <Link href={route("project.destroy", task.id)}
                                                className="font-medium text-red-600 dark:text-red-
                                                500 hover:underline mx-1">Excluir</Link>

                                            </td>
                                        </tr>
                                        ))}
                                </tbody>
                            </table>
                                <Pagination links={tasks.meta.links} />
                            </div>

                    </div>
                </div>
            </div>


        </AuthenticatedLayout>

    );
}
