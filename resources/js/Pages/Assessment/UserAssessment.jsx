import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import { Head } from "@inertiajs/react";
import UserAssessmentTable from "@/Components/Assessment/UserAssessmentTable";

export default function UserAssessment(props) {
    const auth = props.auth;
    const paths = [
        { name: "Assessments", url: route('assessment')}
    ];
    return (
        <AuthenticatedLayout user={auth.user} flash={props.flash}>
            <Head title="User Assessment" charSet="utf-8" />
            <div className="py-6">
                <div className="w-10/12 mx-auto sm:px-3 lg:px-8">
                    <Breadcrumb paths={paths}></Breadcrumb>
                      <div className="lg:flex lg:justify-between">
                        <div className="lg:w-full py-6 mr-3">
                          <UserAssessmentTable></UserAssessmentTable>
                        </div>
                    
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
