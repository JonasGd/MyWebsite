var peopleFed;
var peopleFedId;

$(document).ready(function() {
    changeRecipeLink();
    loadRecipe();
    loadRecipeList();

    waitForFlags(_ => (isAdmin === 0 || (isAdmin !==null && isAdmin !== "null")) && (isCreate === 0 || (isCreate !== null && isAdmin !== "null")) && (isLoggedIn === 0 || (isLoggedIn != null && isLoggedIn !== "null")))
    .then(_ => {
        if (isAdmin==='0' && isCreate==='0') 
            document.getElementById('changeRecipeDiv').style.display = 'none';
        else 
            document.getElementById('changeRecipeDiv').style.display = 'block';


        if (isLoggedIn === '0')
            document.getElementById('shoppinglistDiv').style.display = 'none';
        else {
            document.getElementById('shoppinglistDiv').style.display = 'block';
            loadShoppinglists();
        }
    })
})


var recipeId = getQueryVariable("RecipeId");

function changeRecipeLink() {
    document.getElementById('changeRecipeLink').href = "WijzigRecept?RecipeId=" + recipeId;
}

function loadRecipe() {
    $.ajax({
        url:"scripts/ToonRecept/getRecipeById.php",
        type: "get",
        dataType: "json",
        data: {
            recipeId: recipeId
        },
        success: function(res) {
            $('#recipeName').append(res['RecipeName']);
            $('#preparationMinutes').append(res['PreparationMinutes']);
            if(res['CookingMinutes'] == null) {
                var cookingTimeStart = document.getElementById('cookingTimeStart');
                var cookingTimeEnd = document.getElementById('cookingTimeEnd');
                var cookingMinutes = document.getElementById('cookingMinutes');
                cookingTimeStart.style.display = 'none';
                cookingTimeEnd.style.display = 'none';
                cookingMinutes.style.display = 'none';
            } else {
                $('#cookingMinutes').append(res['CookingMinutes']);
            }
            $('#ComfortFavourite').append('<span class="me-3 ' + (res['IsComfortFood']==0 ? 'icon-comfort2-inactive' : 'icon-comfort2-active')+ '" style="font-size: 32px;"></span>'
                +'<span class="' + (res['IsFavourite']==0 ? 'icon-heart2-inactive' : 'icon-heart2-active')+ '" style="font-size: 32px;"></span>');
            $('#ComfortSm').append('<span class="me-3 ' + (res['IsComfortFood']==0 ? 'icon-comfort2-inactive' : 'icon-comfort2-active')+ '" style="font-size: 32px;"></span>');
            $('#FavouriteSm').append('<span class="' + (res['IsFavourite']==0 ? 'icon-heart2-inactive' : 'icon-heart2-active')+ '" style="font-size: 32px;"></span>');
            $('#category').append('<span class="me-4 ' + (res['FoodCategoryId'] == 1 ? 'icon-breakfast' :
            res['FoodCategoryId'] == 2 ? 'icon-lunch' :
            res['FoodCategoryId'] == 3 ? 'icon-appetizer':
            res['FoodCategoryId'] == 4 ? 'icon-dinner' :
            res['FoodCategoryId'] == 5 ? 'icon-dessert': '') + '" style="font-size: 32px;"></span>' +
            (res['FoodCategoryId']==1? '': '<td><span class="' + (res['FoodCategoryId'] == 2 ? (
                res['SubCategoryLunchId'] == 1 ? 'icon-wraps' :
                res['SubCategoryLunchId'] == 2 ? 'icon-pizza' :
                res['SubCategoryLunchId'] == 3 ? 'icon-salad' :
                res['SubCategoryLunchId'] == 4 ? 'icon-soup' :
                res['SubCategoryLunchId'] == 6 ? 'icon-etc' :
                res['SubCategoryLunchId'] == 7 ? 'icon-bread' : '') :
            res['FoodCategoryId'] == 4 ? (
                res['SubCategoryMainId'] == 1 ? 'icon-flemish' :
                res['SubCategoryMainId'] == 2 ? 'icon-mexican' :
                res['SubCategoryMainId'] == 3 ? 'icon-albanian1" style="font-size: 32px;"></span><span class="icon-albanian2' :
                res['SubCategoryMainId'] == 4 ? 'icon-italian1" style="font-size: 32px;"></span><span class="icon-italian2" style="font-size: 32px;"></span><span class="icon-italian3' :
                res['SubCategoryMainId'] == 5 ? 'icon-mediterranian' :
                res['SubCategoryMainId'] == 6 ? 'icon-etc' :
                res['SubCategoryMainId'] == 8 ? 'icon-asian1" style="font-size: 32px;"></span><span class="icon-asian2" style="font-size: 32px;"></span><span class="icon-asian3" style="font-size: 32px;"></span><span class="icon-asian4" style="font-size: 32px;"></span><span class="icon-asian5" style="font-size: 32px;"></span><span class="icon-asian6" style="font-size: 32px;"></span><span class="icon-asian7" style="font-size: 32px;"></span><span class="icon-asian8' : '') :
            res['FoodCategoryId'] == 5 ? (
                res['SubCategoryDessertId'] == 1 ? 'icon-cake' :
                res['SubCategoryDessertId'] == 2 ? 'icon-cookie':
                res['SubCategoryDessertId'] == 3 ? 'icon-etc' :
                res['SubCategoryDessertId'] == 4 ? 'icon-croissant' :
                res['SubCategoryDessertId'] == 5 ? 'icon-waffle' :
                res['SubCategoryDessertId'] == 6 ? 'icon-ice' :
                res['SubCategoryDessertId'] == 7 ? 'icon-pie' :
                res['SubCategoryDessertId'] == 9 ? 'icon-brownie' : ''):
            res['FoodCategoryId'] == 3 ? (
                res['SubCategoryStarterId'] == 1 ? 'icon-starter' :
                res['SubCategoryStarterId'] == 2 ? 'icon-appetizer1' :
                res['SubCategoryStarterId'] == 3 ? 'icon-drink' :
                res['SubCategoryStarterId'] == 4 ? 'icon-etc'
                : ''): '') + '" style="font-size: 32px;"></span>'
            ))

            $('#CategorySm').append('<span class="me-4 ' + (res['FoodCategoryId'] == 1 ? 'icon-breakfast' :
            res['FoodCategoryId'] == 2 ? 'icon-lunch' :
            res['FoodCategoryId'] == 3 ? 'icon-appetizer':
            res['FoodCategoryId'] == 4 ? 'icon-dinner' :
            res['FoodCategoryId'] == 5 ? 'icon-dessert': '') + '" style="font-size: 32px;"></span>');
            $('#SubCategorySm').append((res['FoodCategoryId']==1 || res['FoodCategoryId']==3)? '': '<span class="' + (res['FoodCategoryId'] == 2 ? (
                res['SubCategoryLunchId'] == 1 ? 'icon-wraps' :
                res['SubCategoryLunchId'] == 2 ? 'icon-pizza' :
                res['SubCategoryLunchId'] == 3 ? 'icon-salad' :
                res['SubCategoryLunchId'] == 4 ? 'icon-soup' :
                res['SubCategoryLunchId'] == 6 ? 'icon-etc' :
                res['SubCategoryLunchId'] == 7 ? 'icon-bread' : '') :
            res['FoodCategoryId'] == 4 ? (
                res['SubCategoryMainId'] == 1 ? 'icon-flemish' :
                res['SubCategoryMainId'] == 2 ? 'icon-mexican' :
                res['SubCategoryMainId'] == 3 ? 'icon-albanian1" style="font-size: 32px;"></span><span class="icon-albanian2' :
                res['SubCategoryMainId'] == 4 ? 'icon-italian1" style="font-size: 32px;"></span><span class="icon-italian2" style="font-size: 32px;"></span><span class="icon-italian3' :
                res['SubCategoryMainId'] == 5 ? 'icon-mediterranian' :
                res['SubCategoryMainId'] == 6 ? 'icon-etc' :
                res['SubCategoryMainId'] == 8 ? 'icon-asian1" style="font-size: 32px;"></span><span class="icon-asian2" style="font-size: 32px;"></span><span class="icon-asian3" style="font-size: 32px;"></span><span class="icon-asian4" style="font-size: 32px;"></span><span class="icon-asian5" style="font-size: 32px;"></span><span class="icon-asian6" style="font-size: 32px;"></span><span class="icon-asian7" style="font-size: 32px;"></span><span class="icon-asian8' : '') :
            res['FoodCategoryId'] == 5 ? (
                res['SubCategoryDessertId'] == 1 ? 'icon-cake' :
                res['SubCategoryDessertId'] == 2 ? 'icon-cookie':
                res['SubCategoryDessertId'] == 3 ? 'icon-etc' :
                res['SubCategoryDessertId'] == 4 ? 'icon-croissant' :
                res['SubCategoryDessertId'] == 5 ? 'icon-waffle' :
                res['SubCategoryDessertId'] == 6 ? 'icon-ice' :
                res['SubCategoryDessertId'] == 7 ? 'icon-pie' :
                res['SubCategoryDessertId'] == 9 ? 'icon-brownie' : ''):
            res['FoodCategoryId'] == 3 ? (
                res['SubCategoryStarterId'] == 1 ? 'icon-starter' :
                res['SubCategoryStarterId'] == 2 ? 'icon-appetizer1' :
                res['SubCategoryStarterId'] == 3 ? 'icon-drink' :
                res['SubCategoryStarterId'] == 4 ? 'icon-etc'
                : ''): '') + '" style="font-size: 32px;"></span>');



            peopleFed = res['PeopleFed'];
            peopleFedId = res['PeopleFedId'];
            var picture = '<div class="img-container">';
            picture += '<img class="picture" src="' + (res['PictureURL']!=null ? res['PictureURL'] : 
                res['FoodCategoryId'] == 3 ?  (
                    res['SubCategoryStarterId'] == 1 ? '/resources/Images/CategoryImages/voorgerecht.jpg':
                    res['SubCategoryStarterId'] == 2 ? '/resources/Images/CategoryImages/appetizer.jpg' :
                    res['SubCategoryStarterId'] == 3 ? '/resources/Images/CategoryImages/cocktails.jpg' :
                    res['SubCategoryStarterId'] == 4 ? '/resources/Images/shrimpballsappetizer695181hero01ae6686a5a1ac4d918b.jpg' :'') :
                res['FoodCategoryId'] == 2 ? (
                    res['SubCategoryLunchId'] == 3 ? '/resources/Images/CategoryImages/salad.jpg':
                    res['SubCategoryLunchId'] == 4 ? '/resources/Images/CategoryImages/soup.jpg':
                    res['SubCategoryLunchId'] == 1 ? '/resources/Images/CategoryImages/wraps.jpg':   
                    res['SubCategoryLunchId'] == 2 ? '/resources/Images/CategoryImages/pizza.jpg': 
                    res['SubCategoryLunchId'] == 6 ? '/resources/Images/CategoryImages/lunch.jpg': '') :
                res['FoodCategoryId'] == 4 ? (
                    res['SubCategoryMainId'] == 4 ? '/resources/Images/CategoryImages/italian.jpg':
                    res['SubCategoryMainId'] == 2 ? '/resources/Images/CategoryImages/mexican.jpg':
                    res['SubCategoryMainId'] == 3 ? '/resources/Images/CategoryImages/albanian.jpg':
                    res['SubCategoryMainId'] == 5 ? '/resources/Images/CategoryImages/paella.jpg':
                    res['SubCategoryMainId'] == 8 ? '/resources/Images/CategoryImages/asian.jpg':
                    res['SubCategoryMainId'] == 1 ? '/resources/Images/CategoryImages/vlaams.jpg':
                    res['SubCategoryMainId'] == 6 ? '/resources/Images/CategoryImages/main.jpg': ''):
                res['FoodCategoryId'] == 5 ? (
                    res['SubCategoryDessertId'] == 2 ? '/resources/Images/CategoryImages/cookie.jpg':
                    res['SubCategoryDessertId'] == 9 ? '/resources/Images/CategoryImages/brownies.jpg':
                    res['SubCategoryDessertId'] == 1 ? '/resources/Images/CategoryImages/cake.jpg':
                    res['SubCategoryDessertId'] == 7 ? '/resources/Images/CategoryImages/pie.jpg':
                    res['SubCategoryDessertId'] == 4 ? '/resources/Images/CategoryImages/pastry.png':
                    res['SubCategoryDessertId'] == 5 ? '/resources/Images/CategoryImages/waffle.jpg':
                    res['SubCategoryDessertId'] == 6 ? '/resources/Images/CategoryImages/icecream.jpg':
                    res['SubCategoryDessertId'] == 3 ? '/resources/Images/CategoryImages/dessert.jpg': ''):
                res['FoodCategoryId'] == 1 ? '/resources/Images/CategoryImages/breakfast.jpg':'') + '">'
            picture += '</div>';
            $('#picture').append(picture);
            $('#pictureSm').append(picture);

            loadPeopleFeds(peopleFed);
            reloadRecipeIngredients(peopleFed);
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function loadPeopleFeds() {
    $.ajax({
        url:"scripts/ToonRecept/getPeopleFeds.php",
        type: "get",
        dataType: "json",
        success: function(res) {
            var select = '';
            select='<select class="form-select form-select-people" aria-label="People Fed">';
            for (let i = 0; i < res.length; i++) {
                select += '<option id="pf-' + res[i]['Id'] +'" ' + (res[i]['Label']==peopleFed?' selected':'') + '>'+res[i]['Label']+'</option>';
            }
            select+='</select>';
            $('#peopleFed').append(select);
            const options = document.querySelectorAll('.form-select-people');

            for (const option of options) {
            option.addEventListener('change', function handleChange() {
                peopleFed = option.value;
                peopleFedId = option.id.slice(3,option.id.length);
                reloadRecipeIngredients(peopleFed);
            });
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

var lists = [];

function loadShoppinglists() {
    $.ajax({
        url:"scripts/ShoppingList/getAllShoppingLists.php",
        type:"get",
        dataType: "json",
        success: function(res) {
            lists = res;
            var select = '';
            select += '<div class="col-1"><a href="#" onclick="showLists()">'
            select +='<svg style="margin-top: 8px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/></svg>';
            select += '</a></div>';
            select += '<div class="col-md-9 col-lg-10 col-10">';
            select += '<select class="form-select" aria-label="ShoppingLists" id=shoppinglistSelect><option value="0" selected>(Nieuwe Lijst)</option>';
            for (let i = 0; i < res.length; i++) {
                if (res[i]['isShopping'] !== '0')
                    select += '<option value="' + res[i]['Id'] + '">' + res[i]['Name']+'</option>';
            }
            select += '</select></div>';
            select += '<div class="col-1"><a href="#" onclick="addToShoppinglist()">';
            select += '<svg style="margin-left: -20px" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>';
            select += '</svg></a></div></div>';
            $('#shoppinglistSelectDiv').append(select);
        }
    })
}

var isAddingToList = false;

function showLists() {
    if (!isAddingToList) {
        isAddingToList = true;
        document.getElementById('shoppinglistLink').style.display = 'none';
        document.getElementById('shoppinglistSelectDiv').style.display = 'block';

    } else {
        isAddingToList = false;
        document.getElementById('shoppinglistLink').style.display = 'block';
        document.getElementById('shoppinglistSelectDiv').style.display = 'none';
    }
}

function addToShoppinglist() {
    var shoppinglistOptions = document.getElementById('shoppinglistSelect').options;
    var shoppinglistId = shoppinglistOptions.value;

    if (shoppinglistId == '0') {
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
                createShoppingListRecipe(res['Id']);
            },
            error: function(req, err) {
                console.log(err);
            }
        })   
    } else {
        createShoppingListRecipe(shoppinglistId)
    }   
}

function createShoppingListRecipe(shoppinglistId) {
    $.ajax({
        url:"scripts/WeekKeuze/getShoppingListRecipesByShoppingListId.php",
        type: "get",
        dataType: "json",
        data: {
            shoppinglistId: shoppinglistId
        },
        success: function(res) {
            if (!res.some(sr => sr['RecipeId'] === recipeId)) {
                var shoppinglistRecipe =  {
                    shoppinglistId: shoppinglistId,
                    recipeId: recipeId,
                    peopleFedId: peopleFedId
                }
                $.ajax({
                    url:"scripts/WeekKeuze/createShoppingListRecipe.php",
                    type: "post",
                    dataType: "json",
                    data: {
                        json: JSON.stringify(shoppinglistRecipe)
                    },
                    success: function(res2) {
                        showLists(); 
                    },
                    error: function(req, err) {
                        console.log(err);
                    }
                })
            } else {
                //notification: already exists
            }
        }
    });
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

function loadRecipeList(){
    $.ajax({
        url:"scripts/ToonRecept/getRecipeListById.php",
        type: "get",
        dataType: "json",
        data: {
            recipeId: recipeId
        },
        success: function(res) {
            $('#steps').append('<div class="row mb-3"><span>1. <span><span class="ms-1">'+res['FirstStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['SecondStep']!= null) $('#steps').append('<div class="row mb-3"><span>2. <span><span class="ms-1">'+res['SecondStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['ThirdStep']!= null) $('#steps').append('<div class="row mb-3"><span>3. <span><span class="ms-1">'+res['ThirdStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['FourthStep']!= null) $('#steps').append('<div class="row mb-3"><span>4. <span><span class="ms-1">'+res['FourthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['FifthStep']!= null) $('#steps').append('<div class="row mb-3"><span>5. <span><span class="ms-1">'+res['FifthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['SixthStep']!= null) $('#steps').append('<div class="row mb-3"><span>6. <span><span class="ms-1">'+res['SixthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['SeventhStep']!= null) $('#steps').append('<div class="row mb-3"><span>7. <span><span class="ms-1">'+res['SeventhStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['EighthStep']!= null) $('#steps').append('<div class="row mb-3"><span>8. <span><span class="ms-1">'+res['EighthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['NinthStep']!= null) $('#steps').append('<div class="row mb-3"><span>9. <span><span class="ms-1">'+res['NinthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['TenthStep']!= null) $('#steps').append('<div class="row mb-3"><span>10. <span><span class="ms-1">'+res['TenthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['EleventhStep']!= null) $('#steps').append('<div class="row mb-3"><span>11. <span><span class="ms-1"'+res['EleventhStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['TwelfthStep']!= null) $('#steps').append('<div class="row mb-3"><span>12. <span><span class="ms-1">'+res['TwelfthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['ThirteenthStep']!= null) $('#steps').append('<div class="row mb-3"><span>13. <span><span class="ms-1">'+res['ThirteenthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['FourteenthStep']!= null) $('#steps').append('<div class="row mb-3"><span>14. <span><span class="ms-1">'+res['FourteenthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
            if (res['FifteenthStep']!= null) $('#steps').append('<div class="row mb-3"><span>15. <span><span class="ms-1">'+res['FifteenthStep'].replaceAll('x0D','<br>' ) + '</span></div>');
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

function reloadRecipeIngredients(peopleFed){
    $.ajax({
        url:"scripts/ToonRecept/getRecipeIngredientsByRecipeId.php",
        type: "get",
        dataType: "json",
        data: {
            recipeId: recipeId,
            peopleFed: peopleFed
        },
        success: function(res) {
            $('#ingredients').empty();
            for (let i = 0; i < res.length; i++) {
                $('#ingredients').append('<div class="row"><div class="col-3">' + 
                    ((res[i]['Quantity'] == 0 ? '' : parseFloat(res[i]['CalculatedQuantity'])) + ' ' + res[i]['Unit']) + '</div>' +
                    '<div class="col-9" style="font-weight: 800;">' + res[i]['IngredientName'] + '</div></div>');
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    })
}

