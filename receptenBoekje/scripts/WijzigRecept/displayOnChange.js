const category = document.getElementById('Categorie');
category.addEventListener('change', function handleChange(event) {
    var categoryId = category.value;
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
})

var firstStep = '';
const firstStepElement = document.getElementById('firstStep');
firstStepElement.addEventListener('input', function handleChange(event) {
    firstStep = this.value;
    reloadSteps();
})

var secondStep = '';
const secondStepElement = document.getElementById('secondStep');
secondStepElement.addEventListener('input', function handleChange(event) {
    secondStep = this.value;
    reloadSteps();
})

var thirdStep = '';
const thirdStepElement = document.getElementById('thirdStep');
thirdStepElement.addEventListener('input', function handleChange(event) {
    thirdStep = this.value;
    reloadSteps();
})

var fourthStep = '';
const fourthStepElement = document.getElementById('fourthStep');
fourthStepElement.addEventListener('input', function handleChange(event) {
    fourthStep = this.value;
    reloadSteps();
})

var fifthStep = '';
const fifthStepElement = document.getElementById('fifthStep');
fifthStepElement.addEventListener('input', function handleChange(event) {
    fifthStep = this.value;
    reloadSteps();
})

var sixthStep = '';
const sixthStepElement = document.getElementById('sixthStep');
sixthStepElement.addEventListener('input', function handleChange(event) {
    sixthStep = this.value;
    reloadSteps();
})

var seventhStep = '';
const seventhStepElement = document.getElementById('seventhStep');
seventhStepElement.addEventListener('input', function handleChange(event) {
    seventhStep = this.value;
    reloadSteps();
})

var eighthStep = '';
const eighthStepElement = document.getElementById('eighthStep');
eighthStepElement.addEventListener('input', function handleChange(event) {
    eighthStep = this.value;
    reloadSteps();
})

var ninthStep = '';
const ninthStepElement = document.getElementById('ninthStep');
ninthStepElement.addEventListener('input', function handleChange(event) {
    ninthStep = this.value;
    reloadSteps();
})

var tenthStep = '';
const tenthStepElement = document.getElementById('tenthStep');
tenthStepElement.addEventListener('input', function handleChange(event) {
    tenthStep = this.value;
    reloadSteps();
})

var eleventhStep = '';
const eleventhStepElement = document.getElementById('eleventhStep');
eleventhStepElement.addEventListener('input', function handleChange(event) {
    eleventhStep = this.value;
    reloadSteps();
})

var twelfthStep = '';
const twelfthStepElement = document.getElementById('twelfthStep');
twelfthStepElement.addEventListener('input', function handleChange(event) {
    twelfthStep = this.value;
    reloadSteps();
})

var thirteenthStep = '';
const thirteenthStepElement = document.getElementById('thirteenthStep');
thirteenthStepElement.addEventListener('input', function handleChange(event) {
    thirteenthStep = this.value;
    reloadSteps();
})

var fourteenthStep = '';
const fourteenthStepElement = document.getElementById('fourteenthStep');
fourteenthStepElement.addEventListener('input', function handleChange(event) {
    fourteenthStep = this.value;
    reloadSteps();
})

var fifteenthStep = '';
const fifteenthStepElement = document.getElementById('fifteenthStep');
fifteenthStepElement.addEventListener('input', function handleChange(event) {
    fifteenthStep = this.value;
    reloadSteps();
})

function reloadSteps() {
    if (fifteenthStep == '') {
        document.getElementById('fifteenthStepLabel').style = 'color:lightgray;';
        if (fourteenthStep == '') {
            document.getElementById('fifteenthStepRow').style = 'display:none;';
            document.getElementById('fourteenthStepLabel').style = 'color:lightgray;';
            if (thirteenthStep == '') {
                document.getElementById('fourteenthStepRow').style = 'display:none;';
                document.getElementById('thirteenthStepLabel').style = 'color:lightgray;';
                if (twelfthStep == '') {
                    document.getElementById('thirteenthStepRow').style = 'display:none;';
                    document.getElementById('twelfthStepLabel').style = 'color:lightgray;';
                    if (eleventhStep == '') {
                        document.getElementById('twelfthStepRow').style = 'display:none;';
                        document.getElementById('eleventhStepLabel').style = 'color:lightgray;';
                        if (tenthStep == '') {
                            document.getElementById('eleventhStepRow').style = 'display:none;';
                            document.getElementById('tenthStepLabel').style = 'color:lightgray;';
                            if (ninthStep == '') {
                                document.getElementById('tenthStepRow').style = 'display:none;';
                                document.getElementById('ninthStepLabel').style = 'color:lightgray;';
                                if (eighthStep == '') {
                                    document.getElementById('ninthStepRow').style = 'display:none;';
                                    document.getElementById('eighthStepLabel').style = 'color:lightgray;';
                                    if (seventhStep == '') {
                                        document.getElementById('eighthStepRow').style = 'display:none;';
                                        document.getElementById('seventhStepLabel').style = 'color:lightgray;';
                                        if (sixthStep == '') {
                                            document.getElementById('seventhStepRow').style = 'display:none;';
                                            document.getElementById('sixthStepLabel').style = 'color:lightgray;';
                                            if (fifthStep  == '') {
                                                document.getElementById('sixthStepRow').style = 'display:none;';
                                                document.getElementById('fifthStepLabel').style = 'color:lightgray;';
                                                if (fourthStep == '') {
                                                    document.getElementById('fifthStepRow').style = 'display:none;';
                                                    document.getElementById('fourthStepLabel').style = 'color:lightgray;';
                                                    if (thirdStep == '') {
                                                        document.getElementById('fourthStepRow').style = 'display:none;';
                                                        document.getElementById('thirdStepLabel').style = 'color:lightgray;';
                                                        if (secondStep == '') {
                                                            document.getElementById('thirdStepRow').style = 'display:none;';
                                                            document.getElementById('secondStepLabel').style = 'color:lightgray;';
                                                        } else {
                                                            document.getElementById('thirdStepRow').style = 'display: flex;';
                                                            document.getElementById('secondStepLabel').style = 'color: #212529;';
                                                        }
                                                    } else {
                                                        document.getElementById('fourthStepRow').style = 'display: flex;';
                                                        document.getElementById('thirdStepLabel').style = 'color: #212529;';
                                                    }
                                                } else {
                                                    document.getElementById('fifthStepRow').style = 'display: flex;';
                                                    document.getElementById('fourthStepLabel').style = 'color: #212529;';
                                                }
                                            } else {
                                                document.getElementById('sixthStepRow').style = 'display: flex;';
                                                document.getElementById('fifthStepLabel').style = 'color: #212529;';
                                            }
                                        } else {
                                            document.getElementById('seventhStepRow').style = 'display: flex;';
                                            document.getElementById('sixthStepLabel').style = 'color: #212529;';
                                        }
                                    } else {
                                        document.getElementById('eighthStepRow').style = 'display: flex;';
                                        document.getElementById('seventhStepLabel').style = 'color: #212529;';
                                    }
                                } else {
                                    document.getElementById('ninthStepRow').style = 'display: flex;';
                                    document.getElementById('eighthStepLabel').style = 'color: #212529;';
                                }
                            } else {
                                document.getElementById('tenthStepRow').style = 'display: flex;';
                                document.getElementById('ninthStepLabel').style = 'color: #212529;';
                            }
                        } else {
                            document.getElementById('eleventhStepRow').style = 'display: flex;';
                            document.getElementById('tenthStepLabel').style = 'color: #212529;';
                        }
                    } else {
                        document.getElementById('twelfthStepRow').style = 'display: flex;';
                        document.getElementById('eleventhStepLabel').style = 'color: #212529;';
                    }
                } else {
                    document.getElementById('thirteenthStepRow').style = 'display: flex;';
                    document.getElementById('twelfthStepLabel').style = 'color: #212529;';
                }
            } else {
                document.getElementById('fourteenthStepRow').style = 'display: flex;';
                document.getElementById('thirteenthStepLabel').style = 'color: #212529;';
            }
        } else {
            document.getElementById('fifteenthStepRow').style = 'display: flex;';
            document.getElementById('fourteenthStepLabel').style = 'color: #212529;';
        }
    } else {
        document.getElementById('fifteenthStepLabel').style = 'color: #212529;';
    } 
}