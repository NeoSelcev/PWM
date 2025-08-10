
try {
    var SP_debug = 1;
    var url_string = window.location.href;
    var url_request = "https://test1.yaad.net/cgi-bin/yaadpay/smartpay_test.pl";
        
    var smartFormObj = getObj("formName");
    
    var SP_btnObj = document.createElement("BUTTON");
    var SP_txtBeforeObj = document.createElement("SPAN");
    var SP_txtAfterObj = document.createElement("SPAN");
    
    var SP_loaderDiv;
    var SP_notePopup;
    
    var pritimJarr = "";
        if(SPvar_pritim) {
          pritimJarr = SPvar_pritim;
        }
    var SP_Guid;
    var SP_Link;
    
    var inMiddleOfTrans = false;
    
    var oldID;
    var oldCELL;
    var load_SP_pixelImg, pixelImgObj;
    
    var OS_name = "Unknown";
        theOS = navigator.appVersion;
        if (theOS.indexOf("Win") != -1) OS_name =  "Windows"; 
        if (theOS.indexOf("Mac") != -1) OS_name =  "Mac"; 
        if (theOS.indexOf("X11") != -1) OS_name =  "UNIX"; 
        if (theOS.indexOf("Linux") != -1) OS_name =  "Linux";
  
    var redirect = function (location) {
      alert(location);
        window.location = location;
    };
  
    var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'https://web1.yaad.net/smartPay/SP_test/css/sp_style.css');
        document.head.appendChild(link);
    
    
    var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      isMobile = true;
    }
    
    window.addEventListener("focus", function(event) {
       if(SP_debug) {console.log('welcome (back)');}
       if(inMiddleOfTrans) {
        clearInterval(load_SP_pixelImg);
        
        pixelImgObj = new Image();
        load_SP_pixelImg = setInterval(pixelImgTimer, 300);
       }
    });
    
    window.addEventListener("blur", function(event) {
      if(SP_debug) {console.log('bye bye');}
    });
    
    getObj("fieldTaz").addEventListener("change", function(event) {
      fieldIDVal = getObj("fieldTaz").value;
    });
      
      
      
    //==================================//
    //======== RUNNING FUNCTION ========//
    //==================================//
    function Start_SPset() { 
      try {  
        SP_buildBTN(document.getElementById("SP_btnContainer"),getVar("SPvar_btnTXT"),getVar("SPvar_beforeBtnTXT"),getVar("SPvar_afterBtnTXT"));
      }
      catch(error) {
        errString = "×œ× × ×™×ª×Ÿ ×œ×©×œ× ×‘××ž×¦×¢×•×ª MAX. ×©×’×™××”: ";
        buildNotePopup(""+error)
      }
      
    }
    
    Start_SPset();
    //==================================//
    //==================================//
    //==================================//
    
    function SP_buildBTN(container,btnTXT,beforeBtnTXT,afterBtnTXT) {
    
        //== build the button ==//
        SP_btnObj.id = "smartPay_btn";
        SP_btnObj.setAttribute('onclick', "pay_by_max();return false;");
        SP_btnObj.innerHTML = btnTXT + "<div id='SP_btnArr'></div>";
        
        //== build the texts ==//
        SP_txtBeforeObj.classList.add("SP_textAroundBTN");
        SP_txtBeforeObj.innerHTML = beforeBtnTXT;
        
        SP_txtAfterObj.classList.add("SP_textAroundBTN");
        SP_txtAfterObj.innerHTML = afterBtnTXT;
        
        container.classList.add("SP_btn_container");
        container.innerHTML = "";
        container.appendChild(SP_txtBeforeObj);
        container.appendChild(SP_btnObj);
        container.appendChild(SP_txtAfterObj);
    }
    
    
    function pay_by_max() {
      
      if(inMiddleOfTrans) {
        return;
      }
      inMiddleOfTrans = true;
        
     /* if(getObj("fieldTaz").value == oldID && getObj("fieldPhone").value == oldCELL) {
       return; 
      } */
        
  
      
      oldID = getObj("fieldTaz").value;
      oldCELL = getObj("fieldPhone").value;
      
      if(getObj("fieldTaz") || getObj("fieldPhone")) {
        
        fieldIDVal = getObj("fieldTaz").value;
        fieldPhoneVal = getObj("fieldPhone").value;
        fieldAmountVal = getObj("fieldAmount").value;
        
        if (SP_numberOnly(getObj("fieldTaz").value)) {
              
              buildLoader();
              
              var xhr = new XMLHttpRequest();
              xhr.open("POST", url_request);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.onload = function () {
                  var Jobj = JSON.parse(xhr.responseText);
                  var d = new Date();
                  var n = d.toLocaleTimeString();
                  if(SP_debug) {console.log("res1: ("+n+")" + xhr.responseText);}
                    
                  clearInterval(load_SP_pixelImg);
                  
                  removeObj(SP_loaderDiv);
                  
                  if(Jobj.RC == "0") {
                    SP_Guid = Jobj.transID;
                    SP_Link = Jobj.scheme;
                    
  
                    
                    errString = "×™×© ×œ×”×ž×©×™×š ××ª ×”×ª×”×œ×™×š ×‘××¤×œ×™×§×¦×™×”, ×‘×¡×™×•× ×”×ª×”×œ×™×š ×™×ª×¢×“×›×Ÿ ×”×ª×©×œ×•× ×‘×—×œ×•×Ÿ ×–×” ×‘××•×¤×Ÿ ××•×˜×•×ž×˜×™";
                    buildNotePopup(errString);
                    
                    pixelImgObj = new Image();
                    load_SP_pixelImg = setInterval(pixelImgTimer, 300);
                    
                      if(isMobile) {
                        //alert("a1");
                          redirect(SP_Link);
                      }
                  } else {
                    buildUserNote(Jobj.RC);
                    inMiddleOfTrans = false;
                  }
              };
              
              moreFields = {};
              for (var key in SPfields) {
                  // check if the property/key is defined in the object itself, not in parent
                  if (key != "formName" && key != "fieldCC" && key != "fieldTmonth" && key != "fieldTyear" && key != "fieldCvv" && key != "fieldPhone" && key != "fieldID") {           
                      moreFields[key] = SPfields[key];
                  }
              }
              xhr.send(JSON.stringify({'action':'first',
                      fieldID:fieldIDVal,
                      fieldPhone:fieldPhoneVal,
                      Amount:fieldAmountVal,
                      OS_name:OS_name,
                      url:url_string,
                      GetewayID:getVar("SPvar_GetewayID"),
                      bizID:getVar("SPvar_BizID"),        
                      bizURL:getVar("SPvar_BizURL"),      
                      masofShva:getVar("SPvar_MasofShva"), 
                      fingerprint:getVar("SPvar_Fingerprint"),
                      bizLogoURL:getVar("SPvar_BizLogoURL"),
                      pritim:pritimJarr,
                      moreFields
                  }));
        } else {
          errString = "× × ×œ×”×–×™×Ÿ ×ª.×–.";
          buildUserNote(errString);
          inMiddleOfTrans = false;
        }
      } else {
        errString = "× × ×œ×”×–×™×Ÿ ×ª.×– ××• ×˜×œ×¤×•×Ÿ";
        buildUserNote(errString);
        inMiddleOfTrans = false;
      }
    }
    
    function pixelImgTimer() {
    
        pixelImgObj.onload = function() {
            removeObj(SP_notePopup);
            buildLoader();
    
            //== AJAX call ==//
            var xhr3 = new XMLHttpRequest();
            xhr3.open("POST", url_request);
            xhr3.setRequestHeader("Content-Type", "application/json");
            xhr3.onload = function () {
                var Jobj3 = JSON.parse(xhr3.responseText);
                if(SP_debug) {console.log("res3: " + xhr3.responseText);}
                
                removeObj(SP_loaderDiv);
                pixelImgObj.onload = null;
                pixelImgObj.src = "";
                pixelImgObj = null;
                inMiddleOfTrans = false;
                if (typeof SPvar_finishedFunction !== 'undefined') {
                  SPvar_finishedFunction(Jobj3.CardData,  Jobj3.maskCC, Jobj3.Tmonth, Jobj3.Tyear);
                } else {
                  smartFormObj.submit();
                }
            };
            xhr3.send(JSON.stringify({'action':'third',Guid:SP_Guid}));
        
        
            clearInterval(load_SP_pixelImg);
        };
        pixelImgObj.onerror = function() {
          if(SP_debug) {console.log("not");}
            // do something
        };
        pixelImgObj.src = url_request+"?"+SP_Guid;
    }
        
    
    
    function buildLoader() {
      SP_loaderDiv = document.createElement("div");
      SP_loaderDiv.id = "SP_loaderDiv";
      document.body.appendChild(SP_loaderDiv);
    }
    
    function SP_numberOnly(val) {
      var numRe = /^[0-9]+$/;
      return numRe.test(val);
    }
    
    function getObj(name) {
      t = document.getElementsByName(SPfields[name])[0];
      return t;
    }
    
    function getVar(name) {
      return SPvars[name];
    }
  }
  catch(error) {
    errString = "×œ× × ×™×ª×Ÿ ×œ×©×œ× ×‘××ž×¦×¢×•×ª MAX. ×©×’×™××”: ";
    buildNotePopup(""+error);
    inMiddleOfTrans = false;
  }
  
  function buildNotePopup(errString) {
    SP_notePopup = document.createElement("DIV");
    SP_notePopup.classList.add("SP_notePopup");
    SP_notePopup.innerHTML = errString;
    document.body.appendChild(SP_notePopup);
    
    var SP_notePopupClose= document.createElement("DIV");
    SP_notePopupClose.classList.add("SP_notePopupClose");
    SP_notePopupClose.innerHTML = "X";
    SP_notePopupClose.onclick = function() {removeObj(SP_notePopup);};
    SP_notePopup.appendChild(SP_notePopupClose);
  }
  
  function removeObj(obj) {
    if(document.contains(obj)) {
      document.body.removeChild(obj)[0];
    }
  }