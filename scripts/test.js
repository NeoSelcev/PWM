function addHeader() {
    var firstItemElementClone = document.querySelector(".Header").cloneNode(true);
    firstItemElementClone.querySelectorAll("input[type=text]").forEach(function (textbox) { textbox.value = ""; });
    firstItemElementClone.querySelectorAll("input[type=checkbox]").forEach(function (checkbox) { checkbox.checked = false; });
    document.querySelector(".Header").parentNode.appendChild(firstItemElementClone);
}

function removeHeader(button) {
    var currentItem = button.closest('.Header');
    if (document.querySelectorAll(".Header").length > 1) {
        currentItem.parentNode.removeChild(currentItem);
    } else {
        currentItem.querySelectorAll("input[type=text]").forEach(function (textbox) { textbox.value = ""; });
        currentItem.querySelectorAll("input[type=checkbox]").forEach(function (checkbox) { checkbox.checked = false; });
    }
}

function addQS() {
    var firstItemElementClone = document.querySelector(".Parameter").cloneNode(true);
    firstItemElementClone.querySelectorAll("input[type=text]").forEach(function (textbox) { textbox.value = ""; });
    firstItemElementClone.querySelectorAll("input[type=checkbox]").forEach(function (checkbox) { checkbox.checked = false; });
    document.querySelector(".Parameter").parentNode.appendChild(firstItemElementClone);
}

function removeQS(button) {
    var currentItem = button.closest('.Parameter');
    if (document.querySelectorAll(".Parameter").length > 1) {
        currentItem.parentNode.removeChild(currentItem);
    } else {
        currentItem.querySelectorAll("input[type=text]").forEach(function (textbox) { textbox.value = ""; });
        currentItem.querySelectorAll("input[type=checkbox]").forEach(function (checkbox) { checkbox.checked = false; });
    }
}

function getNameAndValue(className, i) {
    if (!i) {
        i = 0;
    }
    var name = document.querySelectorAll("." + className + "Name")[i].value;
    var value = document.querySelectorAll("." + className + "Value")[i].value;
    if (name) {
        return {
            "name": name,
            "value": value
        };
    } else {
        return null;
    }
}

function sendTestRequest() {
    // get data
    var url = document.querySelector(".url").value;
    var method = document.querySelector(".method").value;
    var headers = [];
    document.querySelectorAll(".Header").forEach(function (itemElement, i) {
        if (header = getNameAndValue("header", i), header !== null) headers.push(header);
    });
    var querystringParameters = [];
    document.querySelectorAll(".Parameter").forEach(function (itemElement, i) {
        if (querystringParameter = getNameAndValue("parameter", i), querystringParameter !== null) querystringParameters.push(querystringParameter);
    });
    var payload = JSON.parse(document.querySelector(".payload").value);

    // send request
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        switch (request.readyState) {
            case 4:
                document.querySelector(".status").innerHTML = request.status;
                document.querySelector(".statusText").innerHTML = request.statusText;
                document.querySelector(".body").innerHTML = request.responseText;
                break;
        }
        function getLogMessage(executionStatus) {
            var secondPast = apiStartedAt ? (Math.abs((new Date().getTime() - apiStartedAt.getTime()) / 1000)) : 0;
            return "api request " + executionStatus + " ["
                + "state: [" + request.readyState + "]"
                + ", status: [" + request.status + "]"
                + ", statusText: [" + request.statusText + "]"
                + ", responseText: [" + request.responseText + "]"
                + (apiStartedAt ? ", execution time: [" + secondPast + "s]" : "")
                + "]";
        }
    };
    if (querystringParameters.length > 0) {
        url += "?";
        querystringParameters.forEach(function (querystringParameter, i) {
            if (i > 0) {
                url += "&";
            }
            url += querystringParameter.name + "=" + querystringParameter.value;
        });
    }
    request.open(method, url);
    if (headers.length > 0) {
        headers.forEach(function (header) {
            request.setRequestHeader(header.name, header.value);
        });
    }
    if (payload) {
        request.send(JSON.stringify(payload));
    } else {
        request.send();
    }
}

