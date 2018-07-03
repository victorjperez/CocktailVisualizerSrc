Cocktail Visualizer is a dynamic viewer for mixed drinks using JSON data and SVG. This is the source code, and the page is located [here](https://github.com/victorjperez/CocktailVisualizer.)
## Information
This is the first full project I've created using React, and it was mostly made to heighten my understanding of the framework and what it can be used for. I chose SVG for two main reasons; primarily because it had the best performance for what I was trying to accomplish, and secondarily because I wanted to learn more about SVG as a whole.
### Loading and Visualizing Data
Since all of the drinks are displayed using components dynamically, any drink recipe can be added to the data file and it will be shown correctly (provided that the recipe makes sense). Here is an example of a valid drink:
```  
      "name": "Grey Goose Le Citron Asian Mary",
      "glass": "Tumbler",
      "ingredients": [
        ["Sake",1],
        ["Grey Goose Le Citron Flavored Vodka",1.5],
        ["Asian Mary Mix",3]]
```
Once the data is loaded, the drinks are calculated and drawn using SVG when they are selected from the menu. Each glass has a specific frame and clipPath, and each ingredient is drawn as a rectangle proportional to the recipe. Since each drink is only drawn when it is selected, performance should not be an issue when adding more and more recipes and glasses.
### Technologies Used
* [React](https://github.com/facebook/react/) with [create-react-app](https://github.com/facebook/create-react-app)
* [Webpack](https://github.com/webpack/webpack)
* [SASS](https://github.com/sass/ruby-sass)
* JSON
* SVG
### Challenges
The first major roadblock I encountered was passing data through components. Since many components needed to be able to know what drink is selected, it got a little tedious to pass that information down and up, and I eventually had to refactor my code to make it less of a mess. In doing so I learned the value of [Redux](https://github.com/reduxjs/redux) and how it can be used to make state easier to handle, but I do recognize that it wasn't a great fit for this particular project.

The second roadblock was drawing the actual glass in SVG. Since I had a weak background in the technology prior to the project, I had some trouble figuring out what technique I would use to make it work. In the end, once I read about clippaths everything clicked for me. Getting the correct ratios for the ingredients also ended up being a challenge, and I really should have planned that math better instead of doing it on the fly.
### Lessons Learned
As stated in the above, I learned a lot about the technologies selected above, which was pretty much the point of the project. I also learned the value of Redux, even though I chose not to use it in this project. I also ended up being suprised at how easy create-react-app made supporting IE; I put in absolutely 0 effort to make it compaitible, and it works perfectly! (though I'm sure there might be some issues on early versions of IE)
### Future Ideas & Scaling Up
If I chose to work on this more in the future, my first order would be to make this a full webapp that let's you submit and save your own recipes. In that case, I'd probably have to use Redux. From my own perspective, a lot of what I made seems easy to scale up, and React really makes it easy to just throw in components.

However, I'd consider all of that to be out of scope for this project.
