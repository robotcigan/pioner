(function() {
  var vanquishVersion;

  vanquishVersion = 0.1;

  this.pioner = {
    defaultFolder: function(folder) {
      return folder;
    },
    getFile: function(template) {
      var defaultFolder, templateFile;
      defaultFolder = this.defaultFolder;
      templateFile = new XMLHttpRequest();
      templateFile.open("get", defaultFolder + template, false);
      templateFile.send(null);
      return templateFile.responseText;
    },
    template: function(element, template) {
      var bodyText, file, newBody, regular;
      file = this.getFile(template);
      bodyText = document.body.outerHTML;
      regular = new RegExp("@{" + element + "?}");
      newBody = bodyText.replace(regular, file);
      return document.body.innerHTML = newBody;
    },
    repeat: function(bd) {
      var element, loadJSON, repeatElements;
      loadJSON = function() {
        var json, req, url;
        req = new XMLHttpRequest();
        url = bd;
        req.open('GET', bd, false);
        req.send(null);
        if (req.status === 200) {
          console.log("JSON success load!!!");
        }
        json = JSON.parse(req.responseText);
        repeatElements(json);
        return json;
      };
      element = function(selector) {
        var elements, i, j, ref, results;
        elements = document.querySelectorAll("[" + selector + "]");
        results = [];
        for (i = j = 0, ref = elements.length; j < ref; i = j += 1) {
          results.push(element = elements[i]);
        }
        return results;
      };
      repeatElements = function(json) {
        var div;
        div = document.createElement('div');
        div.innerHTML = 'Привет, мир!';
        return console.log(element("pionerRepeat"));
      };
      return loadJSON();
    }
  };

}).call(this);

