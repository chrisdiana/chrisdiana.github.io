---
layout: post
title: Native Javascript Templating - Goodbye Handlebars
excerpt: Ditch your javascript template plugin for a native javascript template solution you can use in your next app.
comments: true
tags: [javascript, templates, vanilla js]
---

Ditch your javascript template plugin for a native javascript template solution
you can use in your next app.

### Why Javascript Templates?

First of all, why do we even need a javascript template plugin at all?
Let's say you want to generate a section of HTML using just javascript.
You will have to rely on concatenation in order to string the template together. It can get
messy and begin to mesh views and logic.


#### The Problem

{% highlight js %}

// Simple array of movies
var movies = [
	{ "name" : "Inception", "rating": "4" },
	{ "name" : "Goodfellas", "rating": "5" },
	{ "name" : "Fight Club", "rating": "4" },
];

// Loop through the movie array and append each list item
movies.forEach(function(movie) {

	var template = '<li><span class="movie-name">' + movie.name + '</span><span class="movie-rating">' + movie.rating + '</span></li>';

  document.getElementById('list').appendChild(template);

});

{% endhighlight %}

This may work for smaller templates like the one above, but as you can imagine
when you get into larger sets of nodes, it can become a real PITA to maintain.

---

### The Options

I've been on the hunt for the past week or so looking for a nice javascript
templating engine. In my search, I've come across plenty of great solutions such
as [Handlebar.js](http://handlebarsjs.com/), [Mustache](https://mustache.github.io/) and
[Hogan.js](http://twitter.github.io/hogan.js/) to name a few. I even found a really nice
[Javascript Template Chooser](http://garann.github.io/template-chooser/).

In addition, plenty of modern front-end frameworks already include templating
as a feature (such as Angular.js, React.js and Underscore.js) but I was looking for something that was
lightweight and focused more on separating the logic from the view. It made
me wonder if there was a better way...in pure javascript to handle this problem.

### Why Native?

Frameworks and plugins all come and go with the tide... but one thing that will
remain is vanilla javascript. A few years ago Mustache was all the rage.
Now Handlebars.js is the new hot kid on the block ( [a little Handlebars warning](https://bryce.fisher-fleig.org/blog/handlebars-considered-harmful/)
). Why keep having to relearn (and rebuild)
your projects everytime a new framework or plugin is released?

### The Solution

I began researching if there were any native javascript template patterns floating around.
I came across a pattern used in a Backbone.js example and one in a
[YUI Todo App](http://yuilibrary.com/yui/docs/app/app-todo.html) example referencing a
javascript mime type called `type="x-template"`. Take a look at the example below:

{% highlight html %}
<script id="my-template" type="x-template"></script>
{% endhighlight %}

By setting the mime type to `type="x-template"`, the browser doesn't know how to handle
the script...so it just ignores it. This is great because you can insert any HTML you want
 inside without the browser ever serving your code. Then, you can
extract it later to generate HTML template snippets.

As I stated above, the concatenation method is great for smaller templates and the
method below may look like overkill... but when you are dealing with larger full page
templates, this can really come in handy.


**index.html**
{% highlight html %}
<ul id="list"></ul>

<!--Our template placed somewhere in our HTML-->
<script id="my-template" type="x-template">
	<li>
		<span class="movie-name"></span>
		<span class="movie-rating"></span>
	</li>
</script>
{% endhighlight %}

**script.js**
{% highlight js %}

// Simple array of movies
var movies = [
	{ "name" : "Inception", "rating": "4" },
	{ "name" : "Goodfellas", "rating": "5" },
	{ "name" : "Fight Club", "rating": "4" },
];

// Loop through the movie array and append each list item
movies.forEach(function(movie) {

    var template = document.getElementById("my-template").innerHTML,
    	el = document.createElement('li');

    el.innerHTML = template;

    el.getElementsByClassName("movie-name")[0].innerHTML += movie.name;
    el.getElementsByClassName("movie-rating")[0].innerHTML += movie.rating;

    document.getElementById("list").appendChild(el);
});

{% endhighlight %}

---

## Further Reading & Resources

* [Mozilla MDN - Javascript templates](https://developer.mozilla.org/en-US/docs/JavaScript_templates)
* [JavaScript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/)
* [Javascript Template Chooser](http://garann.github.io/template-chooser/)
