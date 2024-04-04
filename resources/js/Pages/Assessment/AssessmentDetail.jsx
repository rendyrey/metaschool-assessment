import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import Card from "@/Components/Card";
import SectionForm from "@/Components/Section/SectionForm";
import SectionTable from "@/Components/Section/SectionTable";

export default function AssessmentDetail({ auth, flash }) {
    const { assessment } = usePage().props;
    const paths = [
        {
            name: assessment.title,
            url: route("assessment.show", { id: assessment.id }),
        },
    ];
    return (
        <AuthenticatedLayout user={auth.user} flash={flash}>
            <Head title="Assessment Detail" />
            <div className="py-6">
                <div className="w-10/12 mx-auto sm:px-3 lg:px-8">
                    <Breadcrumb paths={paths}></Breadcrumb>
                    <div className="lg:flex lg:justify-between">
                        <div className="lg:w-2/3 py-6 mr-6">
                            <Card>
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Assessment Title:{" "}
                                        <b>{assessment.title}</b>
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        You can create many section in this
                                        assessment
                                    </p>
                                </header>
                                <SectionTable></SectionTable>
                            </Card>
                        </div>
                        <div className="lg:w-1/3 py-6">
                            <Card>
                                <SectionForm></SectionForm>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
