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
      return this.render(newBody);
    },
    repeat: function(bd) {
      var elements, loadJSON, repeatElements;
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
      elements = function(selector) {
        var element, i, j, ref, results;
        elements = document.querySelectorAll("[" + selector + "]");
        results = [];
        for (i = j = 0, ref = elements.length; j < ref; i = j += 1) {
          results.push(element = elements[i]);
        }
        return results;
      };
      repeatElements = function(json) {
        var bodyText, copy, element, elementTag, elementText, i, j, jsonPoint, jsonPointRegularResult, k, ref, ref1, regular, results, x;
        elements = elements("pionerRepeat");
        for (x = j = 0, ref = elements.length; j < ref; x = j += 1) {
          element = elements[x];
          elementTag = elements[x].nodeName;
          copy = element.cloneNode(true);
          element.parentNode.insertBefore(copy, element.nextSibling);
        }
        results = [];
        for (i = k = 0, ref1 = elements.length; k < ref1; i = k += 1) {
          elementText = elements[i].outerHTML;
          regular = new RegExp("{{[^{]+}}");
          bodyText = document.body.outerHTML;
          jsonPointRegularResult = bodyText.match(regular).toString();
          jsonPoint = jsonPointRegularResult.slice(2, jsonPointRegularResult.length - 2);
          results.push(document.body.innerHTML = bodyText.replace(regular, json[i][jsonPoint]));
        }
        return results;
      };
      return loadJSON();
    },
    render: function(newBody) {
      console.log("i am a render");
      return document.body.innerHTML = newBody;
    }
  };

}).call(this);

