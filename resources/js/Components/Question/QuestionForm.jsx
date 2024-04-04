import { useForm, usePage } from "@inertiajs/react";

import Checkbox from "../Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioButton from "../RadioButton";
import TextAreaInput from "../TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";

const QuestionForm = (props) => {
    const { section } = usePage().props;
    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset,
        recentlySuccessful,
        wasSuccessful,
    } = useForm({
        content: "",
        type: "mcq",
        answers: ["", ""],
        true_answers: [false],
        section_id: section.id,
    });

    useEffect(() => {
        setData((data) => ({
            ...data,
            content: "",
            type: "mcq",
            answers: ["", ""],
            true_answers: [false],
        }));
    }, [wasSuccessful]);

    const handleQuestionTypeChange = (value) => {
        data.type = value;
        for (let i = 0; i < data.answers.length; i++) {
            data.true_answers[i] = false;
        }
        setData("types", data.types);
        setData("true_answers", data.true_answers);
    };

    const addMoreAnswerHandler = () => {
        if (data.answers.length >= 4) return
        data.answers.push("");
        data.true_answers.push(false);
        setData("answers", data.answers);
        setData("true_answers", data.true_answers);
    };

    const deleteAnswerHandler = (index) => {
        data.answers.splice(index, 1)
        setData("answers", data.answers);
    }

    const trueAnswerChangeHanlder = (isTrue, answerIndex) => {
        if (data.type == "mcq") {
            for (let i = 0; i < data.answers.length; i++) {
                data.true_answers[i] = false;
            }
        }
        data.true_answers[answerIndex] = isTrue;
        setData("true_answers", data.true_answers);
    };

    const answerChangeHandler = (value, answerIndex) => {
        data.answers[answerIndex] = value;
        setData("answers", data.answers);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("question.create", { section_id: section.id }));
    };

    const answerComponent = () => {
        const answerComponent = [];
        for (let i = 0; i < data.answers.length; i++) {
            answerComponent.push(
                <div className="my-3" key={i}>
                    <div className="flex items-center">
                        <div>
                            <InputLabel
                                className="text-sm"
                                value={"Answer " + (i + 1) + ":"}
                            />
                        </div>
                        <div className="ml-4">
                            {data.type == "mcq" ? (
                                <label className="flex items-center">
                                    <RadioButton
                                        checked={data.true_answers[i]}
                                        name={"answer" + i}
                                        onChange={(e) =>
                                            trueAnswerChangeHanlder(
                                                e.target.checked,
                                                i
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Mark as true answer
                                    </span>
                                </label>
                            ) : (
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.true_answers[i]}
                                        onChange={(e) =>
                                            trueAnswerChangeHanlder(
                                                e.target.checked,
                                                i
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Mark as true answer
                                    </span>
                                </label>
                            )}
                           
                            
                        </div>
                        {i > 1 && <div>
                            <button className="ml-2 bg-red-600 text-sm rounded-md px-2 text-white hover:bg-red-500" type="button" onClick={() => deleteAnswerHandler(i)}>delete</button>
                        </div>}
                    </div>

                    <TextInput
                        id={"answer" + i}
                        className="mt-1 block w-full"
                        value={data.answers[i]}
                        onChange={(e) => answerChangeHandler(e.target.value, i)}
                        isFocused
                        autoComplete="title"
                    />
                    
                    <InputError message={errors["answers." + i]} className="mt-2" />
                </div>
            );
        }

        return answerComponent;
    };

    const questionComponents = (
        <div>
            <div className="flex justify-start items-center">
                <div>
                    <InputLabel
                        className="text-xl"
                        htmlFor="content"
                        value={"Question"}
                    />
                </div>
            </div>

            <div className="flex">
                <div className="mb-4 mt-2">
                    <label className="flex items-center">
                        <RadioButton
                            checked={data.type == "mcq"}
                            name="type"
                            value="mcq"
                            onChange={(e) =>
                                handleQuestionTypeChange(e.target.value)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Multiple <strong>Choice</strong> Question
                        </span>
                    </label>
                </div>
                <div className="ml-3 mb-4 mt-2">
                    <label className="flex items-center">
                        <RadioButton
                            checked={data.type == "msq"}
                            name="type"
                            value="msq"
                            onChange={(e) =>
                                handleQuestionTypeChange(e.target.value)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Multiple <strong>Select</strong> Question
                        </span>
                    </label>
                </div>
            </div>
            <InputLabel
                className="text-sm"
                htmlFor="content"
                value="Question text:"
            />
            <TextAreaInput
                id="content"
                className="mt-1 block w-full"
                onChange={(e) => setData("content", e.target.value)}
                isFocused
                autoComplete="content"
                value={data.content}
            />
            <InputError message={errors.content} className="mt-2" />
            <div className="mt-4">
                <button
                    className="text-sm bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-500"
                    type="button"
                    onClick={() => addMoreAnswerHandler()}
                >
                    Add more answer
                </button>
            </div>
            {answerComponent()}
            <InputError message={errors.true_answers} className="mt-2" />
            <InputError message={errors.error} className="mt-2" />
            <hr></hr>
        </div>
    );

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Create new question
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Create new question for <strong>{section.title}</strong>
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {questionComponents}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Create question
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">
                            Question Created.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
};

export default QuestionForm;
