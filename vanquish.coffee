# vanquish

vanquishVersion = 0.1

defaultFolder = ""

elementsForReplace = document.body.outerHTML.match(/@{.+?}/g)

template = (element, template) ->

	reqListener = ->
		console.log(elementsForReplace)

		output = document.getElementById(element)
		output.innerHTML = this.responseText

	templateFile = new XMLHttpRequest()
	templateFile.open("get", defaultFolder + template , true)
	templateFile.send()
	templateFile.onload = reqListener


defaultFolder = "templates/"

template("header", "header.html")
template("footer", "footer.html")