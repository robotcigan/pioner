(function() {
  var pionerVersion;

  pionerVersion = 0.1;

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
      var elements, loadJSON, repeatElements, textToElement;
      loadJSON = function() {
        var json, req;
        req = new XMLHttpRequest();
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
        var changesList, copy, element, j, k, l, ref, ref1, ref2, regular, regular2, results, whatToChange, x, y, z;
        elements = elements("pioner-repeat");
        results = [];
        for (x = j = 0, ref = elements.length; j < ref; x = j += 1) {
          element = elements[x];
          for (y = k = 0, ref1 = json.length; k < ref1; y = k += 1) {
            copy = element.cloneNode(true);
            regular = new RegExp(/{{[^{]+}}/g);
            changesList = copy.outerHTML.match(regular);
            for (z = l = 0, ref2 = changesList.length; l < ref2; z = l += 1) {
              whatToChange = changesList[z].slice(2, changesList[z].length - 2);
              regular2 = new RegExp("{{" + whatToChange + "}}");
              copy.innerHTML = copy.innerHTML.replace(regular2, json[y][whatToChange]);
            }
            element.parentNode.insertBefore(copy, element);
          }
          results.push(element.parentNode.removeChild(element));
        }
        return results;
      };
      textToElement = function() {};
      return loadJSON();
    },
    render: function(newBody) {
      console.log("i am a render");
      return document.body.innerHTML = newBody;
    }
  };

}).call(this);

