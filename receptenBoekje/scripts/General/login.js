$(document).ready(function() {
    $.ajax({
        url:"scripts/General/isUserLoggedIn.php",
        type: "get",
        success: function(res) {
            if(res) {
                if(!document.referrer.href || document.referrer.slice(-6) === 'Signup' || document.referrer.slice(-13) === 'ResetPassword') {
                    window.location.href = 'ReceptenKiesCategorie';  
                } 
                else window.location = document.referrer;
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
})


function loginUser() {
    cleanForm();
    if(verifyUsername() && verifyPassword()) {
        var userObj = {
            username: usernameField.value.trim(),
            password: passwordField.value.trim()
        }
        $.ajax({
            url:"scripts/General/loginUser.php",
            type: "post",
            dataType: "json",
            data: {
                json: JSON.stringify(userObj)
            },
            success: function(res) {
                if (res == 1) {
                    if(!document.referrer || document.referrer.slice(-6) === 'Signup'|| document.referrer.slice(-13) === 'ResetPassword') {
                        window.location.href = 'ReceptenKiesCategorie';  
                    } 
                    else window.location = document.referrer;
                } else {
                    document.getElementById('usernameLogin').classList.add("is-invalid")
                    document.getElementById('invalidUsername').textContent = "De gebruikersnaam of wachtwoord is ongeldig.";
                    document.getElementById('passwordLogin').classList.add("is-invalid")
                    document.getElementById('invalidPassword').textContent = "De gebruikersnaam of wachtwoord is ongeldig.";
                }
            },
            error: function(req, err) {
                console.log(err);
            }
        }) 
    }
}

const usernameField = document.getElementById('usernameLogin');
usernameField.addEventListener('input', eventUsername);
const passwordField = document.getElementById('passwordLogin');
passwordField.addEventListener('input', eventPassword);



function verifyUsername() {
    var username = usernameField.value.trim();
    if (!username) {
        document.getElementById('usernameLogin').classList.add("is-invalid")
        document.getElementById('invalidUsername').textContent = "Vul je gebruikersnaam in.";
        return false;
    }  
    return true;
}

function verifyPassword() {
    var password = passwordField.value.trim();
    if (!password) {
        document.getElementById('passwordLogin').classList.add("is-invalid")
        document.getElementById('invalidPassword').textContent = "Vul je wachtwoord in.";
        return false;
    } 
    return true;
}

function cleanForm() {
    cleanInvalidUsername();
    cleanInvalidPassword();
}

function cleanInvalidUsername() {
    document.getElementById('usernameLogin').classList.remove("is-invalid")
    document.getElementById('invalidUsername').textContent = '';
}

function eventUsername() {
    cleanInvalidUsername();
    verifyUsername();
}

function cleanInvalidPassword() {
    document.getElementById('passwordLogin').classList.remove("is-invalid");
    document.getElementById('invalidPassword').textContent = "";
}

function eventPassword() {
    cleanInvalidPassword();
    verifyPassword();
}