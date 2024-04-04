import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import Card from "@/Components/Card";
import QuestionForm from "@/Components/Question/QuestionForm";
import QuestionTable from "@/Components/Question/QuestionTable";

export default function SectionDetail({ auth }) {
    const { section } = usePage().props;
    const paths = [
        {
            name: section.assessment.title,
            url: route("assessment.show", { id: section.assessment.id }),
        },
        {
            name: section.title,
            url: "#",
        },
    ];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Section Detail" />
            <div className="py-6">
                <div className="w-10/12 mx-auto sm:px-3 lg:px-8">
                    <Breadcrumb paths={paths}></Breadcrumb>
                    <div className="lg:flex lg:justify-between">
                        <div className="lg:w-2/3 py-6 mr-6">
                            <Card>
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Section Title: <b>{section.title}</b>
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        You can create many questions in this
                                        section
                                    </p>
                                </header>
                                <hr className="mt-4"></hr>
                                <QuestionTable></QuestionTable>
                            </Card>
                        </div>
                        <div className="lg:w-1/3 py-6">
                            <Card>
                                <QuestionForm></QuestionForm>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
