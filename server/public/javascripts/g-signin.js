function signInCallback(authResult) {
  if (authResult.code) {
    $.post('/auth/google/callback', { code: authResult.code})
    .done(function(data) {
      $('#signinButton').hide();
    }); 
  } else if (authResult.error) {
    console.log('There was an error: ' + authResult.error);
  }
};