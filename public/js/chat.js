
$(document).ready(function() {
	var messageForm;
	var message;
	var chat;
	var username;
	var socket;
	var user;
	var contentLine;
	var timerHandle;
	var focused = true;

	bindDOM();
	initChat();

	// bind DOM components
	function bindDOM() {
		messageButton = $('#message_button');
		message = $('#message_input');
		chat = $('#chat_content');
		users = $('#chat_user_list');
		username = $('#username');
	}

	// update vertical scronllbar
	function updateScroll(scroll) {
	    var element = document.getElementById(scroll);
	    element.scrollTop = element.scrollHeight;
	}	

	// replace url with html links
	function replaceURLWithHTMLLinks(text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
    }

    // play sound
	function playSound() {
		$('#player').get(0).pause();
		$('#player').get(0).currentTime = 0;
		$('#player').get(0).play();
	}

	// if window is focused
	window.onfocus = function() {
	    focused = true;
	};

	// if windows is not focused
	window.onblur = function() {
	    focused = false;
	};

	// init chat
	function initChat() {
		socket = io.connect();
		socket.emit('connect' , { username: username.html() });
	}

	// title flicking
	function titleFlick() {
		if (document.title === 'ChatServer') {
			document.title = '.:NEW MESSAGE:.';
		} else {
			document.title = 'ChatServer';
		}

		// if window is focused then diable timer		
		if (focused === true) {
			clearInterval(timerHandle);
			document.title = 'ChatServer';
		}
	}

	// enter button trigger
	$("#message_input").keyup(function(e){
    	if(e.keyCode == 13) {
    		messageButton.trigger('click');
    	}
	});

	// send message
	messageButton.click(function(e) {
		if (message.val() !== '') {
			socket.emit('message' , { message: message.val() });
			message.val('');
		}
	});

	// callback for new user
	socket.on('new_user', function(data) {
		// delete actual users
		$('.chat_user_item').remove();

		// add existied users
		for (var i = data.users.userlist.length - 1; i >= 0; i--) {
			user = $('<div class="chat_user_item">' + data.users.userlist[i].username + '</div>');
			users.append(user.fadeIn());
		}

		// Set scroll position
		updateScroll("chat_user_list");
		
		// add message
		contentLine = $('<div class="chat_content_line3">' + data.username + ' has joined the conversation...</div>');
		chat.append(contentLine.fadeIn());
		// Set scroll position
		updateScroll("chat_content");
	});

	// callback for new message
	socket.on('new_message', function(data) {
		// check if is my own message or of other client
		if (data.username === username.html())
			contentLine = $('<div class="chat_content_line">' + data.username + ': ' + replaceURLWithHTMLLinks(data.message) + '</div>');
		else 
			contentLine = $('<div class="chat_content_line2">' + data.username + ': ' + replaceURLWithHTMLLinks(data.message) + '</div>');

		// add message
		chat.append(contentLine.fadeIn());
		// Set scroll position
		updateScroll("chat_content");
		// play sound when message received
		playSound();

		// check if window is focused, if not, then start flick title
		if (!focused)
			timerHandle = setInterval(function() { titleFlick() }, 1000);
	});

	// callback for user disconnection
	socket.on('disconnect_user', function(data) {
		// add user disconnect message
		contentLine = $('<div class="chat_content_line3">' + data.username + ' has left the conversation...</div>');
		chat.append(contentLine.fadeIn());
		// Set scroll position
		updateScroll("chat_content");

		// list userlist and delete the disconnected user
		$(".chat_user_item" ).each(function(index) {
			if ($(this).text() === data.username) {
				$(this).fadeOut(function() {
    				$(this).remove();
    				return false;
  				});
			}
	    });

		// Set scroll position
	    updateScroll("chat_user_list");
	});
});

	