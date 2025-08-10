{ // init module
    $(function() {
        if (detectIE()) {
            alert("Please use a modern browser like Chrome or FireFox");
        }

        if (!window["isIframePage"]) {
            loadPwmSettingsAndData();
        }
        initPwm();
        $(".settingsInput").change(function() {
            saveModuleSetting();
            initPwm();
        });
        $(".transactionDataSwitch, .transactionDataInput").change(function() {
            saveTransactionData();
            initPwm();
        });

        setListners();
    });

    function loadPwmSettingsAndData() {
        loadModuleSetting();
        loadTransactionData();
    }

    function initPwm() {
        initModuleSetting();
        initTransactionData();
    }

    function loadModuleSetting() {
        var pwmModuleSettings = storage.get("pwmModuleSettings");
        if (pwmModuleSettings) {
            $.each(pwmModuleSettings, function(key, value) {
                var currentElement = $("#" + value.elementId);
                if (typeof currentElement[0] !== "undefined") {
                    switch (currentElement[0].type) {
                        case "text":
                        case "select-one":
                            currentElement.val(value.value);
                            break;
                        case "checkbox":
                            currentElement.prop('checked', value.value);
                            break;
                        case "radio":
                            currentElement.prop('checked', true);
                            break;

                    }
                }
            });
        } else {
            saveModuleSetting();
            pwmModuleSettings = storage.get("pwmModuleSettings");
        }
        switch (pwmModuleSettings.pageMode.value) {
            case "page":
                $("#pageMode").show();
                $("#iframeMode").hide();
                $("#iframe").removeAttr("src");
                break;
            case "iframe":
                $("#iframeMode").show();
                $("#pageMode").hide();
                $("#iframe").attr("src", $("#iframe").data("src"));
                break;
        }
    }

    function saveModuleSetting() {
        var pwmModuleSettings = {};
        $(".settingsInput").each(function(index, currentElement) {
            var propertyName = $(currentElement).data("configurationPropertyName");
            var value;
            var id;
            switch (currentElement.type) {
                case "text":
                case "select-one":
                    value = currentElement.value;
                    id = currentElement.id;
                    break;
                case "checkbox":
                    value = $(currentElement).is(':checked');
                    id = currentElement.id;
                    break;
                case "radio":
                    var checkedRadioButton = $(".settingsInput[name=\"" + $(currentElement).attr("name") + "\"]:checked")[0];
                    value = checkedRadioButton.value;
                    id = checkedRadioButton.id;
                    break;
            }
            if (typeof propertyName !== 'undefined' && typeof value !== 'undefined') {
                pwmModuleSettings[propertyName] = {
                    value: value,
                    elementId: id
                };
            }
        });

        if (Object.keys(pwmModuleSettings).length === 0) {
            var saveModuleSettingsTimeout = setTimeout(function() {
                clearTimeout(saveModuleSettingsTimeout);
                saveModuleSetting();
            }, 3000);
            return;
        }

        pwmModuleSettings.siteEnvironment = window.location.href.indexOf("127.0.0.1") !== -1 || window.location.href.indexOf("local.pwm.com") !== -1 ? "local" : "other";
        storage.set("pwmModuleSettings", pwmModuleSettings);

        switch (pwmModuleSettings.pageMode.value) {
            case "page":
                $("#pageMode").show();
                $("#iframeMode").hide();
                $("#iframe").removeAttr("src");
                break;
            case "iframe":
                $("#iframeMode").show();
                $("#pageMode").hide();
                $("#iframe").attr("src", $("#iframe").data("src"));
                break;
        }
    }

    function initModuleSetting() {
        resetPwmRootElement();

        var pwmModuleSettings = storage.get("pwmModuleSettings");

        setAttribute("data-clientid", getClientId());
        setAttribute("data-initmode", getInitMode());
        setAttribute("data-env", pwmModuleSettings.apicEnvironment.value);
        setAttribute("data-ct-enabled", pwmModuleSettings.ctEnabled.value === true ? true : null);
        setAttribute("data-gb-enabled", pwmModuleSettings.gbEnabled.value === true ? true : null);
        setAttribute("data-button-style", pwmModuleSettings.buttonStyle.value !== "0" ? pwmModuleSettings.buttonStyle.value : null);
        setAttribute("data-language", pwmModuleSettings.language.value === "eng" ? "eng" : null);
        setAttribute("data-button-enabled", pwmModuleSettings.buttonEnabled.value === true ? null : false);

        setAttribute("data-button-htmlortext", pwmModuleSettings.buttonHtmlOrText && pwmModuleSettings.buttonHtmlOrText.value ? pwmModuleSettings.buttonHtmlOrText.value : null);
        setAttribute("data-button-backgroundcolor", pwmModuleSettings.buttonBackgroundColor && pwmModuleSettings.buttonBackgroundColor.value ? pwmModuleSettings.buttonBackgroundColor.value : null);
        setAttribute("data-button-height", pwmModuleSettings.buttonHeight && pwmModuleSettings.buttonHeight.value ? pwmModuleSettings.buttonHeight.value : null);
        setAttribute("data-button-width", pwmModuleSettings.buttonWidth && pwmModuleSettings.buttonWidth.value ? pwmModuleSettings.buttonWidth.value : null);
        setAttribute("data-button-min-width", pwmModuleSettings.buttonMinWidth && pwmModuleSettings.buttonMinWidth.value ? pwmModuleSettings.buttonMinWidth.value : null);
        setAttribute("data-button-border-radius", pwmModuleSettings.buttonBorderRadius && pwmModuleSettings.buttonBorderRadius.value ? pwmModuleSettings.buttonBorderRadius.value : null);
        setAttribute("data-button-textcolor", pwmModuleSettings.buttonTextColor && pwmModuleSettings.buttonTextColor.value ? pwmModuleSettings.buttonTextColor.value : null);

        setAttribute("data-button-messagebefore-htmlortext", pwmModuleSettings.messageBeforeButtonHtmlOrText && pwmModuleSettings.messageBeforeButtonHtmlOrText.value ? pwmModuleSettings.messageBeforeButtonHtmlOrText.value : null);
        setAttribute("data-button-messagebefore-color", pwmModuleSettings.messageBeforeButtonColor && pwmModuleSettings.messageBeforeButtonColor.value ? pwmModuleSettings.messageBeforeButtonColor.value : null);

        setAttribute("data-button-messageafter-htmlortext", pwmModuleSettings.messageAfterButtonHtmlOrText && pwmModuleSettings.messageAfterButtonHtmlOrText.value ? pwmModuleSettings.messageAfterButtonHtmlOrText.value : null);
        setAttribute("data-button-messageafter-color", pwmModuleSettings.messageAfterButtonColor && pwmModuleSettings.messageAfterButtonColor.value ? pwmModuleSettings.messageAfterButtonColor.value : null);

        setAttribute("data-popup-user-details-prompt-title", pwmModuleSettings.popupUserDetailsPromptTitle && pwmModuleSettings.popupUserDetailsPromptTitle.value ? pwmModuleSettings.popupUserDetailsPromptTitle.value : null);
        setAttribute("data-popup-user-details-prompt-htmlortext", pwmModuleSettings.popupUserDetailsPromptHtmlOrText && pwmModuleSettings.popupUserDetailsPromptHtmlOrText.value ? pwmModuleSettings.popupUserDetailsPromptHtmlOrText.value : null);
        setAttribute("data-popup-user-details-prompt-asteriks", pwmModuleSettings.popupUserDetailsPromptAsteriks && pwmModuleSettings.popupUserDetailsPromptAsteriks.value ? pwmModuleSettings.popupUserDetailsPromptAsteriks.value : null);

        setAttribute("data-popup-transaction-valid-title", pwmModuleSettings.popupTransactionValidTitle && pwmModuleSettings.popupTransactionValidTitle.value ? pwmModuleSettings.popupTransactionValidTitle.value : null);
        setAttribute("data-popup-transaction-valid-htmlortext-pc", pwmModuleSettings.popupTransactionValidHtmlOrTextPC && pwmModuleSettings.popupTransactionValidHtmlOrTextPC.value ? pwmModuleSettings.popupTransactionValidHtmlOrTextPC.value : null);
        setAttribute("data-popup-transaction-valid-htmlortext-mobile", pwmModuleSettings.popupTransactionValidHtmlOrTextMobile && pwmModuleSettings.popupTransactionValidHtmlOrTextMobile.value ? pwmModuleSettings.popupTransactionValidHtmlOrTextMobile.value : null);

        setAttribute("data-popup-transaction-proccessing-title", pwmModuleSettings.popupTransactionProccessingTitle && pwmModuleSettings.popupTransactionProccessingTitle.value ? pwmModuleSettings.popupTransactionProccessingTitle.value : null);
        setAttribute("data-popup-transaction-proccessing-htmlortext", pwmModuleSettings.popupTransactionProccessingHtmlOrText && pwmModuleSettings.popupTransactionProccessingHtmlOrText.value ? pwmModuleSettings.popupTransactionProccessingHtmlOrText.value : null);

        setAttribute("data-popup-transaction-is-about-to-expire-title", pwmModuleSettings.popupTransactionIsAboutToExpireTitle && pwmModuleSettings.popupTransactionIsAboutToExpireTitle.value ? pwmModuleSettings.popupTransactionIsAboutToExpireTitle.value : null);
        setAttribute("data-popup-transaction-is-about-to-expire-htmlortext", pwmModuleSettings.popupTransactionIsAboutToExpireHtmlOrText && pwmModuleSettings.popupTransactionIsAboutToExpireHtmlOrText.value ? pwmModuleSettings.popupTransactionIsAboutToExpireHtmlOrText.value : null);

        setAttribute("data-popup-transaction-expired-title", pwmModuleSettings.popupTransactionExpiredTitle && pwmModuleSettings.popupTransactionExpiredTitle.value ? pwmModuleSettings.popupTransactionExpiredTitle.value : null);
        setAttribute("data-popup-transaction-expired-htmlortext-pc", pwmModuleSettings.popupTransactionExpiredHtmlOrTextPC && pwmModuleSettings.popupTransactionExpiredHtmlOrTextPC.value ? pwmModuleSettings.popupTransactionExpiredHtmlOrTextPC.value : null);
        setAttribute("data-popup-transaction-expired-htmlortext-mobile", pwmModuleSettings.popupTransactionExpiredHtmlOrTextMobile && pwmModuleSettings.popupTransactionExpiredHtmlOrTextMobile.value ? pwmModuleSettings.popupTransactionExpiredHtmlOrTextMobile.value : null);

        setAttribute("data-popup-transaction-not-valid-title", pwmModuleSettings.popupTransactionNotValidTitle && pwmModuleSettings.popupTransactionNotValidTitle.value ? pwmModuleSettings.popupTransactionNotValidTitle.value : null);
        setAttribute("data-popup-transaction-not-valid-htmlortext", pwmModuleSettings.popupTransactionNotValidHtmlOrText && pwmModuleSettings.popupTransactionNotValidHtmlOrText.value ? pwmModuleSettings.popupTransactionNotValidHtmlOrText.value : null);

        setAttribute("data-popup-transaction-error-title", pwmModuleSettings.popupTransactionErrorTitle && pwmModuleSettings.popupTransactionErrorTitle.value ? pwmModuleSettings.popupTransactionErrorTitle.value : null);
        setAttribute("data-popup-transaction-error-htmlortext", pwmModuleSettings.popupTransactionErrorHtmlOrText && pwmModuleSettings.popupTransactionErrorHtmlOrText.value ? pwmModuleSettings.popupTransactionErrorHtmlOrText.value : null);

        setScript();

        function resetPwmRootElement() {
            delete(window.___pwm);

            $("#pwmSourceScript").remove();

            var pwmRootElement = document.getElementById("MAXpwmRoot");

            pwmRootElement.getAttributeNames().forEach(function(currentAttributeName, i) {
                if (!validateAllowedAttributes(currentAttributeName)) {
                    pwmRootElement.removeAttribute(currentAttributeName);
                }
            });

            pwmRootElement.innerHTML = "";

            function validateAllowedAttributes(currentAttributeName) {
                var allowed = false;
                [/^id$/, /^data\-button.*/, /data\-.*cbfn$/].forEach(function(currentAllowedAttributesPattern, i) {
                    if (currentAllowedAttributesPattern.test(currentAttributeName)) {
                        allowed = true;
                    }
                });
                return allowed;
            }
        }

        function getClientId() {
            switch (pwmModuleSettings.siteEnvironment) {
                case "local":
                    switch (pwmModuleSettings.apicEnvironment.value) {
                        case "0":
                            switch (pwmModuleSettings.product.value) {
                                case "server2server":
                                    return "fee1d7bc-2b4e-45f3-9b3b-44061870e172";
                                case "server2client":
                                    return "ad80a82e-4663-4b02-8f76-d38c8335e586";
                            }
                            break;
                        case "1":
                            switch (pwmModuleSettings.product.value) {
                                case "server2server":
                                    return "2aeabd13-ca61-41b6-8d1e-5157c86d5296";
                                case "server2client":
                                    return "c74d09f2-6af6-4b0a-a411-5abc0767947c";
                            }
                            break;
                        case "2":
                            switch (pwmModuleSettings.product.value) {
                                case "server2server":
                                    return "ebbfb5c0-03f0-474d-a335-245d1952cfa0";
                                case "server2client":
                                    return "7e3cce2c-4575-49dc-ace8-4131a50fc9a8";
                            }
                            break;
                    }
                    break;
                case "other":
                    switch (pwmModuleSettings.apicEnvironment.value) {
                        case "0":
                            switch (pwmModuleSettings.product.value) {
                                case "server2server":
                                    return "72741077-28f2-40d7-98f6-7b9bdb8a4cf9";
                                case "server2client":
                                    return "8710df32-bddb-4d37-a6ed-ca6ea5d2be2f";
                            }
                            break;
                        case "1":
                            switch (pwmModuleSettings.product.value) {
                                case "server2server":
                                    return "288e6b55-0376-49c6-818a-b8ce29b88460";
                                case "server2client":
                                    return "2474477d-8bcc-42ee-bef9-937e1724f43a";
                            }
                            break;
                        case "2":
                            switch (pwmModuleSettings.product.value) {
                                case "server2server":
                                    return "0dc9a1eb-e4fa-470e-9830-f15e898c1023";
                                case "server2client":
                                    return "f349c5b7-126d-4c6f-a532-7600b9d29684";
                            }
                            break;
                    }
                    break;
            }
        }

        function getInitMode() {
            switch (pwmModuleSettings.userDetailsPromptEnabled.value) {
                case false:
                    switch (pwmModuleSettings.sdkConfiguration.value) {
                        case "jsObject":
                            return 0;
                        case "htmlAttributes":
                            return 2;
                    }
                    break;
                case true:
                    switch (pwmModuleSettings.sdkConfiguration.value) {
                        case "jsObject":
                            return 1;
                        case "htmlAttributes":
                            return 3;
                    }
            }
        }

        function setScript() {
            var script = document.createElement("script");
            script.id = "pwmSourceScript";
            script.async = true;
            script.defer = true;
            var src = "";
            switch (pwmModuleSettings.siteEnvironment) {
                case "local":
                    src = "http://127.0.0.1:5500/scripts/pwm-dev.js";
                    break;
                case "other":
                    var version = window.location.href;
                    if (window.location.href.indexOf("/gateway-demo.html") !== -1) {
                        version = version.substring(0, version.indexOf("/gateway-demo.html"));
                    } else if (window.location.href.indexOf("/gateway-demo-iframe.html") !== -1) {
                        version = version.substring(0, version.indexOf("/gateway-demo-iframe.html"));
                    }
                    version = version.replace("https://digitalcdn.max-stg.co.il/pwm/", "");
                    src = "https://digitalcdn.max.co.il/pwm/scripts/" + version + "/pwm-dev.js";
                    break;
            }
            if (pwmModuleSettings.sdkVersionMinified.value) {
                src = src.replace("pwm-dev.js", "pwm-dev.min.js");
            }
            script.src = src;
            document.body.appendChild(script);
        }
    }

    function loadTransactionData() {
        var pwmTransactionData = storage.get("pwmTransactionData");
        if (!pwmTransactionData) {
            pwmTransactionData = getDefaultPwmTransactionData();
            storage.set("pwmTransactionData", pwmTransactionData);
        }
        // add items
        if (pwmTransactionData.transactionDetails.items && pwmTransactionData.transactionDetails.items.length > 0) {
            var firstItemElement = document.querySelector(".transactionItem");
            for (var i = 1; i < pwmTransactionData.transactionDetails.items.length; i++) {
                var firstItemElementClone = firstItemElement.cloneNode(true);
                firstItemElementClone.querySelectorAll(".transactionDataSwitch").forEach(function(swith) {
                    $(swith).attr("id", $(swith).attr("id").replace(/\d+/, (i + 1)));
                    var label = $(swith).parent().find("label");
                    $(label).attr("for", $(label).attr("for").replace(/\d+/, (i + 1)));
                });
                firstItemElementClone.querySelectorAll("*[data-transaction-data-property-name]").forEach(function(element) {
                    $(element).attr("data-transaction-item-index", i);
                });
                firstItemElement.parentNode.append(firstItemElementClone);
            }
        }
        // build flaterned transaction data
        var flatendtransactionDataArray = [];
        loopThoughObject(flatendtransactionDataArray, pwmTransactionData);
        // set elements values
        flatendtransactionDataArray.forEach(function(arrayItem) {
            var element = $("*[data-transaction-data-property-name=\"" + arrayItem.name.replace(/\[\d+\]/, "[]") + "\"]")[arrayItem.index];
            if (element) {
                var elementType = $(element).data("transactionDataPropertyType");
                if (elementType && elementType === "boolean") {
                    $(element).prop("checked", arrayItem.value);
                } else {
                    element.value = arrayItem.value;
                }
            }
        });
        // disable disabled fields
        var allTransactionDataFields = [];
        document.querySelectorAll("*[data-transaction-data-property-name]").forEach(function(currentFields) {
            var currentTransactionDataPropertyName = $(currentFields).attr("data-transaction-data-property-name");
            if (currentTransactionDataPropertyName.indexOf("items[]") !== -1) {
                currentTransactionDataPropertyName = currentTransactionDataPropertyName.replace("[]", "[" + $(currentFields).data("transactionItemIndex") + "]");
            }
            allTransactionDataFields.push(currentTransactionDataPropertyName);
        });
        var filedsToDisable = allTransactionDataFields.filter(field => !flatendtransactionDataArray.map(c => c.name).includes(field));
        filedsToDisable.forEach(function(filedToDisable) {
            var index = filedToDisable.replaceAll(/[^\d]/g, "") || 0;
            $("*[data-transaction-data-property-name=\"" + filedToDisable.replace(/\[\d+\]/, "[]") + "\"]").eq(index).closest('.transactionDataField').find('.transactionDataSwitch').prop("checked", false);
        });

        document.querySelector(".inputID").value = pwmTransactionData.clientDetails.id || "";
        document.querySelector(".inputPhone").value = pwmTransactionData.clientDetails.phoneNumber || "";

        function getDefaultPwmTransactionData() {
            return {
                pgId: "72612836-4ea3-4f20-81dd-5a6cf31f361c",
                exportBillingAddress: false,
                clientDetails: {
                    id: 317838100,
                    idType: 0,
                    phoneNumber: "0545211488",
                    city: "תל אביב",
                    street: "ארלוזורוב",
                    houseNumber: 1,
                    apartmentNumber: 50,
                    poBox: 31500,
                    zip: 3696301,
                    email: "test@gmail.com",
                    firstName: "ג'ון",
                    lastName: "סמיט"
                },
                merchantDetails: {
                    id: "bcd8f4b5-3e43-41ad-b6f7-ea678e3cf0da",
                    taxId: "2352398629867",
                    name: "בית עסק בע''מ",
                    url: "https://www.google.com",
                    terminalNumber: 150000987,
                    logo: "https://www.google.com/logo.jpeg"
                },
                transactionDetails: {
                    id: "27e0edfb-d597-480a-907b-69a68281a155",
                    description: "עסקת החיים",
                    totalAmount: 300.90,
                    coin: "ILS",
                    isPaymentsByWebsite: true,
                    numberOfPayments: 3,
                    firstTashPayment: 100.90,
                    keyTashPayment: 100.00,
                    items: [{
                            Name: "Item 1",
                            Quantity: 1,
                            Description: "Description 1",
                            TotalAmount: 10,
                            Price: 10.00
                        },
                        {
                            Name: "Item 2",
                            Quantity: 2,
                            Description: "Description 2",
                            TotalAmount: 141,
                            Price: 70.50
                        },
                        {
                            Name: "Item 3",
                            Quantity: 4,
                            Description: "Description 3",
                            TotalAmount: 201,
                            Price: 50.25
                        }
                    ]
                }
            };
        }

        function loopThoughObject(array, obj, parentPropertyName, index, arrLength) {
            Object.keys(obj).forEach(function(propertyName) {
                if (!isObject(obj[propertyName]) && !isArray(obj[propertyName])) {
                    var entity = {
                        name: (parentPropertyName ? parentPropertyName + "." : "") + propertyName,
                        value: obj[propertyName],
                        index: index ? index : 0,
                        arrLength: arrLength ? arrLength : 0
                    };
                    array.push(entity);
                } else if (!isArray(obj[propertyName])) {
                    loopThoughObject(array, obj[propertyName], (parentPropertyName ? parentPropertyName + "." : "") + propertyName);
                } else if (isArray(obj[propertyName])) {
                    obj[propertyName].forEach(function(arrayItem, index, arr) {
                        loopThoughObject(array, arrayItem, (parentPropertyName ? parentPropertyName + "." : "") + propertyName + "[" + index + "]", index, arr.length);
                    });
                }
            });

            function isArray(variable) {
                return variable && Array.isArray(variable) && variable instanceof Array && variable.constructor === Array;
            }

            function isObject(variable) {
                return Object.prototype.toString.call(variable) === "[object Object]";
            }
        }
    }

    function saveTransactionData() {
        var pwmTransactionData = {};
        $(".transactionDataInput").each(function(index, currentTransactionDataInput) {
            if ($(currentTransactionDataInput).closest('.transactionDataField').find('.transactionDataSwitch').is(":checked")) {
                var pwmTransactionDataRef = pwmTransactionData;
                var transactionDataPropertyName = $(currentTransactionDataInput).data("transactionDataPropertyName");
                if (/\.+/.test(transactionDataPropertyName) && !/\[\]/.test(transactionDataPropertyName)) {
                    var path = transactionDataPropertyName.split(".");
                    while (path.length > 1) {
                        var currentPropertyName = path.shift();
                        pwmTransactionDataRef[currentPropertyName] = pwmTransactionDataRef[currentPropertyName] || {};
                        pwmTransactionDataRef = pwmTransactionDataRef[currentPropertyName];
                    }
                    pwmTransactionDataRef[path.shift()] = getFormattedValue(currentTransactionDataInput);
                } else if (!/\[\]/.test(transactionDataPropertyName)) {
                    pwmTransactionData[transactionDataPropertyName] = getFormattedValue(currentTransactionDataInput);
                }
            } else {
                $(currentTransactionDataInput).val("").prop("checked", false);
            }
        });
        $(".transactionItem").each(function(index, currentTransactionDataItem) {
            var transactionDataItem = {};
            var itemHasValues = false;
            $(currentTransactionDataItem).find('.transactionDataInput').each(function(index, currentTransactionDataItemInput) {
                if ($(currentTransactionDataItemInput).closest('.transactionDataField').find('.transactionDataSwitch').is(":checked")) {
                    var transactionDataItemInputPropertyName = $(currentTransactionDataItemInput).data("transactionDataPropertyName");
                    transactionDataItemInputPropertyName = transactionDataItemInputPropertyName.replace(/.+\[\]\./, "");
                    transactionDataItem[transactionDataItemInputPropertyName] = getFormattedValue(currentTransactionDataItemInput);
                    if (currentTransactionDataItemInput.value) {
                        itemHasValues = true;
                    }
                } else {
                    $(currentTransactionDataItemInput).val("").prop("checked", false);
                }
            });
            if (itemHasValues) {
                pwmTransactionData.transactionDetails.items = pwmTransactionData.transactionDetails.items || [];
                pwmTransactionData.transactionDetails.items.push(transactionDataItem);
            }
        });

        function getFormattedValue(currentInput) {
            var type = $(currentInput).data("transactionDataPropertyType");
            var value = currentInput.value;
            switch (type) {
                case "int":
                    return parseInt(value);
                case "float":
                    return parseFloat(value);
                case "boolean":
                    return $(currentInput).is(":checked");
                default:
                    return value;
            }
        }
        storage.set("pwmTransactionData", pwmTransactionData);

        document.querySelector(".inputID").value = pwmTransactionData.clientDetails.id || "";
        document.querySelector(".inputPhone").value = pwmTransactionData.clientDetails.phoneNumber || "";
    }

    function initTransactionData() {
        var pwmTransactionData = storage.get("pwmTransactionData");
        var pwmModuleSettings = storage.get("pwmModuleSettings");
        switch (pwmModuleSettings.sdkConfiguration.value) {
            case "jsObject":
                initTransactionDataWithJsObject();
                break;
            case "htmlAttributes":
                initTransactionDataWithHtmlAttribtes();
                break;
        }

        function initTransactionDataWithJsObject() {
            delete(pwmTransactionData.debug);
            delete(pwmTransactionData.logLevel);

            if (!window["isIframePage"]) {
                pwmTransactionData.clientDetails.id = document.querySelector(".inputID").value;
                pwmTransactionData.clientDetails.phoneNumber = document.querySelector(".inputPhone").value;
            }

            if (pwmModuleSettings.debugEnabled.value) {
                pwmTransactionData.debug = ["setdebug", true];
            }
            if (pwmModuleSettings.logLevel.value !== "-1") {
                pwmTransactionData.logLevel = document.getElementById("logLevelDD").value;
            }
            window["___pwm"] = window["___pwm"] || {};
            ___pwm.data = pwmTransactionData;
        }

        function initTransactionDataWithHtmlAttribtes() {
            setAttribute("data-pgid", pwmTransactionData.pgId);
            setAttribute("data-eba", pwmTransactionData.exportBillingAddress);

            if (!window["isIframePage"]) {
                setAttribute("data-cd-id", document.querySelector(".inputID").value);
                setAttribute("data-cd-pn", document.querySelector(".inputPhone").value);
            }

            setAttribute("data-cd-idtype", pwmTransactionData.clientDetails.idType);
            setAttribute("data-cd-fn", pwmTransactionData.clientDetails.firstName);
            setAttribute("data-cd-ln", pwmTransactionData.clientDetails.lastName);
            setAttribute("data-cd-email", pwmTransactionData.clientDetails.email);
            setAttribute("data-cd-city", pwmTransactionData.clientDetails.city);
            setAttribute("data-cd-street", pwmTransactionData.clientDetails.street);
            setAttribute("data-cd-hn", pwmTransactionData.clientDetails.houseNumber);
            setAttribute("data-cd-an", pwmTransactionData.clientDetails.apartmentNumber);
            setAttribute("data-cd-pob", pwmTransactionData.clientDetails.poBox);
            setAttribute("data-cd-zip", pwmTransactionData.clientDetails.zip);

            setAttribute("data-md-id", pwmTransactionData.merchantDetails.id);
            setAttribute("data-md-taxid", pwmTransactionData.merchantDetails.taxId);
            setAttribute("data-md-name", pwmTransactionData.merchantDetails.name);
            setAttribute("data-md-url", pwmTransactionData.merchantDetails.url);
            setAttribute("data-md-tn", pwmTransactionData.merchantDetails.terminalNumber);
            setAttribute("data-md-logo", pwmTransactionData.merchantDetails.logo);

            setAttribute("data-td-id", pwmTransactionData.transactionDetails.id);
            setAttribute("data-td-desc", pwmTransactionData.transactionDetails.description);
            setAttribute("data-td-ta", pwmTransactionData.transactionDetails.totalAmount);
            setAttribute("data-td-coin", pwmTransactionData.transactionDetails.coin);
            setAttribute("data-td-ipbw", pwmTransactionData.transactionDetails.isPaymentsByWebsite);
            setAttribute("data-td-nop", pwmTransactionData.transactionDetails.numberOfPayments);
            setAttribute("data-td-ftp", pwmTransactionData.transactionDetails.firstTashPayment);
            setAttribute("data-td-ktp", pwmTransactionData.transactionDetails.keyTashPayment);

            setAttribute("data-debug", pwmModuleSettings.debugEnabled.value ? true : null);
            setAttribute("data-log-level", pwmModuleSettings.logLevel.value !== "-1" ? pwmModuleSettings.logLevel.value : null);
        }
    }

    function addTransactionDataItem() {
        var transactionItems = $('.transactionItem');
        var firstItemElement = transactionItems.first();
        var firstItemElementClone = firstItemElement.clone(true, true);
        firstItemElementClone[0].querySelectorAll(".transactionDataSwitch").forEach(function(swith) {
            $(swith).attr("id", $(swith).attr("id").replace(/\d+/, (transactionItems.length + 1)));
            var label = $(swith).parent().find("label");
            $(label).attr("for", $(label).attr("for").replace(/\d+/, (transactionItems.length + 1)));
        });
        firstItemElementClone[0].querySelectorAll("*[data-transaction-data-property-name]").forEach(function(element) {
            $(element).val("").attr("data-transaction-item-index", (transactionItems.length + 1));
        });
        firstItemElementClone[0].querySelector(".removeTransactionDataItemButton").addEventListener("click", handlerActionClick, false)
        firstItemElement.parent().append(firstItemElementClone);
    }

    function removeTransactionDataItem(button) {
        var currentItem = $(button).closest('.transactionItem');
        currentItem[0].querySelector(".removeTransactionDataItemButton").removeEventListener("click", handlerActionClick, false)
        if (document.querySelectorAll(".transactionItem").length > 1) {
            currentItem.remove();
        } else {
            currentItem.find('.transactionDataInput').val("");
        }
        saveTransactionData();
    }

    function resetModuleSetting() {
        if (confirm("Are you sure you want to reset settings?")) {
            storage.delete("pwmModuleSettings");
            window.location.href = window.location.href;
        }
    }

    function resetTransactionData() {
        if (confirm("Are you sure you want to reset transaction data?")) {
            storage.delete("pwmTransactionData");
            window.location.href = window.location.href;
        }
    }

    function setAttribute(name, value) {
        var pwmRootElement = document.getElementById("MAXpwmRoot");
        pwmRootElement.removeAttribute(name);
        if (value !== null && value !== '' && typeof value !== 'undefined') {
            pwmRootElement.setAttribute(name, value);
        }
    }

    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');
        var edge = ua.indexOf('Edge/');
        if (msie > 0) {
            return true;
        } else if (trident > 0) {
            return true;
        } else if (edge > 0) {
            return true;
        } else {
            return false;
        }
    }
    var storage = {
        set: function(name, obj) {
            try {
                window.localStorage[name] = JSON.stringify(obj);
            } catch (error) {
                window[name] = JSON.stringify(obj);
            }
        },
        get: function(name) {
            try {
                return window.localStorage[name] ? JSON.parse(window.localStorage[name]) : null;
            } catch (error) {
                return window[name] ? JSON.parse(window[name]) : null;
            }
        },
        delete: function(name) {
            if (window.localStorage && window.localStorage[name]) {
                return window.localStorage.removeItem(name);
            } else if (window[name]) {
                return delete window[name];
            }
        }
    };
}

{ // callback functions
    var onCardReady = function onCardReady(data) {
        console.log("Site onCardReady: " + JSON.stringify(data));
        var onCardReadyTO = setTimeout(function() {
            window["___pwm"].closePopup();
            $('.pageView').hide();
            document.getElementById("pwmSuccess").style.display = "block";
            clearTimeout(onCardReadyTO);
        }, 5000);
    };

    var onCardSuccess = function onCardSuccess(data) {
        console.log("Site onCardSuccess: " + JSON.stringify(data));
        var onCardSuccessTO = setTimeout(function() {
            window["___pwm"].closePopup();
            $('.pageView').hide();
            document.getElementById("pwmSuccess").style.display = "block";
            clearTimeout(onCardSuccessTO);
        }, 5000);
    };

    var onPWMError = function onPWMError(errors) {
        if (errors.length > 0) {
            errors.forEach(function(error) {
                console.log("Site error: " + error);
            });
        }
    };

    var onPWMLog = function onPWMLog(logs) {
        if (logs.length > 0) {
            logs.forEach(function(log) {
                console.log("Site log: " + log);
            });
        }
    };

    var onBeforeClick = function onBeforeClick() {
        var result = new Date().getTime() % 2 == 0;
        onPWMLog(["hello from onClick with result [" + result + "]"]);
        return result;
    };
}

// init gateway site listeners
{
    function setListners() {
        if (window["isIframePage"]) {
            return;
        }
        var inputIDElement = document.querySelector(".inputID");
        var inputPhoneElement = document.querySelector(".inputPhone");

        if (inputIDElement && inputPhoneElement) {
            inputIDElement.addEventListener("blur", function() {
                check();
            });
            inputPhoneElement.addEventListener("blur", function() {
                check();
            });

            function check() {
                var id;
                var phone;

                if (/^\d{6,10}$/.test(inputIDElement.value)) {
                    id = inputIDElement.value;
                } else {
                    id = null;
                }

                if (/^\d{9,10}$/.test(inputPhoneElement.value)) {
                    phone = inputPhoneElement.value;
                } else {
                    phone = null;
                }

                if (id && phone) {
                    initTransactionData();
                    if (!___pwm.buttonEnabled) {
                        ___pwm.buttonEnabled = true;
                    }
                } else {
                    if (___pwm.buttonEnabled) {
                        ___pwm.buttonEnabled = false;
                    }
                }
            }
        }

        document.querySelectorAll("a[data-action], button[data-action]").forEach(element => {
            element.addEventListener("click", handlerActionClick, false)
        });
    }

    function handlerActionClick(sender) {
        var functionName = sender.currentTarget.attributes["data-action"].value;
        if (window[functionName] && typeof window[functionName] === "function") {
            if (sender.currentTarget.hasAttribute("data-action-argument")) {
                var argument = sender.currentTarget.attributes["data-action-argument"].value;
                if (argument === "this") {
                    argument = sender.currentTarget;
                }
                window[functionName](argument);
            } else {
                window[functionName]();
            }

        }
    }
}

{ // modes
    function enterPageView(pageViewId) {
        $('.pageView').hide();
        if (___pwm && ___pwm.moduleStatus && ___pwm.moduleStatus.status && ___pwm.moduleStatus.status === "running") {
            ___pwm.stopAndReset();
        }
        document.getElementById(pageViewId).style.display = "block";
    }
}