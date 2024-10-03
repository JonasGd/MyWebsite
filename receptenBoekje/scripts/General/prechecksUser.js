var isAdmin;
var isCreate;
var isDelete;
var isUpdate;
var isLoggedIn;
var username;

$(document).ready(function() {
    isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
    isCreate = JSON.parse(sessionStorage.getItem('isCreate'));
    isDelete = JSON.parse(sessionStorage.getItem('isDelete'));
    isUpdate = JSON.parse(sessionStorage.getItem('isUpdate'));
    isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));

    if (!isAdmin || isAdmin === "null" || !isCreate || isCreate === "null" || !isDelete || isDelete === "null" || !isUpdate || isUpdate === "null" || !isLoggedIn || isLoggedIn === "null" || username == null || username === "null") {
        loadParams();
    }
});

function loadParams(){
    $.ajax({
        url:"scripts/General/isUserAdmin.php",
        type: "get",
        success: function(res) {
            if (res === '1') {
                isAdmin = '1';
            } else {
                isAdmin = '0';
            }
        }
    });
    $.ajax({
        url:"scripts/General/isUserCreate.php",
        type: "get",
        success: function(res) {
            if (res === '1') {
                isCreate = '1';
            } else {
                isCreate = '0';
            }
        }
    });
    $.ajax({
        url:"scripts/General/isUserDelete.php",
        type: "get",
        success: function(res) {
            if (res === '1') {
                isDelete = '1';
            } else {
                isDelete = '0';
            }
        }
    });
    $.ajax({
        url:"scripts/General/isUserUpdate.php",
        type: "get",
        success: function(res) {
            if (res === '1') {
                isUpdate = '1';
            } else {
                isUpdate = '0';
            }
        }
    });

    $.ajax({
        url:"scripts/General/isUserLoggedIn.php",
        type: "get",
        success: function(res) {
            if (res === '') {
                isLoggedIn = '0';
            } else {
                isLoggedIn = '1';
                username = res;
            }
        }
    });
    sessionStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    sessionStorage.setItem('isCreate', JSON.stringify(isCreate));
    sessionStorage.setItem('isDelete', JSON.stringify(isDelete));
    sessionStorage.setItem('isUpdate', JSON.stringify(isUpdate));
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    sessionStorage.setItem('username', JSON.stringify(username));
}


function waitForFlags(conditionFunction) {
    const poll = resolve => {
        if(conditionFunction()) {
            resolve();
        }
        else {
            setTimeout(_ => poll(resolve), 100);
        }
    }
    return new Promise(poll);
}