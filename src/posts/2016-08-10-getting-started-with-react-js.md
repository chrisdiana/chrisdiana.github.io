---
layout: post
title: Getting Started with React.js - Concepts and Creating Your First App
comments: true
tags: [javascript, react.js, virtual dom, jsx, flux]
---

React.js is all the rage these days...and there's good reason. Here's a quick
tutorial to get you up and running with this great JS framework.

---

## What is React.js?

React.js is a Javascript library used for creating User Interfaces released by the creators of Facebook.
React was built to solve one huge problem that anyone who has used Javascript extensively has come across at one point or another:

>Building applications with data that changes over time

Simply put, React will update the UI to reflect any new underlying data changes.
It essentially "refreshes" the UI and knows to only update the new stuff. This is
done using a special diff algorithm (kind of like how Git works) to see what has changed
and what needs updated. In addition, React uses a Flux architecture pattern *(more on this later)* to allow for one-way reactive data flow.

---

## A Different Way of Thinking with React

If we want to understand how React works, we need to understand what the DOM is.
When we visit a website, our browser renders the source code of our HTML document.
We use the **DOM (Document Object Model)** as an API to interact with the HTML document.
The DOM is a fully object-oriented representation of this document as a structured group
of nodes and objects that have properties and methods. It is essentially the connection
between a web document (HTML) and a script (JavaScript).

React.js creates something called a **Virtual DOM** which is an in-memory representation of the DOM (like a snapshot).
React's Virtual DOM is much lighter than the real browser DOM so manipulation with Virtual DOM is faster and more efficient.
Because of this, React can quickly diff *(check for differences)* the current state of the UI with the desired state and compute the minimal set of DOM mutations.
*This golden concept is exactly how React "refreshes" the UI and knows to only update the new stuff*.

---

## Terms to Know


**Virtual DOM**

An in-memory representation of the DOM. React manipulates this in order to
quickly diff the current state of the UI.

---

**JSX**

JSX is an inline markup that looks like HTML and gets transformed to JavaScript.
A JSX expression starts with an HTML-like open tag, and ends with the corresponding closing tag.
JSX tags support the XML self close syntax so you can optionally leave the closing tag off.

You can definitely use React without JSX but JSX makes React a lot more elegant.
Just like XML, JSX tags have a tag name, attributes, and children. Here's a quick example:


Without JSX, the React code would look like

{% highlight js %}
render: function() {
	return (
		React.createElement(
			'div',
			{className: "commentBox"},
			"Hello, world! I am a CommentBox."
		)
	);
}
{% endhighlight %}

This is *with* JSX

{% highlight js %}
render: function() {
	return (
		<div className="commentBox">
			Hello, world! I am a CommentBox.
		</div>
	);
}
{% endhighlight %}

---

**Flux**

*Flux* or *Flux Architecture* is a concept/pattern, not a library or framework. The Flux pattern utilizes unidirectional reactive data flow as seen below.

![Flux Architecture](https://github.com/facebook/flux/raw/master/docs/img/flux-diagram-white-background.png)

This chart may look a bit confusing so let's break it down:

1. Your view triggers an event (i.e. a user types text into a form input field)
2. The event triggered by the view updates a model
3. This model then triggers another event
4. Finally, the view responds to that model's event by re-rendering with the latest data

This type of pattern is designed to guarantee your stores/models always have the right data.

---

**React.js**

This is the actual Javascript library. React's code is structured in a Flux pattern (as described above). There are 3 main concepts that makeup React:

1. Components
2. Properties
3. State

---

**React Components**

Components are the smallest, yet most fundamental part of React. They’re similar, in concept, to things like widgets and modules. Think of React components in terms of the smallest possible components that you can define.

A React component can maintain internal state data. This can be thought as similar to data-binding (think AngularJS/Ember.js). When a component's state data changes, the rendered markup will be updated.

Here's an example of a basic component:

{% highlight js %}

// This is our React component
var HelloWorld = React.createClass({
  render : function() {
    return <div>Hello World!</div>;
  }
});

// We then render the component later
React.renderComponent(
  <HelloWorld />,
  document.body
);
{% endhighlight %}

---

**React Properties**

Properties are to React components what attributes are to HTML elements. We can change the behavior based on external information

{% highlight js %}

// This code will grab the attribute 'name' and output
// 'Hello Chris'
var InterfaceComponent = React.createClass({
  render : function() {
    return <div>Hello {this.props.name}!</div>;
  }
});

React.renderComponent(
  <InterfaceComponent name="Chris" />,
  document.body
);
{% endhighlight %}

---

**React State**

Like React properties, state affects how a component behaves and renders. Properties are defined when components are created. State, on the other hand, is only seen on the inside of component definitions.

When you think of properties, you should be thinking of component initialization. When you think of state, you should think of an internal data-set which affects the rendering of components.

Take a look at an example:

{% highlight js %}

// Our components initial state is set to have
// '{name: Chris, job: Dev }'. When this component is
// rendered it will return 'My name is Chris and I am a Dev'
var InterfaceComponent = React.createClass({
  getInitialState : function() {
    return {
      name : "Chris",
      job  : "Dev"
    };
  },
  render : function() {
    return <div>
      My name is {this.state.name}
      and I am a {this.state.job}.
    </div>;
  }
});

// Here we render our component to the document's body
React.renderComponent(
  <InterfaceComponent />,
  document.body
);
{% endhighlight %}

---


# Enough talk. GIVE ME CODE!!!

### A Basic React App

Let's build a quick little React app to get a better understanding of how everything works.
We will be building a simple Todo App...suprise!

**1. Setup**

Let's start off with this basic HTML boilerplate:

*index.html*

{% highlight html %}
 <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>React Todo App</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react-dom.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    </head>
    <body>
    <div id="content"></div>
    <script type="text/babel" src="script.js"></script>
    </body>
</html>
{% endhighlight %}

Notice the "text/babel" instead of "text/javascript" in the link to the `script.js` which we are using. Babel is the Javascript complier we are using to allow us to write in JSX instead of plain Javascript. Now that the foundation is set, let's get to the React code. Create a file called `script.js` and open that open. The rest of the following code will be going into this file.

---

**2. Our First React Component**

Let's start off by creating our first React component. We do this by using the `React.createClass()` method.
This first component will be our main application. You can create the component by using the `createClass()` method.

*script.js*

{% highlight js %}
var TodoApp = React.createClass({

});
{% endhighlight %}

Inside our TodoApp, we are first going to call React's `getInitialState` method. This is where we tell React to set the initial state of our application.
In this function, we will return an empty array of items. That will the starting state of our todo items.

{% highlight js %}
var TodoApp = React.createClass({

	getInitialState: function() {
		return { items: [], text: '' };
	},

});
{% endhighlight %}


Just below `getInitialState`, we are going to add an `onChange` method.
This function watches for any UI changes (value input, checked checkboxes, selected option). Each time the UI is changed, we will set the React state based on our input.

{% highlight js %}
var TodoApp = React.createClass({

	getInitialState: function() {
		return { items: [], text: '' };
	},

	onChange: function(e) {
		this.setState({ text: e.target.value });
	},

});
{% endhighlight %}


Next, we will add the `handleSubmit` function just below `onChange`. This function will handle our form submit.
First, we prevent the default submit event.
Then, we set a `nextItems` variable where we grab the item text from the `onChange` function along
with setting an `id` using the current date. After, we set the `nextText` to empty to set it up for the next entry.
Finally, we use the `setState` function to merge current and previous states and prepare for a new entry.

{% highlight js %}
handleSubmit: function(e) {

	e.preventDefault();

	var nextItems = this.state.items.concat([{
		text: this.state.text,
		id: Date.now()
	}]);

	var nextText = '';

	this.setState({
		items: nextItems,
		text: nextText
	});
},
{% endhighlight %}


The last thing we are going to do to complete our main component `TodoApp` is add a `render` function
which returns a tree of React components which will eventually render to HTML.
Take note of a few things: First, notice since we are using JSX, instead of using the standard `<div class="row">` we have to use `<div className="row">`. Also notice we are referencing our previous functions inside our returned view. On our form submit we call the `handleSubmit` function and when there is UI changes to the form input, we call the `onChange` function.

{% highlight js %}
render: function() {
	return (
		<div>
			<div className="row">
				<div className="four columns">
					<form onSubmit={this.handleSubmit}>
						<input className="u-full-width" type="text" onChange={this.onChange} value={this.state.text} />
						<button className="button-primary">Add +</button>
					</form>
				</div>
				<div className="eight columns">
					<TodoList items={this.state.items} />
				</div>
			</div>
		</div>
	);
{% endhighlight %}

We have a form to input information and handle the events, but still nowhere to render the actual list.
Notice the `<TodoList items={this.state.items} />` node.
This is where we will be calling another React component that will handle rendering list items.
What we are basically doing is calling one component inside of another. React encourages "smallest possible components that you can define". Since each component can be isolated, fixes can be applied to one component without inherently affecting the others.

Next, let's build our `TodoList` component. This will handle rendering the actual list. We will be placing this code outside of our `TodoApp` component, just above it:

{% highlight js %}

var TodoList = React.createClass({
	render: function() {
		var createItem = function(item) {
			return <li key={item.id}>{item.text}</li>;
		};
		return <ul>{this.props.items.map(createItem)}</ul>;
	}
});

{% endhighlight %}

Here we are creating a list item for each todo list item and then returning those inside of an unordered list element. Notice we are referencing the React properties by using `this.props` to get the items from attribute `items` in our `TodoApp.render()` method (`<TodoList items={this.state.items} />`).


The last step in our app is to render it all to our real DOM. We will call `ReactDOM.render()` method along with our main app and a place for it to go. In this example, we want to render it to `<div id="content"></div>`.


{% highlight js %}
ReactDOM.render(
	<TodoApp />,
	document.getElementById('content')
);
{% endhighlight %}


And there we have it! Our first React app. Once you get your head around all the terminology and concepts,
React is an incredible tool for both large and small applications.

You can download the full annotated code for this tutorial [here on Github](https://github.com/codoki/react-todo)

![React Todo App Demo Screenshot](https://raw.githubusercontent.com/codoki/codoki.github.io/master/public/img/tuts/react-todo.png)

---

## React.js VS AngularJS?

There is an ongoing "debate" taking place between the 2 juggernauts AngularJS and React.js in the Javascript
framework universe on which is best. Angular as you may know is supported by Google while React is backed by Facebook.
What is the main difference between React.js and AngularJS?
There is alot of *"Angular vs React"* going around the net, but comparing them
is similar to comparing a brand new car (Angular) to a brand new engine (React).

**AngularJS**

* A Front-end full [MVC Framework](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).
* Uses HTML, CSS and Javascript code.

**React.js**

* A *View* Framework. The V in M**V**C.
* Uses just Javascript code with a special syntax called *JSX* which allows you
to use HTML in your Javascript.

So React.js is like a engine while AngularJS is the entire car. Since React is just the
*V* of MVC you could technically use React.js *with* AngularJS, substituting AngularJS views
for that of React.js (take a look at one example [here](https://github.com/ngReact/ngReact)).

---

## Other Things You Can Do With React - *React Native*

Now that you understand the fundamentals of React, you can use your newfound knowledge
to actually build *Native Mobile* apps! Facebook has also released a great library called
[React Native](https://facebook.github.io/react-native/) which allows you to use React.js
in order to build apps on native platforms such as iOS and Android. This means you can use
all of the same concepts across multiple platforms.
Take a deeper look [here](http://facebook.github.io/react-native/docs/getting-started.html).

## References

* [React.js](https://facebook.github.io/react/index.html)
* [React.js - Github](https://github.com/facebook/react)
* [AngularJS](https://angularjs.org/)
* [Built with React](http://buildwithreact.com/tutorial/jsx)
* [React Native](https://facebook.github.io/react-native/)
* [React Native - Github](https://github.com/facebook/react-native)
* [React Native Playground](https://rnplay.org/)
* [DOM - Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
* [The Secret's of React's Virtual DOM](http://conferences.oreilly.com/fluent/fluent2014/public/schedule/detail/32395)
* [React for Stupid People](http://blog.andrewray.me/reactjs-for-stupid-people/)
* [React Tutorials](https://medium.com/react-tutorials)

---

Suggestions or edits? Feel free to submit a pull request with your
edit on [Github](https://github.com/codoki/codoki.github.io/tree/master/_posts)


