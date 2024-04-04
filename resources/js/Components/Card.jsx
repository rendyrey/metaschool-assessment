const Card = ({ children }) => {
    return (
        <section>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default Card;
