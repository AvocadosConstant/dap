function render() {

  // Additional params
  var additionalParams = {
    'theme' : 'dark'
  };

  gapi.signin.render('myButton', additionalParams);
}