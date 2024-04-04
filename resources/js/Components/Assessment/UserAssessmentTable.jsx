import { Link, usePage } from "@inertiajs/react";

import Pagination from "@/Components/Pagination";
import React from "react";
import { formattedDate } from "@/helpers/helper";

export default function UserAssessmentTable(props) {
    const { assessments, accessToken } = usePage().props;

    return (
        <>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <div className="text-xl mb-4">List of assessment</div>
                    {assessments.data.length == 0 && (
                        <p className="text-center">No data</p>
                    )}
                    {assessments.data.length > 0 && (
                        <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-gray-100 text-center">
                                    <th className="px-4 py-2 w-1/12">No</th>
                                    <th className="px-4 py-2 w-1/3">
                                        Assessment Title
                                    </th>
                                    <th className="px-4 py-2 w-1/4">Sections</th>
                                    <th className="px-4 py-2">Created at</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessments.data.map(
                                    (
                                        { id, title, created_at, sections, user_assessment },
                                        key
                                    ) => {
                                        return (
                                            <tr key={id}>
                                                <td className="border px-4 py-2 text-center">
                                                    {key + 1}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {title}
                                                </td>
                                                <td className="border px-4 py-2 text-left">
                                                  {sections.length == 0 && <span><i>No section yet.</i></span>}
                                                    <ul>
                                                    {sections.map((section, key) => {
                                                      return (
                                                        <li key={key}>
                                                           - {section.title} <span className="text-sm text-gray-500">({section.questions.length} questions)</span>
                                                        </li>
                                                      )
                                                    })}
                                                    </ul>
                                                </td>
                                                <td className="border px-4 text-center">
                                                    {formattedDate(created_at)}
                                                </td>
                                                <td className="border px-4 text-center">
                                                    {user_assessment?.status || 'pending'}
                                                    <p>Score: {user_assessment?.user_score || '0'}</p>
                                                </td>
                                                <td className="border px-4 text-center">
                                                    {user_assessment?.status != 'finished' && (
                                                        <Link href={route("assessment.start", { id: id } )}
                                                        className="transition-all ease-in-out duration-200 hover:text-blue-500"
                                                    >
                                                        Start
                                                    </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                        </div>
                    )}

                    <Pagination class="mt-6" links={assessments.links} />
                </div>
            </div>
        </>
    );
}
