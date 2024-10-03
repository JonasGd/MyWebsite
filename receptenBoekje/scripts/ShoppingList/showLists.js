var isShopping = getQueryVariable("isShopping") == 'true';
var isUserAdmin = false;

$(document).ready(function() {
    waitForFlags(_ => (isLoggedIn === 0 || (isLoggedIn !==null && isLoggedIn !== "null")))
    .then(_ => {
        if (isLoggedIn==='0') 
            window.location = document.referrer;
    })

    waitForFlags(_ => (isAdmin === 0 || (isAdmin !==null && isAdmin !== "null")))
    .then(_ => {
        if (isAdmin==='1') 
            isUserAdmin = true;
        else 
            isUserAdmin = false;
    })

    $('#title').append(isShopping? 'Mijn Boodschappenlijstjes' : 'Mijn weekkeuzes');
    if (!isShopping) document.getElementById('newAndChoices').style.display = 'none';
    else {
        $.ajax({
            url:"scripts/ShoppingList/isRelatedToAdmin.php",
            type: "get",
            dataType: "text",
            success: function(res) {
                if (res !== '1') {
                    document.getElementById('newAndChoices').style.display = 'none';
                }
            },
            error: function(req, err) {
                console.log(err);
            }
        })
    }

    reloadLists();
})

var lists = [];

function reloadLists() {
    $.ajax({
        url:"scripts/ShoppingList/getAllShoppingLists.php",
        type: "get",
        dataType: "json",
        success: function(res) {
            lists = res;
            $('#cards').empty();
            for (let i = 0; i < res.length; i++) {
                var count = 0;
                $.ajax({
                    url:"scripts/WeekKeuze/getShoppingListRecipesByShoppingListId.php",
                    type: "get",
                    dataType: "json",
                    data: {
                        shoppinglistId: res[i]['Id']
                    },
                    success: function(res2) {
                        var content = '';
                        if (res[i]['isShopping'] !== '0') {
                            if (isShopping) {
                                content += '<div class="col"><div class="card p-3" onclick="event.cancelBubble=true; event.stopPropagation();location.href=\'ToonLijst?ShoppinglistId=';
                                content += res[i]['Id'];
                                content += '\'"><div class = "card-body" style="flex:0 1 auto"><div class="row" id = "name-';
                                content += res[i]['Id'];
                                content += '"><div class="col-10"><h5 class="card-title mb-0" style="font-weight:bold;" onclick="event.cancelBubble = true; event.stopPropagation();switchToChange(';
                                content += res[i]['Id'];
                                content += ')">';
                                content += res[i]['Name'];
                                content += '</h5></div> <div class="col-2"><a style="pointer-events: auto;" class="ingredientLink" onclick="event.cancelBubble = true; event.stopPropagation();deleteShoppingList(';
                                content += res[i]['Id'];
                                content += ')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg></a></div></div>'
                                content += '<h6 class="fst-italic">';
                                content += res[i]['Date'];
                                content += '</h6>';
                                content += isUserAdmin ? ('<h6 class ="fst-italic">'+res[i]['username']+'</h6>') : '';
                                content += '</div><ul class="list-group list-group-flush">'
                                for (let j = 0; j < res2.length; j++) {
                                    content += '<li class="list-group-item"><div class="row"><div class="col-10"><a href="ToonRecept?RecipeId=';
                                    content += res2[j]['RecipeId'];
                                    content += '">';
                                    content += res2[j]['Name'];
                                    content += '</a></div><div class="col-2"><a style="pointer-events: auto;" class="ingredientLink" onclick="event.cancelBubble = true; event.stopPropagation();removeRecipe('
                                    content += res2[j]['RecipeId'];
                                    content += ', ';
                                    content += res[i]['Id']
                                    content += ')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg></a></div></div></li>'
                                }
                                content += '</ul></div></div>';
                            }
                        } else {
                            content += '<div class="col week" style="display:'+(!isShopping? 'block' : 'none') + '"><div class="card p-3 disabled" onclick="event.cancelBubble=true; event.stopPropagation();location.href=\'ToonLijst?ShoppinglistId='
                            content += res[i]['Id']
                            content += '\'"><div class = "card-body" style="flex:0 1 auto"><h5 class="card-title mb-0" style="font-weight:bold;">';
                            content += res[i]['Name'];
                            content += '</h5>';
                            content += isUserAdmin ? ('<h6 class ="fst-italic">'+res[i]['username']+'</h6>') : '';
                            content +='</div><ul class="list-group list-group-flush">';
                            for (let j = 0; j < res2.length; j++) {
                                content += '<li class="list-group-item"><a href="ToonRecept?RecipeId=';
                                content += res2[j]['RecipeId'];
                                content += '">';
                                content += res2[j]['Name'];
                                content += '</a></li>';
                            }
                            content += '</ul></div></div>';
                        }
                        $('#cards').append(content);
                        count++;
                    },
                    error: function(req, err) {
                        console.log(err);
                    }
                })
            }
            if (isShopping) {
                waitForFlags(_ => (count === res.length))
                .then(_ => {
                    reloadState();
                })
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function reloadState() {
    var showAll = document.getElementById('flexSwitchShowAll').checked;
    document.querySelectorAll(".week").forEach(element => {
        element.style.display = showAll? "block" : "none";
    });
}

function switchToChange(shoppinglistId) {
    var elementId = '#name-' + shoppinglistId;
    var element = $(elementId);
    var name = element.find('h5').text().trim();
    element.empty();
    var content = '';
    content += '<div class="col-10 px-0 mb-2"><input onclick = "event.cancelBubble=true; event.stopPropagation();" type="text" class="form-control" value="';
    content += name;
    content +='"></div><div class="col-2 link" onclick="event.cancelBubble=true; event.stopPropagation(); saveListName(';
    content += shoppinglistId;
    content += ')"><svg style="top:3px; left:3px; position: relative;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16"><path d="M11 2H9v3h2z"/><path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/></svg></div>'

    element.append(content);
}

function saveListName(shoppinglistId) {
    var elementId = '#name-' + shoppinglistId;
    var element = $(elementId);
    var name = element.find('input').val();

    name = uniqueName(name, shoppinglistId);


    var shoppinglistNames =  {
        shoppinglistId: shoppinglistId,
        shoppinglistName: name
    }
    $.ajax({
        url:"scripts/ShoppingList/updateShoppingListName.php",
        type: "post",
        dataType: "json",
        data: {
            json: JSON.stringify(shoppinglistNames)
        },
        success: function(res) {
            reloadLists()
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function uniqueName(name, shoppinglistId) {
    var localName = name;
    for (const list of lists) {
        if (list['Name'] === name && Number(list['Id']) !== shoppinglistId) {
            newName = (name.charAt(name.length-1) === ')' && (name.charAt(name.length-3) ==='(' || name.charAt(name.length-4) === '(')) ?
                (name.charAt(name.length-3) ==='(' ? 
                    (name.slice(0, name.length-2) + (Number(name.charAt(name.length-2))+1) + name.slice(name.length-1, name.length)) :
                    (name.slice(0, name.length-3) + (Number(name.slice(name.length-3, name.length-1))+1) + name.slice(name.length-1, name.length))
                ):
                (name + ' (1)');
            localName = uniqueName(newName);
        }
    }
    return localName;
}



function createNewList() {
    const today = new Date();
    var newListName = (today.getFullYear() + "-"+(today.getMonth()+1) + "-" + today.getDate()).toString();
    var newListDate = (today.getFullYear() + ("0" + (today.getMonth()+1)).slice(-2) + ("0" + (today.getDate())).slice(-2)).toString();

    newListName = uniqueName(newListName, 0);

    var shoppinglist = {
        name: newListName,
        date: newListDate,
        isShopping: true
    } 
    $.ajax({
        url:"scripts/WeekKeuze/createShoppingList.php",
        type: "post",
        dataType: "json",
        data: {
            json: JSON.stringify(shoppinglist)
        },
        success: function(res) {
            reloadLists()
            switchToChange(res['Id']);
        },
        error: function(req, err) {
            console.log(err);
        }
    })   
}

function deleteShoppingList(shoppinglistId) {
    $.ajax({
        url:"scripts/WeekKeuze/deleteShoppingListRecipesByShoppingListId.php",
        type: "get",
        dataType: "json",
        data: {
            shoppinglistId: shoppinglistId
        },
        success: function(res) {
            $.ajax({
                url:"scripts/WeekKeuze/deleteShoppingListById.php",
                type: "get",
                dataType: "json",
                data: {
                    id: shoppinglistId
                },
                success: function(res2) {
                    reloadLists();
                },
                error: function(req, err) {
                    console.log(err);
                }
            })
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function removeRecipe(recipeId, shoppinglistId) {
    $.ajax({
        url:"scripts/ShoppingList/deleteRecipeFromShoppingListRecipeById.php",
        type: "get",
        dataType: "json",
        data: {
            shoppinglistId: shoppinglistId,
            recipeId: recipeId
        },
        success: function(res) {
            reloadLists();
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return true;
}