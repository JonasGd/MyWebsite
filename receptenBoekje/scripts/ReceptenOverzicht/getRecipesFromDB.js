
const MAX_ITEMS = 50;
var page = 1;

$(document).ready(function() {
    waitForFlags(_ => (isAdmin === 0 || (isAdmin !==null && isAdmin !== "null")) && (isCreate === 0 || (isCreate !== null && isAdmin !== "null")))
        .then(_ => {
            if (isAdmin==='0' && isCreate==='0') 
                document.getElementById('newRecipe').style.display = 'none';
            else 
                document.getElementById('newRecipe').style.display = 'block';
        })
    reloadTable();
    loadCategories();
});

var filterList = [];
var filterListText = '';
var foodCategoryId = getQueryVariable("foodCategoryId");
var searchKeyWord = '';
var tableSort = 'Name';
var order = 'ASC';

function reloadTable() {
    $.ajax({
        url:"scripts/ReceptenOverzicht/getRecipes.php",
        type: "get",
        dataType: "json",
        data: {
            filterListText: filterListText,
            filterListLength: filterList.length,
            foodCategoryId: foodCategoryId,
            searchKeyWord: searchKeyWord,
            tableSort: tableSort,
            order: order
        },
        success: function(res) {
            $('#getRecipesFromDB').empty();
            $('#getRecipesFromDB-sm').empty();
            for (let i = (page - 1) * MAX_ITEMS; i < (Math.min(page * MAX_ITEMS, res.length)); i++) {
                var totalTime = (res[i]['TotalTime']>=60?
                    parseInt(res[i]['TotalTime']/60, "10") + "h" + res[i]['TotalTime']%60 : res[i]['TotalTime'])
                    + (!res[i]['CookingMinutes']? "" :
                    "\n(" + res[i]['PreparationMinutes'] + " + " + res[i]['CookingMinutes'] + ")");
            
                var insert = '<tr class="table-row"><td><a style="font-weight:bold;" href="./ToonRecept?RecipeId='+res[i]['Id'] + '">' + res[i]['Name'] + '</a></td>'
                +'<td style="white-space: pre; text-align: right">' + totalTime + '</td>'
                +'<td><span class="' + (res[i]['isComfortFood']==0 ? 'icon-comfort2-inactive' : 'icon-comfort2-active')+ '" style="font-size: 32px;"></span></td>'
                +'<td><span class="' + (res[i]['isFavourite']==0 ? 'icon-heart2-inactive' : 'icon-heart2-active')+ '" style="font-size: 32px;"></span></td>'
                +(foodCategoryId!=0 ? '':'<td><span class="' + (res[i]['FoodCategoryId'] == 1 ? 'icon-breakfast' :
                    res[i]['FoodCategoryId'] == 2 ? 'icon-lunch' :
                    res[i]['FoodCategoryId'] == 3 ? 'icon-appetizer':
                    res[i]['FoodCategoryId'] == 4 ? 'icon-dinner' :
                    res[i]['FoodCategoryId'] == 5 ? 'icon-dessert': '') + '" style="font-size: 32px;"></span></td>')
                +(foodCategoryId==1? '': '<td><span class="' + (res[i]['FoodCategoryId'] == 2 ? (
                        res[i]['SubCategoryId'] == 1 ? 'icon-wraps' :
                        res[i]['SubCategoryId'] == 2 ? 'icon-pizza' :
                        res[i]['SubCategoryId'] == 3 ? 'icon-salad' :
                        res[i]['SubCategoryId'] == 4 ? 'icon-soup' :
                        res[i]['SubCategoryId'] == 6 ? 'icon-etc' :
                        res[i]['SubCategoryId'] == 7 ? 'icon-bread' : '') :
                    res[i]['FoodCategoryId'] == 4 ? (
                        res[i]['SubCategoryId'] == 1 ? 'icon-flemish' :
                        res[i]['SubCategoryId'] == 2 ? 'icon-mexican' :
                        res[i]['SubCategoryId'] == 3 ? 'icon-albanian1" style="font-size: 32px;"></span><span class="icon-albanian2' :
                        res[i]['SubCategoryId'] == 4 ? 'icon-italian1" style="font-size: 32px;"></span><span class="icon-italian2" style="font-size: 32px;"></span><span class="icon-italian3' :
                        res[i]['SubCategoryId'] == 5 ? 'icon-mediterranian' :
                        res[i]['SubCategoryId'] == 6 ? 'icon-etc' :
                        res[i]['SubCategoryId'] == 8 ? 'icon-asian1" style="font-size: 32px;"></span><span class="icon-asian2" style="font-size: 32px;"></span><span class="icon-asian3" style="font-size: 32px;"></span><span class="icon-asian4" style="font-size: 32px;"></span><span class="icon-asian5" style="font-size: 32px;"></span><span class="icon-asian6" style="font-size: 32px;"></span><span class="icon-asian7" style="font-size: 32px;"></span><span class="icon-asian8' : '') :
                    res[i]['FoodCategoryId'] == 5 ? (
                        res[i]['SubCategoryId'] == 1 ? 'icon-cake' :
                        res[i]['SubCategoryId'] == 2 ? 'icon-cookie':
                        res[i]['SubCategoryId'] == 3 ? 'icon-etc' :
                        res[i]['SubCategoryId'] == 4 ? 'icon-croissant' :
                        res[i]['SubCategoryId'] == 5 ? 'icon-waffle' :
                        res[i]['SubCategoryId'] == 6 ? 'icon-ice' :
                        res[i]['SubCategoryId'] == 7 ? 'icon-pie' :
                        res[i]['SubCategoryId'] == 9 ? 'icon-brownie' : ''): 
                    res[i]['FoodCategoryId'] == 3 ? (
                            res[i]['SubCategoryId'] == 1 ? 'icon-starter' :
                            res[i]['SubCategoryId'] == 2 ? 'icon-appetizer1' :
                            res[i]['SubCategoryId'] == 3 ? 'icon-drink' :
                            res[i]['SubCategoryId'] == 4 ? 'icon-etc'
                            : ''): '') + '" style="font-size: 32px;"></span></td>') + '</tr>';
                $('#getRecipesFromDB').append(insert);

                var insertSmall = '<tr class="table-row"><td><div class="row mb-4 mt-3"><div class="col-6"><a style="font-weight:bold;" href="./ToonRecept?RecipeId='+res[i]['Id'] + '">' + res[i]['Name'] + '</a></div>'
                        +'<div class="col-3"><span class="' + (res[i]['isComfortFood']==0 ? 'icon-comfort2-inactive' : 'icon-comfort2-active')+ '" style="font-size: 32px;"></span></div>'
                        +'<div class="col-3"><span class="' + (res[i]['isFavourite']==0 ? 'icon-heart2-inactive' : 'icon-heart2-active')+ '" style="font-size: 32px;"></span></div>'
                        +'</div><div class="row"><div class="col-6"><div class="row">' +(foodCategoryId!=0 ? '':'<div class="col-6"><span class="' + (res[i]['FoodCategoryId'] == 1 ? 'icon-breakfast' :
                        res[i]['FoodCategoryId'] == 2 ? 'icon-lunch' :
                        res[i]['FoodCategoryId'] == 3 ? 'icon-appetizer':
                        res[i]['FoodCategoryId'] == 4 ? 'icon-dinner' :
                        res[i]['FoodCategoryId'] == 5 ? 'icon-dessert': '') + '" style="font-size: 32px;"></span></div>')
                    +(foodCategoryId==1? '': '<div class="col-6"><span class="' + (res[i]['FoodCategoryId'] == 2 ? (
                            res[i]['SubCategoryId'] == 1 ? 'icon-wraps' :
                            res[i]['SubCategoryId'] == 2 ? 'icon-pizza' :
                            res[i]['SubCategoryId'] == 3 ? 'icon-salad' :
                            res[i]['SubCategoryId'] == 4 ? 'icon-soup' :
                            res[i]['SubCategoryId'] == 6 ? 'icon-etc' :
                            res[i]['SubCategoryId'] == 7 ? 'icon-bread' : '') :
                        res[i]['FoodCategoryId'] == 4 ? (
                            res[i]['SubCategoryId'] == 1 ? 'icon-flemish' :
                            res[i]['SubCategoryId'] == 2 ? 'icon-mexican' :
                            res[i]['SubCategoryId'] == 3 ? 'icon-albanian1" style="font-size: 32px;"></span><span class="icon-albanian2' :
                            res[i]['SubCategoryId'] == 4 ? 'icon-italian1" style="font-size: 32px;"></span><span class="icon-italian2" style="font-size: 32px;"></span><span class="icon-italian3' :
                            res[i]['SubCategoryId'] == 5 ? 'icon-mediterranian' :
                            res[i]['SubCategoryId'] == 6 ? 'icon-etc' :
                            res[i]['SubCategoryId'] == 8 ? 'icon-asian1" style="font-size: 32px;"></span><span class="icon-asian2" style="font-size: 32px;"></span><span class="icon-asian3" style="font-size: 32px;"></span><span class="icon-asian4" style="font-size: 32px;"></span><span class="icon-asian5" style="font-size: 32px;"></span><span class="icon-asian6" style="font-size: 32px;"></span><span class="icon-asian7" style="font-size: 32px;"></span><span class="icon-asian8' : '') :
                        res[i]['FoodCategoryId'] == 5 ? (
                            res[i]['SubCategoryId'] == 1 ? 'icon-cake' :
                            res[i]['SubCategoryId'] == 2 ? 'icon-cookie':
                            res[i]['SubCategoryId'] == 3 ? 'icon-etc' :
                            res[i]['SubCategoryId'] == 4 ? 'icon-croissant' :
                            res[i]['SubCategoryId'] == 5 ? 'icon-waffle' :
                            res[i]['SubCategoryId'] == 6 ? 'icon-ice' :
                            res[i]['SubCategoryId'] == 7 ? 'icon-pie' :
                            res[i]['SubCategoryId'] == 9 ? 'icon-brownie' : ''): 
                        res[i]['FoodCategoryId'] == 3 ? (
                            res[i]['SubCategoryId'] == 1 ? 'icon-starter' :
                            res[i]['SubCategoryId'] == 2 ? 'icon-appetizer1' :
                            res[i]['SubCategoryId'] == 3 ? 'icon-drink' :
                            res[i]['SubCategoryId'] == 4 ? 'icon-etc'
                            : '') : '') + '" style="font-size: 32px;"></span></div>') + '</div></div>'
                    +'<div class="col-6">' + totalTime + '</div>';
                $('#getRecipesFromDB-sm').append(insertSmall);
            }
            
            if (res.length > MAX_ITEMS) {
                fillPagingInfo(res.length);
                reloadButtons(res.length);
            } else if (res.length == 0) {
                noItemsPagingInfo();
            }
            else {
                clearPagingInfo(res.length);
            }
        },
        error: function(req, err) {
            console.log(err);
        }
})}

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

const search = document.getElementById('search');
search.addEventListener('input', function handleChange(event) {
    searchKeyWord = this.value;
    page=1;
    reloadTable();
})


const sortables = document.querySelectorAll('.sortable');

for (const sortable of sortables) {
  sortable.addEventListener('click', function handleClick() {
    if (!sortable.classList.contains('sorted')) {
        for (const allSortables of sortables) {
            if (allSortables.classList.contains('sorted')) allSortables.classList.remove('sorted');
        }
        sortable.classList.add('sorted');
        if (tableSort == sortable.getAttribute('sort')) order = 'DESC';
        else order = 'ASC';
        tableSort = sortable.getAttribute('sort');
    } else {
        if (order == 'ASC') order = 'DESC';
        else order = 'ASC';
    }
    reloadTable();
  });
}

function reloadButtons(length) {
    const paginationButtons = document.querySelectorAll('.pagination-button');

    for (const paginationButton of paginationButtons) {
        paginationButton.addEventListener('click', function handleClick() {
            if(paginationButton.classList.contains('pagination-left') && page!=1) page--;
            else if (paginationButton.classList.contains('pagination-right') && page!= (Math.floor(length / MAX_ITEMS) + 1)) page++;
            else page = parseInt(paginationButton.textContent);
            reloadTable();
        })
    }
}

function clearPagingInfo(length) {
    $('#pagingInfo').empty().append(((page - 1) * MAX_ITEMS + 1) + ' to '+ Math.min(page * MAX_ITEMS, length) +' of '+ length +' items');
    $('#pagingButtons').empty();
}

function noItemsPagingInfo() {
    $('#pagingInfo').empty().append('No items to show...');
    $('#pagingButtons').empty();
}

function fillPagingInfo(length) {
    $('#pagingInfo').empty().append(((page - 1) * MAX_ITEMS + 1) + ' to '+ Math.min(page * MAX_ITEMS, length) +' of '+ length +' items')
    var isFirst = page == 1;
    var numPages = (Math.floor(length / MAX_ITEMS) + 1);
    var isLast = page == numPages;
    var pagingButtons = '<button class="pagination-button pagination-left" ' + (isFirst? 'disabled':'') +'><div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">'
                        +'<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>'
                      +'</svg></div></button>';


    for (var i = 1; i <= numPages; i++) {
        pagingButtons += '<button class="pagination-button '+(page==i? 'is--active': '' )+ '"><div>'+i+'</div></button>';
    }
    pagingButtons += '<button class="pagination-button pagination-right" ' + (isLast? 'disabled': '') + '><div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">'
                        +'<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>'
                      +'</svg></div></button>';

    $('#pagingButtons').empty().append(pagingButtons);
}

var ingredientCategoriesA = [];
var ingredientCategoriesFG = [];
var ingredientCategoriesK = [];
var ingredientCategoriesKS = [];
var ingredientCategoriesVV = [];
var ingredientCategoriesZE = [];


function loadCategories() {
    $.ajax({
        url:"scripts/ReceptenOverzicht/getIngredientCategories.php",
        type: "get",
        dataType: "json",
        data: {
            ingredientMainCategoryId: 1
        },
        success: function(res) {
            $('#FruitGroenten').empty();
            for (let i = 0; i < res.length; i++) {
                ingredientCategoriesFG.push(res[i]);
                $('#FruitGroenten').append('<div class="tag tag-small mb-2 me-2 ingredientFG border-radius-rounded background-' + (res[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ res[i]['Label'] +'</div>');
            }
            const ingredients = document.querySelectorAll('.ingredientFG');
            for (const ingredient of ingredients) {
                ingredient.addEventListener('click', function handleClick() {
                    onCategoryFilter(ingredient.innerText);
                });
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"scripts/ReceptenOverzicht/getIngredientCategories.php",
        type: "get",
        dataType: "json",
        data: {
            ingredientMainCategoryId: 2
        },
        success: function(res) {
            $('#VleesVis').empty();
            for (let i = 0; i < res.length; i++) {
                ingredientCategoriesVV.push(res[i]);
                $('#VleesVis').append('<div class="tag tag-small mb-2 me-2 ingredientVV border-radius-rounded background-' + (res[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ res[i]['Label'] +'</div>');
            }
            const ingredients = document.querySelectorAll('.ingredientVV');
            for (const ingredient of ingredients) {
                ingredient.addEventListener('click', function handleClick() {
                    onCategoryFilter(ingredient.innerText);
                });
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"scripts/ReceptenOverzicht/getIngredientCategories.php",
        type: "get",
        dataType: "json",
        data: {
            ingredientMainCategoryId: 3
        },
        success: function(res) {
            $('#KruidenSauzen').empty();
            for (let i = 0; i < res.length; i++) {
                ingredientCategoriesKS.push(res[i]);
                $('#KruidenSauzen').append('<div class="tag tag-small mb-2 me-2 ingredientKS border-radius-rounded background-' + (res[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ res[i]['Label'] +'</div>');
            }
            const ingredients = document.querySelectorAll('.ingredientKS');
            for (const ingredient of ingredients) {
                ingredient.addEventListener('click', function handleClick() {
                    onCategoryFilter(ingredient.innerText);
                });
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"scripts/ReceptenOverzicht/getIngredientCategories.php",
        type: "get",
        dataType: "json",
        data: {
            ingredientMainCategoryId: 4
        },
        success: function(res) {
            $('#Koolhydraten').empty();
            for (let i = 0; i < res.length; i++) {
                ingredientCategoriesK.push(res[i]);
                $('#Koolhydraten').append('<div class="tag tag-small mb-2 me-2 ingredientK border-radius-rounded background-' + (res[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ res[i]['Label'] +'</div>');
            }
            const ingredients = document.querySelectorAll('.ingredientK');
            for (const ingredient of ingredients) {
                ingredient.addEventListener('click', function handleClick() {
                    onCategoryFilter(ingredient.innerText);
                });
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"scripts/ReceptenOverzicht/getIngredientCategories.php",
        type: "get",
        dataType: "json",
        data: {
            ingredientMainCategoryId: 5
        },
        success: function(res) {
            $('#ZuivelEieren').empty();
            for (let i = 0; i < res.length; i++) {
                ingredientCategoriesZE.push(res[i]);
                $('#ZuivelEieren').append('<div class="tag tag-small mb-2 me-2 ingredientZE border-radius-rounded background-' + (res[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ res[i]['Label'] +'</div>');
            }
            const ingredients = document.querySelectorAll('.ingredientZE');
            for (const ingredient of ingredients) {
                ingredient.addEventListener('click', function handleClick() {
                    onCategoryFilter(ingredient.innerText);
                });
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
    $.ajax({
        url:"scripts/ReceptenOverzicht/getIngredientCategories.php",
        type: "get",
        dataType: "json",
        data: {
            ingredientMainCategoryId: 6
        },
        success: function(res) {
            $('#Andere').empty();
            for (let i = 1; i < res.length; i++) {
                if (res[i]['Label']!='MoreEggs') {
                    ingredientCategoriesA.push(res[i]);
                    $('#Andere').append('<div class="tag tag-small mb-2 me-2 ingredientA border-radius-rounded background-' + (res[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ res[i]['Label'] +'</div>');
                }
            }
            const ingredients = document.querySelectorAll('.ingredientA');
            for (const ingredient of ingredients) {
                ingredient.addEventListener('click', function handleClick() {
                    onCategoryFilter(ingredient.innerText);
                });
            }
        },
        error: function(req, err) {
            console.log(err);
        }
    });
}

function reloadCategories() {
    $('#FruitGroenten').empty();
    for (let i = 0; i < ingredientCategoriesFG.length; i++) {
        $('#FruitGroenten').append('<div class="tag tag-small mb-2 me-2 ingredientFG border-radius-rounded background-' + (ingredientCategoriesFG[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ ingredientCategoriesFG[i]['Label'] +'</div>');
    }
    ingredients = document.querySelectorAll('.ingredientFG');
    for (const ingredient of ingredients) {
        ingredient.addEventListener('click', function handleClick() {
            onCategoryFilter(ingredient.innerText);
        });
    }
    $('#VleesVis').empty();
    for (let i = 0; i < ingredientCategoriesVV.length; i++) {
        $('#VleesVis').append('<div class="tag tag-small mb-2 me-2 ingredientVV border-radius-rounded background-' + (ingredientCategoriesVV[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ ingredientCategoriesVV[i]['Label'] +'</div>');
    }
    ingredients = document.querySelectorAll('.ingredientVV');
    for (const ingredient of ingredients) {
        ingredient.addEventListener('click', function handleClick() {
            onCategoryFilter(ingredient.innerText);
        });
    }
    $('#Koolhydraten').empty();
    for (let i = 0; i < ingredientCategoriesK.length; i++) {
        $('#Koolhydraten').append('<div class="tag tag-small mb-2 me-2 ingredientK border-radius-rounded background-' + (ingredientCategoriesK[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ ingredientCategoriesK[i]['Label'] +'</div>');
    }
    ingredients = document.querySelectorAll('.ingredientK');
    for (const ingredient of ingredients) {
        ingredient.addEventListener('click', function handleClick() {
            onCategoryFilter(ingredient.innerText);
        });
    }
    $('#ZuivelEieren').empty();
    for (let i = 0; i < ingredientCategoriesZE.length; i++) {
        $('#ZuivelEieren').append('<div class="tag tag-small mb-2 me-2 ingredientZE border-radius-rounded background-' + (ingredientCategoriesZE[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ ingredientCategoriesZE[i]['Label'] +'</div>');
    }
    ingredients = document.querySelectorAll('.ingredientZE');
    for (const ingredient of ingredients) {
        ingredient.addEventListener('click', function handleClick() {
            onCategoryFilter(ingredient.innerText);
        });
    }
    $('#KruidenSauzen').empty();
    for (let i = 0; i < ingredientCategoriesKS.length; i++) {
        $('#KruidenSauzen').append('<div class="tag tag-small mb-2 me-2 ingredientKS border-radius-rounded background-' + (ingredientCategoriesKS[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ ingredientCategoriesKS[i]['Label'] +'</div>');
    }
    ingredients = document.querySelectorAll('.ingredientKS');
    for (const ingredient of ingredients) {
        ingredient.addEventListener('click', function handleClick() {
            onCategoryFilter(ingredient.innerText);
        });
    }
    $('#Andere').empty();
    for (let i = 0; i < ingredientCategoriesA.length; i++) {
        $('#Andere').append('<div class="tag tag-small mb-2 me-2 ingredientA border-radius-rounded background-' + (ingredientCategoriesA[i]['Is_Selected']!='0'? 'primary':'neutral') +' btn">'+ ingredientCategoriesA[i]['Label'] +'</div>');
    }
    ingredients = document.querySelectorAll('.ingredientA');
    for (const ingredient of ingredients) {
        ingredient.addEventListener('click', function handleClick() {
            onCategoryFilter(ingredient.innerText);
        });
    }                                                                                                                    
}


function resetCategories() {
    ingredientCategoriesA = [];
    ingredientCategoriesFG = [];
    ingredientCategoriesK = [];
    ingredientCategoriesKS = [];
    ingredientCategoriesVV = [];
    ingredientCategoriesZE = [];
    loadCategories();
    filterList=[];
    filterListText='';
    reloadTable();
}

function onCategoryFilter(category) {
    if (filterListText.toLowerCase().indexOf(category.replace(' ', "").toLowerCase()) > -1) {
        var rowNumber;
        filterList.forEach(function(filterItem, index) {
            if (filterItem==category) rowNumber = index;
        })
        filterList.splice(rowNumber, 1);
    } else {
        filterList.push(category)
    }
    filterListText = "";
    filterList.forEach(function(filterItem) {
        filterListText += filterItem.replace(" ", "");
    });
    reloadTable();
    ingredientCategoriesA.forEach(function(categoryItem) {
        if(categoryItem['Label'] == category) categoryItem['Is_Selected']=categoryItem['Is_Selected']=='0' ? '1' : '0';
    });
    ingredientCategoriesFG.forEach(function(categoryItem) {
        if(categoryItem['Label'] == category) categoryItem['Is_Selected']= categoryItem['Is_Selected']=='0' ? '1' : '0';
    });
    ingredientCategoriesK.forEach(function(categoryItem) {
        if(categoryItem['Label'] == category) categoryItem['Is_Selected']=categoryItem['Is_Selected']=='0' ? '1' : '0';
    });
    ingredientCategoriesKS.forEach(function(categoryItem) {
        if(categoryItem['Label'] == category) categoryItem['Is_Selected']=categoryItem['Is_Selected']=='0' ? '1' : '0';
    });
    ingredientCategoriesVV.forEach(function(categoryItem) {
        if(categoryItem['Label'] == category) categoryItem['Is_Selected']=categoryItem['Is_Selected']=='0' ? '1' : '0';
    });
    ingredientCategoriesZE.forEach(function(categoryItem) {
        if(categoryItem['Label'] == category) categoryItem['Is_Selected']=categoryItem['Is_Selected']=='0' ? '1' : '0';
    });
    reloadCategories();
}






