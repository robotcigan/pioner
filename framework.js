var app = {


	template: function(element ,template) {

		function reqListener () {
			var bodyText = document.body.outerHTML;
			elementForReplace = bodyText.match(/@{.+?}/g);
			console.log(elementForReplace)
			// for (var i = 0; i < elementForReplace.length; i++) {
			// 	elementForReplace[i] = elementForReplace[i].substring(2, elementForReplace[i].length);
			// };
			var output = document.getElementById(element);
			output.innerHTML = this.responseText;
		}

		var templateFile = new XMLHttpRequest();
		templateFile.open("get", template , true);
		templateFile.send();
		templateFile.onload = reqListener;

	},
	repeat: function(bd) {

		// Загрузка json
		var xmlhttp = new XMLHttpRequest();

		var url = bd;
		var	repeatList;

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var JSONArr = JSON.parse(xmlhttp.responseText);

				repeatList = JSONArr;
				// Вызов функции
				repeat(repeatElement);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();

		// Нахождение нужного нам тега для его повторения
		var repeatElement = document.querySelectorAll('[repeat]');

		function repeat( repeatElement ){

			for (var i = 0; i < repeatElement.length; i++ ) {

				// Определение родителя элемента куда будут вставляться теги и название тега его название тега
				var item = repeatElement[i],
					repeatElementTagName = repeatElement[i].nodeName,
					parent = item.parentNode,
					 // Находит название того, что нужно повторять, но с одной кавычкой в начале
					itemInText = item.outerHTML.match(/".+?(?=")/g).toString(),
					// убирает кавычку в начале
					textInsideRepeatSelector = itemInText.substring(1, itemInText.length);

				for (var _i = 0; _i < repeatList.length - 1; _i++) {

					// Элемент который указан для повтора получает первое значение
					item.innerText = repeatList[0][textInsideRepeatSelector];

					// Создаются другие элементы эквивалентные по типу указанному в HTML
					var node = document.createElement(repeatElementTagName);
					var textnode = document.createTextNode(repeatList[_i + 1][textInsideRepeatSelector]);
					node.appendChild(textnode);
					parent.appendChild(node);

				};

			}

		}

	}


}

var template = app.template,
	repeat = app.repeat;

function obj(selector){
	var element = document.querySelectorAll(selector);
	return element;
}

// console.log(obj('.output'));	

// output = document.getElementsByClassName('output')[0];

// input.addEventListener('keyup', function(){
// 	output.innerHTML = this.value.replace(
// 		/\{\{(\w*)\}\}/g, "$1"
// 	);
// }, false)
// function replaceBrackets(){
// 	console.log( document.body.outerHTML.replace(
// 		/\{\{(\w*)\}\}/g, "$1"
// ))};

// replaceBrackets();

	
