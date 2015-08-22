app = 

	template: (element ,template) ->

		reqListener = ->
			bodyText = document.body.outerHTML
			elementForReplace = bodyText.match(/@{.+?}/g)
			console.log(elementForReplace)
			output = document.getElementById(element)
			output.innerHTML = this.responseText

		templateFile = new XMLHttpRequest()
		templateFile.open("get", template , true)
		templateFile.send()
		templateFile.onload = reqListener

	repeat: (bd) ->

		# Загрузка json
		xmlhttp = new XMLHttpRequest()
		url = bd
		repeatList

		xmlhttp.onreadystatechange = ->

			if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				JSONArr = JSON.parse(xmlhttp.responseText)
				repeatList = JSONArr
				# Вызов функции
				repeat(repeatElement)

		xmlhttp.open("GET", url, true)
		xmlhttp.send()

		# Нахождение нужного нам тега для его повторения
		repeatElement = document.querySelectorAll('[repeat]')

		repeat = (repeatElement) ->

			for i in [0...repeatElement.length] by 1
				# Определение родителя элемента куда будут вставляться теги и название тега его название тега
				item = repeatElement[i]
				repeatElementTagName = repeatElement[i].nodeName
				# Находит название того, что нужно повторять, но с одной кавычкой в начале
				itemInText = item.outerHTML.match(/".+?(?=")/g).toString()
				# убирает кавычку в начале
				textInsideRepeatSelector = itemInText.substring(1, itemInText.length)

