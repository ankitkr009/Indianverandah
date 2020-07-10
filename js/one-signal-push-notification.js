
//ONE SINGLE WEB PUSH NOTIFICATION FILE

/**
 * This function us used to push event for the iZooto
 * @param {string} eventName
 * @param {json} jsonArrayInformation
 */
function iZootoPushEvent(eventName, jsonArrayInformation) {
//             window._izq.push( ["event",eventName, jsonArrayInformation]); 
    oneSignalPushEvent(eventName, jsonArrayInformation);
}

//one signal push event send tags function
function oneSignalPushEvent(eventName, jsonArrayInformation) {
    var tagsInformation = {};
    var eventsArray = {'pageVisit': 'page visited', 'addCart': 'Add to Cart', 'placeOrder': 'Place Order', 'paymentRes': 'Payment Response'};

    //that always rahega
    tagsInformation[eventName] = 'YES';
    if (eventName === eventsArray.pageVisit) {
        $.each(jsonArrayInformation, function (key, value) {
            tagsInformation[eventName + " " + key] = value;
        });
        OneSignal.push(["sendTags", tagsInformation]);
    }

    if (eventName === eventsArray.addCart) {
        tagsInformation['Place Order'] = '';
        tagsInformation['Payment Response'] = '';
        $.each(jsonArrayInformation, function (key, value) {
            tagsInformation[eventName + " " + key] = value;
        });
        OneSignal.push(["sendTags", tagsInformation]);
    }

    if (eventName === eventsArray.placeOrder) {
        $.each(jsonArrayInformation, function (key, value) {
            tagsInformation[eventName + " " + key] = value;
        });
        OneSignal.push(["sendTags", tagsInformation]);
    }

    if (eventName === eventsArray.paymentRes) {
        tagsInformation['Add to Cart'] = '';
        $.each(jsonArrayInformation, function (key, value) {
            tagsInformation[eventName + " " + key] = value;
        });
        OneSignal.push(["sendTags", tagsInformation]);
    }
}