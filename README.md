# Meal App

This Meal App provides an easy way to search for meals, explore meal information, and manage your favorite meals. The app includes multiple sections like Latest Meals, Favorites, Ingredients, and Random Meals.

# Overview
This app is divided into following main scripts
1. script.js (main)
2. mealinfo.js
3. ingredients.js
4. export.js


# - script.js

Search Functionality

* Input Handling: The search box takes input and sends a fetch request to the MealDB API for every key press to fetch data related to the entered string.
* Suggestions: As you start typing, suggestions will appear. You can press Enter or click on the search icon to display the results related to the entered data.
* Suggestion Item Click: Clicking on a suggestion item will redirect you to a detailed information page about the meal.

![](https://github.com/11shazam11/Meal/blob/main/ezgif.com-video-to-gif-converter.gif)

Latest Section

* Card Image Click: Clicking on a card image will provide more information about the meal. The image is wrapped in an anchor tag which redirects to the mealinfo page with the meal's ID as a parameter.
* Add to Favorites: Click on the "Add Fav" button to add the meal to the favorite section.

Favourite Section

* Display Favorites: Favorite items are displayed in this section.These are stored in local storage. Click on fav item to get mre information about it.


Ingredient Section 

* Popular Ingredients: Displays some popular ingredients.Clicking on an ingredient displays more information about it.

Random Meals

* Refresh for Random Meals: Refresh the page to get more random meals.

# - mealinfo.js

Meal information

* Display Information: This script displays detailed information about the meal, including ingredients and cooking instructions.
* Ingredient Click: Clicking on an ingredient within a meal displays more information about that ingredient.

# - ingridents.js

* Display Info: Displays detailed information about the selected ingredient.
* Related Meals: Shows meals related to the ingredient.
