#Introduction
**WheelMenu** is a circular menu aimed at mobile that allows you to quickly select from a small set of options quickly and with your thumb.

You can see an example of the **WheelMenu** running in [jsFiddle](http://jsfiddle.net/RodrigoSC/8aHSf/embedded/result/).

Right now the menu only works for 6 slices, but [let me know](https://github.com/RodrigoSC/WheelMenu/issues) if you need other number of slices.

Credits to the **WheelMenu** design go to [Tiago Simões](https://plus.google.com/u/1/113199224625543479193/posts). 

#Using the menu

## Running the example
If you have [npm](https://npmjs.org/) and [bower](http://bower.io/), just clone the repository

    git clone https://github.com/RodrigoSC/WheelMenu.git
    
Install dependencies:

    npm install
    bower install
    
And run the server:

	grunt
	
You can now access `http://localhost:9000` and play with the **WheelMenu**. Edit the `index.html` file to see what's going on.

### If you don't have *npm* and *bower*
To use the menu you must first get [jQuery](http://jquery.com/) and [d3.js](http://d3js.org/).

Reference jQuery and D3 from the `index.html` and make the file available on your favorite web server. If you access the file directly, you'll see a bunch of squares instead of the proper icons.


## Creating a new menu
To create a new instance of the menu, insert a `div` somewhere in your page with an id:

	<div id='myMenu'></div>
	
You can style the `div` however you like, including setting the width. The **WhellMenu** will adapt accordingly.

Next, create an instance of the menu by doing:

	menu = new wheelMenu('#myMenu', 1, 'Hello!', ['\uf001','\uf015','\uf0fa','\uf072','\uf07a','\uf0f5']);

Here's what this does:

* `#myMenu`: This is the ID of the div where the menu will be drawn;
* `1`: This is the selected slice of the menu. The top most slice is `0` and it counts clockwise;
* `Hello!` is the text that appears in the center of the menu;
* `['\uf001', ... ,'\uf0f5']` are the characters to be displayed on the menu. By default the menu is using [Font Awesome](http://fontawesome.io/), and you can see here a [cheat sheet](http://fontawesome.io/cheatsheet/) of the icons.

## Javascript API
Assuming you've created a `menu`variable like explained in the previous section, here are some things you can do with it:

### onSelect
Whenever a user selects a slice, the `onSelect` event is triggered. You can trap it by doing something like:

	menu.onSelect = function(slice) {
		console.log('Slice ' + slice + ' was selected!');
	};

### setText
You can set the center text at any time by invoking `setText`.

	menu.setText('Hello there!');
	
The **WheelMenu** will adapt the size of the text to fit the inner area.

### spin
You can do a "wheel of fortune" type of effect by invoking the `spin` function. It takes 2 arguments, the approximate number of selects and the resulting selection.

	menu.spin(70, 3);

The wheel will spin a few times until slice 3 is selected. It will use quadratic ease out, just because it looks cool. :) 

#Future work

Want to help with the `WheelMenu`? Here are some ideas:

* Allow an arbitrary number of slices.
* Make the center selection circle of the path, so that the selection can have a shadow or stroke.
* Get rid of jQuery. D3 should be enough.