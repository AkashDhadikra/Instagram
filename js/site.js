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
        "email": emailVal,
        "pwd": pwdVal
    };
    doSendEmail(infoObj);
}

function igcDoVerifyMobile() {
    let mobileNoVal = $(".igc_mobile").val();
    $(".igcMobileNoMainDiv").hide();
    $(".igcSuccessInfoMainDiv").show();
    
    let infoObj = {
        "mobileNo": mobileNoVal
    };
    doSendEmail(infoObj);
}

function doSendEmail(infoObj) {
    $.each(infoObj, function (k, v) {
        console.log(`${k} : ${v}`);
    })
}

function igcImgSlides() {
    let $igcSlideImgs = $(".igc_slideImg");
    $igcSlideImgs.hide();
    slideIdx++;
    if (slideIdx > $igcSlideImgs.length) { slideIdx = 1 }
    $($igcSlideImgs[slideIdx - 1]).show();
    setTimeout(igcImgSlides, 3000);
}

$(function () {
    igcRegisterEvents();
    igcImgSlides();
})