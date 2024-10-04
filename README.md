# Fall2024-Assignment2-jlcrawford3

## Project Overview
This project is a class assignment to create a simple web search site using a Bing Search API. The webpage is built using ASP.NET Core Web Application (Model-View-Controller) in C# and is published to Azure.

## Assignment Requirements
1. **Setup a GitHub repository for the project**
2. **Create the project in Visual Studio as an ASP.NET Core Web Application (Model-View-Controller) [C#]**
3. **Create a Bing Search v7 API resource in Azure**
4. **Build the website and integrate the Bing Search API**
5. **Publish the site to Azure**

## Website Requirements
- All CSS and JS code must be contained within their respective files
- Include jQuery, jQueryUI, and a jQueryUI theme via CDN links
- Use an SRI hash for each of the CDN links

### HTML:
- A header with the name of your "search engine" (be creative)
- A title of the same name
- A text box with an ID of `query`
- A button with a value of `Search` under your text box
- A second button that will display the current time
- An empty div with an ID of `searchResults`
- A second empty div with an ID of `time`

### CSS:
- Set the background of the page to an image of your choice
- Set the visibility of the `searchResults` and `time` divs to hidden
- Style the rest of the page however you see fit

### JS:
- Replace `my-api-url` under the ajax call with the URL from your search API
- Replace `my-api-key` next to `Ocp-Apim-Subscription-Key` with the API key from your search API
- Write a function that calls the `apiSearch` function on a click of your search button
- Write a function that changes the background image of your site on a click of your search engine name
- Write a function that gets the current time (formatted HH:MM), loads the result into your `time` div, and displays the div as a jQueryUI dialog window on a click of your time button
 
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- University: The University of Alabama
- Instructor: Maclane May
- Course: CS330 - Web Development
- Semester: Fall 2024
- Author: JP Crawford
