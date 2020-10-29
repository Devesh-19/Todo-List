exports.getDate = () =>
{
    const today = new Date();

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    return today.toLocaleDateString("en-IN", options);
}

