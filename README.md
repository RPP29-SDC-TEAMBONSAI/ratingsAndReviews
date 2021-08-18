# RPP29 Front-End-Capstone
*Team Cojita for life*

### Overview
- This project was aimed at renovating the outdated client-facing retail web-portal for a business that has suffered loss of sales due to poor user experience on their extant website. Our goal was to create a brand new retail website that was optimized for quick load times and accessibility compliance. There were four primary modules assigned critical priority: Product Detail, Ratings & Reviews, Questions & Answers, and Related Items & Outfit Creation. The scope of this project focused on front-end development, with the primary framework being React. Other technologies used include Babel, Webpack, Axios, jQuery, and Jest. The end product was deployed on an AWS EC2 instance.

### Team Members
- Jason Mollerup, Quinn Lima, Robert Lawrence, Callum Reid

### Demonstration
- include screen capture of final product going through each feature of site here

### Description
*Product Detail*

*Ratings & Reviews*

*Questions & Answers*

*Related Items & Outfit Creation*

The core of the Related Items & Outfit Creation module rests in two lists for the end user. The first of these is a list of related products, determined internally, that change depending on the current product a user is viewing. This list is comprised of card elements in a horizontally scrolling carousel that have information such as name, price, star rating, and image of a related product. The scrolling of this list is done by buttons that conditionally render and dissapear depending on if there are items available in the desired direction of scroll. The cards feature a clickable action button that opens a comparison modal that displays the features of the current item being viewed and the related item that was clicked. If a related product card is clicked outside of this action button, the user is redirected to the landing page for the item that they clicked.

The Outfit Creation list initially appears as empty, except for a button reading 'Add to Outfit'. Clicking this button will add the current product being viewed to a user's outfit list, populating the list with a card similar to the related products cards above. Users can add as many items as they want to their outfit, but are prevented from adding the same item twice. The user's outfit persists through navigation to other pages and exiting browser windows by relying on local storage. These outfit cards contain an action button that remove an item from the outfit. 

The primary challenge in creating this module came from needing data from numerous different endpoints that than needed to be altered and combined in order to reach the desired functionality. I had to be mindful of when and where to make API calls so I would have the necessary data for each subcomponent without overloading the server with requests. A change in the primary product being displayed means that a new list of 5-10 related product cards needs to be generated, of which each card would need data from multiple endpoints. This data then had to be run through numerous helper functions to be formatted in a useable way. The end result was accomplished by careful consideration and constant refactor to the base data structures I rely on the display each list and card.
     
*Additional Features*

Click Tracker: 
Each module within the application has implemented a click tracker that records the element clicked, the module that element is within, and the time of click. This data is then posted to client's API. There were two approaches taken in recording clicks- higher order components, and the render props method. Both accomplish the same goal, and are implemented individually for each module.

Dark Mode: 
The web page includes the option a user to toggle light or dark mode. This allows optimal experience in very bright areas, and battery savings in dimmer settings.


### Optimizations
- The client wanted their new site to meet to following metrics
  * Time to first paint: 0.8s
  * Time to first meaningful paint: 2.0s
  * Time to interactive: 2.5s

- To reach these goals, we performed a number of optimizations
  * Text Compression: Using `uglifyjs-webpack-plugin`, we reduced our bundle.js size from 1.6 MiB to 352 KiB
  * Preload Images: Through preloading above the fold images on our landing page, our largest contentful paint dropped by 3.4s

### Accessibility
- To increase our accessibility, we made the following improvements
  * Focused on semantic HTML throughout the development process
  * Included important aspects such as title, language, and doctype to our index.html
  * Included alt properties on all images

### Setup and Developement
- Clone a copy of the repository onto your local machine
- In the root directory where the repository was cloned, run `npm install` to install dependancies
- Create a `config.js` file in the root directory. Within this file, add the necessary credentials listed below:
 ```
 module.exports = {
  GITHUB_TOKEN: 'githubToken',
  API: 'hrseiApiToekn',
  imgBBkey: 'imgBBToken'
};
 ```
- In your terminal run `npm run build` to build webpack in dev mode.
- In your terminal run `npm run start` to start the express server on localhost:3000
- To build webpack in production mode (reduce bundle.js size, treeshaking, but loss of helpful error messages), run `npm run buildProd`


### Testing
- We used Jest as our testing framework, ensuring we did not only test happy-path scenarios. Our goal was to achieve around 70% coverage using only meaningful tests for each module. 
- To run tests:
  * In your terminal run `npm run test` to run all tests with jest.
  * If you want to run a just one particular test suite, run `npm run /path/to/test/file`
