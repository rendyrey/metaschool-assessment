const ErrorAlert = (props) => {
    return (
        <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
            role="alert"
        >
            <span>{props.message}</span>
        </div>
    );
};

export default ErrorAlert;
