---
layout: post
title: Getting Started with Slim Framework - Part 2
excerpt: This is part 2 of the Getting Started with Slim Framework tutorial in which we will build a frontend interface to access our API.
comments: true
tags: [slim, rest, api]
---

This is part 2 of the Getting Started with Slim Framework
tutorial in which we will build a frontend interface to access our API.

In the first part of the tutorial, we focused on building a functional
API that we could create, delete, update and view items...but there was
no interface to allow a user to actually use the application unless running
commands via cURL or through HTTP protocol manually.

In this part of the tutorial, we are going to focus on building the front-end
interface to allow the user to easily use the API (using HTML, Javascript and AJAX).
The beauty of using a RESTful
API is that once an API is build, it can be accessed by any device or language
that can use HTTP protocols...which gives plenty of flexibility for expanding
to new platforms or languages. This means you can use the same API with a Web
Application as an iPhone or Andriod application. You can see how RESTful APIs
have become extremely popular over the recent years.

**Note:** When going through this tutorial, make sure to keep your web browser console open to
see all the requests, responses and function calls as I've placed `console.log`
throughout the project.

### 1. Setup directory and files

First, what we are going to do is setup our basic front-end template in which the data
from the API will eventually load into. We are going to use
[Skeleton](http://getskeleton.com) as our CSS framework because it is very light, fast
framework (as opposed to the standard Bootstrap starting point). I like Skeleton
because it has all the basics you need, without the bloat. We are also going to
use [Zepto.js](http://zeptojs.com/). Zepto is just like jQuery (if you use
jQuery, you already know Zepto) but much lighter and faster.

Download the latest versions of Zepto.js and Skeleton CSS. Then create a `css`
and `js` folder and place the files in accordingly. After, create a `style.css`
,`index.html` and a `script.js` file. (Note: You should also have a Normalize.css file that
comes with Skeleton). Your file directory should look like this:

```
- index.html
- css/
- - normalize.css
- - skeleton.css
- - style.css
- js/
- - script.js
- - zepto.min.js
```

### 2. Add the API

We need a way to access the API, so for simplicity's sake we are going to just
place it in our current directory. Let's clone it into our root directory and
rename the folder to `api`:

```
git clone https://github.com/cdmedia/slim-cars.git
mv slim-cars/ api/
```

### 3. Setup the template

Now that we have our structure in place, let's get the front-end HTML template
made. Add this to your `index.html` file:

{% highlight html %}
<DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Slim Front-end Demo using Skeleton and Zepto.js</title>
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/skeleton.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <div class="row main">

    <!-- Sidebar -->
    <div class="three columns">
      <b>Garage</b>
      <ul id="car-list"></ul>
    </div>

    <!-- Main Content -->
    <div class="nine columns">
      <a class="button button-primary" href="#" id="btnAdd">New Car</a>

      <form id="carForm">
        <div class="detail-view">
          <input type="hidden" id="id">
          <label for="year">Year</label>
          <input class="u-full-width" type="text" id="year">
          <label for="make">Make</label>
          <input class="u-full-width" type="text" id="make">
          <label for="year">Model</label>
          <input class="u-full-width" type="text" id="model">
          <a class="button" href="#" id="btnSave">Save</a>
          <a class="button" href="#" id="btnDelete">Delete</a>
        </div>
      </form>
    </div>

    </div>
  </div>
  <script src="js/zepto.min.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
{% endhighlight %}

Couple things to point out here: We created a sidebar where we will list all of
the cars in our garage in the `<ul id="car-list"></ul>` element. Next, we have a
`<a class="button button-primary" href="#" id="btnAdd">New Car</a>` button for creating a new car.
Now to the heart of the app: We created a form for adding and updating cars in our garage in the `<form id="carForm">` form element. The
form will populate with the car's info when the car is selected from the sidebar. Note
that we have a hidden form element for `id`. This will allow our app to tell which car
is currently in the form. Then, to save or delete a car we have the `<a class="button" href="#" id="btnSave">Save</a>`
and `<a class="button" href="#" id="btnDelete">Delete</a>` buttons.

Finally, we'll apply some CSS to clean it up a bit for future steps. Add these
few lines to your `css/style.css` file:

{% highlight css %}
.main {
	margin-top: 25px;
}
.detail-view {
	padding: 20px 25px;
	margin: 15px 0px;
	background: #F6F6F6;
}
ul#car-list {
	list-style: none;
}
#car-list a {
	text-decoration: none;
}
#car-list li {
	margin: 0px;
	padding: 10px 0px 10px 5px;
	border-bottom: 1px solid #eee;
}
#car-list li:hover {
	background: #f6f6f6;
}
#car-list li:last-child {
	border-bottom: 0px solid #eee;
}
{% endhighlight %}

### 4. Start working with the API - Get all cars

Now that we have our template and style set up, we can start pulling data
from our API and get our application working. From here on out, you'll only
be working in your `js/script.js` file. In that file, we are going to
initialize Zepto.js and setup our root URL for our API. In addition, we will
add a `ajaxBeforeSend` function which may be useful when debugging AJAX calls.

{% highlight js %}
Zepto(function($){

	// Setup the root url for the RESTful services
	var rootURL = 'http://localhost/slim-cars/api/';

	$(document).on('ajaxBeforeSend', function(e, xhr, options){
		// This gets fired for every Ajax request performed on the page.
		// The xhr object and $.ajax() options are available for editing.
		// Return false to cancel this request.
	});

});
{% endhighlight %}

We are going to using AJAX for all our calls to our API. The first thing we need
to do is get a list of all cars in the database. Just below the `ajaxBeforeSend`
function add this:

{% highlight js %}
// Retrieve car list when application starts
findAll();

// Get all cars
function findAll() {
	$.ajax({
		type: 'GET',
		url: rootURL + 'cars',
		dataType: 'json',
		success: function(response){
			console.log('Success: ', response);
			renderList(response);
		},
		error: function(xhr, type){
		   console.log(xhr, type);
		}
	});
}

// Render list of all cars
function renderList(data) {
	$('#car-list li').remove();
	$.each(data, function(index, car) {
		$('#car-list').append('<li><a href="#" data-identity="' + car.id + '">' + car.model + '</a></li>');
	});
}
{% endhighlight %}

First, we are calling the `findAll()` function as soon as the application loads, this way
we have a list of cars when the user first visits the app. Next part is the actual `findAll()`
function. We use Zepto's `$.ajax` function with the 'GET' parameter to hit the URL `http://localhost/slim-cars/api/cars`.
This URL the returns a JSON object of all the cars in the database. Then, use the `renderList()` function
to render each of the cars as list items in our `#car-list` element. Note, we also add the `data-identity` parameter
using the car's id. This way we know which car to populate the fields with down the line.

You can now test this by visiting your app at `http://localhost/slim-cars/` and see the list of cars
in your database.

### 5. Find a car by ID


Now we have all the cars, but if we need to get a car by just the ID, we can use our API by calling the ID
after the url like `cars/3`. Now we are going to create an AJAX call which will get a car by id:

{% highlight js %}
// Get car by id
function findById(id) {
	console.log('findById:' + id);
	$.ajax({
		type: 'GET',
		url: rootURL + 'cars/' + id,
		dataType: 'json',
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: ' + data);
			currentCar = data;
			renderDetails(currentCar);
		},
		error: function(xhr, type){
		   console.log(xhr, type);
		}
	});
}
{% endhighlight %}

Similarly to above, we are using the AJAX with the GET method to get a car... but unlike above,
our `findByID()` function takes an input parameter of `id`. This function will call the url
including the id (`http://localhost/slim-cars/api/3`). On AJAX success, we will also set the
currentCar (we will be adding shortly) in order for our application to tell
which car is currently in our 'detail view' (form area).

Our application needs a way for us to view one car at a time in a kind of 'detail view'. This
detail view will be using the form to display the current car.

Let's initialize a `currentCar` variable just below our `rootURL` variable:

{% highlight js %}
var currentCar;
{% endhighlight %}

Now, we need a way for our form to render a car's details when a car is selected from the sidebar.
Add this line just below the `findAll()` function

{% highlight js %}
// Retrieve car details when list item is clicked
$('#car-list a').live('click', function() {
	findById($(this).data('identity'));
});
{% endhighlight %}

Finally, we add a `renderDetails()` function which takes a car as an input. This function then
populates our form with the car data. (This also fixes whether we have an empty object and
blanks out the form).

{% highlight js %}
// Render detail view
function renderDetails(car) {
	if($.isEmptyObject(car)){
		$('#id').val('');
		$('#year').val('');
		$('#make').val('');
		$('#model').val('');
	}else{
		$('#id').val(car.id);
		$('#year').val(car.year);
		$('#make').val(car.make);
		$('#model').val(car.model);
	}
}
{% endhighlight %}

Now if you view your application, you will see if you click on one of your car items,
the form fields should populate with the data.

### 6. Adding a new car

First, we need to have our form clear out once the 'New Car' button is clicked. Add this just
above your `findAll()` function.

{% highlight js %}
// Call new car function when button is clicked
$('#btnAdd').click(function() {
	newCar();
	return false;
});

// Hide delete button and empty out form
function newCar() {
	$('#btnDelete').hide();
	currentCar = {};
	renderDetails(currentCar); // Display empty form
}
{% endhighlight %}

Next, we need to get the form data from the HTML form in order to URL encode this data
and place it in our request. Place this just below the `renderDetails()` function.

{% highlight js %}
// Helper function to get form fields
function getForm() {
	var car = {
		'year': $('#year').val(),
		'make': $('#make').val(),
		'model': $('#model').val()
	};
	return car;
}
{% endhighlight %}

In order to add a car, we will be using Zepto's `$.ajax` method, but instead of using `GET` we will use `POST` as a parameter.
This tells Zepto to use HTTP POST method. Add the `addCar()` function just below `findById()`

{% highlight js %}
// Add new car
function addCar() {
	console.log('addCar');
	$.ajax({
		type: 'POST',
		url: rootURL + 'car',
		dataType: 'json',
		data: $.param(getForm()), // URI encode data for request
		success: function(data, xhr, type, textStatus) {
			console.log(data, xhr, type, textStatus);
			alert('Car added successfully');
			$('#btnDelete').show();
			$('#id').val(data.id);
			findAll(); // reload list
		},
		error: function(xhr, type, textStatus, errorThrown) {
			console.log(xhr, type, errorThrown, textStatus);
		}
	});
}
{% endhighlight %}

What happens here is the function sends a HTTP POST request to our API ('http://localhost/slim-cars/api/car') and
URI encodes our form field values so that our API can understand them. Then on success, the browser
alerts us that a car was successfully added. In addition, we show the delete button (it was never hidden anyway, but
we'll get to that later), adds the id value to our form's id hidden field, and reload's our car list
to display our newly added car using our `findAll()` function.

Now, we need to be able to send the POST request from the front end. Tie this function to your `#btnSave` button.
Add this just below `$('#btnAdd').click(function() {...`.

{% highlight js %}
// Call add car function when save button is clicked
$('#btnSave').click(function() {
	if($('#id').val() == ''){
		addCar();
	}else{
		updateCar();
	}
	return false;
});
{% endhighlight %}

Now you can try adding a car by filling in the form and clicking the 'Save' button.
Note that we haven't added the `updateCar()` method yet...but don't worry it's next.

### 7. Update a car

Now we need a way to update a car currently in the database. We will be using HTTP PUT
method in order to update from our API. Just below your `addCar()` function add:

{% highlight js %}
// Update a car
function updateCar($id) {
	console.log('updateCar');
	$.ajax({
		type: 'PUT',
		url: rootURL + 'car/' + $('#id').val(),
		dataType: 'json',
		data: $.param(getForm()), // URI encode data for request
		success: function(data, xhr, type, textStatus) {
			console.log(data, xhr, type, textStatus);
			alert('Car successfully updated');
			findAll(); // reload list
		},
		error: function(xhr, type, textStatus, errorThrown) {
			console.log(xhr, type, errorThrown, textStatus);
		}
	});
}
{% endhighlight %}

Similar to the `addCar()` function, we are URI encoding our form data so our API can
understand what to do. The function uses our form field 'id' value in order to build
our URL in which to send the PUT request. For instance, the request sent to
'http://localhost/slim-cars/api/car/3' tells the API to update car with an id of 3.
After the update is successful, the browser alerts that the car was updated successfully and
then reloads the car list.

We've already tied the `updateCar()` function to our 'Save' button so try selecting a car
and clicking the 'Save' button. Your car should now be updated in the database.

### 8. Delete a car

Now we need to be able to delete a car. Since no car is in the detail view
when the application loads, let's hide the delete file on inital load. Add
this just below `findAll()`.

{% highlight js %}
// Nothing to delete in initial application state
$('#btnDelete').hide();
{% endhighlight %}

Now we will use the HTTP DELETE method to delete a car by a specified id. Add
this just below the `addCar()` function.

{% highlight js %}
// Delete a car
function deleteCar($id) {
	console.log('deleteCar');
	$.ajax({
		type: 'DELETE',
		url: rootURL + 'car/' + $('#id').val(),
		success: function(data, xhr, type, textStatus) {
			console.log(data, xhr, type, textStatus);
			alert('Car successfully deleted');
			newCar(); // zero out the form
			findAll(); // reload list
		},
		error: function(xhr, type, textStatus, errorThrown) {
			console.log(xhr, type, errorThrown, textStatus);
		}
	})
}
{% endhighlight %}

Similar to the other ajax functions, we generate a URL using the current form field id ('http://localhost/slim-cars/api/car/3').
Then, the function calls the HTTP DELETE method. On success, the browser alerts that the car was successfully deleted, blanks out the
form using our `newCar()` method and reloads the car list using our `findAll()` method.

Now just tie this function into the frontend using our `#btnDelete` button. Add this just below `$('#btnAdd').click(function() {...`

{% highlight js %}
// Call delete car function when button is clicked
$('#btnDelete').click(function() {
	deleteCar();
	return false;
});
{% endhighlight %}

### 9. Conclusion

Now if you visit you app, you should be able to add, delete, update and view your cars in your database. You
can get a GIT staged step by step version of this post [here on
Github](https://github.com/cdmedia/slim-cars-frontend).

![Slim Demo
Frontend](https://raw.githubusercontent.com/codoki/codoki.github.io/master/public/img/tuts/slim-frontend-api.png)

