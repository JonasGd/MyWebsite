var peopleFed = 2;
var recipeName;
var isFavourite;
var isComfortFood;
var countIngredientCategories = 0;

var ingredientList = [];
var recipeIngredientIdGlobal;
var recipeId;

$(document).ready(function() {
    waitForFlags(_ => (isAdmin === 0 || (isAdmin !==null && isAdmin !== "null")) && (isCreate === 0 || (isCreate !== null && isAdmin !== "null")))
    .then(_ => {
        if (isAdmin==='0' && isCreate==='0') 
            window.location = document.referrer;
    })
    
    loadIngredientCategories();

    recipeId = getQueryVariable("RecipeId");
    if(recipeId != 0) {
        loadRecipe(recipeId)
        loadRecipeList(recipeId)
        loadRecipeIngredientList(recipeId)
    } else {
        loadPeopleFeds();
        reloadSteps();
        isFavourite = false;
        isComfortFood = false;
    }
})

function loadPeopleFeds() {
    $.ajax({
        url:"scripts/WijzigRecept/getPeopleFeds.php",
        type: "get",
        dataType: "json",
        success: function(res) {
            var select = '';
            select='<select class="form-select" aria-label="People Fed" id="PeopleFedSelect">';
            for (let i = 0; i < res.length; i++) {
                select += '<option id="pf-'+ res[i]['Id']+'" ' + (res[i]['Label']==peopleFed?' selected':'') + '>'+res[i]['Label']+'</option>';
            }
            select+='</select>';
            $('#peopleFed').empty();
            $('#peopleFed').append(select);
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function loadIngredientCategories() {
    $('#datalistOptions').empty();
    $.ajax({
        url:"scripts/WijzigRecept/getAllIngredientCategories.php",
        type: "get",
        dataType: "json",
        success: function(res) {
            countIngredientCategories = res.length;
            var categories = '';
            for (let i = 0; i < res.length; i++) {
                categories += '<option id="'+ res[i]['Id'] +'" value="' + res[i]['Label']+'">';
            }
            $('#datalistOptions').append(categories);
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function loadRecipe(recipeId) {
    $.ajax({
        url:"scripts/WijzigRecept/getRecipeById.php",
        type: "get",
        dataType: "json",
        data: {
            recipeId: recipeId
        },
        success: function(res) {
            recipeName = res['RecipeName'];
            document.getElementById('Naam').setAttribute('value', recipeName);
            reloadName();
            document.getElementById('Prep').setAttribute('value', res['PreparationMinutes']);
            if(res['CookingMinutes'] != null) document.getElementById('Kooktijd').setAttribute('value', res['CookingMinutes']);
            if (peopleFed != res['PeopleFed']) {
                peopleFed = res['PeopleFed'];
            }
            loadPeopleFeds();
            var categoryId = res['FoodCategoryId'];
            document.getElementById('Categorie').value = categoryId;
            if(res['SubCategoryMainId'] != null) document.getElementById('SubCategorieHoofdgerecht').value = res['SubCategoryMainId'];
            if(res['SubCategoryLunchId'] != null) document.getElementById('SubCategorieLunch').value = res['SubCategoryLunchId'];      
            if(res['SubCategoryDessertId'] != null) document.getElementById('SubCategorieDessert').value = res['SubCategoryDessertId'];
            if(res['SubCategoryStarterId'] != null) document.getElementById('SubCategorieVoorgerecht').value = res['SubCategoryStarterId'];
            if (categoryId == 2) {
                document.getElementById('SubCategoryLunch').style.display = 'inline-block';
                document.getElementById('SubCategorieLunch').required = true;
            } else {
                document.getElementById('SubCategoryLunch').style.display = 'none';
                document.getElementById('SubCategorieLunch').required=false;
                document.getElementById('SubCategorieLunch').value=0;
            }
            if (categoryId == 4) {
                document.getElementById('SubCategoryHoofdgerecht').style.display = 'inline-block';
                document.getElementById('SubCategorieHoofdgerecht').required = true;
            } else {
                document.getElementById('SubCategoryHoofdgerecht').style.display = 'none';
                document.getElementById('SubCategorieHoofdgerecht').required=false;
                document.getElementById('SubCategorieHoofdgerecht').value=0;
            }
            if (categoryId == 5) {
                document.getElementById('SubCategoryDessert').style.display = 'inline-block';
                document.getElementById('SubCategorieDessert').required = true;
             } else {
                document.getElementById('SubCategoryDessert').style.display = 'none';
                document.getElementById('SubCategorieDessert').required=false;
                document.getElementById('SubCategorieDessert').value=0;
            }
            if (categoryId == 3) {
                document.getElementById('SubCategoryStarter').style.display = 'inline-block';
                document.getElementById('SubCategorieVoorgerecht').required = true;
             } else {
                document.getElementById('SubCategoryStarter').style.display = 'none';
                document.getElementById('SubCategorieVoorgerecht').required=false;
                document.getElementById('SubCategorieVoorgerecht').value=0;
            }
            if(res['PictureURL'] != null) document.getElementById('Afbeelding').setAttribute('value', res['PictureURL']);
            isComfortFood = (res['IsComfortFood'] == 1) ? true : false;
            isFavourite = (res['IsFavourite'] == 1) ? true : false;
            reloadComfortFavourite();
        },
        error: function(req, err) {
            console.log(err);
        }
        
    })
}

function loadRecipeList(recipeId) {
    $.ajax({
        url:"scripts/WijzigRecept/getRecipeListById.php",
        type: "get",
        dataType: "json",
        data: {
            recipeId: recipeId
        },
        success: function(res) {
            firstStep = res['FirstStep'];
            document.getElementById('firstStep').value = res['FirstStep'].replaceAll('x0D','\n');
            
            if (res['SecondStep']!= null) {
                secondStep = res['SecondStep'];
                document.getElementById('secondStep').value = res['SecondStep'].replaceAll('x0D','\n' );
            } if (res['ThirdStep']!= null) {
                thirdStep = res['ThirdStep'];
                document.getElementById('thirdStep').value = res['ThirdStep'].replaceAll('x0D','\n' ); 
            } if (res['FourthStep']!= null) {
                fourthStep = res['FourthStep'];
                document.getElementById('fourthStep').value = res['FourthStep'].replaceAll('x0D','\n' ); 
            } if (res['FifthStep']!= null) {
                fifthStep = res['FifthStep'];
                document.getElementById('fifthStep').value = res['FifthStep'].replaceAll('x0D','\n' ); 
            } if (res['SixthStep']!= null){
                sixthStep = res['SixthStep'];
                document.getElementById('sixthStep').value = res['SixthStep'].replaceAll('x0D','\n' ); 
            } if (res['SeventhStep']!= null) {
                seventhStep = res['SeventhStep'];
                document.getElementById('seventhStep').value = res['SeventhStep'].replaceAll('x0D','\n' );
            } if (res['EighthStep']!= null) {
                eighthStep = res['EighthStep'];
                document.getElementById('eighthStep').value = res['EighthStep'].replaceAll('x0D','\n' );
            } if (res['NinthStep']!= null) {
                ninthStep = res['NinthStep'];
                document.getElementById('ninthStep').value = res['NinthStep'].replaceAll('x0D','\n' ); 
            } if (res['TenthStep']!= null){
                tenthStep = res['TenthStep'];
                document.getElementById('tenthStep').value = res['TenthStep'].replaceAll('x0D','\n' );
            } if (res['EleventhStep']!= null) {
                eleventhStep = res['EleventhStep'];
                document.getElementById('eleventhStep').value = res['EleventhStep'].replaceAll('x0D','\n' ); 
            } if (res['TwelfthStep']!= null) {
                twelfthStep = res['TwelfthStep'];
                document.getElementById('twelfthStep').value = res['TwelfthStep'].replaceAll('x0D','\n' ); 
            } if (res['ThirteenthStep']!= null) {
                thirteenthStep = res['ThirteenthStep'];
                document.getElementById('thirteenthStep').value = res['ThirteenthStep'].replaceAll('x0D','\n' ); 
            } if (res['FourteenthStep']!= null) {
                fourteenthStep = res['FourteenthStep'];
                document.getElementById('fourteenthStep').value = res['FourteenthStep'].replaceAll('x0D','\n' );
            } if (res['FifteenthStep']!= null) {
                fifteenthStep = res['FifteenthStep'];
                document.getElementById('fifteenthStep').value = res['FifteenthStep'].replaceAll('x0D','\n' );
            }
            reloadSteps();
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}
        
function loadRecipeIngredientList(recipeId){
    $.ajax({
        url:"scripts/WijzigRecept/getRecipeIngredientsByRecipeId.php",
        type: "get",
        dataType: "json",
        data: {
            recipeId: recipeId
        },
        success: function(res) {
            for (let i = 0; i < res.length; i++) {
                var ingredientObj = {
                    quantity: parseFloat(res[i]['Quantity']),
                    unit: res[i]['Unit'],
                    ingredient: res[i]['IngredientName'],
                    id: res[i]['IngredientId'] + res[i]['Unit'].replaceAll('\\s+', ''),
                    recipeIngredientId: res[i]['RecipeIngredientId']
                }
                addIngredient(ingredientObj);
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function comfortOnClick() {
    isComfortFood = !isComfortFood;
    reloadComfortFavourite();
}

function favouriteOnClick() {
    isFavourite = !isFavourite;
    reloadComfortFavourite();
}

function reloadComfortFavourite() {
    if (isComfortFood) {
        document.getElementById('isComfortFood').classList.remove('icon-comfort2-active');
        document.getElementById('isComfortFood').classList.remove('icon-comfort2-inactive');
        document.getElementById('isComfortFood').classList.add('icon-comfort2-active');
    } else {
        document.getElementById('isComfortFood').classList.remove('icon-comfort2-active');
        document.getElementById('isComfortFood').classList.remove('icon-comfort2-inactive');
        document.getElementById('isComfortFood').classList.add('icon-comfort2-inactive');
    }
    if (isFavourite) {
        document.getElementById('isFavourite').classList.remove('icon-heart2-active');
        document.getElementById('isFavourite').classList.remove('icon-heart2-inactive');
        document.getElementById('isFavourite').classList.add('icon-heart2-active');
    } else {
        document.getElementById('isFavourite').classList.remove('icon-heart2-active');
        document.getElementById('isFavourite').classList.remove('icon-heart2-inactive');
        document.getElementById('isFavourite').classList.add('icon-heart2-inactive');
    }  
}

const nameElement = document.getElementById('Naam');
nameElement.addEventListener('input', function handleChange(event) {
    recipeName = this.value;
    reloadName();
})

function reloadName() {
    $('#recipeName').empty();
    if (recipeName == '') $('#recipeName').append('Nieuw Recept');
    else $('#recipeName').append(recipeName);
}

var quantity;
var unit;
var ingredient;
function addIngredientFromForm() {
    quantity = document.getElementById('Hoeveelheid').value;
    if (quantity == '') quantity = 0;
    document.getElementById('Hoeveelheid').value = '';
    unit = document.getElementById('Eenheid').value;
    document.getElementById('Eenheid').value = '';
    ingredient = document.getElementById('Ingredient').value;
    document.getElementById('Ingredient').value = '';

    $.ajax({
        url:"scripts/WijzigRecept/getIngredientByName.php",
        type: "get",
        data: {
            ingredientName: ingredient
        }, 
        dataType: "json",
        success: function(res) {
            var id = 0
            if (Object.keys(res).length > 0) {
                var ingredientObj = {
                    quantity: quantity,
                    unit: unit,
                    ingredient: ingredient,
                    id: res['Id'] + unit.replaceAll('\\s+', ''),
                    recipeIngredientId: 0
                }
                addIngredient(ingredientObj);
            } else {
                document.getElementById('ingredientName').value = ingredient;
                $('#newIngredientModal').modal('show');
            }
            document.getElementById('Hoeveelheid').focus();
        },
        error: function(req, err) {
            console.log(err);
        }
    })    
}

var ingredientCategory;
function addIngredientCategory(){
    ingredientCategory = $('#ingredientCategoryList').val();
    var list = document.getElementById("datalistOptions");
    var obj = Array.from(list.options).find(option => option.value === ingredientCategory); 
    //var obj = $('#datalistOptions').find("option['" + ingredientCategory + "']");
    //var obj = document.querySelector('[option[value="' + ingredientCategory + '"]');
    //var obj = document.querySelector('#datalistOptions').value;
    if (obj != null) {
        createIngredient(obj.id);
    } else {
        document.getElementById('ingredientCategoryName').value = ingredientCategory;
        $('#newIngredientCategoryModal').modal('show');
    }
}

function addNewIngredientCategory(){
    var mainCategoryId = document.getElementById('ingredientMainCategoryList').value
    createIngredientCategory(mainCategoryId);
}

function createIngredient(categoryId) {
    console.log(categoryId);
    var ingredientObj = {
        ingredientCategory: categoryId,
        ingredientName: document.getElementById('ingredientName').value
    } 
    console.log(JSON.stringify(ingredientObj))
    $.ajax({
        url:"scripts/WijzigRecept/createIngredient.php",
        type: "post",
        dataType: "json",
        data: {
            json: JSON.stringify(ingredientObj)
        },
        success: function(res) {
            $('#newIngredientModal').modal('hide');
            document.getElementById('ingredientCategoryName').value = '';
            var ingredientId = res['Id'];
            var ingredientObject = {
                quantity: quantity,
                unit: unit,
                ingredient: ingredient,
                id: ingredientId + unit.replaceAll('\\s+', ''),
                recipeIngredientId: 0
            }
            addIngredient(ingredientObject);
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function createIngredientCategory(mainCategoryId) {
    var ingredientCategory = {
        ingredientCategoryName: document.getElementById('ingredientCategoryName').value,
        order: countIngredientCategories + 1,
        ingredientMainCategoryId: mainCategoryId
    } 
    $.ajax({
        url:"scripts/WijzigRecept/createIngredientCategory.php",
        type: "post",
        dataType: "json",
        data: {
            json: JSON.stringify(ingredientCategory)
        },
        success: function(res) {
            $('#newIngredientCategoryModal').modal('hide');
            var categoryId = res['Id'];
            createIngredient(categoryId);
            loadIngredientCategories();            
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function createOrUpdateRecipe() {
    var peopleFedOptions = document.getElementById('PeopleFedSelect').options;
    var peopleFedId = (peopleFedOptions[peopleFedOptions.selectedIndex].id).substring(3);
    var recipe = {
        recipeName: document.getElementById('Naam').value.replaceAll("'","\'\'"),
        peopleFedId: peopleFedId,
        preparationMinutes: document.getElementById('Prep').value,
        cookingMinutes: document.getElementById('Kooktijd').value != ''? document.getElementById('Kooktijd').value: 'NULL',
        foodCategoryId: document.getElementById('Categorie').value,
        subCategoryMainId: document.getElementById('SubCategorieHoofdgerecht').value != '' ? document.getElementById('SubCategorieHoofdgerecht').value : 'NULL',
        subCategoryLunchId: document.getElementById('SubCategorieLunch').value != '' ? document.getElementById('SubCategorieLunch').value : 'NULL',
        subCategoryDessertId: document.getElementById('SubCategorieDessert').value != '' ? document.getElementById('SubCategorieDessert').value : 'NULL',
        subCategoryStarterId: document.getElementById('SubCategorieVoorgerecht').value != '' ? document.getElementById('SubCategorieVoorgerecht').value : 'NULL',
        pictureURL: document.getElementById('Afbeelding').value != '' ? ("'" +  document.getElementById('Afbeelding').value.replaceAll("'","\'\'") + "'"): 'NULL',
        isFavourite: isFavourite? 1:0,
        isComfortFood: isComfortFood? 1:0
    } 
    if (recipeId != 0) {
        recipe.recipeId = recipeId;
        $.ajax({
            url:"scripts/WijzigRecept/updateRecipe.php",
            type: "post",
            dataType: "text",
            data: {
                json: JSON.stringify(recipe)
            },
            success: function(res) {
                createOrUpdateRecipeList(recipeId);
                createOrUpdateRecipeIngredients(recipeId);
            },
            error: function(req, err) {
                console.log(err);
            }
        })
    } else {
        $.ajax({
            url:"scripts/WijzigRecept/createRecipe.php",
            type: "post",
            dataType: "json",
            data: {
                json: JSON.stringify(recipe)
            },
            success: function(res) {
                var newRecipeId = res['Id'];
                createOrUpdateRecipeList(newRecipeId);
                createOrUpdateRecipeIngredients(newRecipeId);
            },
            error: function(req, err) {
                console.log(err);
            }
        })
    }
}

function createOrUpdateRecipeList(newRecipeId) {
    var recipeList = {
        recipeId: newRecipeId,
        firstStep: document.getElementById('firstStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        secondStep: document.getElementById('secondStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        thirdStep: document.getElementById('thirdStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        fourthStep: document.getElementById('fourthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        fifthStep: document.getElementById('fifthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        sixthStep: document.getElementById('sixthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        seventhStep: document.getElementById('seventhStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        eighthStep: document.getElementById('eighthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        ninthStep: document.getElementById('ninthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        tenthStep: document.getElementById('tenthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        eleventhStep: document.getElementById('eleventhStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        twelfthStep: document.getElementById('twelfthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        thirteenthStep: document.getElementById('thirteenthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        fourteenthStep: document.getElementById('fourteenthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'"),
        fifteenthStep: document.getElementById('fifteenthStep').value.replaceAll('\n','x0D').replaceAll("'","\'\'")
    } 
    if (recipeId == newRecipeId) {
        console.log("updating recipelist")
        $.ajax({
            url:"scripts/WijzigRecept/updateRecipeList.php",
            type: "post",
            dataType: "text",
            data: {
                json: JSON.stringify(recipeList)
            },
            success: function(res) {
            },
            error: function(req, err) {
                console.log(err);
            }
        })
    } else {
        $.ajax({
            url:"scripts/WijzigRecept/createRecipeList.php",
            type: "post",
            dataType: "json",
            data: {
                json: JSON.stringify(recipeList)
            },
            success: function(res) {
            },
            error: function(req, err) {
                console.log(err);
            }
        })
    }
}

function createOrUpdateRecipeIngredients(newRecipeId) {
    for (var i = 0; i < ingredientList.length; i++) {
        var recipeIngredient = {
            recipeIngredientId: ingredientList[i].recipeIngredientId,
            recipeId: newRecipeId,
            ingredientId: (ingredientList[i].id).substring(0, (ingredientList[i].id).length - (ingredientList[i].unit.replaceAll('\\s+', '')).length),
            quantity: ingredientList[i].quantity,
            unit: ingredientList[i].unit,
            order: i
        } 
        console.log(recipeIngredient);
        if (ingredientList[i].recipeIngredientId != 0) {
            console.log(JSON.stringify(recipeIngredient))
            $.ajax({
                url:"scripts/WijzigRecept/updateRecipeIngredient.php",
                type: "post",
                dataType: "text",
                data: {
                    json: JSON.stringify(recipeIngredient)
                },
                success: function(res) {
                },
                error: function(req, err) {
                    console.log(err);
                }
            })
        } else {
            $.ajax({
                url:"scripts/WijzigRecept/createRecipeIngredient.php",
                type: "post",
                dataType: "json",
                data: {
                    json: JSON.stringify(recipeIngredient)
                },
                success: function(res) {
                },
                error: function(req, err) {
                    console.log(err);
                }
            })
        }
    }
}

function submitRecipe() {
   createOrUpdateRecipe();
   setTimeout(function() {
    window.location = document.referrer;
   }, 700);
  
}

function addIngredient(ingredientObj) {
    if (ingredientList.findIndex(x => x.id == ingredientObj.id)>-1) {
        var ingredientOld = ingredientList.find(x => x.id == ingredientObj.id);
        ingredientObj.quantity = parseFloat(ingredientObj.quantity) + parseFloat(ingredientOld.quantity);
        ingredientObj.recipeIngredientId = ingredientOld.recipeIngredientId;
        ingredientList.splice(ingredientList.findIndex(x => x.id == ingredientObj.id),1,ingredientObj);
    } else {
        if(ingredientObj.recipeIngredientId == 0) ingredientObj.recipeIngredientId = recipeIngredientIdGlobal;
        ingredientList.push(ingredientObj);
        console.log(recipeIngredientIdGlobal);
        console.log(ingredientObj);
    }
    recipeIngredientIdGlobal = 0;
    reloadIngredients();
}

function reloadIngredients() {
    $('#ingredients').empty();
    var ingredients='';
    console.log(ingredientList)
    for(const ingredient of ingredientList) {
        ingredients+='<tr class="table-row table-row-color" id="'+ingredient.id + '" style="border-bottom-width: 1px;"><td><div class="row" style="pointer-events: none; background-color:rgba(0,0,0,0);"><div class="col-2">'+(ingredient.quantity==0?'':ingredient.quantity)+
        '</div><div class="col-2">'+ingredient.unit+'</div><div class="col-7"><a style="pointer-events: auto;" class="ingredientLink" onclick="changeIngredient(\''+ingredient.id+'\')">'+ingredient.ingredient+'</a></div>'+
        '<div class="col-1" style="text-align:right;"><a style="pointer-events: auto;" class="ingredientLink" onclick="removeIngredient(\''+ingredient.id+'\')">x</a></div></div></td></tr>';
    }
    $('#ingredients').append(ingredients);
    $("#ingredients").tableDnD({
        onDrop: function(table, row) {
            var rows = table.rows;
            var ingredientTempList = [];
            for (var row of rows) {
                ingredientTempList.push(ingredientList.find(ingredient => ingredient.id == row.id));
            }
            ingredientList = ingredientTempList;
        }
    });
}


function removeIngredient(id) {
    var indexToRemove = ingredientList.findIndex(ingredient => ingredient.id == id);
    ingredientList.splice(indexToRemove, 1);
    reloadIngredients();
}

function changeIngredient(id) {
    var ingredientObj = ingredientList.find(ingredient => ingredient.id == id);
    document.getElementById('Hoeveelheid').value = ingredientObj.quantity;
    document.getElementById('Eenheid').value = ingredientObj.unit;
    document.getElementById('Ingredient').value = ingredientObj.ingredient;

    recipeIngredientIdGlobal = ingredientObj.recipeIngredientId;
    console.log(recipeIngredientIdGlobal);

    var indexToRemove = ingredientList.findIndex(ingredientObj => ingredientObj.id == id);
    ingredientList.splice(indexToRemove, 1);
    reloadIngredients();
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
    return 0;
}