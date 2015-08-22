(function() {
  var app;

  app = {
    template: function(element, template) {
      var reqListener, templateFile;
      reqListener = function() {
        var bodyText, elementForReplace, output;
        bodyText = document.body.outerHTML;
        elementForReplace = bodyText.match(/@{.+?}/g);
        console.log(elementForReplace);
        output = document.getElementById(element);
        return output.innerHTML = this.responseText;
      };
      templateFile = new XMLHttpRequest();
      templateFile.open("get", template, true);
      templateFile.send();
      return templateFile.onload = reqListener;
    },
    repeat: function(bd) {
      var repeat, repeatElement, url, xmlhttp;
      xmlhttp = new XMLHttpRequest();
      url = bd;
      repeatList;
      xmlhttp.onreadystatechange = function() {
        var JSONArr, repeatList;
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          JSONArr = JSON.parse(xmlhttp.responseText);
          repeatList = JSONArr;
          return repeat(repeatElement);
        }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
      repeatElement = document.querySelectorAll('[repeat]');
      return repeat = function(repeatElement) {
        var i, item, itemInText, j, ref, repeatElementTagName, results, textInsideRepeatSelector;
        results = [];
        for (i = j = 0, ref = repeatElement.length; j < ref; i = j += 1) {
          item = repeatElement[i];
          repeatElementTagName = repeatElement[i].nodeName;
          itemInText = item.outerHTML.match(/".+?(?=")/g).toString();
          results.push(textInsideRepeatSelector = itemInText.substring(1, itemInText.length));
        }
        return results;
      };
    }
  };

}).call(this);

