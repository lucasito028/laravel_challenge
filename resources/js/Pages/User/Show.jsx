import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link} from '@inertiajs/react';

export default function show({auth,
    user}){

    return(

    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Usuario "${user.name}"`}
          </h2>

        {/**
          <Link
            href={route("user.edit", user.id)}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit
          </Link>
        </div>
         */}
        </div>
      }
    >
      <Head title={`User "${user.name}"`} />

        {/** <pre className="font-bold text-lg mt-1">{JSON.stringify(user, undefined, 2)} </pre>
         *
        */}

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">

                        <div className="grid gap-1 grid-cols-2 mt-2">
                            <div>
                                <div>
                                    <label className="font-bold text-lg">User ID</label>
                                    <p className="mt-1">{user.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">User Name</label>
                                    <p className="mt-1">{user.name}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="font-bold text-lg">Email</label>
                                    <p className="mt-1">{user.email}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Criado em</label>
                                    <p className="mt-1">{user.created_at}</p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label className="font-bold text-lg">Password</label>
                                    <p className="mt-1">{user.password}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Test 2</label>
                                    <p className="mt-1">{user.password}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
    )
}
