/**************
 * novaConsent
 * Simple Consent Info Layer
 * @version 1.0
 * @info currently for only technically necessary cookies
 * @author novafacile OÜ
 * @copyright 2021 by novafacile OÜ
 * @license MIT
 *************/

function novaConsentObj() {

   var config = {
    cookieName: "novaConsent",
    cookieTimeout: 365,
    infoText: "We only use technically necessary cookies.",
    acceptButtonText: "Okay",
    moreInfo: "",
    SameSite: "Strict"
  };

  // overwrite config
  setConfig = function(value){
    Object.keys(value).forEach(
      item => { config[item] = value[item]; }
    );
  }


  // HTML Template
  consentHtml = function(){
    return '<div class="novaConsentContainer" id="novaConsentContainer"><div class="novaConsentInfo">' 
      + config.infoText + ' '
      + config.moreInfo
      + '</div><div class="novaConsentButton"><a onClick="novaConsent.save();">' 
      + config.acceptButtonText 
      + '</a></div></div>';
  }

  // cookie operations
  function setCookie(value) {
    var date = new Date();
    date.setTime(date.getTime() + (config.cookieTimeout*24*60*60*1000));
    var expires = date.toUTCString();
    var value = JSON.stringify(value);
    document.cookie = config.cookieName + "=" + value + "; expires=" + expires + "; path=/; SameSite=" + config.SameSite + "; ";
  }

  function getCookie(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  // consent Operations
  function checkConsentStatus() {
    var value = getCookie(config.cookieName);
    return JSON.parse(value);
  }


  // public methods
  this.perform = function(){
    if(typeof novaConsentConfig !== "undefined"){
      setConfig(novaConsentConfig);
    }

    var result = checkConsentStatus();
    if(result){
      // currently do nothing
    } else {
      this.show();
    }
  }

  this.save = function(analytics, marketing){
    var value = { 
      "consent_shown": Date.now(), 
      "technical": "accepted",
      "analytics": "denied",
      "marketing": "denied"
    };

    if(analytics){
      value.analytics = "accepted";
    }
    if(marketing){
      value.marketing = "accepted";
    }

    setCookie(value);
    this.hide();
  }

  this.show = function(){
    document.body.innerHTML += consentHtml();
  }

  this.hide = function(){
    let container = document.querySelector("#novaConsentContainer");
    container.style.setProperty('opacity', '0');
    setTimeout(() => container.style.setProperty('display', 'none'), 200);
  }

}

var novaConsent = new novaConsentObj();
novaConsent.perform();