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
			elements = elements("pioner-repeat")

			# repeat elements по количеству пунктов в json
			for x in [0...elements.length] by 1
				element = elements[x]
				for y in [0...json.length] by 1
					# создать копию элемента
					copy = element.cloneNode(true)
					regular = new RegExp(/{{[^{]+}}/g)
					changesList = copy.outerHTML.match(regular)
					# Наполняем текстом новый элемент
					for z in [0...changesList.length] by 1
						whatToChange = changesList[z].slice(2, changesList[z].length - 2)
						regular2 = new RegExp ("{{" + whatToChange + "}}")
						copy.innerHTML = copy.innerHTML.replace(regular2, json[y][whatToChange])
					# вставляем новый узел после оригинала
					element.parentNode.insertBefore(copy, element)

		loadJSON()
	render: (newBody) ->
		console.log("i am a render")
		document.body.innerHTML = newBody



		# repeatElement()


# pioner.template("header", "header.html")
# pioner.template("footer", "footer.html")