import { Link, useForm, usePage } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

const SectionForm = (props) => {
    const { assessment } = usePage().props;
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
        assessment_id: assessment.id,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("section.create", { assessment_id: assessment.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset("title");
            },
        });
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Create section
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Create new section for <strong>{assessment.title}</strong>
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Section Title" />

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
                        Create section
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">
                            Section Created.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
};

export default SectionForm;
