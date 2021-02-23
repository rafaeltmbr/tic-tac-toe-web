onload = function () {
	var boxes = document.getElementById("main").children;
	Object.keys(boxes).forEach(function (key) {
		boxes[key].onclick = check;
	});
	//boxes.each(function(box){box.onclick = check;})
};

function check(event) {
	if (typeof check.turn == "undefined" ||
		typeof check.gameRunnig == "undefined" ||
		typeof check.msgvisible == "undefined") {
		check.turn = "X";
		check.gameRunnig = true;
		check.msgvisible = false;
	}

	if (check.msgvisible)
		return;

	if (!check.gameRunnig || !isEmptySquares()) {
		document.getElementsByTagName("title")[0].innerHTML = "Press F5 to restart";
		window.setInterval(blinkMsg, 10);
		check.msgvisible = true;
		return;
	}

	if (event.target.innerHTML == "") {
		event.target.innerHTML = check.turn;
		check.turn = (check.turn == "X") ? "O" : "X";
	}

	if (checkEnd())
		check.gameRunnig = false;
}

function checkEnd() {
	var divs = document.getElementById("main").children;

	return checkHorizontalMatchPaint(divs) ||
		checkVerticalMatchPaint(divs) ||
		checkDiagonalsPaint(divs);
}

function checkHorizontalMatchPaint(divs) {
	for (i = 0; i < 3; i++) {
		if (checkMatch(divs[i * 3 + 0], divs[i * 3 + 1], divs[i * 3 + 2])) {
			paintSquares(divs[i * 3 + 0], divs[i * 3 + 1], divs[i * 3 + 2])
			return true;
		}
	}
	return false;
}

function checkVerticalMatchPaint(divs) {
	for (i = 0; i < 3; i++) {
		if (checkMatch(divs[i], divs[i + 3], divs[i + 6])) {
			paintSquares(divs[i], divs[i + 3], divs[i + 6])
			return true;
		}
	}
}

function checkDiagonalsPaint(divs) {
	if (checkMatch(divs[0], divs[4], divs[8])) {
		paintSquares(divs[0], divs[4], divs[8]);
		return true;
	}

	if (checkMatch(divs[2], divs[4], divs[6])) {
		paintSquares(divs[2], divs[4], divs[6]);
		return true;
	}

	return false;
}

function checkMatch(e0, e1, e2) {
	return e0.innerHTML == e1.innerHTML &&
		e0.innerHTML == e2.innerHTML &&
		e0.innerHTML != "";
}

function paintSquares(e0, e1, e2) {
	var bgcolor = "#33f";
	var shcolor = "green";
	e0.style = e1.style = e2.style = "background-color: " +
		bgcolor + ";" + "box-shadow: 0px 0px 30px " + shcolor + ";";
}

function isEmptySquares() {
	var divs = document.getElementById("main").children;
	for (i = 0; i < 9; i++)
		if (divs[i].innerHTML == "")
			return true;
	return false;
}

function blinkMsg() {
	if (typeof blinkMsg.flag == "undefined" ||
		typeof blinkMsg.opacity == "undefined") {
		blinkMsg.flag = 0.01;
		blinkMsg.opacity = 0.11;
	}

	if (blinkMsg.opacity <= 0.10 || blinkMsg.opacity >= 1.0)
		blinkMsg.flag = -blinkMsg.flag;

	document.getElementById("gameMsg").style =
		"opacity: " + (blinkMsg.opacity += blinkMsg.flag) + ";";
}