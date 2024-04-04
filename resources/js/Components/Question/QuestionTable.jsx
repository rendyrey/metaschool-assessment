import { Link, usePage } from "@inertiajs/react";

import Pagination from "@/Components/Pagination";
import React from "react";
import { formattedDate } from "@/helpers/helper";

export default function QuestionTable(props) {
    const { section, questions } = usePage().props;
    return (
        <section className="mt-4">
            <div className="flex justify-between mb-4">
                <div className="text-xl mb-4">List of Questions</div>
            </div>
            {questions.data.length == 0 && (
                <p className="text-center">No question yet for this section</p>
            )}
            {questions.data.length > 0 && (
                <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="px-4 py-2 w-1/12">No</th>
                            <th className="px-4 py-2 w-2/5">Question</th>
                            <th className="px-4 py-2">Question type</th>
                            <th className="px-4 py-2">Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.data.map(
                            ({ id, type, content, created_at, answers }, key) => {
                                return (
                                    <tr key={id}>
                                        <td className="border px-4 py-2 text-center">
                                            {key + 1}
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            <p className="text-sm font-bold">Question:</p>
                                            <p className="text-sm">{content}</p>
                                            <p className="text-sm font-bold">Answers:</p>
                                            <ol>
                                            {answers.map((answer, answer_key) => {
                                                return (
                                                    <li key={answer_key}>{answer.content} {answer.is_correct ? "(correct)" : ''}</li>
                                                )
                                            })}
                                            </ol>
                                        </td>
                                        <td className="border px-4 text-center">
                                            {type == 'mcq' ? (<p>Multiple <b>Choice</b> Question</p>) : (<p>Multiple <b>Select</b> Question</p>)}
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

            <Pagination class="mt-6" links={questions.links} />
        </section>
    );
}
