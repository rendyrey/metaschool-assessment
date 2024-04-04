import { Link, usePage } from "@inertiajs/react";

import Pagination from "@/Components/Pagination";
import React from "react";
import { formattedDate } from "@/helpers/helper";

export default function SectionTable(props) {
    const { assessment, sections } = usePage().props;
    return (
        <section>
            <div className="flex justify-between mb-4">
                <div className="text-xl mb-4">List of Sections</div>
            </div>
            {sections.data.length == 0 && (
                <p className="text-center">No section data yet for this task</p>
            )}
            {sections.data.length > 0 && (
                <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="px-4 py-2 w-1/12">No</th>
                            <th className="px-4 py-2 w-2/5">Section Title</th>
                            <th className="px-4 py-2">Questions</th>
                            <th className="px-4 py-2">Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.data.map(
                            ({ id, title, created_at, questions }, key) => {
                                return (
                                    <tr key={id}>
                                        <td className="border px-4 py-2 text-center">
                                            {key + 1}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <Link
                                                href={route("section.show", {
                                                    assessment_id:
                                                        assessment.id,
                                                    section_id: id,
                                                })}
                                                className="transition-all ease-in-out duration-200 hover:text-blue-500"
                                            >
                                                {title}
                                            </Link>
                                        </td>
                                        <td className="border px-4 text-center">
                                            {questions.length}
                                        </td>
                                        <td className="border px-4 text-center">
                                            {formattedDate(created_at)}
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
                </div>
            )}

            <Pagination class="mt-6" links={sections.links} />
        </section>
    );
}
