table = document.getElementById('the-table')

function appendReportEntry(table, params) {
	tr = document.createElement("tr")
	tr.className = "report-entry"
	
	classes = ['project', 'activity', 'from', 'to', 'note']
	classes.forEach(function(entry) {
		td = document.createElement("td")
		td.className = entry
		td.innerHTML = params[entry]
		tr.appendChild(td)
	});

	edit_td = document.createElement("td")
	edit_td.className = "action-edit hide-text"
	edit_td.innerHTML = "Redigera<i></i>"
	tr.appendChild(edit_td)

	delete_td = document.createElement("td")
	delete_td.className = "action-delete hide-text"
	delete_td.innerHTML = "Ta bort<i></i>"
	delete_td.onclick = function () {
		alert("test")
	}
	tr.appendChild(delete_td)
	
	tbody = document.createElement("tbody")
	tbody.appendChild(tr)
	table.appendChild(tbody)
}

for (i = 0; i < window.localStorage.length; i++) {
	key = window.localStorage.key(i);
	storageItem = JSON.parse(window.localStorage.getItem(key))

	if (storageItem.type == "report-entry") {
		appendReportEntry(table, storageItem.params)
	}
}


function getQueryVariables() {
	var query = window.location.search.substring(1);
  	var vars = query.split("&");
  	var result = {}
  	for (var i=0; i<vars.length; i++) {
    	var pair = vars[i].split("=");
    	result[pair[0]] = pair[1]
  	}
  	return result
}

if (window.location.search) {
	params = getQueryVariables(getQueryVariables)
	appendReportEntry(table, params)

	var storageItem = {};
	storageItem.type = "report-entry"
	storageItem.params = params

	window.localStorage.setItem(index, JSON.stringify(storageItem))
}
