var peopleFed = 2;
var peopleFedId;

const today = new Date();
var currentListDate = new Date(today.setDate(today.getDate() + (8-new Date().getDay())));
var currentListName = "PW " + (currentListDate.getFullYear() + "-"+(currentListDate.getMonth()+1) + "-" + currentListDate.getDate()).toString();
var currentListDateFormatted = (currentListDate.getFullYear() + '' + ("0" + (currentListDate.getMonth()+1)).slice(-2) + ("0" + currentListDate.getDate()).slice(-2)).toString();
var currentListDateFormattedReturn = (currentListDate.getFullYear() + '-' + ("0" + (currentListDate.getMonth()+1)).slice(-2) + '-' + ("0" + currentListDate.getDate()).slice(-2)).toString();

var hasRights = false;

$(document).ready(function() {
    waitForFlags(_ => (isAdmin === 0 || (isAdmin !==null && isAdmin !== "null")) && (isUpdate === 0 || (isUpdate !== null && isUpdate !== "null")))
        .then(_ => {
            var button = document.getElementById("saveChoiceBtn");
            if (isAdmin==='0' && isUpdate==='0') {
                hasRights = false;
                button.disabled = true;
            } else {
                hasRights = true;
                button.disabled = false;
            }
        })
    loadPeopleFeds();
    reloadChoices();
    reloadShoppingList();
})

function loadPeopleFeds() {
    $.ajax({
        url:"scripts/ToonRecept/getPeopleFeds.php",
        type: "get",
        dataType: "json",
        success: function(res) {
            var select = '';
            select='<select class="form-select" aria-label="People Fed">';
            for (let i = 0; i < res.length; i++) {
                select += '<option' + (res[i]['Label']==peopleFed?' selected':'') + '>'+res[i]['Label']+'</option>';
                if (res[i]['Label'] == peopleFed) peopleFedId = res[i]['Id'];
            }
            select+='</select>';
            $('#peopleFed').append(select);
            const options = document.querySelectorAll('.form-select');

            for (const option of options) {
            option.addEventListener('change', function handleChange() {
                peopleFed = option.value;
            });
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

var recipes;


function reloadChoices() {
    $.ajax({
        url:"scripts/WeekKeuze/getRecipes.php",
        type: "get",
        dataType: "json",
        success: function(res) {
            recipes = res;
            $('#choiceCards').empty();
            for (let i = 0; i < res.length; i++) {

                var pictureUrl = res[i]['PictureUrl']!=null ? res[i]['PictureUrl'] : 
                (   res[i]['SubCategoryMainId'] == 4 ? '/resources/Images/CategoryImages/italian.jpg':
                    res[i]['SubCategoryMainId'] == 2 ? '/resources/Images/CategoryImages/mexican.jpg':
                    res[i]['SubCategoryMainId'] == 3 ? '/resources/Images/CategoryImages/albanian.jpg':
                    res[i]['SubCategoryMainId'] == 5 ? '/resources/Images/CategoryImages/paella.jpg':
                    res[i]['SubCategoryMainId'] == 8 ? '/resources/Images/CategoryImages/asian.jpg':
                    res[i]['SubCategoryMainId'] == 1 ? '/resources/Images/CategoryImages/vlaams.jpg':
                    res[i]['SubCategoryMainId'] == 6 ? '/resources/Images/CategoryImages/main.jpg': '');

                var insert = '<div class="col" onclick="clickOnCard('+i+')">'
                +'<div class="card choice h-100 ' + (res[i]['lastDateChosen'] === currentListDateFormattedReturn ? 'selected' : '') + '" id="card-'+i+'" '+ (res[i]['lastDateChosen'] === currentListDateFormattedReturn ? 'style="border-color: rgb(201,76,76);"' : '')+'>'
                    +'<div class="row g-0 h-100">'
                        +'<div class="col-md-6">'
                            +'<img src="'+pictureUrl+'" class="img-fluid rounded-start h-100" style="object-fit: cover; max-height: 240px;" alt="'+res[i]['Name']+'">'
                        +'</div>'
                        +'<div class="col-md-6">'
                            +'<div class="card-body m-1">'
                            +'<p class="card-text">'+res[i]['Name']+'</p>'
                            +'</div>'
                        +'</div>'
                    +'</div>'
                +'</div>'
            +'</div>';
            $('#choiceCards').append(insert);
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function clickOnCard(id) {
    if (hasRights) {
        var identifier = "card-" + id;
        var cardElement =  document.getElementById(identifier);
        if (cardElement.classList.contains('selected')) {
            cardElement.classList.remove('selected');
            cardElement.style.borderColor = '#dee2e6'; 
        } else {
            cardElement.classList.add('selected');
            cardElement.style.borderColor = 'rgb(201,76,76)';
        }
    }
}

function saveChoice() {
    var selectedChoices = [];
    for (let i = 0; i < 9; i++) {
        if (document.getElementById('card-'+i).classList.contains('selected')) selectedChoices.push(recipes[i]);
    }
    console.log(selectedChoices)
    
    //get shoppinglists by name
    // if empty?
    //create new 
    $.ajax({
        url:"scripts/WeekKeuze/getShoppingListByName.php",
        type: "get",
        dataType: "json",
        data: {
            shoppinglistName: currentListName
        },
        success: function(res) {
            var listId = 0;
            if(selectedChoices.length > 0) {
                if (isEmpty(res)) {
                    var shoppinglist = {
                        name: currentListName,
                        date: currentListDateFormatted,
                        isShopping: 'false'
                    } 
                    $.ajax({
                        url:"scripts/WeekKeuze/createShoppingList.php",
                        type: "post",
                        dataType: "json",
                        data: {
                            json: JSON.stringify(shoppinglist)
                        },
                        success: function(res2) {
                            listId = res2['Id'];
                        },
                        error: function(req, err) {
                            console.log(err);
                        }
                    })
                } else listId = res['Id'];

                //if contains recipes already?
                //delete shopping list recipes where recipe ids in recipes list
                waitForFlags(_ => (listId !== 0))
                .then(_ => {
                    $.ajax({
                        url:"scripts/WeekKeuze/deleteShoppingListRecipesByShoppingListId.php",
                        type: "get",
                        dataType: "json",
                        data: {
                            shoppinglistId: listId
                        },
                        success: function(res2) {
                            //for all recipes in list: update recipes lastDateChosen (if in selectedChoices list) and lastDateProposed (if in recipes list)
                            for(const recipe of recipes) {
                                var recipeDates =  {
                                    recipeId: recipe['Id'],
                                    lastDateChosen: selectedChoices.includes(recipe) ? currentListDateFormatted : (recipe['lastDateChosen']!==currentListDateFormattedReturn ? recipe['lastDateChosen'] : '20000101'),
                                    lastDateProposed: currentListDateFormatted
                                }
                                $.ajax({
                                    url:"scripts/WeekKeuze/updateRecipeDates.php",
                                    type: "post",
                                    dataType: "json",
                                    data: {
                                        json: JSON.stringify(recipeDates)
                                    },
                                    success: function(res3) {
                                    },
                                    error: function(req, err) {
                                        console.log(err);
                                    }
                                })
                            }

                            //create shopping list recipes based on chosen
                            var count = 0;
                            for (const chosenRecipe of selectedChoices) {
                                var shoppinglistRecipe =  {
                                    shoppinglistId: listId,
                                    recipeId: chosenRecipe['Id'],
                                    peopleFedId: peopleFedId
                                }
                                $.ajax({
                                    url:"scripts/WeekKeuze/createShoppingListRecipe.php",
                                    type: "post",
                                    dataType: "json",
                                    data: {
                                        json: JSON.stringify(shoppinglistRecipe)
                                    },
                                    success: function(res3) {
                                        count++;
                                        if (count == selectedChoices.length) reloadShoppingList();
                                    },
                                    error: function(req, err) {
                                        console.log(err);
                                    }
                                })
                            }
                        },
                        error: function(req, err) {
                            console.log(err);
                        }
                    })
                })
            } else {
                if (!isEmpty(res)) {
                    $.ajax({
                        url:"scripts/WeekKeuze/deleteShoppingListRecipesByShoppingListId.php",
                        type: "get",
                        dataType: "json",
                        data: {
                            shoppinglistId: res['Id']
                        },
                        success: function(res2) {
                            $.ajax({
                                url:"scripts/WeekKeuze/deleteShoppingListById.php",
                                type: "get",
                                dataType: "json",
                                data: {
                                    id: res['Id']
                                },
                                success: function(res3) {
                                    reloadShoppingList();
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

                for(const recipe of recipes) {
                    var recipeDates =  {
                        recipeId: recipe['Id'],
                        lastDateChosen: recipe['lastDateChosen']!==currentListDateFormattedReturn ? recipe['lastDateChosen'] : '20000101',
                        lastDateProposed: currentListDateFormatted
                    }
                    $.ajax({
                        url:"scripts/WeekKeuze/updateRecipeDates.php",
                        type: "post",
                        dataType: "json",
                        data: {
                            json: JSON.stringify(recipeDates)
                        },
                        success: function(res3) {
                        },
                        error: function(req, err) {
                            console.log(err);
                        }
                    })
                }
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function reloadShoppingList() {
    $('#recipes').empty();
    $('#recipeIngredients').empty();
    $.ajax({
        url:"scripts/WeekKeuze/getShoppingListByName.php",
        type: "get",
        dataType: "json",
        data: {
            shoppinglistName: currentListName
        },
        success: function(res) {
            if(!isEmpty(res)) {
                $.ajax({
                    url:"scripts/WeekKeuze/getShoppingListRecipesByShoppingListId.php",
                    type: "get",
                    dataType: "json",
                    data: {
                        shoppinglistId: res['Id']
                    },
                    success: function(res2) {
                    var recipes = '';
                    recipes += '<div class="card p-3"><div class = "card-body"><h5 class="card-title mb-0" style="font-weight:bold;">';
                    recipes += res['Name'];
                    recipes += '</h5></div><ul class="list-group list-group-flush">';
                    for (let i = 0; i < res2.length; i++)  {
                        recipes += '<li class="list-group-item"><a href=ToonRecept?RecipeId="';
                        recipes += res2[i]['RecipeId'];
                        recipes +='">';
                        recipes += res2[i]['Name'];
                        recipes += '</a></li>'
                    }
                    recipes += '</ul></div>';
                    $('#recipes').append(recipes);

                    $.ajax({
                            url:"scripts/WeekKeuze/getShoppingListRecipeIngredientsByShoppingListId.php",
                            type: "get",
                            dataType: "json",
                            data: {
                                shoppinglistId: res['Id']
                            },
                            success: function(res3) {
                                var categories = '';
                                var categoryFG = '';
                                var categoryVV = '';
                                var categoryK = '';
                                var categoryEZ = '';
                                var categoryKS = '';
                                var categoryA = '';

                                categories += '<ul class = "list-group list-group-flush" style="background-color: rgba(0,0,0,0); --bs-list-group-bg: rgba(0,0,0,0);">'
                                categoryFG += '<li class="list-group-item"><div class="fw-bold">Fruit & Groenten</div>';
                                categoryVV += '<li class="list-group-item"><div class="fw-bold">Vlees & Vis</div>';
                                categoryK += '<li class="list-group-item"><div class="fw-bold">Koolhydraten</div>';
                                categoryEZ += '<li class="list-group-item"><div class="fw-bold">Eieren & Zuivel</div>';
                                categoryKS += '<li class="list-group-item"><div class="fw-bold">Kruiden & Sauzen</div>';
                                categoryA += '<li class="list-group-item"><div class="fw-bold">Andere</div>';

                                for (let i = 0; i < res3.length; i++)  {
                                    if (res3[i]['IngredientMainCategoryId'] == 1) {
                                        categoryFG += '<div class="fst-italic">';
                                        if (res3[i]['QuantitySum'] > 0) categoryFG += parseFloat(res3[i]['QuantitySum']) + ' ';
                                        if (res3[i]['Unit']) categoryFG += res3[i]['Unit']+ ' ';
                                        categoryFG += res3[i]['Name'];
                                        categoryFG += '</div>';
                                    }
                                    if (res3[i]['IngredientMainCategoryId'] == 2) {
                                        categoryVV += '<div class="fst-italic">';
                                        if (res3[i]['QuantitySum'] > 0) categoryVV += parseFloat(res3[i]['QuantitySum']) + ' ';
                                        if (res3[i]['Unit']) categoryVV += res3[i]['Unit']+ ' ';
                                        categoryVV += res3[i]['Name'];
                                        categoryVV += '</div>';
                                    }
                                    if (res3[i]['IngredientMainCategoryId'] == 4) {
                                        categoryK += '<div class="fst-italic">';
                                        if (res3[i]['QuantitySum'] > 0) categoryK += parseFloat(res3[i]['QuantitySum']) + ' ';
                                        if (res3[i]['Unit']) categoryK += res3[i]['Unit']+ ' ';
                                        categoryK += res3[i]['Name'];
                                        categoryK += '</div>';
                                    }
                                    if (res3[i]['IngredientMainCategoryId'] == 5) {
                                        categoryEZ += '<div class="fst-italic">';
                                        if (res3[i]['QuantitySum'] > 0) categoryEZ += parseFloat(res3[i]['QuantitySum']) + ' ';
                                        if (res3[i]['Unit']) categoryEZ += res3[i]['Unit']+ ' ';
                                        categoryEZ += res3[i]['Name'];
                                        categoryEZ += '</div>';
                                    }
                                    if (res3[i]['IngredientMainCategoryId'] == 3) {
                                        categoryKS += '<div class="fst-italic">';
                                        if (res3[i]['QuantitySum'] > 0) categoryKS += parseFloat(res3[i]['QuantitySum']) + ' ';
                                        if (res3[i]['Unit']) categoryKS += res3[i]['Unit']+ ' ';
                                        categoryKS += res3[i]['Name'];
                                        categoryKS += '</div>';
                                    }
                                    if (res3[i]['IngredientMainCategoryId'] == 6) {
                                        categoryA += '<div class="fst-italic">';
                                        if (res3[i]['QuantitySum'] > 0) categoryA += parseFloat(res3[i]['QuantitySum']) + ' ';
                                        if (res3[i]['Unit']) categoryA += res3[i]['Unit'] + ' ';
                                        categoryA += res3[i]['Name'];
                                        categoryA += '</div>';
                                    }
                                }

                                categoryFG +='</li>';
                                categoryVV +='</li>';
                                categoryK +='</li>';
                                categoryEZ +='</li>';
                                categoryKS +='</li>';
                                categoryA +='</li>';

                                if (!categoryFG.includes("fst-italic")) categoryFG = '';
                                if (!categoryVV.includes("fst-italic")) categoryVV = '';
                                if (!categoryK.includes("fst-italic")) categoryK = '';
                                if (!categoryEZ.includes("fst-italic")) categoryEZ = '';
                                if (!categoryKS.includes("fst-italic")) categoryKS = '';
                                if (!categoryA.includes("fst-italic")) categoryA = '';
                        

                                categories += categoryFG;
                                categories += categoryVV;
                                categories += categoryK;
                                categories += categoryEZ;
                                categories += categoryKS;
                                categories += categoryA;


                                categories += '</ul>';
                                $('#recipeIngredients').append(categories);
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
        },
        error: function(req, err) {
            console.log(err);
        }      
    })         
}

function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return true
  }