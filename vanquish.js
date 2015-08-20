(function() {
  var defaultFolder, elementsForReplace, template, vanquishVersion;

  vanquishVersion = 0.1;

  defaultFolder = "";

  elementsForReplace = document.body.outerHTML.match(/@{.+?}/g);

  template = function(element, template) {
    var reqListener, templateFile;
    reqListener = function() {
      var output;
      console.log(elementsForReplace);
      output = document.getElementById(element);
      return output.innerHTML = this.responseText;
    };
    templateFile = new XMLHttpRequest();
    templateFile.open("get", defaultFolder + template, true);
    templateFile.send();
    return templateFile.onload = reqListener;
  };

  defaultFolder = "templates/";

  template("header", "header.html");

  template("footer", "footer.html");

}).call(this);

