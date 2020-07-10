(function () {
    var cookieCountryVal = getCookie('wac_user_country_code_c');
    if (cookieCountryVal == "NOT_SET") {
        $("#countryChangeConfirmModal").modal({'keyboard':false,'backdrop': 'static','show':true});
    } else {
        if (getCookie('wac_demo_enable_c') == 'yes') {
            countryDemoBox('show');
        } else {
            countryDemoBox('hide');
        }
    }

    $('span#text-country').text($("#currencyVal option:selected").text());

}).apply(this, [jQuery]);

/**
 * This function used to get the cookie from the browser by cookie name
 * @param {type} cname
 * @returns {String}
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * This function call on the confirmation of the country slection yes or no
 * @param {type} thisObj
 * @returns {Boolean}
 */
function changeCountryCodeConfirm(thisObj) {
    var siteName        =   $(thisObj).data('siteurl');
    var newCountryVal   =   $(thisObj).data('countryval');
    var newVal          =   $(thisObj).data('value');
    
    //show loader
    showFullPageLoader();
    $.ajax({
        url: siteName + "/action/do-change-country.php", // Url to which the request is send
        type: "POST", // Type of request to be send, called as method
        data: { 'type':'CHANGE_COUNTRY_POPUP', 
                'currencyVal':newVal,
                'countryVal':newCountryVal
                }, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        dataType: "json",
        success: function (data)  		 	// A function to be called if request succeeds
        {
            //loader remove
            if (data.r_code == 1) {
                if(data.r_data.is_page_reload){
                    window.location.reload();
                }else{
                    hideFullPageLoader();
                    $("#countryChangeConfirmModal").modal('hide');
                    countryDemoBox('show');
                }
            }
        },
        error:function(){
            hideFullPageLoader();
        }
    });
    return false;
}

/**
 * This function call when country change from dropdown
 * @param {type} thisObj
 * @returns {Boolean}
 */
function changeCountryValue(thisObj){
    var newVal      =   $(thisObj).val();
    var siteName    =   $(thisObj).data('siteurl');
    //show loader
    showFullPageLoader();
    $.ajax({
        url: siteName + "/action/do-change-country.php", // Url to which the request is send
        type: "POST", // Type of request to be send, called as method
        data: { 'type':'CHANGE_COUNTRY_DD', 
                'currencyVal':newVal,
                }, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        dataType: "json",
        success: function (data)  		 	// A function to be called if request succeeds
        {
            if (data.r_code == 1) {
                window.location.reload();
            }else{
                //loader remove
                hideFullPageLoader();
            }
        },
        error:function(){
            hideFullPageLoader();
        }
    });
    return false;
}

/**
 * This function used to set the demo cookie disable when read
 * @param {type} thisObj
 * @returns {Boolean}
 */
function changeDemoCookie(thisObj) {
    var siteName    =   $(thisObj).data('siteurl');
    //show loader
    showFullPageLoader();
    $.ajax({
        url: siteName + "/action/do-change-country.php", // Url to which the request is send
        type: "POST", // Type of request to be send, called as method
        data: {'type':'CHANGE_DEMO_COOKIE'}, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        dataType: "json",
        success: function (data)  		 	// A function to be called if request succeeds
        {
            //loader remove
            hideFullPageLoader();
            if (data.r_code == 1) {
                countryDemoBox('hide');
            }
        },
        error:function(){
            hideFullPageLoader();
        }
    });
    return false;
}

/**
 * function to show or hide the demo box
 * @param {type} visibility
 * @returns {undefined}
 */
function countryDemoBox(visibility){
    if(visibility == 'hide'){
        $("#change-country-demo-box").addClass('hidden');
    }
    if(visibility == 'show'){
        $("#change-country-demo-box").removeClass('hidden');
    }
}

