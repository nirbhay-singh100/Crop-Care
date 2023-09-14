
module.exports.getStartDate = function () {
    const today = new Date();
    const options = {
        month: "long",
        year: "numeric"
    };

    const day = today.toLocaleDateString("en-US", options);
    return day;
}

module.exports.getEndDate = function (typeOfPlan, duration) {
    const today = new Date();
    if (typeOfPlan === "Monthly") {
        today.setDate(today.getDate() + duration * 30);
    }
    else if (typeOfPlan === "Weekly") {
        today.setDate(today.getDate() + duration * 7);
    }
    
    const options = {
        month: "long",
        year: "numeric"
    };

    const day = today.toLocaleDateString("en-US", options);
    return day;

}