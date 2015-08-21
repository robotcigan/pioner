# vanquish

vanquishVersion = 0.1

defaultFolder = ""


pioner =
	getFile: (template) ->
		templateFile = new XMLHttpRequest()
		templateFile.open("get", defaultFolder + template , false)
		templateFile.send()
		return templateFile.responseText

	template: (element, template) ->
		file = this.getFile(template)

		bodyText = document.body.outerHTML
		# regular = /@{.+?}/g
		regular = new RegExp("@{#{element}?}")
		newBody = bodyText.replace(regular, file)
		document.body.innerHTML = newBody


defaultFolder = "templates/"

pioner.template("header", "header.html")
pioner.template("footer", "footer.html")