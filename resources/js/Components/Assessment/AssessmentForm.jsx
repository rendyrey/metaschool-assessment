import { Link, useForm, usePage } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

const AssessmentForm = (props) => {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset,
        recentlySuccessful,
    } = useForm({
        title: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("assessment.create"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("title");
            },
        });
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Create assessment
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Create new assessment for user to take
                    </p>
                </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="title" value="Assessment Title" />

                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            // required
                            isFocused
                            autoComplete="title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Create assessment
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">
                                Assessment Created.
                            </p>
                        </Transition>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssessmentForm;
