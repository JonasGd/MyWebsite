var foodCategoryId = getQueryVariable("foodCategoryId");

if (foodCategoryId != 0) {
    var node = document.getElementById('category');
    node.style.display = 'none';
} 
if (foodCategoryId == 1) {
    var node = document.getElementById('subCategory');
    node.style.display = 'none';
    var nodeSmall = document.getElementById('subCategorySm');
    nodeSmall.innerHTML = '';
}


if (foodCategoryId != 0) {
    var node = document.getElementById('categoryIcon');
    node.className = foodCategoryId == 1 ? 'icon-breakfast' :
    foodCategoryId == 2 ? 'icon-lunch' :
    foodCategoryId == 3 ? 'icon-appetizer':
    foodCategoryId == 4 ? 'icon-dinner' :
    foodCategoryId == 5 ? 'icon-dessert': ''
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




class ClassWatcher {

    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback()
                    }
                    else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}


const filter = document.getElementById('collapseFilters');
// watch for a specific class change
let classWatcher = new ClassWatcher(filter, 'collapsing', workOnClassAdd, workOnClassRemoval)


var filterClosed = document.getElementById('FilterClosed');
var filterOpened = document.getElementById('FilterOpened');
function workOnClassAdd() {
    filterClosed.style.display = filterClosed.style.display=='none' ? 'inline-block' : 'none';
    filterOpened.style.display = filterOpened.style.display=='none' ? 'inline-block' : 'none';
}

function workOnClassRemoval() {
    
}