message-handler-js
==================

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
$("#message").gs_messageHandler();
```

### Set
A message can be set here along with a type. Valid types are: ```success``` ```warning``` ```danger``` ```information```
This would set and display the message 'In Progress' inside the #message div and set the corresponding css styling based on the type.
```javascript
// set message and type
$("#message").gs_messageHandler('set', {message: 'In Progress', type: 'warning'});
// set message, type and timeout
// if a timeout is specified, the message will auto clear after the specified time
$("#message").gs_messageHandler('set', {message: 'Done!', type: 'succes', timeout: 500});
```

### Status
If no messages are active, the return value will be null.
```javascript
 var messageType = $("#message").gs_messageHandler('status');
 console.log("Current message type is: " + messageType);
```

### Clear
Calling this function sets null on both the message and the type and also clears the html of the div.
```javascript
 $("#message").gs_messageHandler('clear');
```

### Destroy
This destroys the plugin on the element.
```javascript
 $("#message").gs_messageHandler('destroy');
```
