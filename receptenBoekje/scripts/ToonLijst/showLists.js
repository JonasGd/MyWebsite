$(document).ready(function() {
    loadList()
})

var shoppinglistId = getQueryVariable("ShoppinglistId");

function loadList() {
    $('#listName').empty();
    $('#recipes').empty();
    $('#recipeIngredients').empty();
    $.ajax({
        url:"scripts/ToonLijst/getShoppingListById.php",
        type: "get",
        dataType: "json",
        data: {
            shoppinglistId: shoppinglistId
        },
        success: function(res) {
            $('#listName').append(res['Name']);
            $.ajax({
                url:"scripts/WeekKeuze/getShoppingListRecipesByShoppingListId.php",
                type: "get",
                dataType: "json",
                data: {
                    shoppinglistId: shoppinglistId
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

    

    $.ajax({
        url:"scripts/WeekKeuze/getShoppingListRecipeIngredientsByShoppingListId.php",
        type: "get",
        dataType: "json",
        data: {
            shoppinglistId: shoppinglistId
        },
        success: function(res) {
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

            for (let i = 0; i < res.length; i++)  {
                if (res[i]['IngredientMainCategoryId'] == 1) {
                    categoryFG += '<div class="fst-italic">';
                    if (res[i]['QuantitySum'] > 0) categoryFG += parseFloat(res[i]['QuantitySum']) + ' ';
                    if (res[i]['Unit']) categoryFG += res[i]['Unit']+ ' ';
                    categoryFG += res[i]['Name'];
                    categoryFG += '</div>';
                }
                if (res[i]['IngredientMainCategoryId'] == 2) {
                    categoryVV += '<div class="fst-italic">';
                    if (res[i]['QuantitySum'] > 0) categoryVV += parseFloat(res[i]['QuantitySum']) + ' ';
                    if (res[i]['Unit']) categoryVV += res[i]['Unit']+ ' ';
                    categoryVV += res[i]['Name'];
                    categoryVV += '</div>';
                }
                if (res[i]['IngredientMainCategoryId'] == 4) {
                    categoryK += '<div class="fst-italic">';
                    if (res[i]['QuantitySum'] > 0) categoryK += parseFloat(res[i]['QuantitySum']) + ' ';
                    if (res[i]['Unit']) categoryK += res[i]['Unit']+ ' ';
                    categoryK += res[i]['Name'];
                    categoryK += '</div>';
                }
                if (res[i]['IngredientMainCategoryId'] == 5) {
                    categoryEZ += '<div class="fst-italic">';
                    if (res[i]['QuantitySum'] > 0) categoryEZ += parseFloat(res[i]['QuantitySum']) + ' ';
                    if (res[i]['Unit']) categoryEZ += res[i]['Unit']+ ' ';
                    categoryEZ += res[i]['Name'];
                    categoryEZ += '</div>';
                }
                if (res[i]['IngredientMainCategoryId'] == 3) {
                    categoryKS += '<div class="fst-italic">';
                    if (res[i]['QuantitySum'] > 0) categoryKS += parseFloat(res[i]['QuantitySum']) + ' ';
                    if (res[i]['Unit']) categoryKS += res[i]['Unit']+ ' ';
                    categoryKS += res[i]['Name'];
                    categoryKS += '</div>';
                }
                if (res[i]['IngredientMainCategoryId'] == 6) {
                    categoryA += '<div class="fst-italic">';
                    if (res[i]['QuantitySum'] > 0) categoryA += parseFloat(res[i]['QuantitySum']) + ' ';
                    if (res[i]['Unit']) categoryA += res[i]['Unit']+ ' ';
                    categoryA += res[i]['Name'];
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
    alert("Query Variable '" + variable + "' not found");
}