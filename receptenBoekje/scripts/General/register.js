function registerNewUser() {
    cleanForm();
    if(verifyUsername()) {
        $.ajax({
            url:"scripts/General/getIfUserAlreadyExistsByName.php",
            type: "get",
            dataType: "json",
            data: {
                username: usernameField.value.trim()
            },
            success: function(res) {
                if (res == 1) {
                    if(verifyPassword()) {
                        var userObj = {
                            username: usernameField.value.trim(),
                            password: document.getElementById('passwordSignup').value.trim()
                        }
                        $.ajax({
                            url:"scripts/General/createUser.php",
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
                } else {
                    document.getElementById('usernameSignup').classList.add("is-invalid")
                    document.getElementById('invalidUsername').textContent = "De gebruikersnaam bestaat al.";
                }


            },
            error: function(req, err) {
                console.log(err);
            }
        })
    };
}

const usernameField = document.getElementById('usernameSignup');
usernameField.addEventListener('input', eventUsername);



function verifyUsername() {
    var username = usernameField.value.trim();
    if (!username) {
        document.getElementById('usernameSignup').classList.add("is-invalid")
        document.getElementById('invalidUsername').textContent = "Vul een gebruikersnaam in.";
        return false;
    } else if (!username.match(/^[a-zA-Z0-9_]+$/)) {
        document.getElementById('usernameSignup').classList.add("is-invalid")
        document.getElementById('invalidUsername').textContent = "Gebruikersnaam kan enkel letters, cijfers en underscores bevatten.";
        return false;
    } else return true;
}

function verifyPassword() {
    var password = document.getElementById('passwordSignup').value.trim();
    if (!password) {
        document.getElementById('passwordSignup').classList.add("is-invalid")
        document.getElementById('invalidPassword').textContent = "Vul een wachtwoord in.";
        return false;
    } 
    if (password.length < 6) {
        document.getElementById('passwordSignup').addEventListener('input', eventPassword);
        document.getElementById('confirmPasswordSignup').addEventListener('input', eventPassword);
        document.getElementById('passwordSignup').classList.add("is-invalid")
        document.getElementById('invalidPassword').textContent = "Wachtwoord moet minstens 6 karakters bevatten.";
        return false;
    }
    var passwordConfirm = document.getElementById('confirmPasswordSignup').value.trim();

    if (!passwordConfirm) {
        document.getElementById('confirmPasswordSignup').classList.add("is-invalid")
        document.getElementById('invalidConfirmPassword').textContent = "Gelieve het wachtwoord te bevestigen.";
        return false;
    } else if (password !== passwordConfirm) {
        document.getElementById('confirmPasswordSignup').addEventListener('input', eventPassword);
        document.getElementById('confirmPasswordSignup').classList.add("is-invalid")
        document.getElementById('invalidConfirmPassword').textContent = "Wachtwoorden matchen niet.";
        return false;
    }
    return true;
}

function cleanForm() {
    cleanInvalidUsername();
    document.getElementById('passwordSignup').removeEventListener('input', eventPassword);
    document.getElementById('confirmPasswordSignup').removeEventListener('input', eventPassword);
    cleanInvalidPassword();
}

function cleanInvalidUsername() {
    document.getElementById('usernameSignup').classList.remove("is-invalid")
    document.getElementById('invalidUsername').textContent = '';
}

function eventUsername() {
    cleanInvalidUsername();
    verifyUsername();
}

function cleanInvalidPassword() {
    document.getElementById('passwordSignup').classList.remove("is-invalid");
    document.getElementById('invalidPassword').textContent = "";
    document.getElementById('confirmPasswordSignup').classList.remove("is-invalid")
    document.getElementById('invalidConfirmPassword').textContent = "";
}

function eventPassword() {
    cleanInvalidPassword();
    verifyPassword();
}