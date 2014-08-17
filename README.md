message-handler-js
==================

###Current Version: v1.0.1

A basic jQuery plugin to manage and display messages inside a DOM element with states. This can be useful in co-ordination with another script which can use this plugin to provide a consistent mechanism of sending messages back to a user.

```html
<html>
<head><title></title></head>
  <body>
    <div id="message"></div>
  </body>
</html>
```

### Initialize
The DOM element needs to first be initialized with the jQuery plugin before the other functions become available.
```javascript
$("#message").gs_message_handler();
```

### Set
A message can be set here along with a type. Valid types are: ```success``` ```warning``` ```danger``` ```info```
This would create a child div with class .gs-message which would contain the message and a corresponding styling class based on the type specified.
```javascript
// set message and type
$("#message").gs_message_handler('set', {message: 'In Progress', type: 'warning'});
// set message, type and timeout
// if a timeout is specified, the message will auto clear after the specified time
$("#message").gs_message_handler('set', {message: 'Done!', type: 'succes', timeout: 500});
```

### Status
If no messages are active, the return value will be null.
```javascript
 var messageType = $("#message").gs_message_handler('status');
 console.log("Current message type is: " + messageType);
```

### Clear
Calling this function sets null on both the message and the type and also clears the html of the div.
```javascript
 $("#message").gs_message_handler('clear');
```

### Destroy
This destroys the plugin on the element.
```javascript
 $("#message").gs_message_handler('destroy');
```

### License
The MIT License

Copyright (c) 2013-2014 Garagesocial, Inc. http://garagesocial.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
