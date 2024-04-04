import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import Pagination from "@/Components/Pagination";
import React from "react";
import axios from "axios";
import { formattedDate } from "@/helpers/helper";

export default function AssessmentTable(props) {
    // alert(props.location.state)
    const { assessments, accessToken } = usePage().props;
    // const [assessments, setAssessments] = useState({data:[], links:[]})
    // useEffect(() => {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`
    //     }
    //   }
    //   const queryParam = new URLSearchParams(window.location.search)
    //   const page = queryParam.get('page') ? '?page=' + queryParam.get('page') : ''
    //   axios.get('/api/users' + page, config).then((res) => {
    //     if (res.status == 200) {
    //       setAssessments(res.data)
    //     }
    //   })
    // }, [])

    return (
        <>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <div className="flex justify-between mb-4">
                        <div className="text-xl mb-4">List of assessment</div>
                    </div>
                    {assessments.data.length == 0 && (
                        <p className="text-center">No data</p>
                    )}
                    {assessments.data.length > 0 && (
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="bg-gray-100 text-center">
                                    <th className="px-4 py-2 w-1/12">No</th>
                                    <th className="px-4 py-2 w-2/3">Assessment Title</th>
                                    <th className="px-4 py-2">Sections</th>
                                    <th className="px-4 py-2">Created at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessments.data.map(
                                    ({ id, title, created_at, sections }, key) => {
                                        return (
                                            <tr key={id}>
                                                <td className="border px-4 py-2 text-center">
                                                    {key+1}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <Link
                                                        href={route(
                                                            "assessment.show",
                                                            {
                                                                id: id,
                                                            }
                                                        )}
                                                        className="transition-all ease-in-out duration-200 hover:text-blue-500"
                                                    >
                                                        {title}
                                                    </Link>
                                                </td>
                                                <td className="border px-4 text-center">{sections.length}</td>
                                                <td className="border px-4 text-center">
                                                    {formattedDate(created_at)}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    )}

                    <Pagination class="mt-6" links={assessments.links} />
                </div>
            </div>
        </>
    );
}
