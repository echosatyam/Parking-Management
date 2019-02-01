// function checkForm(form) {
//   var pass = document.getElementById('passCheck');
//   var str = '';
//   pass.innerHTML = str;
//   if (form.username.value == "") {
//     str = "Error: Username cannot be blank!";
//     pass.innerHTML = str;
//     form.username.focus();
//     return false;
//   }
//   re = /^\w+$/;
//   if (!re.test(form.username.value)) {
//     str = "Error: Username must contain only letters, numbers and underscores!";
//     form.username.focus();
//     pass.innerHTML = str;
//     return false;
//   }

//   if (form.password.value != "" && form.password.value == form.confirmPassword.value) {

//     if (form.password.value.length < 6) {
//       str = "Error: Password must contain at least six characters!";
//       pass.innerHTML = str;
//       form.password.focus();

//       return false;
//     }
//   } else {
//     if (form.password.value == "") {
//       str = "Error: Enter a Password!";
//     } else if (form.password.value != form.confirmPassword.value) {
//       str = "Error: Please check that you confirmed your password!";
//     }
//     pass.innerHTML = str;
//     form.password.focus();
//     return false;
//   }

//   return true;
// }