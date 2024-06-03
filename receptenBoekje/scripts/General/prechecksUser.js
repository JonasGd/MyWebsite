var isAdmin;
var isCreate;
var isDelete;

$(document).ready(function() {
    isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
    isCreate = JSON.parse(sessionStorage.getItem('isCreate'));
    isDelete = JSON.parse(sessionStorage.getItem('isDelete'));

    if (!isAdmin || isAdmin === "null" || !isCreate || isCreate === "null" || !isDelete || isDelete === "null" ) {
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
    sessionStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    sessionStorage.setItem('isCreate', JSON.stringify(isCreate));
    sessionStorage.setItem('isDelete', JSON.stringify(isDelete));
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