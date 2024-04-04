import AssessmentForm from "@/Components/Assessment/AssessmentForm";
import AssessmentTable from "@/Components/Assessment/AssessmentTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import { Head } from "@inertiajs/react";

export default function Assessment(props) {
    const auth = props.auth;
    const paths = [
        { name: "Assessments", url: route('assessment')}
    ];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" charSet="utf-8" />

            <div className="py-6">
                <div className="w-10/12 mx-auto sm:px-3 lg:px-8">
                    <Breadcrumb paths={paths}></Breadcrumb>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                    <div className="lg:flex lg:justify-between">
                        <div className="lg:w-2/3 py-6 mr-3">
                            <AssessmentTable></AssessmentTable>
                        </div>
                        <div className="lg:w-1/3 py-6">
                            <AssessmentForm></AssessmentForm>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
