
function submitOnclick() {

	sessionStorage.clear();
	var username = document.getElementById("inputUser").value;
	var password = document.getElementById("inputPassword").value;
	sessionStorage.clear();

	var ref = firebase.database().ref('user/'+username);
	ref.on("value", function(snapshot) {
		var password2 = snapshot.child("password").val();
		var role = snapshot.child("role").val();
		console.log(role);
		if (password == password2) {
			sessionStorage.setItem("username", username);
			if (role == 'admin') {
				window.location.href = "admin.html";
			}else{
				window.location.href = "label.html";
			}
			
		}else{
			alert("Wrond username or password");
			window.location.href = "login.html";
		}
	});

}