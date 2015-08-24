(function() {

	// pioner.repeat('bd.json');
	pioner.defaultFolder = "templates/";

	pioner.template("header", "header.html");
	pioner.template("footer", "footer.html");

	pioner.repeat('bd-posts.json');

}());
