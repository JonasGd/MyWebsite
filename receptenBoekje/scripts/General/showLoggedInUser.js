$(document).ready(function() {
    $.ajax({
        url:"scripts/General/isUserLoggedIn.php",
        type: "get",
        success: function(res) {
            $('#loginLogout').empty();
            if(res) {
                document.getElementById('loginDropdown').classList.add('dropdown');
                $('#loginLogout').append('<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">'+
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill pe-1" viewBox="0 0 16 16">'+
                    '<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>'+
                '</svg>'+
                res + '</a>'+
                '<ul class="dropdown-menu dropdown-menu-end">'+
                    '<li><a class="dropdown-item" href="ResetPassword">Wachtwoord wijzigen</a></li>'+
                '<li><a class="logout" onclick="logout()" href="#" style="font-weight: bold;">'+
                    'Uitloggen <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right ps-1" viewBox="0 0 16 16">'+
                        '<path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>'+
                        '<path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>'+
                    '</svg>'+                                     
                '</a></li></ul>');
            } else {
                document.getElementById('loginDropdown').classList.remove('dropdown');
                $('#loginLogout').append('<a href="Login" style="font-weight: bold;">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right pe-1" viewBox="0 0 16 16" style="text-decoration: none;">' +
                            '<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>' +
                            '<path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>' +
                        '</svg>' +
                        'Login' +
                    '</a>');
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
});

function logout() {
    console.log("logging out")
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("isCreate");
    sessionStorage.removeItem("isDelete");
    window.location.href = "scripts/General/logout.php";
}