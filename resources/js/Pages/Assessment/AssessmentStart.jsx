import { Head, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import Card from "@/Components/Card";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioButton from "@/Components/RadioButton";

export default function AssessmentStart(props) {
    const auth = props.auth;
    const assessment = props.assessment;
    const paths = [{ name: "Assessments", url: route("assessment") }];
    const {
        post,
        patch
    } = useForm();

    const answerChangeHandler = (isChecked, questionId, answerId, questionType) => {
        post(route('user_assessment.answer', {
            is_checked: isChecked,
            user_assessment_id: assessment.user_assessment.id,
            question_id: questionId,
            answer_id: answerId,
            type: questionType
        }))
    }

    const submitAssessment = () => {
        patch(route('user_assessment.finish', {
            user_assessment_id: assessment.user_assessment.id 
        }))
    }
    
    return (
        <AuthenticatedLayout user={auth.user} flash={props.flash}>
            <Head title="Dashboard" charSet="utf-8" />
            <div className="py-6">
                <div className="w-10/12 mx-auto sm:px-3 lg:px-8">
                    <Breadcrumb paths={paths}></Breadcrumb>
                    <div className="lg:flex lg:justify-between">
                        <div className="lg:w-2/3 py-6 mr-3">
                            <Card>
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Assessment Title:{" "}
                                        <b>{assessment.title}</b>
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        You can start doing the assessment
                                    </p>
                                </header>
                                <hr className="mt-4"></hr>
                                {assessment.sections.map((section, key) =>
                                    (
                                        <section className="py-2" key={key}>
                                            <h2>Section #{key+1} <span className="font-bold">{section.title}</span>:</h2>
                                            {section.questions.map((question, q_key) => 
                                                 (
                                                    <section className="flex py-2" key={q_key}>
                                                        <div className="ml-4 w-1/2">
                                                            <p>Question {q_key+1}:</p>
                                                            <p>{question.content}</p>
                                                        </div>
                                                        <div>
                                                            <p>Your answers:</p>
                                                            {question.answers.map((answer, a_key) => 
                                                                (
                                                                    <section key={a_key} className="py-2">
                                                                        <label className="flex items-center">
                                                                            {question.type == 'msq' ? (
                                                                            <Checkbox
                                                                                checked={assessment.user_assessment.user_assessment_answers.find(ans => ans.answer_id == answer.id) ? true : false}
                                                                                onChange={(e) => answerChangeHandler(e.target.checked, question.id, answer.id, question.type)}
                                                                            />) : (
                                                                            <RadioButton
                                                                                name={"answer"+answer.id}
                                                                                checked={assessment.user_assessment.user_assessment_answers.find(ans => ans.answer_id == answer.id) ? true : false}
                                                                                onChange={(e) => answerChangeHandler(e.target.checked, question.id, answer.id, question.type)}
                                                                            />
                                                                            )}
                                                                            <span className="ms-2 text-sm text-gray-600">
                                                                                {answer.content}
                                                                            </span>
                                                                        </label>
                                                                    </section>
                                                                )
                                                            )}
                                                        </div>
                                                    </section>
                                                )
                                            )}
                                            <hr />
                                        </section>
                                    )
                                )}
                                <PrimaryButton onClick={submitAssessment} className="mt-4">
                                    Submit Assessment
                                </PrimaryButton>
                            </Card>
                        </div>
                        <div className="lg:w-1/3 py-6"></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
