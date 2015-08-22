# pioner

vanquishVersion = 0.1

this.pioner =
	defaultFolder: (folder) ->
		return folder

	getFile: (template) ->
		defaultFolder = this.defaultFolder

		templateFile = new XMLHttpRequest()
		templateFile.open("get", defaultFolder + template , false)
		templateFile.send(null)

		return templateFile.responseText

	template: (element, template) ->
		file = this.getFile(template)

		bodyText = document.body.outerHTML
		# regular = /@{.+?}/g
		regular = new RegExp("@{#{element}?}")
		newBody = bodyText.replace(regular, file)
		document.body.innerHTML = newBody

	repeat: (bd) ->
		# Загрузка json
		loadJSON = ->
			req = new XMLHttpRequest()
			url = bd
			req.open('GET', bd, false)
			req.send(null)
			if(req.status == 200)
				console.log("JSON success load!!!")
			json = JSON.parse(req.responseText)
			repeatElement(json)
			return json

		repeatElement = (json) ->
			repeatElement = document.querySelectorAll('[repeat]')
			repeatList = json
			for i in [0...repeatElement.length] by 1

				# Определение родителя элемента куда будут вставляться теги и название тега его название тега
				item = repeatElement[i]
				repeatElementTagName = repeatElement[i].nodeName
				parent = item.parentNode
				# Находит название того, что нужно повторять, но с одной кавычкой в на
				itemInText = item.outerHTML.match(/".+?(?=")/g).toString()
				# убирает кавычку в начале
				textInsideRepeatSelector = itemInText.substring(1, itemInText.length)

				for _i in [0...repeatList.length] by 1
					# Элемент который указан для повтора получает первое значение
					item.innerText = repeatList[0][textInsideRepeatSelector];
					# Создаются другие элементы эквивалентные по типу указанному в HTML
					node = document.createElement(repeatElementTagName);
					textnode = document.createTextNode(repeatList[_i][textInsideRepeatSelector])
					node.appendChild(textnode)
					parent.appendChild(node)

		loadJSON()
		repeatElement()


# pioner.template("header", "header.html")
# pioner.template("footer", "footer.html")