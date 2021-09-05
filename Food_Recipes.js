const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event Listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () =>
{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Get Meal list that matches with the Ingredients
function getMealList()
{
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data =>
        {
        let html = "";
        if(data.meals)
        {
            data.meals.forEach(meal =>
            {
                html += `
                    <div id='meal-item' data-id="${meal.idMeal}">
                        <div id='meal-img'>
                            <img src="${meal.strMealThumb}" alt="Food">
                        </div>
                        <div id='meal-name'>
                            <h3>${meal.strMeal}</h3>
                            <a class='recipe-btn' href="#">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } 
        else
        {
            html = "Sorry, there's no recipes for it!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

// Get Recipe of the Meal
function getMealRecipe(e)
{
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn'))
    {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// Create a Modal
function mealRecipeModal(meal)
{
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2>${meal.strMeal}</h2>
        <p id='recipe-category'>${meal.strCategory}</p>
        <div id='recipe-instruct'>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div id='recipe-meal-img'>
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div id='recipe-link'>
            <a href="${meal.strYoutube}" target="_blank">Watch the Recipe Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}