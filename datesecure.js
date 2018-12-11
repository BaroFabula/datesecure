
/**
 * @author Bernd Potthast
 *
 * This function gets the input value, validates the date, compares it to the min and max Attributes and then either
 * refills the input or clears it.
 * @param e {event} Event of added EventListener
 */
function checkdate(e) {
    var array = getDateArray(e.target.value, ".");
    if(array !== null && array.length === 3 && isValidDate(array[2], array[1], array[0])) {
        if(e.target.getAttribute("min") !== null) {
            var min_array = getDateArray(e.target.getAttribute("min"), "-");
            if(min_array.length === 3 && isValidDate(min_array[0], min_array[1], min_array[2])) {
                if(min_array[2] > array[2] ||
                    (min_array[2] === array[2] && (min_array[1] > array[1] ||
                        (min_array[1] === array[1] && min_array[0] > array[0])))) {
                    reset(e.target);
                    return;
                }
            }
        }
        if(e.target.getAttribute("max") !== null) {
            var max_array = getDateArray(e.target.getAttribute("max"), "-");
            if (max_array.length === 3 && isValidDate(max_array[0], max_array[1], max_array[2])) {
                if (max_array[2] < array[2] ||
                    (max_array[2] === array[2] && (max_array[1] < array[1] ||
                        (max_array[1] === array[1] && max_array[0] < array[0])))) {
                    reset(e.target);
                    return;
                }
            }
        }
        e.target.value =    ((array[0]<10)?"0":"")+array[0]+"."+
                            ((array[1]<10)?"0":"")+array[1]+"."+
                            ((array[2]<1000&&array[2]>-1000)?(
                                (array[2]<100&&array[2]>-100)?(
                                    (array[2]<10&&array[2]>-10)?"000":"00"):"0"):"")+array[2];
        return;
    }

    reset(e.target);
}

/**
 *  Resets the targets value, if it wasn't empty. This clears the input, refocusses the cursor in the input and
 *  depending on the settings alerts the user.
 * @param target {object} Object where the event is dispatched
 */
function reset(target) {
    if(target.value !== "") {
        target.value = "";
        console.log(typeof target);
        alertUser(target);
        target.focus();
    }
}

/**
 *  This function alerts the user, if this is turned on. It either uses the default message or a set custom message.
 * @param target {object} Object where the event is dispatched
 */
function alertUser(target) {
    if(typeof popup !== "undefined" && popup) {
        if(target.getAttribute("type") === "date") {
            if(typeof datePopup !== "undefined") {
                alert(datePopup);
                return;
            }
        }
        if(target.getAttribute("type") === "time") {
            if(typeof timePopup !== "undefined") {
                alert(timePopup);
                return;
            }
        }
        alert("InvalidInput");
    }
}

/**
 *
 * @param value {String} Datumsstring
 * @param del {String} Delimiter to seperate day, month and year. Also filters order of date parts by delimiter type.
 * @return {Array|null} Array of date [day, month, year] or null if invalid date
 */
function getDateArray(value, del) {
    if(value === "" || value == null) {
        return null;
    }
    var array = value.split(del);
    if(array === null || array.length !== 3) {
        return null;
    }
    if(del === "-") {
        var temp = array[0];
        array[0] = array[2];
        array[2] = temp;
    }
    return stringArrayToIntArray(array);
}

/**
 *
 * @param value {String} Timestring
 * @param del {String} Delimiter to seperate hour and minutes.
 * @return {Array|null} Array of time [hour, minute] or null if invalid date
 */
function getTimeArray(value, del) {
    if(value === "" || value == null) {
        return null;
    }
    var array = value.split(del);
    if(array === null || array.length !== 2) {
        return null;
    }
    return stringArrayToIntArray(array);
}

/**
 * Checks if date is valid.
 * @param y {int} Year
 * @param m {int} Month
 * @param d {int} Day
 * @returns {boolean} True for valid date, else false.
 */
function isValidDate(y, m, d) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((!(y % 4) && y % 100) || !(y % 400)) {
        daysInMonth[1] = 29;
    }
    return (m > 0 && m <= 12 && d > 0 && d <= daysInMonth[m - 1]);
}

/**
 *  Checks if time is valied
 * @param h {int} Hour
 * @param m {int} Minute
 * @return {boolean} True for valid time, else false.
 */
function isValidTime(h, m) {
    return (h >= 0 && h < 24 && m >= 0 && m < 60);
}

/**
 * Gets  an array, if array null or any value in array not to int parsable return null
 * Else return array as array int
 * @param array {Array} Array of Strings
 * @returns {Array|null} Array of Integers or null if a value wasn't parsable
 */
function stringArrayToIntArray(array) {
    if(array === null) {
        return null;
    }
    for(var i = 0; i < array.length; i++) {
        if(array[i] === "undefinded") {
            return null;
        }
        array[i] = parseInt(array[i]);
        if(isNaN(array[i])) {
            return null;
        }
    }
    return array;
}

/**
 * This function gets the input value, validates the time, compares it to the min and max Attributes and then either
 * refills the input or clears it.
 * @param e {event} Event of added EventListener
 */
function checktime(e) {
    var array = getTimeArray(e.target.value, ":");
    if(array !== null && array.length === 2 && isValidTime(array[0], array[1])) {
        if(e.target.getAttribute("min")) {
            var min_array = getDateArray(e.target.getAttribute("min"), ":");
            if(min_array.length === 3 && isValidTime(min_array[0], min_array[1])) {
                if(min_array[1] > array[1] || (min_array[1] === array[1] && min_array[0] > array[0])) {
                    reset(e.target);
                    return;
                }
            }
        }
        if(e.target.getAttribute("max")) {
            var max_array = getDateArray(e.target.getAttribute("max"), ":");
            if(max_array.length === 3 && isValidTime(max_array[0], max_array[1])) {
                if(max_array[1] < array[1] || (max_array[1] === array[1] && max_array[0] < array[0])) {
                    reset(e.target);
                    return;
                }
            }
        }
        e.target.value = ((array[0]<10)?"0":"")+array[0]+":"+((array[1]<10)?"0":"")+array[1];
        console.log("Filled");
        return;
    }
    reset(e.target);
}

/**
 * If used browser is Internet Explorer or Safari, add EventListeners. Other browsers have native proper usages of the
 * date and time types.
 */
// /MSIE \d => IE10 or lower
// Trident.*rv: => IE11
// navigator.userAgent.toLowerCase().indexOf("safari/") > -1 => Safari
if((/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) || (navigator.userAgent.toLowerCase().indexOf("safari") !== -1 && !navigator.userAgent.toLowerCase().indexOf("chrome") > -1) ) {
    var dates = document.querySelectorAll("input[type=date]");
    for (var i = 0; i < dates.length; i++) {
        dates[i].addEventListener("blur", checkdate);
    }
    var times = document.querySelectorAll("input[type=time]");
    for (var j = 0; j < times.length; j++) {
        times[j].addEventListener("blur", checktime);
    }
}

