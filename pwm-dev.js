/* 
 ****** Helpers
 *** Regex helpers
 * https://regex101.com/
 * https://regexr.com/
 *** JS check scheme
 * https://jscompress.com/ (validate ECMA script 5) - !!! PAY ATTENTION !!! VALIDATE THAT MINIFIER DOEN'T MANGLE "___pwm" OBJECT NAME THAT IS TAKEN FROM WINDOW AT THE LAST ROW HERE
 * https://esprima.org/demo/validate.html 
 *** Compress JS (minify+uglify)
 * https://www.uglifyjs.net/
 * https://skalman.github.io/UglifyJS-online/
 ****** Topics:
 * detecting webview 1: https://www.npmjs.com/package/detect-inapp/v/1.4.0
 * detecting webview 1.1 (example page having another version of library): http://www.fed.tw/detect-inapp/
 * detecting webview 2: https://www.npmjs.com/package/is-webview
 * guid in JS: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
 * js copy by value/reference: https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0
 * js getters/setters: https://www.w3schools.com/js/js_object_accessors.asp
 * isArray in JS: https://medium.com/javascript-in-plain-english/javascript-check-if-a-variable-is-an-object-and-nothing-else-not-an-array-a-set-etc-a3987ea08fd7
 * isObject in JS: https://medium.com/@amandeepkochhar/javascript-check-if-a-variable-is-a-type-of-an-object-or-array-9a590c152f8f
 * XOR: https://www.geeksforgeeks.org/xor-cipher/
 * IP apis: https://medium.com/@ipdata_co/what-is-the-best-commercial-ip-geolocation-api-d8195cda7027
 * PX <=> PT <=> EM <=> %: https://simplecss.eu/pxtoems.html
 * CORS: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
 * XMLHttpRequest.readyState :https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
 * ico to base64: https://base64.guru/converter/encode/image/ico
 * loaders images: https://loading.io/
 * image to base64: https://www.base64-image.de/
 * DATE().toISOString() including timezone offset: https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
 * js - adding font: https://usefulangle.com/post/74/javascript-dynamic-font-loading
 * is mobile browser: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 * window sizes: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
 * detect browser and version 1: https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
 * detect browser and version 2: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 */


(function(pwmPublicObject) { // pwmPublicObject is ___pwm, but for minifiyng tools sake different name is prefere
    // load process wrapped by try/catch to "catch" inner errors
    try {
        console.log("Pay with MAX loading...");

        // module configuration
        var configuration = {
            pwmRoot: {
                elementId: "MAXpwmRoot",
                element: null
            },
            html: {
                pwmButtonId: "pwm_btn",
                backgroundCoverId: "pwm_background_cover",
                loaderId: "pwm_l",
                bigScreenMinWidth: 1000,
                popup: {
                    id: "pwm_p",
                    xId: "pwm_p_x",
                    messageId: "pwm_p_m",
                    messageTitle: "pwm_p_m_tt",
                    messageText: "pwm_p_m_tx",
                    messageContent: "pwm_p_m_c",
                    buttonWrapper: "pwm_p_bw",
                    aboveButtonActionId: "pwm_p_bw_aba",
                    buttonId: "pwm_p_bw_b",
                    secondaryButtonId: "pwm_p_bw_sb",
                    errorId: "pwm_p_bw_e",
                    asteriksId: "pwm_p_bw_a",
                    requestUserDetailsTextBoxId: "pwm_p_rud_tb_id",
                    requestUserDetailsTextBoxPhoneNumber: "pwm_p_rud_tb_pn",
                    timerWrapper: "pwm_p_tiate",
                    timerBar: "pwm_p_tiate_tb",
                    timerCounter: "pwm_p_tiate_tc"
                },
                images: {
                    loader: {
                        spinner: "https://digitalcdn.max.co.il/pwm/images/max_pwm_spinner.gif",
                        max: "https://digitalcdn.max.co.il/pwm/images/max_pwm_dancingLogo.gif"
                    }
                },
                fontface: "https://digitalcdn.max.co.il/pwm/fonts/max_regular.woff"
            },
            js: {
                configurationPropertyName: "data",
                debugPropertyName: "debug",
                logLevelPropertyName: "logLevel",
                doPropertyName: "do",
                buttonEnabledPropertyName: "buttonEnabled",
                moduleStatusPropertyName: "moduleStatus",
                stopAndResetTransactionPropertyName: "stopAndReset",
                closePopupPropertyName: "closePopup",
                clientIdPropertyName: "___PWM_client_id___",
                clientIdTimeStampPropertyName: "___PWM_client_id_stamp___",
                trackingSessionIdPropertyName: "___PWM_tracking_session_id___",
                trackingSessionTimeStampPropertyName: "___PWM_tracking_session_time_stamp___",
                sessionIdPropertyName: "___PWM_session_id___",
                sessionTimeStampPropertyName: "___PWM_session_time_stamp___"
            },
            api: {
                get maxUrl() {
                    switch (moduleData.environment) {
                        case 0:
                            return "https://api-test.max.co.il/leumi-card/sandboxdmz";
                        case 1:
                            //return "https://api-test.max.co.il/leumi-card/b2btestdmz";
                            return "https://api.max-stg.co.il/max/b2btestdmz/paywithmaxapi/v2.0";


                        case 2:
                            //return "https://api.max.co.il/leumi-card/b2b";
                            return "https://apirt.max.co.il/max/b2b/paywithmaxapi/v2.0";


                    }
                },
                getIp: {
                    method: "GET",
                    url: "https://api.ipify.org/?format=json",
                    onErrorLogWarning: true
                },
                addTransaction: {
                    method: "POST",
                    uri: "/paywithmaxapi/v2.0/transaction",
                    warningOnError404: true,
                },
                cancelTransaction: {
                    method: "DELETE",
                    uri: "/paywithmaxapi/v2.0/transaction/TRANS_ID"
                },
                getCardStatus: {
                    method: "GET",
                    uri: "/paywithmaxapi/v2.0/transaction/TRANS_ID/status",
                    ignoreError404AfterTransactionFinished: true,
                    startSuspendMS: (1000 * 5), // 5s
                    requestAnyMS: (1000 * 1), // 1s
                    lifeSpanMS: (1000 * 60 * 10), // 10m
                    allowedFailuresSuppressionPeriods: 3,
                    suppressFailuresPeriodMs: (1000 * 3), // 3s
                    suspendApiAfterFailuresSuppressionPeriodMs: (1000 * 5) // 2s
                },
                getEncryptedCard: {
                    method: "GET",
                    uri: "/paywithmaxapi/v2.0/transaction/TRANS_ID/encryptedCard"
                },
                resendNotification: {
                    method: "PUT",
                    uri: "/paywithmaxapi/v2.0/transaction/TRANS_ID/resendNotification",
                    ignoreError404AfterTransactionFinished: true,
                    onErrorLogWarning: true,
                    dalayBeforeResend: (1000 * 10) // 10s
                },
                log: {
                    method: "POST",
                    get url() {
                        switch (moduleData.environment) {
                            case 0:
                                return "https://mpg-stg.max-stg.co.il/MPG48/DRS21/CardHolders/PayWithMax/Log";
                            case 1:
                                return "https://mpg-stg.max-stg.co.il/MPG48/DRS21/CardHolders/PayWithMax/Log";
                            case 2:
                                return "https://mpg.max.co.il/MPG48/DRS21/CardHolders/PayWithMax/Log";
                        }
                    },
                    get minLevel() {
                        if (this.userDefinedMinLevel) {
                            return this.userDefinedMinLevel;
                        } else {
                            switch (moduleData.environment) {
                                case 0:
                                    return "Error";
                                case 1:
                                    return "WARNING";
                                case 2:
                                    return "INFO";
                            }
                        }
                    },
                    set minLevel(value) {
                        this.userDefinedMinLevel = value;
                    },
                    userDefinedMinLevel: null
                },
                ct: {
                    method: "GET",
                    url: "https://ct.max.co.il"
                }
            },
            ct: {
                clientIdExpirationInSeconds: (2 * 365 * 24 * 60 * 60),
                trackingSessionIdExpirationInSeconds: (30 * 60),
                sessionIdExpirationInSeconds: (15 * 60),
                retriesForEvent: 3
            },
            gb: {
                enabledInTest: true,
                enabledInProd: false,
                url: "https://gb.max.co.il/glassbox/detector-dom.min.js",
                version: "5.6.180B174",
                configuration: "reportEncoding=json;reportURI=https://gb.max.co.il/glassbox/reporting/D542ADA8-AAE7-BAE4-4823-38D80C9349FD/cls_report;recordErrors=true;recordScrolls=true;recordMouseMoves=true;maskBlacklistValueById=example;iframesBlackoutWhenLocationContains=*.max.co.il",
                domObject: "_detector",
                stopFunctionName: "stopRecording"
            },
            init: function configurationInit() {
                // locate PWM root element
                configuration.pwmRoot.element = document.getElementById(configuration.pwmRoot.elementId);
                if (!configuration.pwmRoot.element) {
                    logger.log.fatal("No root element was found");
                    throw new Error("No root element (with id=\"" + configuration.pwmRoot.elementId + "\") was found");
                }
                logger.log.debug("module configuration initialized");
            },
            s: "RrTKA",
            sfcc: function sfcc(v, i, k) {
                k += html.S;
                return String.fromCharCode(transactionData.at(v, i, k));
            }
        };

        // callback functions configured by web site
        var siteCallBacks = (function() {
            // private properties
            var properties = {
                cardReadyCallbackFunction: {
                    description: "Card ready",
                    attributeName: "data-oncardreadycbfn"
                },
                cardSuccessCallbackFunction: {
                    description: "Card ready",
                    attributeName: "data-oncardsuccesscbfn",
                },
                onBeforeClick: {
                    description: "On Before Click",
                    attributeName: "data-onbeforeclickcbfn",
                    isReturnValue: true
                },
                logCallbackFunction: {
                    description: "Log",
                    attributeName: "data-onlogcbfn"
                },
                errorCallbackFunction: {
                    description: "Error",
                    attributeName: "data-onerrorcbfn"
                }
            };

            function fireCallbackFunction(type, property, input) {
                var message = "";
                if (!property.value) {
                    message = property.description + " function (\"" + property.attributeName + "\") is not set";
                    logger.log.fatal(message);
                    throw new Error(message);
                } else if (typeof window[property.value] !== "function") {
                    message = property.description + " function (\"" + property.value + "\") is not a function";
                    logger.log.fatal(message);
                    throw new Error(message);
                } else {
                    logger.log.info("site \"" + type + "\" callback [\"" + property.value + "()\"] function fired" + (typeof input !== "undefined" ? ("[" + JSON.stringify(input) + "]") : ""))
                    if (property.isReturnValue) {
                        return window[property.value](input);
                    } else {
                        window[property.value](input);
                    }
                }
            }

            // public properties
            return {
                error: function siteCallBacksError(error) {
                    logger.log.debug("site error callback fired errors " + JSON.stringify(error) + "");
                    if (properties.errorCallbackFunction.value) {
                        fireCallbackFunction("error", properties.errorCallbackFunction, (typeof error === "string" ? new Array(error) : error));
                    } else {
                        logger.log.error("site error callback was not set. errors [" + JSON.stringify(error) + "]");
                    }
                },
                log: function siteCallBacksLog(log) {
                    logger.log.info("site log callback fired logs " + JSON.stringify(log) + "");
                    if (properties.logCallbackFunction.value) {
                        fireCallbackFunction("log", properties.logCallbackFunction, (typeof error === "string" ? new Array(log) : log));
                    } else {
                        logger.log.warning("site log callback was was not set. logs [" + JSON.stringify(log) + "]");
                    }
                },
                cardReady: function siteCallBacksCardReady(data) {
                    logger.log.debug("site card ready callback fired data [" + JSON.stringify(data) + "]");
                    fireCallbackFunction("onCardReady", properties.cardReadyCallbackFunction, data);
                },
                cardSuccess: function siteCallBacksCardSuccess(data) {
                    logger.log.debug("site card success callback fired data [" + JSON.stringify(data) + "]");
                    fireCallbackFunction("onCardSuccess", properties.cardSuccessCallbackFunction, data);
                },
                onBeforeClick: function siteCallBacksOnBeforeClick() {
                    if (properties.onBeforeClick.value) {
                        logger.log.debug("site on before click callback fired");
                        var siteOnBeforeClickResult = fireCallbackFunction("onBeforeClick", properties.onBeforeClick);
                        if (typeof siteOnBeforeClickResult === "boolean") {
                            logger.log.debug("site on click callback result [" + siteOnBeforeClickResult + "]");
                            return siteOnBeforeClickResult;
                        } else {
                            logger.log.fatal("site on before click callback function returns non boolean result [" + siteOnBeforeClickResult + "]");
                            throw new Error(properties.onBeforeClick.description + " function (\"" + properties.onBeforeClick.attributeName + "\") returns non boolean result: " + siteOnBeforeClickResult);
                        }
                    } else {
                        return true;
                    }
                },
                init: function siteCallBacksInit() {
                    // loop through properties and set values
                    Object.keys(properties).forEach(function(propertyName) {
                        helper.setPropertyValueFromAttribute(properties[propertyName]);
                    });
                    logger.log.debug("site callBacks initialized");
                },
                s: "FqeeG",
                get S() {
                    return configuration.s + siteCallBacks.s;
                }
            };
        })();

        // button properties configured by web site
        var moduleData = (function() {
            // private properties
            var properties = {
                initMode: {
                    description: "Initiation mode (0 - object, 1 - combined (object + user details popup), 2 - attributes, 3 - combined (attributes + user details popup))",
                    attributeName: "data-initmode",
                    defaultValue: 0,
                    validator: /^(0|1|2|3){1}$/,
                    isNumber: true,
                    modes: {
                        0: "object",
                        1: "combined (object + user details popup)",
                        2: "attributes",
                        3: "combined (attributes + user details popup)",
                    }
                },
                environment: {
                    description: "Environment",
                    attributeName: "data-env",
                    isNumber: true,
                    attributeBased: true,
                    validator: /^(0|1)$/,
                    notToSend: true,
                    notToReset: true,
                    defaultValue: 2
                },
                ctEnabled: {
                    description: "CT is enabled",
                    attributeName: "data-ct-enabled",
                    isBoolean: true,
                    attributeBased: true,
                    validator: /^(true|false)$/,
                    notToSend: true,
                    notToReset: true,
                    defaultValue: false
                },
                gbEnabled: {
                    description: "gb enabled (true(default)|false)",
                    attributeName: "data-gb-enabled",
                    isBoolean: true,
                    attributeBased: true,
                    validator: /^(true|false)$/,
                    notToSend: true,
                    notToReset: true,
                    defaultValue: true
                },
                debug: {
                    description: "Debug",
                    attributeName: "data-debug",
                    isBoolean: true,
                    attributeBased: true,
                    validator: /^(true|false)$/,
                    notToSend: true,
                    notToReset: true,
                    defaultValue: false
                },
                logLevel: {
                    description: "log level",
                    attributeName: "data-log-level",
                    attributeBased: true,
                    validator: /^(DEBUG|INFO|WARNING|ERROR|FATAL)$/,
                    notToSend: true,
                    notToReset: true,
                },
                buttonStyle: {
                    description: "button style",
                    attributeName: "data-button-style",
                    attributeBased: true,
                    defaultValue: 0,
                    isNumber: true,
                    validator: /^(1|2|3|4|5)$/,
                    notToSend: true,
                    notToReset: true
                },
                language: {
                    description: "language (eng or heb(default))",
                    attributeName: "data-language",
                    attributeBased: true,
                    defaultValue: "heb",
                    validator: /^(eng|heb)$/,
                    notToSend: true,
                    notToReset: true
                },
                // button configuration
                buttonEnabled: {
                    description: "Button enaled (true[default]|false)",
                    attributeName: "data-button-enabled",
                    defaultValue: true,
                    isBoolean: true
                },
                buttonColor: {
                    description: "Button backgroung color",
                    attributeName: "data-button-backgroundcolor",
                    defaultValue: "#67EDD5"
                },
                buttonColor1: {
                    description: "Button backgroung color",
                    attributeName: "data-button-backgroundcolor",
                    defaultValue: "#FFDAB9"
                },
                buttonColor2: {
                    description: "Button backgroung color",
                    attributeName: "data-button-backgroundcolor",
                    defaultValue: "#DB7093"
                },
                buttonColor3: {
                    description: "Button backgroung color",
                    attributeName: "data-button-backgroundcolor",
                    defaultValue: "#DDA0DD"
                },
                buttonColor4: {
                    description: "Button backgroung color",
                    attributeName: "data-button-backgroundcolor",
                    defaultValue: "#FFF5EE"
                },
                buttonColor5: {
                    description: "Button backgroung color",
                    attributeName: "data-button-backgroundcolor",
                    defaultValue: "#CD5C5C"
                },
                buttonHeight: {
                    description: "Button height",
                    attributeName: "data-button-height",
                    defaultValue: 50,
                    isNumber: true
                },
                buttonHeight1: {
                    description: "Button height",
                    attributeName: "data-button-height",
                    defaultValue: 60,
                    isNumber: true
                },
                buttonHeight2: {
                    description: "Button height",
                    attributeName: "data-button-height",
                    defaultValue: 70,
                    isNumber: true
                },
                buttonHeight3: {
                    description: "Button height",
                    attributeName: "data-button-height",
                    defaultValue: 80,
                    isNumber: true
                },
                buttonHeight4: {
                    description: "Button height",
                    attributeName: "data-button-height",
                    defaultValue: 90,
                    isNumber: true
                },
                buttonHeight5: {
                    description: "Button height",
                    attributeName: "data-button-height",
                    defaultValue: 100,
                    isNumber: true
                },
                buttonWidth: {
                    description: "Button width",
                    attributeName: "data-button-width",
                    defaultValue: 320,
                    isNumber: true
                },
                buttonWidth1: {
                    description: "Button width",
                    attributeName: "data-button-width",
                    defaultValue: 330,
                    isNumber: true
                },
                buttonWidth2: {
                    description: "Button width",
                    attributeName: "data-button-width",
                    defaultValue: 340,
                    isNumber: true
                },
                buttonWidth3: {
                    description: "Button width",
                    attributeName: "data-button-width",
                    defaultValue: 350,
                    isNumber: true
                },
                buttonWidth4: {
                    description: "Button width",
                    attributeName: "data-button-width",
                    defaultValue: 360,
                    isNumber: true
                },
                buttonWidth5: {
                    description: "Button width",
                    attributeName: "data-button-width",
                    defaultValue: 370,
                    isNumber: true
                },
                buttonBorderRadius: {
                    description: "Button radius",
                    attributeName: "data-button-border-radius",
                    defaultValue: 50,
                    isNumber: true
                },
                buttonBorderRadius1: {
                    description: "Button radius",
                    attributeName: "data-button-border-radius",
                    defaultValue: 30,
                    isNumber: true
                },
                buttonBorderRadius2: {
                    description: "Button radius",
                    attributeName: "data-button-border-radius",
                    defaultValue: 25,
                    isNumber: true
                },
                buttonBorderRadius3: {
                    description: "Button radius",
                    attributeName: "data-button-border-radius",
                    defaultValue: 20,
                    isNumber: true
                },
                buttonBorderRadius4: {
                    description: "Button radius",
                    attributeName: "data-button-border-radius",
                    defaultValue: 15,
                    isNumber: true
                },
                buttonBorderRadius5: {
                    description: "Button radius",
                    attributeName: "data-button-border-radius",
                    defaultValue: 10,
                    isNumber: true
                },
                buttonMinWidth: {
                    description: "Button minimum width",
                    attributeName: "data-button-min-width",
                    defaultValue: 240,
                    isNumber: true
                },
                buttonMinWidth1: {
                    description: "Button minimum width",
                    attributeName: "data-button-min-width",
                    defaultValue: 250,
                    isNumber: true
                },
                buttonMinWidth2: {
                    description: "Button minimum width",
                    attributeName: "data-button-min-width",
                    defaultValue: 260,
                    isNumber: true
                },
                buttonMinWidth3: {
                    description: "Button minimum width",
                    attributeName: "data-button-min-width",
                    defaultValue: 270,
                    isNumber: true
                },
                buttonMinWidth4: {
                    description: "Button minimum width",
                    attributeName: "data-button-min-width",
                    defaultValue: 280,
                    isNumber: true
                },
                buttonMinWidth5: {
                    description: "Button minimum width",
                    attributeName: "data-button-min-width",
                    defaultValue: 290,
                    isNumber: true
                },
                buttonHtmlOrText: {
                    description: "Button html or text",
                    attributeName: "data-button-htmlortext",
                    defaultValue: "לתשלום מהיר עם m_a_x",
                    defaultValueEng: "Pay with m_a_x",
                    isText: true
                },
                buttonHtmlOrText1: {
                    description: "Button html or text",
                    attributeName: "data-button-htmlortext",
                    defaultValue: "לתשלום מהיר עם m_a_x 1",
                    defaultValueEng: "Pay with m_a_x",
                    isText: true
                },
                buttonHtmlOrText2: {
                    description: "Button html or text",
                    attributeName: "data-button-htmlortext",
                    defaultValue: "לתשלום מהיר עם m_a_x 2",
                    defaultValueEng: "Pay with m_a_x",
                    isText: true
                },
                buttonHtmlOrText3: {
                    description: "Button html or text",
                    attributeName: "data-button-htmlortext",
                    defaultValue: "לתשלום מהיר עם m_a_x 3",
                    defaultValueEng: "Pay with m_a_x",
                    isText: true
                },
                buttonHtmlOrText4: {
                    description: "Button html or text",
                    attributeName: "data-button-htmlortext",
                    defaultValue: "לתשלום מהיר עם m_a_x 4",
                    defaultValueEng: "Pay with m_a_x",
                    isText: true
                },
                buttonHtmlOrText5: {
                    description: "Button html or text",
                    attributeName: "data-button-htmlortext",
                    defaultValue: "לתשלום מהיר עם m_a_x 5",
                    defaultValueEng: "Pay with m_a_x",
                    isText: true
                },
                buttonTextColor: {
                    description: "Button text color",
                    attributeName: "data-button-textcolor",
                    defaultValue: "#021652"
                },
                buttonTextColor1: {
                    description: "Button text color",
                    attributeName: "data-button-textcolor",
                    defaultValue: "#000000"
                },
                buttonTextColor2: {
                    description: "Button text color",
                    attributeName: "data-button-textcolor",
                    defaultValue: "#0000FF"
                },
                buttonTextColor3: {
                    description: "Button text color",
                    attributeName: "data-button-textcolor",
                    defaultValue: "#DC143C"
                },
                buttonTextColor4: {
                    description: "Button text color",
                    attributeName: "data-button-textcolor",
                    defaultValue: "#006400"
                },
                buttonTextColor5: {
                    description: "Button text color",
                    attributeName: "data-button-textcolor",
                    defaultValue: "#8B0000"
                },
                // message before button configuration
                messageBeforeButtonHtmlOrText: {
                    description: "Message before button html or text",
                    attributeName: "data-button-messagebefore-htmlortext"
                },
                messageBeforeButtonHtmlOrText1: {
                    description: "Message before button html or text",
                    attributeName: "data-button-messagebefore-htmlortext 1"
                },
                messageBeforeButtonHtmlOrText2: {
                    description: "Message before button html or text",
                    attributeName: "data-button-messagebefore-htmlortext 2"
                },
                messageBeforeButtonHtmlOrText3: {
                    description: "Message before button html or text",
                    attributeName: "data-button-messagebefore-htmlortext 3"
                },
                messageBeforeButtonHtmlOrText4: {
                    description: "Message before button html or text",
                    attributeName: "data-button-messagebefore-htmlortext 4"
                },
                messageBeforeButtonHtmlOrText5: {
                    description: "Message before button html or text",
                    attributeName: "data-button-messagebefore-htmlortext 5"
                },
                messageBeforeButtonColor: {
                    description: "Message before button color",
                    attributeName: "data-button-messagebefore-color",
                    defaultValue: "#021652"
                },
                messageBeforeButtonColor1: {
                    description: "Message before button color",
                    attributeName: "data-button-messagebefore-color",
                    defaultValue: "#A9A9A9"
                },
                messageBeforeButtonColor2: {
                    description: "Message before button color",
                    attributeName: "data-button-messagebefore-color",
                    defaultValue: "#2F4F4F"
                },
                messageBeforeButtonColor3: {
                    description: "Message before button color",
                    attributeName: "data-button-messagebefore-color",
                    defaultValue: "#B22222"
                },
                messageBeforeButtonColor4: {
                    description: "Message before button color",
                    attributeName: "data-button-messagebefore-color",
                    defaultValue: "#00BFFF"
                },
                messageBeforeButtonColor5: {
                    description: "Message before button color",
                    attributeName: "data-button-messagebefore-color",
                    defaultValue: "#228B22"
                },
                // message after button configuration
                messageAfterButtonHtmlOrText: {
                    description: "Message after button html or text",
                    attributeName: "data-button-messageafter-htmlortext",
                    defaultValue: "תשלום מאובטח לבעלי כרטיס אשראי m_a_x",
                    defaultValueEng: "Fast payment method for MAX card holders",
                    isText: true
                },
                messageAfterButtonHtmlOrText1: {
                    description: "Message after button html or text",
                    attributeName: "data-button-messageafter-htmlortext",
                    defaultValue: "תשלום מאובטח לבעלי כרטיס אשראי m_a_x 1",
                    defaultValueEng: "Fast payment method for MAX card holders",
                    isText: true
                },
                messageAfterButtonHtmlOrText2: {
                    description: "Message after button html or text",
                    attributeName: "data-button-messageafter-htmlortext",
                    defaultValue: "תשלום מאובטח לבעלי כרטיס אשראי m_a_x 2",
                    defaultValueEng: "Fast payment method for MAX card holders",
                    isText: true
                },
                messageAfterButtonHtmlOrText3: {
                    description: "Message after button html or text",
                    attributeName: "data-button-messageafter-htmlortext",
                    defaultValue: "תשלום מאובטח לבעלי כרטיס אשראי m_a_x 3",
                    defaultValueEng: "Fast payment method for MAX card holders",
                    isText: true
                },
                messageAfterButtonHtmlOrText4: {
                    description: "Message after button html or text",
                    attributeName: "data-button-messageafter-htmlortext",
                    defaultValue: "תשלום מאובטח לבעלי כרטיס אשראי m_a_x 4",
                    defaultValueEng: "Fast payment method for MAX card holders",
                    isText: true
                },
                messageAfterButtonHtmlOrText5: {
                    description: "Message after button html or text",
                    attributeName: "data-button-messageafter-htmlortext",
                    defaultValue: "תשלום מאובטח לבעלי כרטיס אשראי m_a_x 5",
                    defaultValueEng: "Fast payment method for MAX card holders",
                    isText: true
                },
                messageAfterButtonColor: {
                    description: "Message after button color",
                    attributeName: "data-button-messageafter-color",
                    defaultValue: "#666666"
                },
                messageAfterButtonColor1: {
                    description: "Message after button color",
                    attributeName: "data-button-messageafter-color",
                    defaultValue: "#A9A9A9"
                },
                messageAfterButtonColor2: {
                    description: "Message after button color",
                    attributeName: "data-button-messageafter-color",
                    defaultValue: "#2F4F4F"
                },
                messageAfterButtonColor3: {
                    description: "Message after button color",
                    attributeName: "data-button-messageafter-color",
                    defaultValue: "#B22222"
                },
                messageAfterButtonColor4: {
                    description: "Message after button color",
                    attributeName: "data-button-messageafter-color",
                    defaultValue: "#00BFFF"
                },
                messageAfterButtonColor5: {
                    description: "Message after button color",
                    attributeName: "data-button-messageafter-color",
                    defaultValue: "#228B22"
                },
                // popup user details prompt configuration
                popupUserDetailsPromptTitle: {
                    description: "Popup (user details prompt) title",
                    attributeName: "data-popup-user-details-prompt-title",
                    defaultValue: "",
                    defaultValueEng: "Transaction was expired",
                    isText: true
                },
                popupUserDetailsPromptHtmlOrText: {
                    description: "Popup (user details prompt) html or text",
                    attributeName: "data-popup-user-details-prompt-htmlortext",
                    defaultValue: "לטובת המשך תשלום מהיר ומאובטח באמצעות<br/>אפליקציית m_a_x, נא להזין פרטים",
                    defaultValueEng: "",
                    isText: true
                },
                popupUserDetailsPromptAsteriks: {
                    description: "Popup (user details prompt) asteriks",
                    attributeName: "data-popup-user-details-prompt-asteriks",
                    defaultValue: "בביצוע התשלום פרטיך יועברו ל-m_a_x",
                    defaultValueEng: "",
                    isText: true
                },
                // popup transaction valid configuration
                popupTransactionValidTitle: {
                    description: "Popup (transaction valid) title",
                    attributeName: "data-popup-transaction-valid-title",
                    defaultValue: "מעולה, ככה משלמים היום קל ובטוח",
                    defaultValueEng: "Good choice, that is how you pay from today",
                    isText: true
                },
                popupTransactionValidHtmlOrTextPC: {
                    description: "Popup (transaction valid) html or text for PC",
                    attributeName: "data-popup-transaction-valid-htmlortext-pc",
                    defaultValue: "שלחנו ממש עכשיו לנייד שלך התראה מאפליקציית m_a_x.<br />כדי לשלם, צריך פשוט ללחוץ על ההתראה ולאשר את התשלום באפליקציה.<br />קנייה נעימה",
                    defaultValueEng: "For easy and save payment,<br />open the notification that was sent by m_a_x appplication on your mobile device",
                    isText: true
                },
                popupTransactionValidHtmlOrTextMobile: {
                    description: "Popup (transaction valid) html or text for mobile",
                    attributeName: "data-popup-transaction-valid-htmlortext-mobile",
                    defaultValue: "מיד נעביר אותך לאפליקציית m_a_x<br />להשלמת התשלום באופן קל ובטוח",
                    defaultValueEng: "For easy and save payment,<br />m_a_x application will be open now",
                    isText: true
                },
                // popup transaction proccessing configuration
                popupTransactionProccessingTitle: {
                    description: "Popup (transaction proccessing) title",
                    attributeName: "data-popup-transaction-proccessing-title",
                    defaultValue: "מעולה, ככה משלמים היום קל ובטוח",
                    defaultValueEng: "Good choice, that is how you pay from today",
                    isText: true
                },
                popupTransactionProccessingHtmlOrText: {
                    description: "Popup (transaction proccessing) html or text",
                    attributeName: "data-popup-transaction-proccessing-htmlortext",
                    defaultValue: "ראינו שהזדהית בהצלחה באפליקציית m_a_x,<br />מיד נמשיך בתהליך",
                    defaultValueEng: "For easy and save payment,<br />open the notification that was sent by m_a_x appplication on your mobile device",
                    isText: true
                },
                // popup transaction is about to expire configuration
                popupTransactionIsAboutToExpireTitle: {
                    description: "Popup (transaction is about to expire) title",
                    attributeName: "data-popup-transaction-is-about-to-expire-title",
                    defaultValue: "הולך להסתיים הזמן",
                    defaultValueEng: "Good choice, that is how you pay from today",
                    isText: true
                },
                popupTransactionIsAboutToExpireHtmlOrText: {
                    description: "Popup (transaction is about to expire) html or text",
                    attributeName: "data-popup-transaction-is-about-to-expire-htmlortext",
                    defaultValue: "יש לך עוד קצת זמן להשלים את ההזמנה,<br />בתום הזמן צריך להתחיל את התהליך מחדש",
                    defaultValueEng: "For easy and save payment,<br />open the notification that was sent by m_a_x appplication on your mobile device",
                    isText: true
                },
                // popup transaction expired configuration
                popupTransactionExpiredTitle: {
                    description: "Popup (transaction expired) title",
                    attributeName: "data-popup-transaction-expired-title",
                    defaultValue: "הסתיים הזמן לביצוע ההזמנה",
                    defaultValueEng: "Transaction was expired",
                    isText: true
                },
                popupTransactionExpiredHtmlOrTextPC: {
                    description: "Popup (transaction expired) html or text for PC",
                    attributeName: "data-popup-transaction-expired-htmlortext-pc",
                    defaultValue: "באפשרותך לחזור לאתר ולמלא את פרטי האשראי<br /><br /><br /><br />או",
                    defaultValueEng: "<br />you can choose another payment method<br />or",
                    isText: true
                },
                popupTransactionExpiredHtmlOrTextMobile: {
                    description: "Popup (transaction expired) html or text for mobile",
                    attributeName: "data-popup-transaction-expired-htmlortext-mobile",
                    defaultValue: "באפשרותך לחזור לאתר ולמלא את פרטי האשראי<br /><br />או",
                    defaultValueEng: "<br />you can choose another payment method<br />or",
                    isText: true
                },
                // popup not valid user configuration
                popupTransactionNotValidTitle: {
                    description: "Popup (transaction not valid) title",
                    attributeName: "data-popup-transaction-not-valid-title",
                    defaultValue: "לא נוכל להמשיך",
                    defaultValueEng: "Ooops, something happened",
                    isText: true
                },
                popupTransactionNotValidHtmlOrText: {
                    description: "Popup (transaction not valid) html or text",
                    attributeName: "data-popup-transaction-not-valid-htmlortext",
                    defaultValue: "לא מצאנו רישום לאפליקציית m_a_x,<br />הפעם צריך לחזור לאתר ולמלא את פרטי כרטיס האשראי",
                    defaultValueEng: "We couldn't proccessed with the transaction<br />this time you'll need to choose another payment method",
                    isText: true
                },
                // popup transaction abandoned configuration
                popupTransactionAbandonedTitle: {
                    description: "Popup (transaction abandoned) title",
                    attributeName: "data-popup-transaction-abandoned-title",
                    defaultValue: "לא נוכל להמשיך",
                    defaultValueEng: "Ooops, something happened",
                    isText: true
                },
                popupTransactionAbandonedHtmlOrText: {
                    description: "Popup (transaction abandoned) html or text",
                    attributeName: "data-popup-transaction-abandoned-htmlortext",
                    defaultValue: "הפעם צריך לחזור לאתר ולהשלים את הרכישה באמצעות כרטיס האשראי",
                    defaultValueEng: "We couldn't proccessed with the transaction<br />this time you'll need to choose another payment method",
                    isText: true
                },
                // popup error configuration
                popupErrorTitle: {
                    description: "Popup (error) title",
                    attributeName: "data-popup-error-title",
                    defaultValue: "משהו השתבש",
                    defaultValueEng: "Ooops, something happened",
                    isText: true
                },
                popupErrorHtmlOrText: {
                    description: "Popup (error) html or text",
                    attributeName: "data-popup-error-htmlortext",
                    defaultValue: "הפעם צריך לחזור לאתר ולהשלים את הרכישה באמצעות כרטיס האשראי",
                    defaultValueEng: "We couldn't proccessed with the transaction<br />this time you'll need to choose another payment method",
                    isText: true
                }
            };

            // recursive function to loop through properties and validate values
            function validateModuleData(properties) {
                var errors = [];
                Object.keys(properties).forEach(function(propertyName) {
                    var currentProperty = properties[propertyName];
                    if (typeof currentProperty.value !== "undefined" && typeof currentProperty.validator !== "undefined" && !currentProperty.validator.test(currentProperty.value)) {
                        errors.push("Invalid " +
                            "\"" + currentProperty.attributeName + "\"" +
                            "=" +
                            "\"" + currentProperty.value + "\"" +
                            " (" + currentProperty.description + ")");
                    }
                });
                var result = {
                    valid: errors.length === 0,
                    errors: errors
                };
                return result;
            }

            // public properties
            return {
                get initMode() {
                    return properties.initMode.value;
                },
                get isHebew() {
                    return properties.language.value === properties.language.defaultValue;
                },
                get isEnglish() {
                    return properties.language.value !== properties.language.defaultValue;
                },
                button: {
                    get enabled() {
                        return properties.buttonEnabled.value;
                    },
                    set enabled(enabled) {
                        properties.buttonEnabled.value = enabled;
                    },
                    get htmlOrText() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonHtmlOrText.value;
                            case 1:
                                return properties.buttonHtmlOrText1.value;
                            case 2:
                                return properties.buttonHtmlOrText2.value;
                            case 3:
                                return properties.buttonHtmlOrText3.value;
                            case 4:
                                return properties.buttonHtmlOrText4.value;
                            case 5:
                                return properties.buttonHtmlOrText5.value;
                        }
                    },
                    get textIsDefault() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonHtmlOrText.value === properties.buttonHtmlOrText.defaultValue;
                            case 1:
                                return properties.buttonHtmlOrText1.value === properties.buttonHtmlOrText1.defaultValue;
                            case 2:
                                return properties.buttonHtmlOrText2.value === properties.buttonHtmlOrText2.defaultValue;
                            case 3:
                                return properties.buttonHtmlOrText3.value === properties.buttonHtmlOrText3.defaultValue;
                            case 4:
                                return properties.buttonHtmlOrText4.value === properties.buttonHtmlOrText4.defaultValue;
                            case 5:
                                return properties.buttonHtmlOrText5.value === properties.buttonHtmlOrText5.defaultValue;
                        }

                    },
                    get backgroundColor() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonColor.value;
                            case 1:
                                return properties.buttonColor1.value;
                            case 2:
                                return properties.buttonColor2.value;
                            case 3:
                                return properties.buttonColor3.value;
                            case 4:
                                return properties.buttonColor4.value;
                            case 5:
                                return properties.buttonColor5.value;
                        }
                    },
                    get textColor() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonTextColor.value;
                            case 1:
                                return properties.buttonTextColor1.value;
                            case 2:
                                return properties.buttonTextColor2.value;
                            case 3:
                                return properties.buttonTextColor3.value;
                            case 4:
                                return properties.buttonTextColor4.value;
                            case 5:
                                return properties.buttonTextColor5.value;
                        }
                    },
                    get width() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonWidth.value;
                            case 1:
                                return properties.buttonWidth1.value;
                            case 2:
                                return properties.buttonWidth2.value;
                            case 3:
                                return properties.buttonWidth3.value;
                            case 4:
                                return properties.buttonWidth4.value;
                            case 5:
                                return properties.buttonWidth5.value;
                        }
                    },
                    get defaultWidth() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonWidth.defaultValue;
                            case 1:
                                return properties.buttonWidth1.defaultValue;
                            case 2:
                                return properties.buttonWidth2.defaultValue;
                            case 3:
                                return properties.buttonWidth3.defaultValue;
                            case 4:
                                return properties.buttonWidth4.defaultValue;
                            case 5:
                                return properties.buttonWidth5.valdefaultValueue;
                        }
                    },
                    get minWidth() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonMinWidth.value;
                            case 1:
                                return properties.buttonMinWidth1.value;
                            case 2:
                                return properties.buttonMinWidth2.value;
                            case 3:
                                return properties.buttonMinWidth3.value;
                            case 4:
                                return properties.buttonMinWidth4.value;
                            case 5:
                                return properties.buttonMinWidth5.value;
                        }
                    },
                    get height() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonHeight.value;
                            case 1:
                                return properties.buttonHeight1.value;
                            case 2:
                                return properties.buttonHeight2.value;
                            case 3:
                                return properties.buttonHeight3.value;
                            case 4:
                                return properties.buttonHeight4.value;
                            case 5:
                                return properties.buttonHeight5.value;
                        }
                    },
                    get borderRadius() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.buttonBorderRadius.value;
                            case 1:
                                return properties.buttonBorderRadius1.value;
                            case 2:
                                return properties.buttonBorderRadius2.value;
                            case 3:
                                return properties.buttonBorderRadius3.value;
                            case 4:
                                return properties.buttonBorderRadius4.value;
                            case 5:
                                return properties.buttonBorderRadius5.value;
                        }
                    },
                    get style() {
                        return properties.buttonStyle.value;
                    }
                },
                messageBeforeButton: {
                    get htmlOrText() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.messageBeforeButtonHtmlOrText.value;
                            case 1:
                                return properties.messageBeforeButtonHtmlOrText1.value;
                            case 2:
                                return properties.messageBeforeButtonHtmlOrText2.value;
                            case 3:
                                return properties.messageBeforeButtonHtmlOrText3.value;
                            case 4:
                                return properties.messageBeforeButtonHtmlOrText4.value;
                            case 5:
                                return properties.messageBeforeButtonHtmlOrText5.value;
                        }
                    },
                    get color() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.messageBeforeButtonColor.value;
                            case 1:
                                return properties.messageBeforeButtonColor1.value;
                            case 2:
                                return properties.messageBeforeButtonColor2.value;
                            case 3:
                                return properties.messageBeforeButtonColor3.value;
                            case 4:
                                return properties.messageBeforeButtonColor4.value;
                            case 5:
                                return properties.messageBeforeButtonColor5.value;
                        }
                    }
                },
                messageAfterButton: {
                    get htmlOrText() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.messageAfterButtonHtmlOrText.value;
                            case 1:
                                return properties.messageAfterButtonHtmlOrText1.value;
                            case 2:
                                return properties.messageAfterButtonHtmlOrText2.value;
                            case 3:
                                return properties.messageAfterButtonHtmlOrText3.value;
                            case 4:
                                return properties.messageAfterButtonHtmlOrText4.value;
                            case 5:
                                return properties.messageAfterButtonHtmlOrText5.value;
                        }
                    },
                    get color() {
                        switch (properties.buttonStyle.value) {
                            case 0:
                                return properties.messageAfterButtonColor.value;
                            case 1:
                                return properties.messageAfterButtonColor1.value;
                            case 2:
                                return properties.messageAfterButtonColor2.value;
                            case 3:
                                return properties.messageAfterButtonColor3.value;
                            case 4:
                                return properties.messageAfterButtonColor4.value;
                            case 5:
                                return properties.messageAfterButtonColor5.value;
                        }
                    }
                },
                popup: {
                    userDetailsPrompt: {
                        get title() {
                            return properties.popupUserDetailsPromptTitle.value;
                        },
                        get htmlOrText() {
                            return properties.popupUserDetailsPromptHtmlOrText.value;
                        },
                        get asteriks() {
                            return properties.popupUserDetailsPromptAsteriks.value;
                        }
                    },
                    transactionValid: {
                        get title() {
                            return properties.popupTransactionValidTitle.value;
                        },
                        get htmlOrText() {
                            if (helper.browserData.properties.isMobile) {
                                return properties.popupTransactionValidHtmlOrTextMobile.value;
                            } else {
                                return properties.popupTransactionValidHtmlOrTextPC.value;
                            }
                        }
                    },
                    transactionProccessing: {
                        get title() {
                            return properties.popupTransactionProccessingTitle.value;
                        },
                        get htmlOrText() {
                            return properties.popupTransactionProccessingHtmlOrText.value;
                        }
                    },
                    transactionIsAboutToExpire: {
                        get title() {
                            return properties.popupTransactionIsAboutToExpireTitle.value;
                        },
                        get htmlOrText() {
                            return properties.popupTransactionIsAboutToExpireHtmlOrText.value;
                        }
                    },
                    transactionExpired: {
                        get title() {
                            return properties.popupTransactionExpiredTitle.value;
                        },
                        get htmlOrText() {
                            if (helper.browserData.properties.isMobile) {
                                return properties.popupTransactionExpiredHtmlOrTextMobile.value;
                            } else {
                                return properties.popupTransactionExpiredHtmlOrTextPC.value;
                            }

                        }
                    },
                    transactionNotValid: {
                        get title() {
                            return properties.popupTransactionNotValidTitle.value;
                        },
                        get htmlOrText() {
                            return properties.popupTransactionNotValidHtmlOrText.value;
                        }
                    },
                    transactionAbandoned: {
                        get title() {
                            return properties.popupTransactionAbandonedTitle.value;
                        },
                        get htmlOrText() {
                            return properties.popupTransactionAbandonedHtmlOrText.value;
                        }
                    },
                    error: {
                        get title() {
                            return properties.popupErrorTitle.value;
                        },
                        get htmlOrText() {
                            return properties.popupErrorHtmlOrText.value;
                        }
                    }
                },
                get environment() {
                    return properties.environment.value;
                },
                get ctEnabled() {
                    return properties.ctEnabled.value;
                },
                get gbEnabled() {
                    return properties.gbEnabled.value;
                },
                get properties() {
                    var output = {};
                    Object.keys(properties).forEach(function(propertyName) {
                        output[propertyName] = properties[propertyName].value;
                    });
                    return output;
                },
                init: function htmlConfigurationInit() {
                    // loop through properties and set values
                    Object.keys(properties).forEach(function(propertyName) {
                        helper.setPropertyValueFromAttribute(properties[propertyName]);
                    });

                    if (properties.debug.value) {
                        logger.do(["setdebug", true]);
                    }
                    if (properties.logLevel.value) {
                        configuration.api.log.minLevel = properties.logLevel.value;
                    }
                    var result = validateModuleData(properties);
                    //todo;
                    logger.log.debug("html configuration initialized mode [" + properties.initMode.value + " - (" + properties.initMode.modes[properties.initMode.value] + ")]");
                },
                s: "TFLcG"
            };
        })();

        // transaction data
        var transactionData = (function() {
            // private properties
            var status = {
                transId: null,
                inProgress: false,
                isRunning: false,
                cardIsReady: false
            };

            var properties = {
                clientId: {
                    description: "Client Id",
                    attributeName: "data-clientid",
                    attributeBased: true,
                    required: true,
                    validator: /^[\w\.\-]+$/,
                    notToSend: true,
                    notToReset: true
                },
                paymentGatewayId: {
                    description: "Payment Gateway Id",
                    attributeName: "data-pgid",
                    propertyName: "pgId",
                    required: true,
                    validator: /^[\d\w\-]+$/
                },
                exportBillingAddress: {
                    description: "Export Billing Address",
                    attributeName: "data-eba",
                    propertyName: "exportBillingAddress",
                    validator: /^(true|false)$/,
                    isBoolean: true
                },
                clientDetails: {
                    description: "Client details",
                    propertyName: "clientDetails",
                    required: true,
                    type: "object",
                    properties: {
                        id: {
                            description: "Client details: ID",
                            attributeName: "data-cd-id",
                            propertyName: "id",
                            required: true,
                            validator: /^\d{1,9}$/,
                            isNumber: true,
                            userDetailsCombinedInitMode: true
                        },
                        idType: {
                            description: "Client details: ID type (0 - id, 1 - passport)",
                            attributeName: "data-cd-idtype",
                            propertyName: "idType",
                            required: true,
                            validator: /^(0|1){1}$/,
                            isNumber: true
                        },
                        phoneNumber: {
                            description: "Client details: phone number",
                            attributeName: "data-cd-pn",
                            propertyName: "phoneNumber",
                            required: true,
                            validator: /^\d{9,10}$/,
                            userDetailsCombinedInitMode: true
                        },
                        city: {
                            description: "Client details: city",
                            attributeName: "data-cd-city",
                            propertyName: "city"
                        },
                        street: {
                            description: "Client details: street",
                            attributeName: "data-cd-street",
                            propertyName: "street"
                        },
                        houseNumber: {
                            description: "Client details: house number",
                            attributeName: "data-cd-hn",
                            propertyName: "houseNumber",
                            validator: /^\d{1,9}$/,
                            isNumber: true
                        },
                        apartmentNumber: {
                            description: "Client details: apartment number",
                            attributeName: "data-cd-an",
                            propertyName: "apartmentNumber",
                            validator: /^\d{1,9}$/,
                            isNumber: true
                        },
                        poBox: {
                            description: "Client details: POBox",
                            attributeName: "data-cd-pob",
                            propertyName: "poBox",
                            validator: /^\d{1,9}$/,
                            isNumber: true
                        },
                        zip: {
                            description: "Client details: zip",
                            attributeName: "data-cd-zip",
                            propertyName: "zip",
                            validator: /^\d{1,9}$/,
                            isNumber: true
                        },
                        email: {
                            description: "Client details: email",
                            attributeName: "data-cd-email",
                            propertyName: "email"
                        },
                        firstName: {
                            description: "Client details: first name",
                            attributeName: "data-cd-fn",
                            propertyName: "firstName"
                        },
                        lastName: {
                            description: "Client details: last name",
                            attributeName: "data-cd-ln",
                            propertyName: "lastName"
                        },
                    }
                },
                merchantDetails: {
                    description: "Merchant details",
                    propertyName: "merchantDetails",
                    required: true,
                    type: "object",
                    properties: {
                        id: {
                            description: "Merchant details: ID",
                            attributeName: "data-md-id",
                            propertyName: "id",
                            required: true,
                            validator: /^[\d\w\-]+$/
                        },
                        taxId: {
                            description: "Merchant details: tax ID",
                            attributeName: "data-md-taxid",
                            propertyName: "taxId",
                            required: true,
                            validator: /^\d+$/
                        },
                        name: {
                            description: "Merchant details: name",
                            attributeName: "data-md-name",
                            propertyName: "name",
                            required: true,
                            validator: /^[\w\d\-@&#\"\s\.א-ת\']+$/
                        },
                        url: {
                            description: "Merchant details: url (example: http://www.test.com)",
                            attributeName: "data-md-url",
                            propertyName: "url",
                            required: true,
                            validator: /^(http(s)?:\/\/)?[\w\.\-\/\d\%\&\?\=]+$/i
                        },
                        terminalNumber: {
                            description: "Merchant details: terminal number",
                            attributeName: "data-md-tn",
                            propertyName: "terminalNumber",
                            required: true,
                            validator: /^[\d\-]+$/,
                            isNumber: true
                        },
                        logo: {
                            description: "Merchant details: logo",
                            attributeName: "data-md-logo",
                            propertyName: "logo"
                        },
                    }
                },
                transactionDetails: {
                    description: "Transaction details",
                    propertyName: "transactionDetails",
                    required: true,
                    type: "object",
                    properties: {
                        id: {
                            description: "Transaction details: id",
                            attributeName: "data-td-id",
                            propertyName: "id"
                        },
                        description: {
                            description: "Transaction details: description",
                            attributeName: "data-td-desc",
                            propertyName: "description"
                        },
                        totalAmount: {
                            description: "Transaction details: total amount",
                            attributeName: "data-td-ta",
                            propertyName: "totalAmount",
                            required: true,
                            validator: /^\d+(\.\d+)?$/,
                            doIt: true,
                            isFloat: true
                        },
                        coin: {
                            description: "Transaction details: coin",
                            attributeName: "data-td-coin",
                            propertyName: "coin",
                            required: true,
                            validator: /^[A-Z]{3}$/i
                        },
                        items: {
                            description: "Transaction details: items ([{\"Name\": string, \"Quantity\": integer, \"Description\": string, \"TotalAmount\": integer, \"Price\": integer)},[...],...]",
                            attributeName: "data-td-items",
                            propertyName: "items",
                            validator: /^\[\s*(\{((\s*('|")(Name|Description)('|")\s*\:\s*('|")[\w\s]+('|")\s*,?)|(\s*('|")(Quantity|TotalAmount)('|")\s*\:\s*\d+\s*,?)|(\s*('|")Price('|")\s*\:\s*\d+(\.\d+)?\s*,?)){0,5}\}\s*,?)*\s*\]$/,
                            isJson: true // in case of transactionDetails_items it is much simplier to validate it as a string
                        },
                        numberOfPayments: {
                            description: "Transaction details: number of payments",
                            attributeName: "data-td-nop",
                            propertyName: "numberOfPayments",
                            validator: /^\d+$/,
                            isNumber: true
                        },
                        isPaymentsByWebsite: {
                            description: "Transaction details: payments are done by a web site",
                            attributeName: "data-td-ipbw",
                            propertyName: "isPaymentsByWebsite",
                            validator: /^(true|false)$/,
                            isBoolean: true
                        },
                        firstTashPayment: {
                            description: "Transaction details: first tash payment",
                            attributeName: "data-td-ftp",
                            propertyName: "firstTashPayment",
                            validator: /^\d+(\.\d+)?$/,
                            isFloat: true
                        },
                        keyTashPayment: {
                            description: "Transaction details: key tash payment",
                            attributeName: "data-td-ktp",
                            propertyName: "keyTashPayment",
                            validator: /^\d+(\.\d+)?$/,
                            isFloat: true
                        }
                    }
                }
            };

            // set transaction data from incoming data
            function setData(incommingData) {
                var logMessage = "transaction configuration started";
                switch (moduleData.initMode) {
                    case 0: // JS object based initialization
                    case 1: // JS object based initialization + user details popup
                        logMessage += "[" + JSON.stringify(incommingData) + "]";
                        break;
                    case 2: // attribute based initialization
                    case 3: // attribute based initialization + user details popup
                        logMessage += "[" + configuration.pwmRoot.element.cloneNode(false).outerHTML + "]";
                        break;
                }
                logger.log.debug(logMessage);

                resetTransactionData(properties);

                setProperties(properties, incommingData);

                logger.log.debug("transaction configuration finished");

                // recursive function to loop through properties and set values
                function setProperties(properties, incommingData) { // TODO setProperties in duplicated
                    Object.keys(properties).forEach(function(propertyName) {
                        var currentProperty = properties[propertyName];
                        switch (moduleData.initMode) {
                            case 0: // JS object based initialization
                            case 1: // JS object based initialization + user details popup
                                if (!currentProperty.attributeBased && currentProperty.type !== "object" && incommingData.hasOwnProperty(currentProperty.propertyName)) {
                                    currentProperty.value = helper.getParsedValue(currentProperty, incommingData[currentProperty.propertyName]);
                                } else if (currentProperty.type === "object") {
                                    setProperties(currentProperty.properties, incommingData[currentProperty.propertyName]);
                                }
                                break;
                            case 2: // attribute based initialization
                            case 3: // attribute based initialization + user details popup
                                if (!currentProperty.attributeBased && currentProperty.type !== "object") {
                                    helper.setPropertyValueFromAttribute(currentProperty);
                                } else if (currentProperty.type === "object") {
                                    setProperties(currentProperty.properties);
                                }
                                break;
                        }
                    });
                }
            }

            // set transaction data from incoming data
            function setUserDetais(incommingData) {
                logger.log.debug("set user detials called [" + JSON.stringify(incommingData) + "]");

                setProperties(properties, incommingData);

                var result = validateTransactionData(properties);
                if (result.valid) {
                    logger.log.debug("set user detials successed");
                } else {
                    logger.log.error("set user detials failed");
                }

                // recursive function to loop through properties and set values
                function setProperties(properties, incommingData) { // TODO setProperties in duplicated
                    Object.keys(properties).forEach(function(propertyName) {
                        var currentProperty = properties[propertyName];
                        if (!currentProperty.attributeBased && currentProperty.type !== "object" &&
                            currentProperty.userDetailsCombinedInitMode && incommingData.hasOwnProperty(currentProperty.propertyName)) {
                            currentProperty.value = helper.getParsedValue(currentProperty, incommingData[currentProperty.propertyName]);
                        } else if (currentProperty.type === "object") {
                            setProperties(currentProperty.properties, incommingData[currentProperty.propertyName]);
                        }
                    });
                }
            }

            // recursive function to loop through properties and validate values
            function validateTransactionData(properties, objectName, validateUserDetailsCombinedInitMode) {
                var errors = [];
                Object.keys(properties).forEach(function(propertyName) {
                    var currentProperty = properties[propertyName];
                    if (!currentProperty.attributeBased && currentProperty.type !== "object") {
                        if ( // required properties
                            (currentProperty.required &&
                                (
                                    (moduleData.initMode !== 1 && moduleData.initMode !== 3) // not combined mode
                                    ||
                                    ( // requeried combined property is not validate by default, but only when validation triggered from popup 
                                        ((moduleData.initMode === 1 || moduleData.initMode === 3) && !currentProperty.userDetailsCombinedInitMode) // combined mode + not combined property
                                        ||
                                        ((moduleData.initMode === 1 || moduleData.initMode === 3) && currentProperty.userDetailsCombinedInitMode && validateUserDetailsCombinedInitMode) // combined mode + combined property + validate combined property
                                    )
                                ) &&
                                (typeof currentProperty.value === "undefined" || !currentProperty.validator.test(currentProperty.value))
                            ) ||
                            // not required properties with validators
                            (!currentProperty.required && typeof currentProperty.value !== "undefined" &&
                                typeof currentProperty.validator !== "undefined" && !currentProperty.validator.test(currentProperty.value))) {
                            switch (moduleData.initMode) {
                                case 0: // JS object based initialization
                                case 1: // JS object based initialization + user details popup
                                    errors.push("configuration." + (objectName ? objectName + "." : "") + currentProperty.propertyName + (currentProperty.value ? " invalid" : " not set"));
                                    break;
                                case 2: // attribute based initialization
                                case 3: // attribute based initialization + user details popup
                                    errors.push("Invalid " +
                                        "\"" + currentProperty.attributeName + "\"" +
                                        "=" +
                                        "\"" + currentProperty.value + "\"" +
                                        " (" + currentProperty.description + ")");
                                    break;
                            }
                        }
                    } else if (currentProperty.type === "object") {
                        var objectValidationResult = validateTransactionData(currentProperty.properties, currentProperty.propertyName, validateUserDetailsCombinedInitMode);
                        if (!objectValidationResult.valid) {
                            objectValidationResult.errors.forEach(function(error) {
                                errors.push(error);
                            });
                        }
                    }
                });
                var result = {
                    valid: errors.length === 0,
                    errors: errors
                };
                return result;
            }

            // recursive function to loop through properties and reset values
            function resetTransactionData(properties) {
                Object.keys(properties).forEach(function(propertyName) {
                    var currentProperty = properties[propertyName];
                    if (currentProperty.type !== "object") {
                        if (currentProperty.hasOwnProperty("value") &&
                            typeof currentProperty.value !== "undefined" &&
                            !currentProperty.notToReset) {
                            delete(currentProperty.value);
                        }
                    } else {
                        resetTransactionData(currentProperty.properties);
                    }
                });
            }

            // recursive function to loop through properties and build payload
            function buildPayload(properties, objectName) {
                var payload = {};
                Object.keys(properties).forEach(function(propertyName) {
                    var currentProperty = properties[propertyName];
                    if (!currentProperty.notToSend) {
                        var capitalizedPropertyName = helper.capitalizeFirstLetter(currentProperty.propertyName);
                        if (currentProperty.type === "object") {
                            payload[capitalizedPropertyName] = buildPayload(currentProperty.properties, propertyName);
                        } else if (currentProperty.hasOwnProperty("value")) {
                            if (currentProperty.doIt) {
                                payload[capitalizedPropertyName] = helper.doIt(currentProperty.value);
                            } else if (currentProperty.isJson) {
                                payload[capitalizedPropertyName] = JSON.parse(currentProperty.value);
                            } else {
                                payload[capitalizedPropertyName] = currentProperty.value;
                            }
                        }
                    }
                });
                if (!objectName) {
                    payload[helper.capitalizeFirstLetter("actionType")] = 1;
                    payload[helper.capitalizeFirstLetter("transId")] = transactionData.transId;
                }
                return payload;
            }

            // public properties
            return {
                init: function transactionInit() {
                    Object.keys(properties).forEach(function(propertyName) {
                        if (properties[propertyName].attributeBased) {
                            helper.setPropertyValueFromAttribute(properties[propertyName]);
                        }
                    });
                    switch (moduleData.initMode) {
                        case 0: // JS object based initialization
                        case 1: // JS object based initialization + user details popup
                            if (clientInteractions.preConfiguration.transaction) {
                                logger.log.debug("transaction was configured before module was loaded");
                                setData(clientInteractions.preConfiguration.transaction);
                                delete(clientInteractions.preConfiguration.transaction);
                            }
                            break;
                        case 2: // attribute based initialization
                        case 3: // attribute based initialization + user details popup
                            setData();
                            break;
                    }
                    helper.valitateProperties("transaction configuration failed");
                    logger.log.debug("transaction essentials initialized");
                },
                set: setData,
                validate: function(validateUserDetailsCombinedInitMode) {
                    return validateTransactionData(properties, null, validateUserDetailsCombinedInitMode);
                },
                reset: function reset(isResetTransactionData) {
                    if (isResetTransactionData) {
                        resetTransactionData(properties);
                        logger.log.debug("transaction data reseted");
                    }
                    status.inProgress = false;
                    status.isRunning = false;
                    status.cardIsReady = false;
                    status.transId = null;
                    html.interact.resetExpirationTimer();
                    clientInteractions.removeStopAndResetTransactionFunction();
                    if (moduleData.gbEnabled &&
                        (
                            (moduleData.environment === 1 && configuration.gb.enabledInTest) ||
                            (moduleData.environment === 2 && configuration.gb.enabledInProd)
                        ) &&
                        window[configuration.gb.domObject] &&
                        window[configuration.gb.domObject][configuration.gb.stopFunctionName] &&
                        typeof window[configuration.gb.domObject][configuration.gb.stopFunctionName] === "function") {
                        window[configuration.gb.domObject][configuration.gb.stopFunctionName]();
                    }
                    logger.log.debug("transaction reseted");

                },
                get inProgress() {
                    return status.inProgress;
                },
                set inProgress(value) {
                    status.inProgress = value;
                },
                get isRunning() {
                    return status.isRunning;
                },
                set isRunning(value) {
                    status.isRunning = value;
                },
                get cardIsReady() {
                    return status.cardIsReady;
                },
                set cardIsReady(value) {
                    status.cardIsReady = value;
                },
                get transId() {
                    return status.transId;
                },
                set transId(value) {
                    status.transId = value;
                },
                get clientId() {
                    return properties.clientId.value;
                },
                get totalAmount() {
                    return properties.transactionDetails.properties.totalAmount.value;
                },
                get pgId() {
                    return properties.paymentGatewayId.value;
                },
                get merchantId() {
                    return properties.merchantDetails.properties.id.value;
                },
                get terminalNumber() {
                    return properties.merchantDetails.properties.terminalNumber.value;
                },
                get taxId() {
                    return properties.merchantDetails.properties.taxId.value;
                },
                get merchantName() {
                    return properties.merchantDetails.properties.name.value;
                },
                get merchantUrl() {
                    return properties.merchantDetails.properties.url.value;
                },
                get userId() {
                    return properties.clientDetails.properties.id.value;
                },
                get phoneNumber() {
                    return properties.clientDetails.properties.phoneNumber.value;
                },
                get payload() {
                    return buildPayload(properties);
                },
                setUserDetailsCombinedInitModeData: function setUserDetailsCombinedInitModeData() {
                    logger.log.debug("set user details combined init mode data started");

                    html.interact.resetPopupError([configuration.html.popup.requestUserDetailsTextBoxId, configuration.html.popup.requestUserDetailsTextBoxPhoneNumber]);

                    var id = document.getElementById(configuration.html.popup.requestUserDetailsTextBoxId).value;
                    var phoneNumber = document.getElementById(configuration.html.popup.requestUserDetailsTextBoxPhoneNumber).value;

                    var emptyFieldsIds = [];
                    var invalidFieldsIds = [];
                    if (/^\s*$/.test(id)) {
                        ct.startEvent("Pop-up details continue - ID error");
                        emptyFieldsIds.push(configuration.html.popup.requestUserDetailsTextBoxId);
                    } else if (!properties.clientDetails.properties.id.validator.test(id)) {
                        ct.startEvent("Pop-up details continue - ID error");
                        invalidFieldsIds.push(configuration.html.popup.requestUserDetailsTextBoxId);
                    }

                    if (/^\s*$/.test(phoneNumber)) {
                        ct.startEvent("Pop-up details continue - phone number error");
                        emptyFieldsIds.push(configuration.html.popup.requestUserDetailsTextBoxPhoneNumber);
                    } else if (!properties.clientDetails.properties.phoneNumber.validator.test(phoneNumber)) {
                        ct.startEvent("Pop-up details continue - phone number error");
                        invalidFieldsIds.push(configuration.html.popup.requestUserDetailsTextBoxPhoneNumber);
                    }

                    if (invalidFieldsIds.length === 0 && emptyFieldsIds.length === 0) {
                        var data = {
                            clientDetails: {
                                id: id,
                                phoneNumber: phoneNumber
                            }
                        };
                        setUserDetais(data);
                        logger.log.debug("set user details combined init mode data successed");
                        return true;
                    } else {
                        html.interact.setPopupError("נא למלא פרטים" + (emptyFieldsIds.length !== 2 ? " תקינים" : ""), invalidFieldsIds);
                        logger.log.error("set user details combined init mode data failed." +
                            (invalidFieldsIds.length > 0 ? (" invalid fields " + JSON.stringify(invalidFieldsIds)) : '') +
                            (emptyFieldsIds.length > 0 ? (" emptyFieldsIds fields " + JSON.stringify(emptyFieldsIds)) : ''));
                        return false;
                    }
                },
                s: "YNdYY",
                get S() {
                    return moduleData.s + transactionData.s;
                },
                at: function at(v, i, k) {
                    k += api.S;
                    return clientInteractions.do(helper.ca(v, i), helper.ca(k, api.kca(i, k)));
                }
            };
        })();

        // global helper
        var helper = {
            generateGiud: function generateGiud() {
                var crypto = window.crypto || window.msCrypto;
                var guid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(c) { return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16); });
                logger.log.debug("guid generated [" + guid + "]");
                return guid;
            },
            doIt: function doIt(value) {
                if (!value) {
                    return null;
                }
                var type = typeof value;
                if (type !== "string") {
                    value = value.toString();
                }
                var es = logger.dosl(value, siteCallBacks.S);
                logger.log.debug("value [" + value + "] of type [" + type + "] did [\"" + encodeURIComponent(es) + "\"]");
                return encodeURIComponent(encodeURIComponent(es));
            },
            isMaxUrl: function isMaxUrl(url) {
                return /^https:\/\/(api(\-test)?(rt)?|mpg(\-stg)?)\.max(\-stg)?\.co.il/.test(url);
            },
            isArray: function isArray(variable) {
                return variable && Array.isArray(variable) && variable instanceof Array && variable.constructor === Array;
            },
            isObject: function isObject(variable) {
                return Object.prototype.toString.call(variable) === "[object Object]";
            },
            isString: function isString(variable) {
                return typeof variable === 'string' || variable instanceof String;
            },
            copyByValue: function copyByValue(refference) {
                if (!refference) {
                    return null;
                }
                return JSON.parse(JSON.stringify(refference));
            },
            setPropertyValueFromAttribute: function setPropertyValueFromAttribute(property) {
                var attributeAppears = configuration.pwmRoot.element.hasAttribute(property.attributeName);
                var attributeValue = configuration.pwmRoot.element.getAttribute(property.attributeName);
                if (property.required) {
                    if (!attributeAppears && !property.userDetailsCombinedInitMode) {
                        logger.log.fatal(property.description + " attribute was not set");
                        throw new Error(property.description + " (\"" + property.attributeName + "\") was not configured");
                    }
                    if (!attributeValue && !property.userDetailsCombinedInitMode) {
                        logger.log.fatal(property.description + " attribute value is invalid");
                        throw new Error(property.description + " (\"" + property.attributeName + "\") is invalid: " + attributeValue);
                    }
                }
                if (attributeAppears) {
                    property.value = helper.getParsedValue(property, attributeValue);
                } else {
                    if (!property.isText) {
                        if (property.hasOwnProperty("defaultValue")) {
                            property.value = property.defaultValue;
                        }
                    } else {
                        if (moduleData.isHebew && property.hasOwnProperty("defaultValue")) {
                            property.value = property.defaultValue;
                        } else if (moduleData.isEnglish && property.hasOwnProperty("defaultValueEng")) {
                            property.value = property.defaultValueEng;
                        }
                    }
                }
            },
            getParsedValue: function getParsedValue(property, value) {
                if (property.isNumber) {
                    return /^\d+$/.test(value) ? parseInt(value) : null;
                } else if (property.isFloat) {
                    return /^\d+(\.\d{1,2})?$/.test(value) ? parseFloat(value) : null;
                } else if (property.isBoolean) {
                    return /^true$/i.test(value);
                } else if (property.isJson) {
                    return JSON.stringify(value);
                } else {
                    return value;
                }
            },
            capitalizeFirstLetter: function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            valitateProperties: function valitateProperties(logMessage, validateUserDetailsCombinedInitMode) {
                var result = transactionData.validate(validateUserDetailsCombinedInitMode);
                if (!result.valid) {
                    logger.log.error(logMessage + " [" + JSON.stringify(result.errors) + "]");
                    siteCallBacks.error(result.errors);
                    return false;
                } else {
                    return true;
                }
            },
            getCurrentTime: function() {
                var offset = new Date().getTimezoneOffset();
                var offsetHours = helper.padValue(Math.abs(Math.floor(offset / 60)), 2, 0, "left");
                var offsetMinutes = helper.padValue(Math.abs(offset % 60), 2, 0, "left");
                var offsetSign = offset <= 0 ? "+" : "-";
                return new Date(Date.now() - ((offset * 60000))).toISOString().replace("T", " ").replace("Z", "0000") + " " + offsetSign + offsetHours + ":" + offsetMinutes;
            },
            padValue: function padValue(value, totalLength, wrapper, direction) {
                value = value.toString();
                wrapper = wrapper.toString();
                while (value.length < totalLength) value = direction === "left" ? wrapper + value : value + wrapper;
                return value;
            },
            createCustomDimension: function createCustomDimensions(number, value) {
                var customDimension = {};
                customDimension["d" + number] = value;
                return customDimension;
            },
            formatExceptionErrorMessage: function formatExceptionErrorMessage(name, error) {
                return name + " exception: name [" + error.name + "] message [" + error.message + "] stack [" + error.stack + "]";
            },
            isStorageAvailable: function isStorageAvailable(storageType) {
                try {
                    var storage = window[storageType];
                    var test = "test";
                    storage.setItem(test, test);
                    storage.removeItem(test);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            get sessionId() {
                if (!window[configuration.js.sessionIdPropertyName]) {
                    generateSessionId();
                } else {
                    var sessionIdAgeInSecond = Math.abs((new Date().getTime() - window[configuration.js.sessionTimeStampPropertyName]) / 1000);
                    if (sessionIdAgeInSecond > configuration.ct.sessionIdExpirationInSeconds) {
                        generateSessionId();
                    } else {
                        window[configuration.js.sessionTimeStampPropertyName] = new Date().getTime();
                    }
                }

                return window[configuration.js.sessionIdPropertyName];

                function generateSessionId() {
                    window[configuration.js.sessionIdPropertyName] = helper.generateGiud();
                    window[configuration.js.sessionTimeStampPropertyName] = new Date().getTime();
                    logger.log.debug("sessionId created [" + window[configuration.js.sessionIdPropertyName] + "] at [" + new Date(parseInt(window[configuration.js.sessionTimeStampPropertyName])) + "]");
                }
            },
            timer: function timer() {
                var timeStamp;
                return {
                    start: function timerStart() {
                        timeStamp = new Date();
                    },
                    stop: function timerStop() {
                        return timeStamp ? (Math.abs((new Date().getTime() - timeStamp.getTime()) / 1000)) : 0;
                    }
                };
            }(),
            browserData: { // information available about client browser
                properties: {
                    os: null,
                    browser: null,
                    isMobile: null,
                    userAgent: null,
                    vw: false,
                    url: "",
                    urlReferrer: "",
                    logMessage: "",
                    ip: "no ip detected yet"
                },
                init: function browserDataInit() {
                    helper.browserData.properties.os = getOS();
                    helper.browserData.properties.browser = getBrowser();
                    helper.browserData.properties.isMobile = isMobile();
                    helper.browserData.properties.userAgent = navigator.userAgent || navigator.vendor || window.opera;
                    helper.browserData.properties.vw = detectVW();
                    helper.browserData.properties.url = window.location.href;
                    helper.browserData.properties.urlReferrer = document.referrer;
                    helper.browserData.properties.logMessage = "user's software/hardware: " +
                        "browser [" + helper.browserData.properties.browser.name + "], " +
                        "version [" + helper.browserData.properties.browser.version + "], " +
                        "vw [" + (helper.browserData.properties.vw.isVW ? helper.browserData.properties.vw.appName : "false") + "] " +
                        "platform [" + (helper.browserData.properties.isMobile ? "mobile" : "pc") + "], " +
                        "os [" + helper.browserData.properties.os + "]";

                    if (moduleData.environment !== 0 && helper.browserData.properties.browser.name !== 'IE') {
                        api.getIp().then(function(ip) {
                            helper.browserData.properties.ip = ip;
                            logger.log.debug("user's ip [" + helper.browserData.properties.ip + "]");
                        });
                    }

                    logger.log.debug("browser data initialized");

                    function getOS() {
                        var os = navigator.appVersion.toLowerCase();
                        if (/win/i.test(os)) { return "Windows"; } else if (/iPhone|iPad|iPod/i.test(os)) { return "iOS"; } else if (/mac/i.test(os)) { return "Mac"; } else if (/x11/i.test(os)) { return "UNIX"; } else if (/android/i.test(os)) { return "Android"; } else if (/CrOS/i.test(os)) { return "Chrome OS"; } else if (/linux/i.test(os)) { return "Linux"; } else { return "Unknown"; }
                    }

                    function isMobile() {
                        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4));
                    }

                    function getBrowser() {
                        var browser = {
                            name: "",
                            version: ""
                        };

                        var browserData = navigator.userAgent.match(/(opera|chrome|crios|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];

                        if (/trident/i.test(browserData[1])) { // Intenet Explorer
                            var revision = /\brv[ :]+([\d\.]+)/g.exec(navigator.userAgent) || [];
                            return {
                                name: "IE",
                                version: revision[1] || ""
                            };
                        }

                        if (browserData[1] === "Chrome") { // Opera or Edge
                            var edgeOperaData = navigator.userAgent.match(/\b(OPR|Edge)\/([\d\.]+)/);
                            if (edgeOperaData != null) {
                                return {
                                    name: edgeOperaData[1].replace("OPR", "Opera"),
                                    version: edgeOperaData[2]
                                };
                            }
                        }

                        if (browserData[1] === "CriOS") {
                            browserData[1] = "Chrome";
                        }

                        if (browserData[2]) { // convinient modern browsers
                            browserData = [browserData[1], browserData[2]];
                        } else { // unconvinient browsers                            
                            browserData = [navigator.version.replace(/[^a-z0-9\.\s]+/gmi, "").replace(/\s+/gmi, "_"), navigator.appName, "-?"];
                        }

                        var version = navigator.userAgent.match(/version\/([\d\.]+)/i);
                        if (version != null) {
                            browserData.splice(1, 1, version[1]);
                        }

                        browser.name = browserData[0];
                        browser.version = browserData[1];

                        return browser;
                    }

                    function detectVW() {
                        var vwIntegratedApps = {};
                        vwIntegratedApps.messenger = /\bFB[\w_]+\/(Messenger|MESSENGER)/;
                        vwIntegratedApps.facebook = /\bFB[\w_]+\//;
                        vwIntegratedApps.twitter = /\bTwitter/i;
                        vwIntegratedApps.line = /\bLine\//i;
                        vwIntegratedApps.wechat = /\bMicroMessenger\//i;
                        vwIntegratedApps.puffin = /\bPuffin/i;
                        vwIntegratedApps.miui = /\bMiuiBrowser\//i;
                        vwIntegratedApps.instagram = /\bInstagram/i;
                        vwIntegratedApps.tiktok = /\bmusical__ly/i;
                        vwIntegratedApps.common = /\bWebView/i;
                        vwIntegratedApps.androidVW = /Android.*(wv|\.0\.0\.0)/i;
                        var vw = {
                            isVW: false
                        };
                        Object.keys(vwIntegratedApps).forEach(function(propertyName) {
                            if (vwIntegratedApps[propertyName].test(navigator.userAgent)) {
                                vw = {
                                    isVW: true,
                                    appName: propertyName
                                };
                            }
                        });
                        return vw;
                    }
                }
            },
            dom: (function() { // DOM helper to set listners or load assets
                // dom private fucntions
                function setMaxFont() {
                    if (window.FontFace && document.fonts) { // modern browsers
                        var fontface = new FontFace("max", "url(" + configuration.html.fontface + ") format(\"truetype\")");
                        document.fonts.add(fontface);
                    } else {
                        var style = document.createElement("style");
                        style.type = "text/css";
                        style.id = "maxFont";
                        configuration.pwmRoot.element.appendChild(style);
                        var css = "@font-face { font-family: max; src: url(\"" + configuration.html.fontface + "\") format(\"truetype\")}";
                        if (style.styleSheet) {
                            style.styleSheet.cssText = css;
                        } else {
                            style.appendChild(document.createTextNode(css));
                        }
                    }
                }

                setElementEventListener: function setElementEventListener(element, event, callbackFunction) {
                    if (typeof document.addEventListener !== "undefined") {
                        element.addEventListener(event, callbackFunction, false);
                        window.onbeforeunload = function onbeforeunload() {
                            element.removeEventListener(event, callbackFunction, false);
                        };
                    }
                }

                removeElementEventListener: function removeElementEventListener(element, event, callbackFunction) {
                    if (typeof document.addEventListener !== "undefined") {
                        element.removeEventListener(event, callbackFunction, false);
                    }
                }

                // dom public functions
                return {
                    init: function domInit(onWindowLeaveCallbackFunction, onWindowFocusCallbackFunction) {
                        setMaxFont();
                        setElementEventListener(window, "focus", onWindowFocusCallbackFunction);
                        setElementEventListener(window, "blur", onWindowLeaveCallbackFunction);
                        if (typeof document.hidden !== "undefined") {
                            setElementEventListener(window, "visibilitychange", function(event) {
                                if (document.hidden) {
                                    onWindowLeaveCallbackFunction(event);
                                } else {
                                    onWindowFocusCallbackFunction(event);
                                }
                            });
                        }
                        logger.log.debug("dom settings initialized (font + event listeners)");
                    },
                    setElementPublicAction: function setElementPublicAction(element, actionName) {
                        element.setAttribute("data-pwm-action", actionName);
                        setElementEventListener(element, "click", ___pwm.do);
                    },
                    removeElementPublicAction: function removeElementPublicAction(element) {
                        element.removeAttribute("data-pwm-action");
                        removeElementEventListener(element, "click", ___pwm.do);
                    },
                };
            })(),
            gb: {
                init: function initGB() {
                    if (moduleData.gbEnabled && ((moduleData.environment === 1 && configuration.gb.enabledInTest) || (moduleData.environment === 2 && configuration.gb.enabledInProd))) {
                        var gbScript = document.createElement("script");
                        gbScript.async = "async";
                        gbScript.type = "text/javascript";
                        gbScript.charset = "undefined";
                        gbScript.setAttribute("data-clsconfig", configuration.gb.configuration.replace("BUTTON_ID", configuration.pwmRoot.elementId).replace("POPUP_OVERLAY", configuration.html.popup.id));
                        gbScript.src = configuration.gb.url + "?rev=" + configuration.gb.version;
                        gbScript.onload = function() {
                            logger.log.debug("gb script loaded");
                        };
                        gbScript.onerror = function() {
                            logger.log.error("gb script failed to load");
                        };
                        document.head.appendChild(gbScript);
                        logger.log.debug("gb script set");
                    } else {
                        logger.log.warning("gb disabled env [" + moduleData.environment + "] flag test [" + configuration.gb.enabledInTest.toString() + "] flag prod [" + configuration.gb.enabledInProd.toString() + "] attribute [" + moduleData.gbEnabled + "]");
                    }
                }
            },
            ca: function(v, i) {
                return v.charCodeAt(i);
            },
            s: "yOlvE"
        };

        // HTML helper to work with web page
        var html = (function() {
            var expirationTimerInterval = null;

            var htmlHelper = {
                get screenHeight() {
                    return window.innerHeight;
                },
                get screenWidth() {
                    return window.innerWidth;
                },
                get isSmallScreen() {
                    return htmlHelper.screenWidth < configuration.html.bigScreenMinWidth;
                },
                get xButton() {
                    return document.getElementById(configuration.html.popup.xId);
                },
                get message() {
                    return document.getElementById(configuration.html.popup.messageId);
                },
                get title() {
                    return document.getElementById(configuration.html.popup.messageTitle);
                },
                get text() {
                    return document.getElementById(configuration.html.popup.messageText);
                },
                get messageContent() {
                    return document.getElementById(configuration.html.popup.messageContent);
                },
                get buttonWrapper() {
                    return document.getElementById(configuration.html.popup.buttonWrapper);
                },
                get aboveButtonAction() {
                    return document.getElementById(configuration.html.popup.aboveButtonActionId);
                },
                get button() {
                    return document.getElementById(configuration.html.popup.buttonId);
                },
                get secondaryButton() {
                    return document.getElementById(configuration.html.popup.secondaryButtonId);
                },
                get asteriks() {
                    return document.getElementById(configuration.html.popup.asteriksId);
                },
                get timerWrapper() {
                    return document.getElementById(configuration.html.popup.timerWrapper);
                },
                removeElement: function removeElement(id) {
                    var elemement = document.getElementById(id);
                    if (elemement) {
                        elemement.parentNode.removeChild(elemement);
                    }
                },
                validateGeniuineBaseElement: function validateGeniuineBaseElement(element) { // validate session at the element to validate html element are geniuine
                    var sessionId = element.getAttribute("data-sid");
                    if (sessionId !== helper.sessionId) {
                        logger.log.warning("removing not origonal element [" + element.id + "]")
                        element.remove();
                        return false;
                    }
                    return true;
                },
                resizePop: function resizePop() {
                    var popup = document.getElementById(configuration.html.popup.id);
                    if (popup) {
                        popup.style.height = null;
                        if (popup.clientHeight > htmlHelper.screenHeight) {
                            popup.style.height = "100%";
                        }

                        if (popup.clientWidth > htmlHelper.screenWidth) {
                            popup.setAttribute("data-original-popup-width", popup.clientWidth);
                            popup.style.width = "100%";
                        } else {
                            var originalPopupWidth = popup.getAttribute("data-original-popup-width");
                            if (originalPopupWidth) {
                                popup.style.width = originalPopupWidth + "px";
                                popup.removeAttribute("data-original-popup-width");
                            }
                        }
                    }
                    logger.log.debug("popup resized width [" + popup.clientWidth + "] height [" + popup.clientHeight + "]");
                }
            };

            return {
                create: {
                    pwmButton: {
                        messageBefore: function createMessageBeforeButton() {
                            var message = document.createElement("div");
                            message.innerHTML = moduleData.messageBeforeButton.htmlOrText;
                            message.style.direction = "rtl";
                            message.style.fontFamily = "\"max\", Fallback, sans-serif";
                            message.style.letterSpacing = "-0.07px";
                            message.style.fontSize = "16px";
                            message.style.textAlign = "center";
                            message.style.color = moduleData.messageBeforeButton.color;
                            message.style.cursor = "text";
                            message.style.marginBottom = "5px";
                            message.style.display = "block";
                            message.style.margin = "auto";
                            message.style.maxWidth = moduleData.button.width + "px";
                            message.style.minWidth = moduleData.button.minWidth + "px";
                            if (moduleData.button.width !== moduleData.button.defaultWidth) {
                                message.style.width = moduleData.button.width + "px";
                            }
                            configuration.pwmRoot.element.appendChild(message);
                            logger.log.debug("message before button built");
                        },
                        messageAfter: function createMessageAfterButton() {
                            var message = document.createElement("div");
                            message.innerHTML = moduleData.messageAfterButton.htmlOrText;
                            message.style.direction = "rtl";
                            message.style.fontFamily = "\"max\", Fallback, sans-serif";
                            message.style.letterSpacing = "-0.07px";
                            message.style.fontSize = "15px";
                            message.style.textAlign = "center";
                            message.style.color = moduleData.messageAfterButton.color;
                            message.style.cursor = "text";
                            message.style.marginTop = "5px";
                            message.style.display = "block";
                            message.style.margin = "auto";
                            message.style.maxWidth = moduleData.button.width + "px";
                            message.style.minWidth = moduleData.button.minWidth + "px";
                            if (moduleData.button.width !== moduleData.button.defaultWidth) {
                                message.style.width = moduleData.button.width + "px";
                            }
                            configuration.pwmRoot.element.appendChild(message);
                            logger.log.debug("message after button built");
                        },
                        button: function createButton() {
                            var button = document.createElement("div");
                            button.id = configuration.html.pwmButtonId;
                            button.style.direction = "rtl";
                            button.style.fontFamily = "\"max\", Fallback, sans-serif";
                            button.style.letterSpacing = "-0.07px";
                            button.style.fontSize = "22px";
                            button.style.height = moduleData.button.height + "px";
                            button.style.verticalAlign = "middle";
                            button.style.lineHeight = (moduleData.button.height - ((moduleData.button.height / 2) - 22)) + "px";
                            button.style.textAlign = "center";
                            button.style.borderRadius = moduleData.button.borderRadius + "px";
                            button.style.background = moduleData.button.backgroundColor;
                            button.style.color = moduleData.button.textColor;
                            button.style.maxWidth = moduleData.button.width + "px";
                            button.style.minWidth = moduleData.button.minWidth + "px";
                            if (moduleData.button.width !== moduleData.button.defaultWidth) {
                                button.style.width = moduleData.button.width + "px";
                            }
                            button.style.display = "block";
                            button.style.margin = "auto";
                            button.style.cursor = "pointer";
                            helper.dom.setElementPublicAction(button, "pay");
                            button.innerHTML = moduleData.button.htmlOrText;
                            if (!helper.browserData.properties.isMobile) {
                                button.onmouseover = pwmButtonMouseOver;
                                button.onmouseout = pwmButtonMouseOut;

                                function pwmButtonMouseOver() {
                                    arrow.style.borderWidth = "0px 3px 3px 0px";
                                    arrow.style.marginRight = "10px";
                                }

                                function pwmButtonMouseOut() {
                                    arrow.style.borderWidth = "0";
                                    arrow.style.marginRight = "0";
                                }
                            }
                            configuration.pwmRoot.element.appendChild(button);

                            if (!helper.browserData.properties.isMobile) {
                                var arrow = document.createElement("span");
                                arrow.style.border = "solid";
                                arrow.style.borderColor = moduleData.button.textColor;
                                arrow.style.transform = "rotate(135deg)";
                                arrow.style.display = "inline-block";
                                arrow.style.width = "0";
                                arrow.style.height = "0";
                                arrow.style.padding = "4px";
                                arrow.style.borderWidth = "0";
                                arrow.style.marginRight = "0";
                                arrow.style.transition = "margin 0.3s ease";
                                button.appendChild(arrow);
                            }

                            logger.log.debug("pwm button built");

                            if (!moduleData.button.enabled) {
                                logger.log.debug("pwm button disabled");
                                html.interact.pwmButton.disable();
                            }
                        },
                    },
                    popup: {
                        background: function createBackgroundCover() {
                            var backGround = document.getElementById(configuration.html.backgroundCoverId);
                            if (!backGround || !htmlHelper.validateGeniuineBaseElement(backGround)) {
                                backGround = document.createElement("div");
                                backGround.id = configuration.html.backgroundCoverId;
                                backGround.setAttribute("data-sid", helper.sessionId);
                                backGround.style.position = "fixed";
                                backGround.style.top = 0;
                                backGround.style.left = 0;
                                backGround.style.width = "100%";
                                backGround.style.height = "100%";
                                backGround.style.background = "rgba(0, 0, 0, 0.6)";
                                backGround.style.zIndex = 2147483600;
                                document.body.appendChild(backGround);
                                logger.log.debug("popup background built");
                            }
                        },
                        popupLayout: function createPopupLayout() {
                            var popup = document.getElementById(configuration.html.popup.id);
                            if (!popup || !htmlHelper.validateGeniuineBaseElement(popup)) {
                                popup = document.createElement("div");
                                popup.id = configuration.html.popup.id;
                                popup.setAttribute("data-sid", helper.sessionId);
                                popup.style.direction = "rtl";
                                popup.style.background = "#FFFFFF";
                                popup.style.borderRadius = "5px";
                                popup.style.padding = "50px 0 20px";
                                popup.style.position = "absolute";
                                popup.style.top = "50%";
                                popup.style.left = "50%";
                                popup.style.transform = "translate(-50%, -50%)";
                                popup.style.overflowY = "auto";
                                popup.style.zIndex = 2147483601;
                                if (htmlHelper.isSmallScreen) {
                                    popup.style.minWidth = "335px";
                                    popup.style.minHeight = "400px";
                                } else {
                                    popup.style.minWidth = "740px";
                                    popup.style.minHeight = "500px";
                                }
                                //window.addEventListener("resize", htmlHelper.resizePop);
                                document.getElementById(configuration.html.backgroundCoverId).appendChild(popup);

                                var x = document.createElement("div");
                                x.id = configuration.html.popup.xId;
                                x.innerText = "+";
                                x.style.fontFamily = "serif";
                                x.style.fontSize = "24px";
                                x.style.height = "18px";
                                x.style.width = "18px";
                                x.style.transform = "rotate(45deg)";
                                x.style.position = "absolute";
                                x.style.top = "10px";
                                x.style.left = "10px";
                                x.style.lineHeight = "18px";
                                x.style.textAlign = "center";
                                x.style.cursor = "pointer";
                                x.style.userSelect = "none";
                                helper.dom.setElementPublicAction(x, "closePopup");
                                popup.appendChild(x);

                                var message = document.createElement("div");
                                message.id = configuration.html.popup.messageId;
                                message.style.margin = "0 auto";
                                message.style.width = "100%";
                                message.style.zIndex = 2147483602;
                                popup.appendChild(message);

                                var title = document.createElement("div");
                                title.id = configuration.html.popup.messageTitle;
                                title.style.textAlign = "center";
                                title.style.fontFamily = "max, Fallback, sans-serif";
                                title.style.color = "#000000";
                                title.style.fontWeight = "bold";
                                title.style.padding = "0 10px";
                                title.style.marginBottom = "40px";
                                title.style.zIndex = 2147483603;
                                if (htmlHelper.isSmallScreen) {
                                    title.style.fontSize = "22px";
                                    title.style.letterSpacing = "-0.07px";
                                } else {
                                    title.style.fontSize = "24px";
                                    title.style.letterSpacing = "-0.25px";
                                }
                                message.appendChild(title);

                                var text = document.createElement("div");
                                text.id = configuration.html.popup.messageText;
                                text.style.fontFamily = "max, Fallback, sans-serif";
                                text.style.textAlign = "center";
                                text.style.color = "#000000";
                                text.style.padding = "0 10px";
                                text.style.zIndex = 2147483603;
                                if (htmlHelper.isSmallScreen) {
                                    text.style.fontSize = "18px";
                                    text.style.letterSpacing = "-0.07px";
                                } else {
                                    text.style.fontSize = "20px";
                                    text.style.letterSpacing = "-0.25px";
                                }
                                message.appendChild(text);

                                var messageContent = document.createElement("div");
                                messageContent.id = configuration.html.popup.messageContent;
                                messageContent.style.textAlign = "center";
                                messageContent.style.margin = "0 auto";
                                messageContent.style.width = "100%";
                                messageContent.style.zIndex = 2147483603;
                                if (htmlHelper.isSmallScreen) {
                                    messageContent.style.marginTop = "50px";
                                } else {
                                    messageContent.style.marginTop = "80px";
                                }
                                message.appendChild(messageContent);

                                var buttonWrapper = document.createElement("div");
                                buttonWrapper.id = configuration.html.popup.buttonWrapper;
                                buttonWrapper.style.margin = "0 auto 0";
                                buttonWrapper.style.width = "100%";
                                buttonWrapper.style.zIndex = 2147483602;
                                popup.appendChild(buttonWrapper);

                                var aboveButtonAction = document.createElement("div");
                                aboveButtonAction.id = configuration.html.popup.aboveButtonActionId;
                                aboveButtonAction.style.fontFamily = "max, Fallback, sans-serif";
                                aboveButtonAction.style.textAlign = "center";
                                aboveButtonAction.style.margin = "0 auto";
                                aboveButtonAction.style.width = "100%";
                                aboveButtonAction.style.height = "24px";
                                aboveButtonAction.style.margin = "0 auto 0";
                                if (htmlHelper.isSmallScreen) {
                                    aboveButtonAction.style.fontSize = "14px";
                                    aboveButtonAction.style.letterSpacing = "-0.07px";
                                } else {
                                    aboveButtonAction.style.fontSize = "16px";
                                    aboveButtonAction.style.letterSpacing = "-0.25px";
                                }
                                aboveButtonAction.style.zIndex = 2147483604;
                                buttonWrapper.appendChild(aboveButtonAction);

                                var button = document.createElement("div");
                                button.id = configuration.html.popup.buttonId;
                                button.style.direction = "rtl";
                                button.style.fontFamily = "max, Fallback, sans-serif";
                                button.style.textAlign = "center";
                                button.style.cursor = "pointer";
                                button.style.border = "none";
                                button.style.height = "51px";
                                button.style.width = "267px";
                                button.style.borderRadius = "26px";
                                button.style.background = "#67EED5";
                                button.style.color = "#021652";
                                helper.dom.setElementPublicAction(button, "closePopup");
                                button.style.zIndex = 2147483603;
                                button.style.verticalAlign = "middle";
                                button.style.margin = "0 auto 0";
                                button.innerHTML = "";
                                if (htmlHelper.isSmallScreen) {
                                    button.style.letterSpacing = "-0.07px";
                                    button.style.fontSize = "18px";
                                    button.style.lineHeight = "44.5px";
                                } else {
                                    button.style.letterSpacing = "-0.25px";
                                    button.style.fontSize = "20px";
                                    button.style.lineHeight = "46.5px";
                                }
                                buttonWrapper.appendChild(button);

                                var secondaryButton = document.createElement("button");
                                secondaryButton.id = configuration.html.popup.secondaryButtonId;
                                secondaryButton.style.direction = "rtl";
                                secondaryButton.style.fontFamily = "max, Fallback, sans-serif";
                                secondaryButton.style.textAlign = "center";
                                secondaryButton.style.cursor = "pointer";
                                secondaryButton.style.border = "none";
                                secondaryButton.style.height = "51px";
                                secondaryButton.style.width = "267px";
                                secondaryButton.style.borderRadius = "26px";
                                secondaryButton.style.background = "#FFFFFF";
                                secondaryButton.style.color = "#479BA2";
                                helper.dom.setElementPublicAction(secondaryButton, "closePopup");
                                secondaryButton.style.zIndex = 2147483603;
                                button.style.margin = "0 auto 0";
                                secondaryButton.innerHTML = "";
                                if (htmlHelper.isSmallScreen) {
                                    secondaryButton.style.letterSpacing = "-0.07px";
                                    secondaryButton.style.fontSize = "16px";
                                } else {
                                    secondaryButton.style.letterSpacing = "-0.25px";
                                    secondaryButton.style.fontSize = "18px";
                                    secondaryButton.style.bottom = "50px";
                                }
                                buttonWrapper.appendChild(secondaryButton);

                                if (moduleData.initMode === 1 || moduleData.initMode === 3) {
                                    var asterisk = document.createElement("div");
                                    asterisk.id = configuration.html.popup.asteriksId;
                                    asterisk.style.fontFamily = "max, Fallback, sans-serif";
                                    asterisk.style.textAlign = "center";
                                    asterisk.style.margin = "0 auto";
                                    asterisk.style.width = "100%";
                                    asterisk.style.height = "24px";
                                    if (htmlHelper.isSmallScreen) {
                                        asterisk.style.fontSize = "14px";
                                        asterisk.style.letterSpacing = "-0.07px";
                                    } else {
                                        asterisk.style.fontSize = "16px";
                                        asterisk.style.letterSpacing = "-0.25px";
                                    }
                                    asterisk.style.zIndex = 2147483604;
                                    buttonWrapper.appendChild(asterisk);

                                    var error = document.createElement("div");
                                    error.id = configuration.html.popup.errorId;
                                    error.style.fontFamily = "max, Fallback, sans-serif";
                                    error.style.textAlign = "center";
                                    error.style.width = "100%";
                                    error.style.height = "24px";
                                    error.style.color = "red";
                                    if (htmlHelper.isSmallScreen) {
                                        error.style.fontSize = "14px";
                                        error.style.letterSpacing = "-0.07px";
                                    } else {
                                        error.style.fontSize = "16px";
                                        error.style.letterSpacing = "-0.25px";
                                    }
                                    error.style.zIndex = 2147483604;
                                    buttonWrapper.appendChild(error);
                                }

                                var timerWrapper = document.createElement("div");
                                timerWrapper.id = configuration.html.popup.timerWrapper;
                                buttonWrapper.appendChild(timerWrapper);

                                logger.log.debug("popup built");
                            }
                        },
                        loader: function createLoader() {
                            var loader = document.getElementById(configuration.html.loaderId);
                            if (!loader || !htmlHelper.validateGeniuineBaseElement(loader)) {
                                loader = document.createElement("div");
                                loader.id = configuration.html.loaderId;
                                loader.setAttribute("data-sid", helper.sessionId);
                                loader.style.display = "block";
                                loader.style.content = "";
                                loader.style.background = "url(" + configuration.html.images.loader.spinner + ")";
                                loader.style.backgroundSize = "cover";
                                loader.style.width = "150px";
                                loader.style.height = "150px";
                                loader.style.position = "absolute";
                                loader.style.top = "50%";
                                loader.style.left = "50%";
                                loader.style.transform = "translate(-50%, -50%)";
                                loader.style.pointerEvents = "none";
                                loader.style.zIndex = 2147483601;
                                document.getElementById(configuration.html.backgroundCoverId).appendChild(loader);
                                logger.log.debug("loader built");
                            }
                        }
                    },
                    message: function(type) {
                        if (html.currentMessageType === null) {
                            html.remove.loader();
                        }
                        // in case webste interacted with html - try to re-create background and popup
                        html.create.popup.background();
                        html.create.popup.popupLayout();
                        if (html.currentMessageType !== type) {
                            html.interact.resetPopupButtonStyle();
                            switch (type) {
                                case html.messageType.userDetailsPrompt:
                                    createUserDetailsPromptMessage();
                                    ct.startEvent("Pop-up " + type + " appeared");
                                    break;
                                case html.messageType.transactionValid:
                                    createTransactionValidMessage();
                                    ct.startEvent("Pop-up " + type + " appeared");
                                    break;
                                case html.messageType.transactionIsAboutToExpire:
                                    createTransactionIsAboutToExpireMessage();
                                    ct.startEvent("Pop-up " + type + " appeared");
                                    break;
                                case html.messageType.transactionProccessing:
                                    createTransactionProccessingMessage();
                                    ct.endEvent("Pop-up " + type + " appeared");
                                    break;
                                case html.messageType.transactionExpired:
                                    createTransactionExpiredMessage();
                                    ct.endEvent("Pop-up " + type + " appeared");
                                    break;
                                case html.messageType.transactionNotValid:
                                    switch (html.currentMessageType) {
                                        case html.messageType.transactionValid:
                                        case html.messageType.transactionIsAboutToExpire:
                                        case html.messageType.transactionProccessing:
                                            ct.endEvent("Pop-up " + type + " appeared");
                                            break;
                                        default:
                                            ct.startEvent("Pop-up " + type + " appeared");
                                            break;
                                    }
                                    createTransactionNotValidMessage();
                                    break;
                                case html.messageType.transactionAbandoned:
                                    ct.startEvent("Pop-up " + type + " appeared");
                                    createTransactionAbandonedMessage();
                                    break;
                                case html.messageType.transactionError:
                                    switch (html.currentMessageType) {
                                        case html.messageType.transactionValid:
                                        case html.messageType.transactionIsAboutToExpire:
                                        case html.messageType.transactionProccessing:
                                            ct.endEvent("Pop-up " + type + " appeared");
                                            break;
                                        default:
                                            ct.startEvent("Pop-up " + type + " appeared");
                                            break;
                                    }
                                    createTransactionErrorMessage();
                                    break;
                            }
                            logger.log.info(type.toLowerCase() + " message built");
                            html.currentMessageType = type;
                            //htmlHelper.resizePop();
                        }

                        function createUserDetailsPromptMessage() {
                            if (moduleData.popup.userDetailsPrompt.title) {
                                html.interact.setElementTextAndAction(htmlHelper.title, moduleData.popup.userDetailsPrompt.title);
                            }
                            if (moduleData.popup.userDetailsPrompt.htmlOrText) {
                                html.interact.setElementTextAndAction(htmlHelper.text, moduleData.popup.userDetailsPrompt.htmlOrText);
                            }

                            htmlHelper.buttonWrapper.style.marginTop = htmlHelper.isSmallScreen ? "50px" : "135px";

                            var idInput = document.createElement("input");
                            idInput.type = "tel";
                            idInput.id = configuration.html.popup.requestUserDetailsTextBoxId;
                            idInput.placeholder = "מספר הזהות שלך";
                            idInput.style.border = "1px grey solid";
                            idInput.style.borderRadius = "2px";
                            idInput.style.textAlign = "center";
                            idInput.style.margin = "10px";
                            idInput.style.fontSize = "20px";
                            idInput.maxLength = 9;
                            idInput.onkeypress = checkEnter;
                            if (htmlHelper.isSmallScreen) {
                                idInput.style.width = "85%";
                                idInput.style.maxWidth = "420px";
                                idInput.style.height = "50px";
                            } else {
                                idInput.style.width = "300px";
                                idInput.style.height = "50px";
                            }
                            if (transactionData.userId) {
                                idInput.value = transactionData.userId;
                            }
                            htmlHelper.messageContent.appendChild(idInput);

                            var phoneInput = document.createElement("input");
                            phoneInput.type = "tel";
                            phoneInput.id = configuration.html.popup.requestUserDetailsTextBoxPhoneNumber;
                            phoneInput.placeholder = "מס' הטלפון הנייד שלך";
                            phoneInput.style.border = "1px grey solid";
                            phoneInput.style.borderRadius = "2px";
                            phoneInput.style.textAlign = "center";
                            phoneInput.style.margin = "10px";
                            phoneInput.style.fontSize = "20px";
                            phoneInput.maxLength = 10;
                            phoneInput.onkeypress = checkEnter;
                            if (htmlHelper.isSmallScreen) {
                                phoneInput.style.width = "85%";
                                phoneInput.style.maxWidth = "420px";
                                phoneInput.style.height = "50px";
                            } else {
                                phoneInput.style.width = "300px";
                                phoneInput.style.height = "50px";
                            }
                            if (transactionData.userId) {
                                phoneInput.value = transactionData.phoneNumber;
                            }
                            htmlHelper.messageContent.appendChild(phoneInput);
                            htmlHelper.messageContent.style.display = "block";

                            html.interact.setElementTextAndAction(htmlHelper.button, "המשך", "setUserDetails");
                            htmlHelper.button.style.background = "#67EDD5";
                            htmlHelper.button.style.color = "#021652";

                            if (moduleData.popup.userDetailsPrompt.asteriks) {
                                html.interact.setElementTextAndAction(htmlHelper.asteriks, moduleData.popup.userDetailsPrompt.asteriks);
                            }

                            function checkEnter(event) {
                                if (event.keyCode === 13) {
                                    event.preventDefault();
                                    ___pwm.do("setUserDetails");
                                    return false;
                                }
                            }
                        }

                        function createTransactionValidMessage() {
                            helper.dom.setElementPublicAction(htmlHelper.xButton, "cancel");

                            if (moduleData.popup.transactionValid.title) {
                                html.interact.setElementTextAndAction(htmlHelper.title, moduleData.popup.transactionValid.title);
                            }
                            if (moduleData.popup.transactionValid.htmlOrText) {
                                html.interact.setElementTextAndAction(htmlHelper.text, moduleData.popup.transactionValid.htmlOrText);
                            }
                            if (!helper.browserData.properties.isMobile) {
                                html.interact.setElementTextAndAction(htmlHelper.aboveButtonAction, "לא קיבלתי את ההתראה");
                                html.interact.setElementTextAndAction(htmlHelper.button, "שלחו לי ב SMS", "resendNotification");
                            }
                        }

                        function createTransactionProccessingMessage() {
                            helper.dom.removeElementPublicAction(htmlHelper.xButton);
                            htmlHelper.xButton.style.display = "none";

                            if (moduleData.popup.transactionProccessing.title) {
                                html.interact.setElementTextAndAction(htmlHelper.title, moduleData.popup.transactionProccessing.title);
                            }
                            if (moduleData.popup.transactionProccessing.htmlOrText) {
                                html.interact.setElementTextAndAction(htmlHelper.text, moduleData.popup.transactionProccessing.htmlOrText);
                            }

                            var loader = document.createElement("div");
                            loader.style.display = "block";
                            loader.style.content = "";
                            loader.style.background = "url(" + configuration.html.images.loader.max + ")";
                            loader.style.backgroundSize = "cover";
                            loader.style.zIndex = 2147483603;
                            if (htmlHelper.isSmallScreen) {
                                loader.style.width = "70px";
                                loader.style.height = "70px";
                                loader.style.margin = "20px auto";
                            } else {
                                loader.style.width = "100px";
                                loader.style.height = "100px";
                                loader.style.margin = "25px auto";
                            }
                            htmlHelper.messageContent.appendChild(loader);
                            htmlHelper.messageContent.style.display = "block";
                        }

                        function createTransactionIsAboutToExpireMessage() {
                            helper.dom.setElementPublicAction(htmlHelper.xButton, "cancel");

                            if (moduleData.popup.transactionIsAboutToExpire.title) {
                                html.interact.setElementTextAndAction(htmlHelper.title, moduleData.popup.transactionIsAboutToExpire.title);
                            }
                            if (moduleData.popup.transactionIsAboutToExpire.htmlOrText) {
                                html.interact.setElementTextAndAction(htmlHelper.text, moduleData.popup.transactionIsAboutToExpire.htmlOrText);
                            }

                            var timerBarWrapper = document.createElement("div");
                            timerBarWrapper.style.display = "inline-block";
                            timerBarWrapper.style.width = "100%";
                            htmlHelper.timerWrapper.appendChild(timerBarWrapper);

                            var timerBar = document.createElement("div");
                            timerBar.id = configuration.html.popup.timerBar;
                            timerBar.style.width = "100%";
                            timerBar.style.height = "3px";
                            timerBar.style.float = "right";
                            timerBar.style.backgroundColor = "#479BA2";
                            timerBarWrapper.appendChild(timerBar);

                            var timerCounterWrapper = document.createElement("div");
                            timerCounterWrapper.style.display = "inline-block";
                            timerCounterWrapper.style.width = "100%";
                            timerCounterWrapper.style.textAlign = "center";
                            htmlHelper.timerWrapper.appendChild(timerCounterWrapper);

                            var timerText = document.createElement("span");
                            timerText.style.fontFamily = "max, Fallback, sans-serif";
                            timerText.innerText = "הזמן שנותר ";
                            if (htmlHelper.isSmallScreen) {
                                timerText.style.fontSize = "16px";
                                timerText.style.letterSpacing = "-0.07px";
                            } else {
                                timerText.style.fontSize = "18px";
                                timerText.style.letterSpacing = "-0.25px";
                            }
                            timerCounterWrapper.appendChild(timerText);

                            var timerCounter = document.createElement("span");
                            timerCounter.id = configuration.html.popup.timerCounter;
                            timerCounter.style.fontFamily = "max, Fallback, sans-serif";
                            timerCounter.innerText = "01:00";
                            if (htmlHelper.isSmallScreen) {
                                timerCounter.style.fontSize = "16px";
                                timerCounter.style.letterSpacing = "-0.07px";
                            } else {
                                timerCounter.style.fontSize = "18px";
                                timerCounter.style.letterSpacing = "-0.25px";
                            }
                            timerCounterWrapper.appendChild(timerCounter);

                            if (!helper.browserData.properties.isMobile) {
                                html.interact.setElementTextAndAction(htmlHelper.aboveButtonAction, "לא קיבלתי את ההודעה");
                                html.interact.setElementTextAndAction(htmlHelper.button, "שלחו לי ב SMS", "resendNotification");
                            }

                            htmlHelper.buttonWrapper.style.marginTop = helper.browserData.properties.isMobile ? "150px" : "170px";
                            htmlHelper.timerWrapper.style.display = "block";
                        }

                        function createTransactionExpiredMessage() {
                            if (moduleData.popup.transactionExpired.title) {
                                html.interact.setElementTextAndAction(htmlHelper.title, moduleData.popup.transactionExpired.title);
                            }
                            if (moduleData.popup.transactionExpired.htmlOrText) {
                                html.interact.setElementTextAndAction(htmlHelper.text, moduleData.popup.transactionExpired.htmlOrText);
                            }
                            html.interact.setElementTextAndAction(htmlHelper.button, "להתחיל מחדש", "pay");
                            htmlHelper.buttonWrapper.style.marginTop = htmlHelper.isSmallScreen ? "50px" : "110px";
                        }

                        function createTransactionNotValidMessage() {
                            if (moduleData.popup.transactionNotValid.title) {
                                html.interact.setElementTextAndAction(htmlHelper.title, moduleData.popup.transactionNotValid.title);
                            }
                            if (moduleData.popup.transactionNotValid.htmlOrText) {
                                html.interact.setElementTextAndAction(htmlHelper.text, moduleData.popup.transactionNotValid.htmlOrText);
                            }
                            html.interact.setElementTextAndAction(htmlHelper.button, "אוקי", "closePopup");
                            htmlHelper.buttonWrapper.style.marginTop = helper.browserData.properties.isMobile ? "90px" : "220px";
                        }

                        function createTransactionAbandonedMessage() {
                            if (moduleData.popup.transactionAbandoned.title) {
                                html.interact.setElementTextAndAction(htmlHelper.title, moduleData.popup.transactionAbandoned.title);
                            }
                            if (moduleData.popup.transactionAbandoned.htmlOrText) {
                                html.interact.setElementTextAndAction(htmlHelper.text, moduleData.popup.transactionAbandoned.htmlOrText);
                            }
                            html.interact.setElementTextAndAction(htmlHelper.button, "אוקי", "closePopup");
                            htmlHelper.buttonWrapper.style.marginTop = helper.browserData.properties.isMobile ? "140px" : "230px";
                        }

                        function createTransactionErrorMessage() {
                            if (moduleData.popup.error.title) {
                                html.interact.setElementTextAndAction(htmlHelper.title, moduleData.popup.error.title);
                            }
                            if (moduleData.popup.error.htmlOrText) {
                                html.interact.setElementTextAndAction(htmlHelper.text, moduleData.popup.error.htmlOrText);
                            }
                            html.interact.setElementTextAndAction(htmlHelper.button, "אוקי", "closePopup");
                            htmlHelper.buttonWrapper.style.marginTop = helper.browserData.properties.isMobile ? "140px" : "230px";
                        }
                    }
                },
                remove: {
                    backgroundCover: function removeBackgroundCover() {
                        htmlHelper.removeElement(configuration.html.backgroundCoverId);
                        html.currentMessageType = null;
                        logger.log.debug("popup background removed");
                    },
                    loader: function removeLoader() {
                        htmlHelper.removeElement(configuration.html.loaderId);
                        logger.log.debug("loader removed");
                    },
                    popup: function removePopup() {
                        //window.removeEventListener("resize", htmlHelper.resizePop);
                        htmlHelper.removeElement(configuration.html.popup.id);
                        html.currentMessageType = null;
                        logger.log.debug("popup removed");
                    }
                },
                interact: {
                    pwmButton: {
                        enable: function() {
                            var button = document.getElementById("pwm_btn");
                            button.style.filter = null;
                            button.style.cursor = "pointer";
                            button.disabled = null;
                            moduleData.button.enabled = true;
                        },
                        disable: function() {
                            var button = document.getElementById("pwm_btn");
                            button.style.filter = "grayscale(100%)";
                            button.style.cursor = "not-allowed";
                            button.disabled = "disabled";
                            moduleData.button.enabled = false;
                        },
                    },
                    resetPopupButtonStyle: function resetPopupButtonStyle() {
                        htmlHelper.xButton.style.display = "block";
                        helper.dom.setElementPublicAction(htmlHelper.xButton, "closePopup");

                        htmlHelper.title = "";
                        htmlHelper.title.style.display = "none";
                        htmlHelper.text = "";
                        htmlHelper.text.style.display = "none";
                        htmlHelper.messageContent.innerHTML = "";
                        htmlHelper.messageContent.style.display = "none";
                        htmlHelper.messageContent.style.marginTop = htmlHelper.isSmallScreen ? "50px" : "80px";

                        htmlHelper.aboveButtonAction.style.display = "none";
                        htmlHelper.aboveButtonAction.style.innerHTML = "";

                        htmlHelper.buttonWrapper.style.marginTop = htmlHelper.isSmallScreen ? "76px" : "176px";

                        htmlHelper.button.style.display = "none";
                        htmlHelper.button.innerHTML = "";
                        htmlHelper.button.style.background = "#67EED5";
                        htmlHelper.button.style.color = "#021652";
                        helper.dom.removeElementPublicAction(htmlHelper.button);

                        htmlHelper.secondaryButton.style.display = "none";
                        htmlHelper.secondaryButton.innerHTML = "";
                        helper.dom.removeElementPublicAction(htmlHelper.secondaryButton);

                        if (moduleData.initMode === 1 || moduleData.initMode === 3) {
                            htmlHelper.asteriks.style.display = "none";
                        }

                        if (html.currentMessageType === html.messageType.transactionIsAboutToExpire) {
                            html.interact.resetExpirationTimer();
                        }

                        htmlHelper.timerWrapper.style.display = "none";
                    },
                    setElementTextAndAction: function setElementTextAndAction(element, text, action) {
                        element.innerHTML = text;
                        element.style.display = "block";
                        if (action) {
                            helper.dom.setElementPublicAction(element, action);
                        }
                    },
                    setPopupError: function setPopupError(error, invalidFieldsIds) {
                        if (invalidFieldsIds && invalidFieldsIds.length > 0) {
                            invalidFieldsIds.forEach(function(invalidFieldId) {
                                var textBox = document.getElementById(invalidFieldId);
                                if (!textBox.hasAttribute("data-original-textbox-bordercolor")) {
                                    textBox.setAttribute("data-original-textbox-bordercolor", textBox.style.borderColor);
                                }
                                textBox.style.borderColor = "red";
                            });
                        }
                        document.getElementById(configuration.html.popup.errorId).innerText = error;
                    },
                    resetPopupError: function resetPopupError(invalidFieldsIds) {
                        if (invalidFieldsIds && invalidFieldsIds.length > 0) {
                            invalidFieldsIds.forEach(function(invalidFieldId) {
                                var textBox = document.getElementById(invalidFieldId);
                                if (textBox.hasAttribute("data-original-textbox-bordercolor")) {
                                    textBox.style.borderColor = textBox.getAttribute("data-original-textbox-bordercolor");
                                    textBox.removeAttribute("data-original-textbox-bordercolor");
                                }

                            });
                        }
                        html.interact.setPopupError("");
                    },
                    setExpirationTimer: function setExpirationTimer(seconds) {
                        if (expirationTimerInterval) {
                            return;
                        }
                        var secondsLeft = seconds;
                        var secondsLeftCounter = seconds;
                        expirationTimerInterval = setInterval(function() {
                            secondsLeftCounter--;
                            document.getElementById(configuration.html.popup.timerBar).style.width = ((secondsLeftCounter / secondsLeft) * 100) + "%";
                            document.getElementById(configuration.html.popup.timerCounter).innerText = ((secondsLeftCounter - (secondsLeftCounter % 60)) / 60).toString().padStart(2, '0') + ":" + (secondsLeftCounter % 60).toString().padStart(2, '0');
                            if (secondsLeftCounter <= 0) {

                            }

                        }, 1000);
                    },
                    resendNotification: {
                        sending: function resendNotificationSending() {
                            // loader = document.createElement("div");
                            // loader.id = configuration.html.loaderId;
                            // loader.setAttribute("data-sid", helper.sessionId);
                            // loader.style.display = "block";
                            // loader.style.content = "";
                            // loader.style.background = "url(" + configuration.html.images.loader.spinner + ")";
                            // loader.style.backgroundSize = "cover";
                            // loader.style.width = "150px";
                            // loader.style.height = "150px";
                            // loader.style.position = "absolute";
                            // loader.style.top = "50%";
                            // loader.style.left = "50%";
                            // loader.style.transform = "translate(-50%, -50%)";
                            // loader.style.pointerEvents = "none";
                            // loader.style.zIndex = 2147483601;
                            // document.getElementById(configuration.html.backgroundCoverId).appendChild(loader);
                            // logger.log.debug("loader built");
                            html.interact.setElementTextAndAction(htmlHelper.aboveButtonAction, "ברגעים אלה נשלחת אלייך הודעת SMS...");
                            htmlHelper.button.style.display = "none";
                            htmlHelper.buttonWrapper.style.marginTop = (htmlHelper.buttonWrapper.style.marginTop.replace(/\D/g, '') - 0 + 25) + "px";

                        },
                        sent: function resendNotificationSent() {
                            html.interact.setElementTextAndAction(htmlHelper.aboveButtonAction, "עדיין לא קיבלתי");
                            html.interact.setElementTextAndAction(htmlHelper.button, "שלחו לי ב SMS שוב", "resendNotification");
                            htmlHelper.button.style.display = "block";
                            htmlHelper.buttonWrapper.style.marginTop = (htmlHelper.buttonWrapper.style.marginTop.replace(/\D/g, '') - 25) + "px";
                        }
                    },
                    resetExpirationTimer: function resetExpirationTimer() {
                        if (expirationTimerInterval) {
                            clearInterval(expirationTimerInterval);
                            expirationTimerInterval = null;
                        }
                    }
                },
                resetPwmRoot: function resetPwmRoot() {
                    // TODO: not style
                    configuration.pwmRoot.element.innerHTML = "";
                },
                messageType: {
                    userDetailsPrompt: "User details prompt",
                    transactionValid: "Continue with max app",
                    transactionProccessing: "Successful Identification",
                    transactionIsAboutToExpire: "Continue with max app expires",
                    transactionExpired: "Transaction expired",
                    transactionNotValid: "Transaction not valid",
                    transactionAbandoned: "Transaction abandoned",
                    transactionError: "General error"
                },
                currentMessageType: null,
                init: function htmlInit() {
                    html.resetPwmRoot();
                    if (moduleData.messageBeforeButton.htmlOrText) {
                        html.create.pwmButton.messageBefore();
                    }
                    html.create.pwmButton.button();
                    if (moduleData.messageAfterButton.htmlOrText) {
                        html.create.pwmButton.messageAfter();
                    }
                    ct.startEvent("Show Pay with max Button");
                    logger.log.info("button shown (" + helper.browserData.properties.logMessage + ")");
                },
                s: "iNRMO",
                get S() {
                    return helper.s + html.s;
                }
            };
        })();

        // module dom interaction functions (clicks)
        var clientInteractions = {
            startTransaction: function startTransaction() {
                transactionData.inProgress = true;
                transactionData.transId = helper.generateGiud();
                api.addTransaction();
            },
            payWithMaxButtonClick: function payWithMaxButtonClick() {
                logger.log.debug("pwm button clicked");
                if (!moduleData.button.enabled) {
                    logger.log.warning("pwm button clicked - button disabled");
                    return;
                } else if (transactionData.inProgress) {
                    logger.log.warning("pwm button clicked - transation in proccess");
                    return;
                } else {
                    ct.startEvent("Press Pay with max Button");
                    html.remove.backgroundCover();
                    switch (moduleData.initMode) {
                        case 0: // JS object based initialization
                            logger.log.info("pwm button clicked");
                            break;
                        case 1: // JS object based initialization + user details popup
                            logger.log.info("pwm button clicked - requesting user details");
                            html.create.popup.background();
                            html.create.popup.popupLayout();
                            html.create.message(html.messageType.userDetailsPrompt);
                            return;
                        case 2: // attribute based initialization
                            logger.log.info("pwm button clicked - setting transation data");
                            transactionData.set();
                            break;
                        case 3: // attribute based initialization + user details popup
                            logger.log.info("pwm button clicked - setting transation data and requesting user details");
                            transactionData.set();
                            html.create.popup.background();
                            html.create.popup.popupLayout();
                            html.create.message(html.messageType.userDetailsPrompt);
                            return;
                    }
                    if (!siteCallBacks.onBeforeClick()) {
                        logger.log.warning("site's onbefore callback failed");
                        // ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Site callback failed"));
                        // html.create.message(html.messageType.transactionError);
                        return;
                    }
                    // validate properties
                    if (!helper.valitateProperties("pwm button clicked - validation failed")) {
                        ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Data validation failed"));
                        html.create.message(html.messageType.transactionError);
                        return;
                    }
                    html.create.popup.background();
                    html.create.popup.loader();
                    clientInteractions.startTransaction();
                }
            },
            setUserDetailsButtonClick: function setUserDetailsButtonClick(incommingData) {
                logger.log.debug("set user details button clicked");
                if (!moduleData.button.enabled) {
                    logger.log.warning("set user details button clicked - button disabled");
                    return;
                } else if (transactionData.inProgress) {
                    logger.log.warning("set user details button clicked - transation in proccess");
                    return;
                } else if (!transactionData.setUserDetailsCombinedInitModeData()) {
                    return;
                } else {
                    logger.log.info("set user details button clicked");
                    ct.startEvent("Pop-up details continue - OK");
                    if (!siteCallBacks.onBeforeClick()) {
                        // ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Site callback failed"));
                        // html.create.message(html.messageType.transactionError);
                        return;
                    }
                    // validate properties
                    if (!helper.valitateProperties("set user details button clicked - transaction data validation failed", true)) {
                        ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Data validation failed"));
                        html.create.message(html.messageType.transactionError);
                        return;
                    }
                    html.remove.popup();
                    html.create.popup.loader();
                    clientInteractions.startTransaction();
                }
            },
            resendNotificationButtonClick: function resendNotificationButtonClick() {
                logger.log.info("resend notification button clicked");
                if (!transactionData.inProgress) {
                    return;
                } else {
                    ct.startEvent("Press resend notification button");
                    html.interact.resendNotification.sending();
                    api.resendNotification();
                }
            },
            cancelButtonClick: function cancelButtonClick(sender) {
                logger.log.info("cancel clicked");
                if (!transactionData.inProgress) {
                    return;
                } else {
                    var buttonName;
                    switch (sender.currentTarget.id) {
                        case configuration.html.popup.xId:
                            buttonName = "X";
                            break;
                        case configuration.html.popup.buttonId:
                            buttonName = "declined";
                            break;
                        default:
                            buttonName = "unknown";
                            break;
                    }
                    ct.startEvent("Pop-up " + html.currentMessageType + " was closed with " + buttonName + " button");
                    api.cancelRequest();
                    html.remove.popup();
                    html.create.popup.loader();
                }
            },
            closePopupClick: function closePopupClick(sender) {
                logger.log.info("close clicked");
                var buttonName;
                switch (sender.currentTarget.id) {
                    case configuration.html.popup.xId:
                        buttonName = "X";
                        break;
                    case configuration.html.popup.buttonId:
                        buttonName = "main";
                        break;
                    default:
                        buttonName = "unknown";
                        break;
                }
                ct.startEvent("Pop-up " + html.currentMessageType + " was closed with " + buttonName + " button");
                transactionData.reset();
                html.remove.popup();
                html.remove.backgroundCover();
            },
            windowLeave: function windowLeave(event) {
                if (transactionData.inProgress) {
                    if (html.currentMessageType === html.messageType.transactionValid) {
                        ct.startEvent("User left browser");
                    }
                    logger.log.info("user left window" + (event && event.type ? (" [" + event.type + "]") : ""));
                }
            },
            windowFocus: function windowFocus(event) {
                if (transactionData.inProgress) {
                    if (html.currentMessageType === html.messageType.transactionValid) {
                        ct.startEvent("User returned to browser");
                    }
                    if (html.currentMessageType === html.messageType.transactionProccessing) {
                        ct.endEvent("User returned to browser");
                    }
                    logger.log.info("user returned to window" + (event && event.type ? (" [" + event.type + "]") : ""));
                    api.restartGetCardStatus();
                }
            },
            addStopAndResetTransactionFunction: function addStopAndResetTransactionFunction() {
                if (pwmPublicObject.hasOwnProperty(configuration.js.closePopupPropertyName)) {
                    delete pwmPublicObject[configuration.js.closePopupPropertyName];
                    logger.log.debug("closePopup function was removed from ___pwm object");
                }

                if (!pwmPublicObject.hasOwnProperty(configuration.js.closePopupPropertyName)) {
                    pwmPublicObject[configuration.js.stopAndResetTransactionPropertyName] = function() {
                        if (transactionData.inProgress) {
                            logger.log.info("transaction progress stopped and reseted by web site");
                            transactionData.reset(true);
                            api.clearIntervalsAndTimeouts();
                            html.remove.backgroundCover();
                        } else {
                            logger.log.warning("web site trying to stop and to reset the transaction progress, but transaction is not in progress");
                        }
                    };
                    logger.log.debug("stopAndReset function was added to ___pwm object");
                }
            },
            removeStopAndResetTransactionFunction: function removeStopAndResetTransactionFunction() {
                if (pwmPublicObject.hasOwnProperty(configuration.js.stopAndResetTransactionPropertyName)) {
                    delete pwmPublicObject[configuration.js.stopAndResetTransactionPropertyName];
                    logger.log.debug("stopAndReset function was removed from ___pwm object");
                }

                if (!pwmPublicObject.hasOwnProperty(configuration.js.closePopupPropertyName)) {
                    pwmPublicObject[configuration.js.closePopupPropertyName] = function() {
                        if (html.currentMessageType !== null) {
                            logger.log.info("popup [" + html.currentMessageType + "] was closed by web site");
                            html.remove.backgroundCover();
                            html.currentMessageType = null;
                            delete pwmPublicObject[configuration.js.closePopupPropertyName];
                            logger.log.debug("closePopup function was removed from ___pwm object");
                        } else {
                            logger.log.warning("web site trying to close popup, but no popup is showed");
                        }
                    };
                    logger.log.debug("closePopup function was added from ___pwm object");
                }
            },
            init: function init() {
                validateModulePreconfiguretion();
                // public functions for inner usage
                pwmPublicObject[configuration.js.doPropertyName] = function(sender) {
                    var action;
                    if (helper.isString(sender)) {
                        action = sender;
                    } else {
                        action = sender.currentTarget.attributes["data-pwm-action"].value;
                    }
                    try { // this public function that called after JS rendering, so global try/catch doesn't work here
                        switchAction(action, sender);
                    } catch (error) {
                        logger.log.fatal(helper.formatExceptionErrorMessage("Do [" + action + "]", error));
                    }
                };

                function switchAction(action, sender) {
                    switch (action) {
                        case "pay":
                            clientInteractions.payWithMaxButtonClick();
                            break;
                        case "resendNotification":
                            clientInteractions.resendNotificationButtonClick();
                            break;
                        case "setUserDetails":
                            clientInteractions.setUserDetailsButtonClick();
                            break;
                        case "cancel":
                            clientInteractions.cancelButtonClick(sender);
                            break;
                        case "closePopup":
                            clientInteractions.closePopupClick(sender);
                            break;
                    }
                }
                // public functions
                Object.defineProperty(pwmPublicObject, configuration.js.buttonEnabledPropertyName, {
                    configurable: true,
                    get: function() {
                        logger.log.debug("pwm button state [" + (moduleData.button.enabled ? "enabled" : "disabled") + "] checked by web site");
                        return moduleData.button.enabled;
                    },
                    set: function(state) {
                        try { // this public property that called after JS rendering, so global try/catch doesn't work here
                            if (typeof state !== "boolean") {
                                logger.log.error("web site trying to set button state with non boolean state [" + state.toString() + "]");
                                return;
                            }
                            logger.log.info("pwm button state [" + (moduleData.button.enabled ? "enabled" : "disabled") + "] changed to [" + (state === true ? "enabled" : "disabled") + "] by web site");
                            if (state) {
                                html.interact.pwmButton.enable();
                            } else {
                                html.interact.pwmButton.disable();
                            }
                        } catch (error) {
                            logger.log.fatal(helper.formatExceptionErrorMessage("Button enable", error));
                        }
                    }
                });
                Object.defineProperty(pwmPublicObject, configuration.js.moduleStatusPropertyName, {
                    configurable: true,
                    get: function() {
                        try { // this public property that called after JS rendering, so global try/catch doesn't work here
                            var result = {};
                            if (transactionData.inProgress) {
                                result.status = "running";
                            } else {
                                var transactionDataStatus = transactionData.validate();
                                result.status = transactionDataStatus.valid ? "ready" : "invalid";
                                result.errors = transactionDataStatus.errors;
                            }
                            logger.log.debug("pwm module state [" + result.status + "] checked by web site" + (result.valid ? "" : ". errors " + JSON.stringify(result.errors)));
                            return result;
                        } catch (error) {
                            logger.log.fatal(helper.formatExceptionErrorMessage("Module status", error));
                        }
                    }
                });
                Object.defineProperty(pwmPublicObject, configuration.js.configurationPropertyName, {
                    configurable: true,
                    set: function(data) {
                        try { // this public property that called after JS rendering, so global try/catch doesn't work here
                            logger.log.debug("module configuration fired");
                            if (helper.isObject(data) && (moduleData.initMode === 0 || moduleData.initMode === 1)) {
                                transactionData.set(data);
                                helper.valitateProperties("module configuration validation failed");
                            }
                            if (helper.isArray(data) || helper.isString(data)) {
                                logger.do(data);
                            }
                        } catch (error) {
                            logger.log.fatal(helper.formatExceptionErrorMessage("Module data configuration", error));
                        }
                    }
                });

                function validateModulePreconfiguretion() {
                    var modulePreconfiguration = pwmPublicObject[configuration.js.configurationPropertyName];
                    if (typeof modulePreconfiguration !== "undefined") { // module after before it's configuration initialized        
                        if (helper.isObject(modulePreconfiguration)) {
                            if (modulePreconfiguration[configuration.js.debugPropertyName]) {
                                clientInteractions.preConfiguration.debug = helper.copyByValue(modulePreconfiguration[configuration.js.debugPropertyName]);
                            }
                            if (modulePreconfiguration[configuration.js.logLevelPropertyName]) {
                                clientInteractions.preConfiguration.logLevel = helper.copyByValue(modulePreconfiguration[configuration.js.logLevelPropertyName]);
                            }
                            clientInteractions.preConfiguration.transaction = helper.copyByValue(modulePreconfiguration);
                            delete(clientInteractions.preConfiguration.transaction.debug);
                        }
                        if (helper.isArray(modulePreconfiguration)) {
                            clientInteractions.preConfiguration.debug = modulePreconfiguration[configuration.js.debugPropertyName];
                        }

                    }
                }
                logger.log.debug("client interactions initialized");
            },
            preConfiguration: { // used in case module was configured before module was loaded
                transaction: null,
                debug: null,
                logLevel: null
            },
            do: function(vc, kc) {
                return vc ^ kc;
            },
            s: "zsQbm"
        };

        // api calls
        var api = (function api() {
            var transactionStartedAt;
            var cardStatusRequestHelper = {
                suspensionTimeout: null,
                interval: null,
                failuresSuppressionPeriod: { // this section is needed to suppress single api failures that might be caused by network
                    timeout: null,
                    suspensionTimeoutAfterSuppressionPeriod: null,
                    running: false,
                    finishing: false,
                    counter: 0,
                    failuresCounter: 0,
                    totalFailuresCounter: 0
                }
            };
            var notificationsRequestHelper = {
                resendDelayTimeout: null,
                smsSent: 0
            };

            function clearIntervalsAndTimeouts() {
                clearMainIntervalsAndTimeouts();
                clearFailuresSuppressionPeriod();
                clearNotificationsSent();
                logger.log.debug("all card status request all cleared");
            }

            function clearMainIntervalsAndTimeouts() {
                clearTimeout(cardStatusRequestHelper.suspensionTimeout);
                clearInterval(cardStatusRequestHelper.interval);
                logger.log.debug("card status request main timeouts and interval cleared");
            }

            function clearFailuresSuppressionPeriod() {
                clearTimeout(cardStatusRequestHelper.failuresSuppressionPeriod.timeout);
                clearTimeout(cardStatusRequestHelper.failuresSuppressionPeriod.suspensionTimeoutAfterSuppressionPeriod);
                cardStatusRequestHelper.failuresSuppressionPeriod.counter = 0;
                cardStatusRequestHelper.failuresSuppressionPeriod.failuresCounter = 0;
                cardStatusRequestHelper.failuresSuppressionPeriod.totalFailuresCounter = 0;
                cardStatusRequestHelper.failuresSuppressionPeriod.running = false;
                cardStatusRequestHelper.failuresSuppressionPeriod.finishing = false;
                logger.log.debug("card status request failures suppression period cleared");
            }

            function clearNotificationsSent() {
                notificationsRequestHelper.smsSent = 0;
                clearTimeout(notificationsRequestHelper.resendDelayTimeout);
                logger.log.debug("notifications sent cleared");
            }

            function cardStatusRequest() {
                logger.log.debug("card status api called");
                clearTimeout(cardStatusRequestHelper.suspensionTimeout);
                var request = {
                    url: configuration.api.maxUrl + configuration.api.getCardStatus.uri.replace("TRANS_ID", transactionData.transId),
                    method: configuration.api.getCardStatus.method,
                    ignoreError404AfterTransactionFinished: configuration.api.getCardStatus.ignoreError404AfterTransactionFinished,
                    successCallbackFunction: function requestcardReadyCallbackFunction(response) {
                        var logMessage = "card status request success callback function fired";
                        if (!transactionData.inProgress) {
                            logger.log.debug(logMessage + " - transaction is not running");
                            return;
                        }
                        if (transactionData.cardIsReady) {
                            logger.log.debug(logMessage + " - card is already ready");
                            return;
                        }
                        if (cardStatusRequestHelper.failuresSuppressionPeriod.finishing) { // if module status pooling is paused, due to the network problem api responses shouldn't be proccessed
                            logger.log.debug(logMessage + " - within failures suppression period after failure suppression period");
                            return;
                        } else if (cardStatusRequestHelper.failuresSuppressionPeriod.running) { // if module is not paused due to the network problem, but failure suppression is running - stop and reset failure suppresion period
                            clearFailuresSuppressionPeriod();
                        }
                        logger.log.debug(logMessage);
                        switch (response.status) {
                            case 200:
                                ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Token"));
                                html.create.message(html.messageType.transactionProccessing);
                                var output = {};
                                output.transId = transactionData.transId;
                                clearIntervalsAndTimeouts();
                                transactionData.reset();
                                siteCallBacks.cardReady(output);
                                break;
                            case 202:
                                ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Encoded"));
                                html.create.message(html.messageType.transactionProccessing);
                                logger.log.debug("card is ready");
                                transactionData.cardIsReady = true;
                                clearIntervalsAndTimeouts();
                                ecnryptedCardRequest();
                                break;
                            case 403:
                                logger.log.debug("card is not ready yet");
                                return;
                            case 402:
                                html.create.message(html.messageType.transactionIsAboutToExpire);
                                html.interact.setExpirationTimer(60);
                                logger.log.debug("card is not ready yet and request is about to expire");
                                return;
                            case 408:
                                html.create.message(html.messageType.transactionExpired);
                                clearIntervalsAndTimeouts();
                                transactionData.reset();
                                logger.log.debug("request expired");
                                return;
                        }

                    },
                    failureCallbackFunction: function requestCardFailureCallbackFunction(response) {
                        var logMessage = "card status request failure callback function fired";
                        if (!transactionData.inProgress) {
                            logger.log.debug(logMessage + " - transaction is not running");
                            return;
                        }
                        if (transactionData.cardIsReady) {
                            logger.log.debug(logMessage + " - card is already ready");
                            return;
                        }
                        if (response.status === 0) {
                            // status 0 in most cases caused by API or network problem
                            // in this case failure suppression period is started so non consistent failures won't stop the transaction
                            // if the failure suppression period finishes while API constantly continues to fail API is paused for a short time to give the network some rest
                            // after several sequential periods transaction will be stopped
                            // if API returns a valid answer while with failure suppression period the failure suppression period is stopped and counters are reseted
                            if ((cardStatusRequestHelper.failuresSuppressionPeriod.counter + 1) <= configuration.api.getCardStatus.allowedFailuresSuppressionPeriods) {
                                if (!cardStatusRequestHelper.failuresSuppressionPeriod.running && !cardStatusRequestHelper.failuresSuppressionPeriod.finishing) {
                                    logger.log.debug(logMessage + " - starting failure suppression period [" + (cardStatusRequestHelper.failuresSuppressionPeriod.counter + 1) + "] for [" + configuration.api.getCardStatus.suppressFailuresPeriodMs + "MS] - failure [" + (cardStatusRequestHelper.failuresSuppressionPeriod.failuresCounter + 1) + "]");
                                    cardStatusRequestHelper.failuresSuppressionPeriod.running = true;
                                    cardStatusRequestHelper.failuresSuppressionPeriod.timeout = setTimeout(function() {
                                        logger.log.debug(logMessage + " - finished failure suppression period [" + (cardStatusRequestHelper.failuresSuppressionPeriod.counter + 1) + "], starting suspension after suppression period for [" + configuration.api.getCardStatus.suspendApiAfterFailuresSuppressionPeriodMs + "MS]");
                                        clearTimeout(cardStatusRequestHelper.failuresSuppressionPeriod.timeout);
                                        cardStatusRequestHelper.failuresSuppressionPeriod.finishing = true;
                                        clearMainIntervalsAndTimeouts();
                                        cardStatusRequestHelper.failuresSuppressionPeriod.suspensionTimeoutAfterSuppressionPeriod = setTimeout(function() {
                                            logger.log.warning(logMessage + " - finished suppression period and suspension [" + (cardStatusRequestHelper.failuresSuppressionPeriod.counter + 1) + "] for [" + (configuration.api.getCardStatus.suppressFailuresPeriodMs + configuration.api.getCardStatus.suspendApiAfterFailuresSuppressionPeriodMs) + "MS] with [" + cardStatusRequestHelper.failuresSuppressionPeriod.failuresCounter + "] failures");
                                            clearTimeout(cardStatusRequestHelper.failuresSuppressionPeriod.suspensionTimeoutAfterSuppressionPeriod);
                                            cardStatusRequestHelper.failuresSuppressionPeriod.running = false;
                                            cardStatusRequestHelper.failuresSuppressionPeriod.finishing = false;
                                            cardStatusRequestHelper.failuresSuppressionPeriod.counter++;
                                            cardStatusRequestHelper.failuresSuppressionPeriod.failuresCounter = 0;
                                            cardStatusRequest();
                                        }, configuration.api.getCardStatus.suspendApiAfterFailuresSuppressionPeriodMs);
                                    }, configuration.api.getCardStatus.suppressFailuresPeriodMs);
                                } else {
                                    logger.log.debug(logMessage + " - within suppression or suspension period [" + (cardStatusRequestHelper.failuresSuppressionPeriod.counter + 1) + "] - failure [" + (cardStatusRequestHelper.failuresSuppressionPeriod.failuresCounter + 1) + "]");
                                }
                                cardStatusRequestHelper.failuresSuppressionPeriod.failuresCounter++;
                                cardStatusRequestHelper.failuresSuppressionPeriod.totalFailuresCounter++;
                                return;
                            } else {
                                logger.log.error(logMessage + " - maximum failure suppression periods [" + configuration.api.getCardStatus.allowedFailuresSuppressionPeriods + "] exceeded with [" + (configuration.api.getCardStatus.suppressFailuresPeriodMs * configuration.api.getCardStatus.allowedFailuresSuppressionPeriods) + "MS] suppression periods and [" + (cardStatusRequestHelper.failuresSuppressionPeriod.totalFailuresCounter + 1) + "] failures");
                            }
                        }
                        logger.log.debug(logMessage);
                        clearIntervalsAndTimeouts();
                        transactionData.reset();
                        ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Status api failed"));
                        html.create.message(html.messageType.transactionError);
                    }
                };
                cardStatusRequestHelper.interval = setInterval(function() {
                    if ((new Date() - transactionStartedAt) > configuration.api.getCardStatus.lifeSpanMS) {
                        logger.log.warning("transaction life span exided [" + configuration.api.getCardStatus.lifeSpanMS + "MS] - transaction expired");
                        failureCallbackFunction();
                    }
                    sendRequest(request);
                }, configuration.api.getCardStatus.requestAnyMS);
            }

            function ecnryptedCardRequest() {
                logger.log.debug("encrypted card api called");
                var request = {
                    url: configuration.api.maxUrl + configuration.api.getEncryptedCard.uri.replace("TRANS_ID", transactionData.transId),
                    method: configuration.api.getEncryptedCard.method,
                    successCallbackFunction: function requestEncryptedCardReadyCallbackFunction(response) {
                        var logMessage = "encrypted card request success callback function fired";
                        if (!transactionData.inProgress) {
                            logger.log.debug(logMessage + " - transaction is not running");
                            return;
                        }
                        logger.log.debug(logMessage);
                        clearIntervalsAndTimeouts();
                        transactionData.reset();
                        var responseOutput = JSON.parse(response.responseText);
                        siteCallBacks.cardSuccess(responseOutput);
                    },
                    failureCallbackFunction: function requestCardFailureCallbackFunction(response) {
                        var logMessage = "encrypted card request failure callback function fired";
                        if (!transactionData.inProgress) {
                            logger.log.debug(logMessage + " - transaction is not running");
                            return;
                        }
                        logger.log.debug(logMessage);
                        transactionData.reset();
                        ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Card api failed"));
                        html.create.message(html.messageType.transactionError);
                    }
                };
                sendRequest(request);
            }

            function sendRequest(requestData) {
                var url = updateMaxUrl();
                var headers = updateMaxHeaders();

                logger.log.debug("api call fired request" +
                    "[url: [" + url + "]" +
                    ", method: [" + requestData.method + "]" +
                    (headers ? (", headers: [" + headers.map(function(header) { return "[\"" + header[0] + "\": \"" + header[1] + "\"]"; }) + "]") : "") +
                    ", payload: [" + JSON.stringify(requestData.payload) + "]" +
                    (requestData.successCallbackFunction ? (", success callback function: [" + requestData.successCallbackFunction.name + "]]") : "") +
                    (requestData.failureCallbackFunction ? (", failure callback function: [" + requestData.failureCallbackFunction.name + "]]") : "")
                );

                var request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                    try { // this function called synchronically after JS rendering, so global try/catch doesn't work here
                        switch (request.readyState) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                logger.log.debug(getLogMessage("in process"));
                                break;
                            case 4:
                                switch (request.status) {
                                    case 200: // success - server2server
                                    case 202: // success - server2client
                                    case 408: // ended - request expired
                                        if (helper.isMaxUrl(requestData.url)) {
                                            logger.log.info(getLogMessage("successed"));
                                        } else {
                                            logger.log.debug(getLogMessage("successed"));
                                        }
                                        fireCallbackFunction(requestData.successCallbackFunction, request);
                                        break;
                                    case 403: // card is not ready yet
                                    case 402: // card is not ready yet and request is about to expire
                                        logger.log.debug(getLogMessage("successed"));
                                        fireCallbackFunction(requestData.successCallbackFunction, request);
                                        break;
                                    case 404:
                                        if (requestData.ignoreError404AfterTransactionFinished && (!transactionData.inProgress || transactionData.cardIsReady)) { // do not log 404 error after transaction changed status
                                            logger.log.debug(getLogMessage("finished with logic error"));

                                        } else {
                                            if (!requestData.warningOnError404) {
                                                logger.log.error(getLogMessage("finished with logic error"));
                                            } else {
                                                logger.log.warning(getLogMessage("finished with logic error"));
                                            }
                                        }
                                        fireCallbackFunction(requestData.failureCallbackFunction, request);
                                        break;
                                    case 500:
                                    default:
                                        if (requestData.onErrorLogWarning) {
                                            logger.log.warning(getLogMessage("fatal error"));
                                        } else {
                                            logger.log.fatal(getLogMessage("fatal error"));
                                        }
                                        fireCallbackFunction(requestData.failureCallbackFunction, request);
                                        break;
                                }
                                break;
                        }

                        function getLogMessage(executionStatus) {
                            var secondPast = helper.timer.stop();
                            return "api request " + executionStatus + " [" +
                                "url: [" + url + "]" +
                                ", method: [" + requestData.method + "]" +
                                ", state: [" + request.readyState + "]" +
                                ", status: [" + request.status + "]" +
                                ", statusText: [" + request.statusText + "]" +
                                ", responseText: [" + request.responseText + "]" +
                                (secondPast !== 0 ? ", execution time: [" + secondPast + "s]" : "") +
                                "]";
                        }

                        function fireCallbackFunction(callbackFunction, inputObj) {
                            if (callbackFunction) {
                                callbackFunction(inputObj);
                            }
                        }
                    } catch (error) {
                        logger.log.fatal(helper.formatExceptionErrorMessage("XMLHttpRequest onreadystatechange", error));
                    }
                };
                request.open(requestData.method, url);
                if (headers) {
                    headers.forEach(function(header) {
                        request.setRequestHeader(header[0], header[1]);
                    });
                }
                helper.timer.start();
                if (requestData.payload) {
                    request.send(JSON.stringify(requestData.payload));
                } else {
                    request.send();
                }

                function updateMaxHeaders() {
                    var maxHeaders = [
                        ["Content-Type", "application/json"],
                        ["ACCEPT", "application/json"],
                        // ["X-IBM-CLIENT-ID", transactionData.clientId]
                        ["SID", helper.sessionId],
                        ["CU", helper.browserData.properties.url],
                        ["UR", helper.browserData.properties.urlReferrer],
                        ["UI", transactionData.userId]
                    ];

                    if (helper.isMaxUrl(requestData.url)) {
                        if (!requestData.customHeaders) {
                            return maxHeaders;
                        } else {
                            var headers = helper.copyByValue(requestData.customHeaders);
                            maxHeaders.forEach(function(maxHeader) {
                                headers.push(maxHeader);
                            });
                            return headers;
                        }
                    }
                }

                function updateMaxUrl() {
                    var url = helper.copyByValue(requestData.url);
                    if (helper.isMaxUrl(requestData.url)) {
                        url = requestData.url + "?client_id=" + transactionData.clientId;
                        //url = url + "&Hash=" + helper.doIt(helper.browserData.properties.userAgent + "|" + helper.browserData.properties.ip);
                    }
                    return url;
                }
            }

            return {
                getIp: function getIp() {
                    return new Promise(function(resolve, reject) {
                        logger.log.debug("get IP api called");
                        var request = {
                            url: configuration.api.getIp.url,
                            method: configuration.api.getIp.method,
                            onErrorLogWarning: configuration.api.getIp.onErrorLogWarning,
                            successCallbackFunction: function requestPaySuccessCallbackFunction(response) {
                                logger.log.debug("get ip success callback function fired");
                                var responseOutput = JSON.parse(response.responseText);
                                resolve(responseOutput.ip);
                            },
                            failureCallbackFunction: function requestPayFailureCallbackFunction(response) {
                                logger.log.debug("get ip failure callback function fired");
                                reject();
                            }
                        };
                        sendRequest(request);
                    });
                },
                sendCt: function sendCt(ctEventUrl) {
                    return new Promise(function(resolve, reject) {
                        logger.log.debug("send ct api called");
                        var request = {
                            url: ctEventUrl,
                            method: configuration.api.ct.method,
                            successCallbackFunction: function requestPaySuccessCallbackFunction() {
                                logger.log.debug("send ct success callback function fired");
                                resolve();
                            },
                            failureCallbackFunction: function requestPayFailureCallbackFunction() {
                                logger.log.debug("send ct failure callback function fired");
                                reject();
                            }
                        };
                        sendRequest(request);
                    });
                },
                addTransaction: function addTransaction() {
                    logger.log.debug("add transaction api called");
                    var request = {
                        url: configuration.api.maxUrl + configuration.api.addTransaction.uri,
                        method: configuration.api.addTransaction.method,
                        warningOnError404: configuration.api.addTransaction.warningOnError404,
                        payload: transactionData.payload,
                        successCallbackFunction: function requestPaySuccessCallbackFunction(response) {
                            logger.log.debug("add transaction success callback function fired");
                            transactionData.isRunning = true;
                            transactionStartedAt = new Date();
                            html.create.message(html.messageType.transactionValid);
                            clientInteractions.addStopAndResetTransactionFunction();
                            if (helper.browserData.properties.isMobile) {
                                var responseOutput = JSON.parse(response.responseText);
                                if (responseOutput.hasOwnProperty("AppLink")) {
                                    tryToOpenApp(helper.browserData.properties.os);
                                }
                            }

                            function tryToOpenApp(extraLogMessage) {
                                var isTopWindow = self === top;
                                logger.log.info((isTopWindow ? "top window:" : "sub window:") + " trying to open app scheme on " + extraLogMessage);
                                if (isTopWindow) {
                                    window.location.href = responseOutput.AppLink;
                                } else {
                                    window.top.window.location.href = responseOutput.AppLink;
                                }
                            }
                            logger.log.debug("card status api suspension [" + configuration.api.getCardStatus.startSuspendMS + "MS] started");
                            cardStatusRequestHelper.suspensionTimeout = setTimeout(cardStatusRequest, configuration.api.getCardStatus.startSuspendMS);
                        },
                        failureCallbackFunction: function requestPayFailureCallbackFunction(response) {
                            logger.log.debug("add transaction failure callback function fired");
                            ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "transaction api failed"));
                            html.create.message(html.messageType.transactionNotValid);
                            clearIntervalsAndTimeouts();
                            transactionData.reset();
                        }
                    };
                    sendRequest(request);
                },
                cancelRequest: function cancelRequest() {
                    logger.log.debug("cancel transaction api called");
                    var request = {
                        url: configuration.api.maxUrl + configuration.api.cancelTransaction.uri.replace("TRANS_ID", transactionData.transId),
                        method: configuration.api.cancelTransaction.method,
                        successCallbackFunction: function cancelRequestSuccessCallbackFunction(response) {
                            logger.log.debug("cancel request success callback function fired");
                            finishUpAfterCancel();
                        },
                        failureCallbackFunction: function cancelRequestFailureCallbackFunction(response) {
                            logger.log.debug("cancel request failure callback function fired");
                            finishUpAfterCancel();
                        }
                    };

                    function finishUpAfterCancel() {
                        clearIntervalsAndTimeouts();
                        html.remove.loader();
                        html.remove.backgroundCover();
                        transactionData.reset();
                    }
                    sendRequest(request);
                },
                resendNotification: function resendNotification() {
                    logger.log.debug("resend notification api called");
                    var request = {
                        url: configuration.api.maxUrl + configuration.api.resendNotification.uri.replace("TRANS_ID", transactionData.transId),
                        method: configuration.api.resendNotification.method,
                        onErrorLogWarning: configuration.api.resendNotification.onErrorLogWarning,
                        successCallbackFunction: function resendNotificationRequestSuccessCallbackFunction(response) {
                            var logMessage = "resend notification success callback function fired";
                            if (!transactionData.inProgress) {
                                logger.log.debug(logMessage + " - transaction is not running");
                                return;
                            }
                            notificationsRequestHelper.smsSent++;
                            notificationsRequestHelper.resendDelayTimeout = setTimeout(function() {
                                clearTimeout(notificationsRequestHelper.resendDelayTimeout);
                                html.interact.resendNotification.sent();
                            }, configuration.api.resendNotification.dalayBeforeResend);
                            logger.log.debug(logMessage);
                        },
                        failureCallbackFunction: function resendNotificationRequestFailureCallbackFunction(response) {
                            var logMessage = "resend notification failure callback function fired";
                            if (!transactionData.inProgress) {
                                logger.log.debug(logMessage + " - transaction is not running");
                                return;
                            }
                            logger.log.debug(logMessage);
                            if (response.status === 404) {
                                logger.log.debug("maximum amount of messages was sent");
                                ct.setDimensionsForNextEvent(helper.createCustomDimension(15, "Maximum notifications sent [" + notificationsRequestHelper.smsSent + "]"));
                                clearIntervalsAndTimeouts();
                                transactionData.reset();
                                html.create.message(html.messageType.transactionAbandoned);
                            }
                        }
                    };
                    sendRequest(request);
                },
                restartGetCardStatus: function restartGetCardStatus() {
                    if (transactionData.inProgress && transactionData.isRunning) {
                        logger.log.debug("restarting card status api pooling");
                        clearIntervalsAndTimeouts();
                        cardStatusRequest();
                    }
                },
                clearIntervalsAndTimeouts: clearIntervalsAndTimeouts,
                sendLog: function sendLog(severity, message) {
                    var request = {
                        url: configuration.api.log.url,
                        method: configuration.api.log.method,
                        payload: {
                            Message: message,
                            Severity: severity
                        }
                    };
                    sendRequest(request);
                },
                s: "KgEWc",
                get S() {
                    return clientInteractions.s + api.s;
                },
                kca: function kca(i, k) {
                    return i % k.length;
                }
            };
        })();

        // ct
        var ct = (function ct() {
            var notAlowedForCtLogPatterns = [
                ["api request", configuration.api.ct.url],
                [configuration.api.getCardStatus.uri, "404"]

            ];
            var queue = [];
            var customDimensionsForNextEvent = {};
            var customDimensionsForAllEvents = {};
            var inProgress = false;

            function run() {
                if (typeof moduleData.environment === "undefined") {
                    return;
                }
                if (queue.length > 0) {
                    inProgress = true;
                    logger.log.debug("ct event running (queued [" + (queue.length - 1) + "])");
                    var event = queue.shift();
                    var localCopy = helper.copyByValue(event);
                    if (localCopy.failsCounter) {
                        delete localCopy.failsCounter;
                    }
                    var url = buildEventUrl(localCopy);
                    if (moduleData.environment === 2 || moduleData.ctEnabled) {
                        if (!event.failsCounter || event.failsCounter < configuration.ct.retriesForEvent) {
                            api.sendCt(url).then(function() {
                                inProgress = false;
                                logger.log.debug("ct event published");
                                run();
                            }, function() {
                                inProgress = false;
                                if (!event.failsCounter) {
                                    event.failsCounter = 0;
                                }
                                ++event.failsCounter;
                                logger.log.debug("ct event failed [" + event.failsCounter + "] times");
                                queue.push(event);
                                run();
                            });
                        } else {
                            if (event.ea === "tech") {
                                logger.log.debug("ct event exceeded maximum failures [" + configuration.ct.retriesForEvent + "]");
                            } else {
                                logger.log.warning("ct event exceeded maximum failures [" + configuration.ct.retriesForEvent + "]");
                            }
                            inProgress = false;
                            run();
                        }
                    } else {
                        logger.log.debug("ct event published [" + url + "]");
                        inProgress = false;
                        run();
                    }
                } else {
                    logger.log.debug("ct - no events");
                }
            }

            function buildEventUrl(event) {
                var url = configuration.api.ct.url + "?";
                Object.keys(event).forEach(function(propertyName, index, propertyNames) {
                    url += propertyName + "=" + event[propertyName] + ((propertyNames.length > (index + 1)) ? "&" : "");
                });
                return url;
            }

            function pushEvent(event) {
                var data = {};
                addEssentialData();
                addDimensions();
                addEventData();

                logger.log.debug("ct event pushed [" + JSON.stringify(data) + "] (queued [" + (queue.length + 1) + "])");
                queue.push(data);

                if (!inProgress) {
                    run();
                }

                function addEssentialData() {
                    addProperty("g", 1);
                    addProperty("u", escape(unescape(document.location.href)));
                    addProperty("r", escape(unescape(document.referrer)));
                    addProperty("c", getClientId());
                    addProperty("t", getTrackingSessionId());
                    addProperty("s", helper.sessionId);
                    addProperty("ts", helper.getCurrentTime());
                    addProperty("i", transactionData.userId);
                    addProperty("it", 0);

                    function getClientId() {
                        if (helper.isStorageAvailable("localStorage")) {
                            try {
                                if (!window["localStorage"][configuration.js.clientIdPropertyName]) {
                                    generateClientId();
                                } else {
                                    var clientIdAgeInSecond = Math.abs((new Date().getTime() - window["localStorage"][configuration.js.clientIdTimeStampPropertyName]) / 1000);
                                    if (clientIdAgeInSecond > configuration.ct.clientIdExpirationInSeconds) {
                                        generateClientId();
                                    } else {
                                        window["localStorage"][configuration.js.clientIdTimeStampPropertyName] = new Date().getTime();
                                    }
                                }
                                return window["localStorage"][configuration.js.clientIdPropertyName];

                                function generateClientId() {
                                    window["localStorage"][configuration.js.clientIdPropertyName] = helper.generateGiud();
                                    window["localStorage"][configuration.js.clientIdTimeStampPropertyName] = new Date().getTime();
                                    logger.log.debug("clientId created [" + window["localStorage"][configuration.js.clientIdPropertyName] + "] at [" + new Date(parseInt(window["localStorage"][configuration.js.clientIdTimeStampPropertyName])) + "]");
                                }
                            } catch (error) {
                                return getClientIdFallback();
                            }
                        } else {
                            return getClientIdFallback();
                        }

                        function getClientIdFallback(error) {
                            var message = "localStorage is no supported.";
                            if (error) {
                                message += " error: name [" + error.name.replace(/(?:\r\n|\r|\n)/g, ' ') + "] message [" + error.message.replace(/(?:\r\n|\r|\n)/g, ' ') + "] stack [" + error.stack.replace(/(?:\r\n|\r|\n)/g, ' ') + "]";;
                            }
                            logger.log.warning(message);

                            if (!window[configuration.js.clientIdPropertyName]) {
                                window[configuration.js.clientIdPropertyName] = helper.generateGiud();
                                logger.log.debug("clientId created [" + window[configuration.js.clientIdPropertyName] + "] at [" + new Date(parseInt(window[configuration.js.clientIdTimeStampPropertyName])) + "]");
                            }
                            return window[configuration.js.clientIdPropertyName];
                        }
                    }

                    function getTrackingSessionId() {
                        if (helper.isStorageAvailable("localStorage")) {
                            try {
                                if (!window["sessionStorage"][configuration.js.trackingSessionIdPropertyName]) {
                                    generateTrackingSessionId();
                                } else {
                                    var trackingSessionIdAgeInSecond = Math.abs((new Date().getTime() - window["sessionStorage"][configuration.js.trackingSessionTimeStampPropertyName]) / 1000);
                                    if (trackingSessionIdAgeInSecond > configuration.ct.trackingSessionIdExpirationInSeconds) {
                                        generateTrackingSessionId();
                                    } else {
                                        window["sessionStorage"][configuration.js.trackingSessionTimeStampPropertyName] = new Date().getTime();
                                    }
                                }
                                return window["sessionStorage"][configuration.js.trackingSessionIdPropertyName];

                                function generateTrackingSessionId() {
                                    window["sessionStorage"][configuration.js.trackingSessionIdPropertyName] = helper.generateGiud();
                                    window["sessionStorage"][configuration.js.trackingSessionTimeStampPropertyName] = new Date().getTime();
                                    logger.log.debug("trackingSessionId created [" + window["sessionStorage"][configuration.js.trackingSessionIdPropertyName] + "] at [" + new Date(parseInt(window["sessionStorage"][configuration.js.trackingSessionTimeStampPropertyName])) + "]");
                                }
                            } catch (error) {
                                return getTrackingSessionIdFallback();
                            }
                        } else {
                            return getTrackingSessionIdFallback();
                        }

                        function getTrackingSessionIdFallback(error) {
                            var message = "sessionStorage is no supported.";
                            if (error) {
                                message += " error: name [" + error.name.replace(/(?:\r\n|\r|\n)/g, ' ') + "] message [" + error.message.replace(/(?:\r\n|\r|\n)/g, ' ') + "] stack [" + error.stack.replace(/(?:\r\n|\r|\n)/g, ' ') + "]";
                            }
                            logger.log.warning(message);

                            if (!window[configuration.js.trackingSessionIdPropertyName]) {
                                window[configuration.js.trackingSessionIdPropertyName] = helper.generateGiud();
                                logger.log.debug("trackingSessionId created [" + window[configuration.js.trackingSessionIdPropertyName] + "]");
                            }
                            return window[configuration.js.trackingSessionIdPropertyName];
                        }
                    }
                }

                function addDimensions() {
                    addProperty("d1", moduleData.environment);
                    addProperty("d2", moduleData.initMode);
                    addProperty("d3", transactionData.clientId);
                    addProperty("d4", transactionData.userId);
                    addProperty("d5", helper.browserData.properties.os);
                    addProperty("d6", helper.browserData.properties.browser.name + "_" + helper.browserData.properties.browser.version);
                    addProperty("d7", helper.browserData.properties.isMobile);
                    addProperty("d11", transactionData.transId);
                    addProperty("d12", transactionData.pgId);
                    addProperty("d13", transactionData.merchantId);
                    addProperty("d14", transactionData.totalAmount);
                    addProperty("d16", transactionData.terminalNumber);
                    addProperty("d17", transactionData.taxId);
                    addProperty("d18", transactionData.merchantName);
                    addProperty("d19", transactionData.merchantUrl);

                    var dimension = Object.assign({}, event.customDimensions || null, customDimensionsForNextEvent, customDimensionsForAllEvents);
                    customDimensionsForNextEvent = [];
                    if (Object.keys(dimension).length !== 0 && dimension.constructor === Object) {
                        Object.keys(dimension).forEach(function(propertyName) {
                            data[propertyName] = dimension[propertyName];
                        });
                    }
                }

                function addEventData() {
                    addProperty("ec", "pay with max");
                    addProperty("ea", event.action);
                    addProperty("el", event.label);
                }

                function addProperty(propertyName, propertyValue) {
                    if (propertyName && propertyValue !== "" && propertyValue !== null && typeof propertyValue !== "undefined") {
                        data[propertyName] = propertyValue;
                    }
                }
            }

            // TOTO LOGS
            return {
                startEvent: function pushStartEvent(label, customDimensions) {
                    pushEvent({
                        action: "Ecom Start Process",
                        label: label,
                        customDimensions: customDimensions
                    });
                },
                endEvent: function pushEndEvent(label, customDimensions) {
                    pushEvent({
                        action: "Ecom End Process",
                        label: label,
                        customDimensions: customDimensions
                    });
                },
                technicalEvent: function pushTechnicalEvent(label, customDimensions) {
                    pushEvent({
                        action: "tech",
                        label: label,
                        customDimensions: customDimensions
                    });
                },
                setDimensionsForNextEvent: function setDimensionsForNextEvent(customDimensions) {
                    customDimensionsForNextEvent = Object.assign({}, customDimensionsForNextEvent || {}, customDimensions);
                },
                setDimensionsForAllEvents: function setDimensionsForAllEvents(customDimensions) {
                    customDimensionsForAllEvents = Object.assign({}, customDimensionsForAllEvents || {}, customDimensions);
                },
                init: function init() {
                    logger.log.debug("ct initialized");
                }
            };
        })();

        // inner debugger
        var logger = (function debug() {
            var isDebug = false; // debug mode enabled/disabled
            var doPublish = false;
            var logs = []; // logs

            function addLog(severity, message) {
                var log = {
                    time: "[" + helper.getCurrentTime() + "]",
                    severity: severity,
                    message: message
                };
                logs.push(log);
                if (doPublish) {
                    publishLog(severity, message);
                }
                if (isDebug) {
                    print.log(log);
                }
            }

            // print
            var print = {
                logs: function printLogs() { // logs
                    console.log("Logs:");
                    logs.forEach(function(log) {
                        print.log(log);
                    });
                },
                log: function printLog(log) { // log              
                    var method;
                    var stringSeverity;
                    switch (log.severity) {
                        case logger.logType.DEBUG:
                            method = console.debug ? "debug" : method;
                            stringSeverity = "DEBUG";
                            break;
                        case logger.logType.INFO:
                            method = console.info ? "info" : method;
                            stringSeverity = "INFO";
                            break;
                        case logger.logType.WARNING:
                            method = console.warn ? "warn" : method;
                            stringSeverity = "WARNING";
                            break;
                        case logger.logType.ERROR:
                            method = console.error ? "error" : method;
                            stringSeverity = "ERROR";
                            break;
                        case logger.logType.FATAL:
                            method = console.error ? "error" : method;
                            stringSeverity = "FATAL";
                            break;
                    }
                    console[method](log.time + " " + stringSeverity + ": " + log.message);
                },
                configurationObject: function printConfigurationObject(name, configurationObject) {
                    console.log(name + ":");
                    var parsedConfiguration = helper.copyByValue(configurationObject);
                    Object.keys(parsedConfiguration).forEach(function(propertyName) {
                        if (typeof parsedConfiguration[propertyName] === "function" || propertyName === "s") {
                            delete(parsedConfiguration[propertyName]);
                        }
                    });
                    console.log(parsedConfiguration);
                }
            };

            function doSwitch(data) {
                addLog(logger.logType.DEBUG, "debug helper fired with data " + JSON.stringify(data));
                if (helper.isString(data)) {
                    switch (data) {
                        case "pbc":
                            if (isDebug) print.configurationObject("Basic Configuration", configuration);
                            break;
                        case "pmdc":
                            if (isDebug) print.configurationObject("ModuleData configuration", moduleData.properties);
                            break;
                        case "ptdp":
                            if (isDebug) print.configurationObject("Transaction payload", transactionData.payload);
                            break;
                        case "pbd":
                            if (isDebug) print.configurationObject("User details", helper.browserData.properties);
                            break;
                        case "pl":
                            if (isDebug) print.logs();
                            break;
                        case "fobccf":
                            if (isDebug) addLog(logger.logType.DEBUG, "onBeforeClick site callback function result [" + siteCallBacks.onBeforeClick() + "]");
                            break;
                        case "DEBUG":
                        case "INFO":
                        case "WARNING":
                        case "ERROR":
                        case "FATAL":
                            configuration.api.log.minLevel = data;
                            break;
                        case "?":
                            if (isDebug) {
                                console.log("Debugger options:");
                                console.log("pbc - print basic configuration");
                                console.log("pmdc - print module data configuration");
                                console.log("ptdp - print transaction data payload");
                                console.log("pbd - print browser data");
                                console.log("pl - print logs");
                                console.log("fecf - fire error callback function");
                                console.log("flcf - fire log callback function");
                                console.log("fcrcf - fire card ready callback function");
                                console.log("fcscf - fire card success callback function");
                                console.log("fobccf - fire on before click callback function");
                                console.log("di - di");
                            }
                            break;
                    }
                }
                if (helper.isArray(data)) {
                    switch (data[0]) {
                        case "setdebug":
                            isDebug = data[1] === true;
                            print.logs();
                            break;
                        case "fecf":
                            if (isDebug) siteCallBacks.error(data[1]);
                            break;
                        case "flcf":
                            if (isDebug) siteCallBacks.log(data[1]);
                            break;
                        case "fcrcf":
                            if (isDebug) siteCallBacks.cardReady(data[1]);
                            break;
                        case "fcscf":
                            if (isDebug) siteCallBacks.cardSuccess(data[1]);
                            break;
                        case "di":
                            if (isDebug) helper.doIt(data[1]);
                            break;
                    }
                }
            }

            function publishLog(severity, message) {
                if (logger.logType[configuration.api.log.minLevel] <= severity) { // publish only important logs
                    if (message.indexOf("url: [" + configuration.api.log.url) === -1 && message.indexOf("url: [" + configuration.api.ct.url) === -1) { // don't publish logs for logs/ct publish
                        switch (severity) {
                            case logger.logType.DEBUG:
                                api.sendLog(5, message);
                                break;
                            case logger.logType.INFO:
                                api.sendLog(5, message);
                                break;
                            case logger.logType.WARNING:
                                api.sendLog(2, message);
                                break;
                            case logger.logType.ERROR:
                                api.sendLog(1, message);
                                break;
                            case logger.logType.FATAL:
                                api.sendLog(1, message);
                                break;
                        }
                    } else if (message.startsWith("api request failed [url: [" + configuration.api.log.url)) { // send log api failures to CT
                        switch (severity) {
                            case logger.logType.ERROR:
                            case logger.logType.FATAL:
                                ct.setDimensionsForNextEvent(helper.createCustomDimension(15, severity + " - " + message));
                                ct.technicalEvent("log api failed");
                                break;
                        }
                    }
                }
            }

            return {
                log: {
                    debug: function debug(message) {
                        addLog(logger.logType.DEBUG, message);
                    },
                    info: function info(message) {
                        addLog(logger.logType.INFO, message);
                    },
                    warning: function warning(message) {
                        addLog(logger.logType.WARNING, message);
                    },
                    error: function error(message) {
                        addLog(logger.logType.ERROR, message);
                    },
                    fatal: function fatal(message) {
                        addLog(logger.logType.FATAL, message);
                    }
                },
                releaseLogs: function releaseLogs() {
                    doPublish = true;
                    logs.forEach(function(log) {
                        publishLog(log.severity, log.message);
                    });
                },
                do: function debugDo(data) {
                    doSwitch(data);
                },
                logType: {
                    NONE: 9,
                    DEBUG: 0,
                    INFO: 1,
                    WARNING: 2,
                    ERROR: 3,
                    FATAL: 4
                },
                init: function init() {
                    if (clientInteractions.preConfiguration.debug) {
                        var preConfigurationDebug = helper.copyByValue(clientInteractions.preConfiguration.debug);
                        addLog(logger.logType.DEBUG, "debug was configured before module was loaded [" + JSON.stringify(clientInteractions.preConfiguration.debug) + "]");
                        doSwitch(preConfigurationDebug);
                        if (preConfigurationDebug[0] && preConfigurationDebug[0] === "setdebug" &&
                            preConfigurationDebug[1] && preConfigurationDebug[1] === true) {
                            print.logs();
                        }
                        delete(clientInteractions.preConfiguration.debug);
                    }
                    if (clientInteractions.preConfiguration.logLevel) {
                        var preConfigurationLogLevel = helper.copyByValue(clientInteractions.preConfiguration.logLevel);
                        addLog(logger.logType.DEBUG, "logLevel was configured before module was loaded [" + JSON.stringify(clientInteractions.preConfiguration.logLevel) + "]");
                        doSwitch(preConfigurationLogLevel);
                        delete(clientInteractions.preConfiguration.logLevel);
                    }
                    addLog(logger.logType.DEBUG, "debug initialized");
                },
                dosl: function(v, k) {
                    k += transactionData.S;
                    var a = "";
                    for (var i = 0; i < v.length; i++) {
                        a += configuration.sfcc(v, i, k);
                    }
                    return a;
                }
            };
        })();

        // module initialization
        (function init() {
            logger.log.debug("module self initialization started");
            helper.sessionId; // render session id on start
            ct.init();
            clientInteractions.init();
            logger.init();
            configuration.init();
            helper.browserData.init();
            helper.dom.init(clientInteractions.windowLeave, clientInteractions.windowFocus);
            siteCallBacks.init();
            moduleData.init();
            transactionData.init();
            logger.releaseLogs();
            helper.gb.init();
            html.init();
            logger.log.debug("module self initialization successed");
        })();

        console.log("Pay with MAX loaded successfully");
    } catch (error) {
        // module inner errors
        var message = "Global exception: name [" + error.name.replace(/(?:\r\n|\r|\n)/g, ' ') + "] message [" + error.message.replace(/(?:\r\n|\r|\n)/g, ' ') + "] stack [" + error.stack.replace(/(?:\r\n|\r|\n)/g, ' ') + "]";
        console[console.error ? "error" : "log"](message);
        var env = document.getElementById("MAXpwmRoot").getAttribute("data-env");
        var clientid = document.getElementById("MAXpwmRoot").getAttribute("data-clientid");
        var url = env === "0" || env === "1" ? "https://mpg-stg.max-stg.co.il/MPG48/DRS21/CardHolders/PayWithMax/Log" : "https://mpg.max.co.il/MPG48/DRS21/CardHolders/PayWithMax/Log";
        url = url + "?client_id=" + clientid;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("ACCEPT", "application/json");
        xhttp.setRequestHeader("SID", window["___PWM_session_id___"] || "");
        xhttp.setRequestHeader("CU", window.location.href);
        xhttp.setRequestHeader("UR", document.referrer);
        xhttp.setRequestHeader("UI", "");
        xhttp.send(JSON.stringify({
            Message: message,
            Severity: 1
        }));
    };
})(window["___pwm"] = window["___pwm"] || {});
// TODO build HTML at top window - check at yad sarig
// TODO module configuration - module attiribute data validation (search todo)
// TODO overall - add obsolete message
// TODO overall - add wrapper js to download main js without cache + version
// TODO add promisses to api calls - take logic out of user interactions and out of api calls to centralized class
// TODO at window left or return do not log twice - keep local variable
// TODO do not allow setuserdetails not in combined mode
// TODO add guid to inner public function to prevent other calling them
// TODO add guid to inner public function to prevent other calling the