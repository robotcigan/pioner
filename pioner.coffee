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

		#возвращает полученные шаблон файла в текстовом варианте
		return templateFile.responseText

	template: (element, template) ->
		#выбирает файл для подгрузки шаблона
		file = this.getFile(template)

		bodyText = document.body.outerHTML
		regular = new RegExp("@{#{element}?}")
		newBody = bodyText.replace(regular, file)
		# отправляет новое body для замены в render()
		this.render(newBody)

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
			repeatElements(json)
			return json
		elements = (selector) ->
			elements = document.querySelectorAll("[#{selector}]")
			for i in [0...elements.length] by 1
				element = elements[i]
			# возвращает массив элементов, совпадающих селектору

		repeatElements = (json) ->
			elements = elements("pionerRepeat")

			# repeat elements по количеству пунктов в json
			for x in [0...elements.length] by 1
				element = elements[x]
				# eузнаем тэг элемента
				elementTag = elements[x].nodeName
				# создать копию элемента
				copy = element.cloneNode(true)
				# вставляем новый узел после оригинала
				element.parentNode.insertBefore(copy, element.nextSibling)

			for i in [0...elements.length] by 1
				elementText = elements[i].outerHTML
				regular = new RegExp("{{[^{]+}}")
				bodyText = document.body.outerHTML
				jsonPointRegularResult = bodyText.match(regular).toString()
				jsonPoint = jsonPointRegularResult.slice(2, jsonPointRegularResult.length - 2)
				# производит замену элементов в {{element}}
				document.body.innerHTML = bodyText.replace(regular, json[i][jsonPoint])

		loadJSON()
	render: (newBody) ->
		console.log("i am a render")
		document.body.innerHTML = newBody



		# repeatElement()


# pioner.template("header", "header.html")
# pioner.template("footer", "footer.html")