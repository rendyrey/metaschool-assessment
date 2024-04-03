const ROLE = "admin";
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const isAdmin = (user) => {
    return user.role == ROLE;
};

export const formattedDate = (datetime) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const monthName = MONTHS[monthIndex];

    const formattedDate = `${day} ${monthName} ${year} ${hour}:${minute}`;

    return formattedDate;
};
