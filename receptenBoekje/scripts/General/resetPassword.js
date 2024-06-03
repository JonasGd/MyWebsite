$(document).ready(function() {
    /*
    
    $.ajax({
        url:"scripts/General/isUserLoggedIn.php",
        type: "get",
        success: function(res) {
            console.log(document.referrer);
            if(res) {
                if(!document.referrer.href || document.referrer.slice(-6) === 'Signup') {
                    window.location.href = 'ReceptenKiesCategorie';  
                } 
                else window.location = document.referrer;
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
    */
})

function verifyPassword() {
    var password = document.getElementById('passwordReset').value.trim();
    if (!password) {
        document.getElementById('passwordReset').classList.add("is-invalid")
        document.getElementById('invalidPassword').textContent = "Vul een wachtwoord in.";
        return false;
    } 
    if (password.length < 6) {
        document.getElementById('passwordReset').addEventListener('input', eventPassword);
        document.getElementById('confirmPasswordReset').addEventListener('input', eventPassword);
        document.getElementById('passwordReset').classList.add("is-invalid")
        document.getElementById('invalidPassword').textContent = "Wachtwoord moet minstens 6 karakters bevatten.";
        return false;
    }
    var passwordConfirm = document.getElementById('confirmPasswordReset').value.trim();

    if (!passwordConfirm) {
        document.getElementById('confirmPasswordReset').classList.add("is-invalid")
        document.getElementById('invalidConfirmPassword').textContent = "Gelieve het wachtwoord te bevestigen.";
        return false;
    } else if (password !== passwordConfirm) {
        document.getElementById('confirmPasswordReset').addEventListener('input', eventPassword);
        document.getElementById('confirmPasswordReset').classList.add("is-invalid")
        document.getElementById('invalidConfirmPassword').textContent = "Wachtwoorden matchen niet.";
        return false;
    }
    return true;
}

function cleanForm() {
    document.getElementById('passwordReset').removeEventListener('input', eventPassword);
    document.getElementById('confirmPasswordReset').removeEventListener('input', eventPassword);
    cleanInvalidPassword();
}

function cleanInvalidPassword() {
    document.getElementById('passwordReset').classList.remove("is-invalid");
    document.getElementById('invalidPassword').textContent = "";
    document.getElementById('confirmPasswordReset').classList.remove("is-invalid")
    document.getElementById('invalidConfirmPassword').textContent = "";
}

function eventPassword() {
    cleanInvalidPassword();
    verifyPassword();
}

function changePassword() {
    cleanForm();
    if(verifyPassword()) {
        var userObj = {
            password: document.getElementById('passwordReset').value.trim()
        }
        $.ajax({
            url:"scripts/General/updatePasswordUser.php",
            type: "post",
            dataType: "json",
            data: {
                json: JSON.stringify(userObj)
            },
            success: function(res) {
                if (res == 1) {
                    window.location.href = 'Login';
                }
            },
            error: function(req, err) {
                console.log(err);
            }
        })
    }
}

function cancelReset() {
    if(!document.referrer.href || document.referrer.slice(-6) === 'Signup') {
        window.location.href = 'ReceptenKiesCategorie';  
    } 
    else window.location = document.referrer;
}