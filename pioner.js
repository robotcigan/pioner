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
      var loadJSON, repeatElement;
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
        repeatElement(json);
        return json;
      };
      repeatElement = function(json) {
        var _i, i, item, itemInText, j, node, parent, ref, repeatElementTagName, repeatList, results, textInsideRepeatSelector, textnode;
        repeatElement = document.querySelectorAll('[repeat]');
        repeatList = json;
        results = [];
        for (i = j = 0, ref = repeatElement.length; j < ref; i = j += 1) {
          item = repeatElement[i];
          repeatElementTagName = repeatElement[i].nodeName;
          parent = item.parentNode;
          itemInText = item.outerHTML.match(/".+?(?=")/g).toString();
          textInsideRepeatSelector = itemInText.substring(1, itemInText.length);
          results.push((function() {
            var k, ref1, results1;
            results1 = [];
            for (_i = k = 0, ref1 = repeatList.length; k < ref1; _i = k += 1) {
              item.innerText = repeatList[0][textInsideRepeatSelector];
              node = document.createElement(repeatElementTagName);
              textnode = document.createTextNode(repeatList[_i][textInsideRepeatSelector]);
              node.appendChild(textnode);
              results1.push(parent.appendChild(node));
            }
            return results1;
          })());
        }
        return results;
      };
      loadJSON();
      return repeatElement();
    }
  };

}).call(this);

