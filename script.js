
const form = document.querySelector('.search-form')
const recipeList = document.querySelector('.recipe-list')
const recipeDetails = document.querySelector('.recipe-details')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const inputValue = event.target[0].value
    searchRecipes(inputValue)
})

async function searchRecipes(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    const data = await response.json()
    showRecipes(data.meals)
}

function showRecipes(recipes) {
    recipeList.innerHTML = recipes.map(item => `
        <div class="recipe-card" onclick="getRecipesDetails(${item.idMeal})">
        <img src="${item.strMealThumb}" alt="receita-foto">
        <h3>${item.strMeal}</h3>
        </div>
        `

    ).join('')
}

async function getRecipesDetails(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

    const data = await response.json()
    const recipe = data.meals[0]

    let ingredients = ''


    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredients${i}`]) {
            ingredients += `<li>${recipe[`strIngredients${i}`]} - ${recipe[`strMeasure${i}`]} </li>`

        } else {
            break;

        }
    }
}

recipeDetails.innerHTML=`
<ul>${ingredients}</ul>
`