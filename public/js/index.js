function login() {
    var email = document.getElementById("comp-jsnytca2input").value;
    var password = document.getElementById("comp-jsnyn5qbinput").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        alert(error.message);
    }).then(function(){
        var userId = firebase.auth().currentUser.uid;
        db.collection('users').doc(userId).get().then(function(doc) {
            var role = doc.data().role;
            if (role != "Admin" && role != "Worker" && role != "Customer") {
                alert("An internal error has occured. Please check status.mercyaffordablehousing.tk for more information.");
            } else {
                window.location = ("http://www.mercyaffordablehousing.tk/" + role.toLowerCase() + ".html");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    });
}

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "http://www.mercyaffordablehousing.tk";
    }).catch(function(error) {
        // An error happened.
        alert(error);
    });
}

