(function() {
  var defaultFolder, pioner, vanquishVersion;

  vanquishVersion = 0.1;

  defaultFolder = "";

  pioner = {
    getFile: function(template) {
      var templateFile;
      templateFile = new XMLHttpRequest();
      templateFile.open("get", defaultFolder + template, false);
      templateFile.send();
      return templateFile.responseText;
    },
    template: function(element, template) {
      var bodyText, file, newBody, regular;
      file = this.getFile(template);
      bodyText = document.body.outerHTML;
      regular = new RegExp("@{" + element + "?}");
      newBody = bodyText.replace(regular, file);
      return document.body.innerHTML = newBody;
    }
  };

  defaultFolder = "templates/";

  pioner.template("header", "header.html");

  pioner.template("footer", "footer.html");

}).call(this);

