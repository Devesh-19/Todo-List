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

exports.getDay = () =>
{
    const today = new Date();

    const options = {
        weekday: 'long'
    };

    return today.toLocaleDateString("en-IN", options);
}

