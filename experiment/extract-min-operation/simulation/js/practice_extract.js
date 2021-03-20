// Copyright 2011 David Galles, University of San Francisco. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
// conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
// of conditions and the following disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of the University of San Francisco

function displayComment(text)
{
	$('#nextcomment').html(text);
}

const ARRAY_SIZE = 16;
const ARRAY_ELEM_WIDTH = 50;
const ARRAY_ELEM_HEIGHT = 50;
const ARRAY_INITIAL_X = 30;

const ARRAY_Y_POS = 50;
const ARRAY_LABEL_Y_POS = 70;


class Heap extends Algorithm {

  
  	constructor(am) {
  		super();
  		this.init(am);
  		this.questionState = 0;
  		this.enableUI();
  	}
  
  	init(am) {
  		super.init(am);
  		this.addControls();
  		this.nextIndex = 0;
  		this.HeapXPositions = [0, 450, 250, 650, 150, 350, 550, 750, 100, 200, 300, 400, 500, 600,
  			700, 800, 75, 125, 175, 225, 275, 325, 375, 425, 475, 525, 575,
  			625, 675, 725, 775, 825];
  		this.HeapYPositions = [0, 100, 170, 170, 240, 240, 240, 240, 310, 310, 310, 310, 310, 310,
  			310, 310, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380,
  			380, 380, 380, 380, 380];
  		this.commands = [];
  		this.createArray();
  		//this.implementAction(this.buildHeap.bind(this), "");
  	}
  
  
  	addControls() {
  		this.populateButton = document.getElementById("heap-extprac-populate-btn");
  		this.populateButton.onclick = this.populateCallback.bind(this);
  		this.extractButton = document.getElementById("heap-extprac-extract-btn");
  		this.extractButton.onclick = this.siftStartCallback.bind(this);
  		this.swaplButton = document.getElementById("heap-extprac-swapl-btn");
  		this.swaplButton.onclick = this.siftLeftCallback.bind(this);
  		this.swaprButton = document.getElementById("heap-extprac-swapr-btn");
  		this.swaprButton.onclick = this.siftRightCallback.bind(this);
  		this.doneButton = document.getElementById("heap-extprac-done-btn");
  		this.doneButton.onclick = this.siftDoneCallback.bind(this);
  		this.resetButton = document.getElementById("heap-extprac-reset-btn");
        	this.resetButton.onclick = this.clearCallback.bind(this);
  	}
  
  
  	createArray() {
  		this.arrayData = new Array(ARRAY_SIZE);
  		this.arrayLabels = new Array(ARRAY_SIZE);
  		this.arrayRects = new Array(ARRAY_SIZE);
  		this.circleObjs = new Array(ARRAY_SIZE);
  		this.ArrayXPositions = new Array(ARRAY_SIZE);
  		this.currentHeapSize = 0;
  
  		for (var i = 0; i < ARRAY_SIZE; i++) {
  			this.ArrayXPositions[i] = ARRAY_INITIAL_X + i * ARRAY_ELEM_WIDTH;
  			this.arrayLabels[i] = this.nextIndex++;
  			this.arrayRects[i] = this.nextIndex++;
  			this.circleObjs[i] = this.nextIndex++;
  			this.cmd("CreateRectangle", this.arrayRects[i], "", ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, this.ArrayXPositions[i], ARRAY_Y_POS)
  			this.cmd("CreateLabel", this.arrayLabels[i], i, this.ArrayXPositions[i], ARRAY_LABEL_Y_POS);
  			this.cmd("SetForegroundColor", this.arrayLabels[i], "#0000FF");
  		}
  		this.cmd("SetText", this.arrayRects[0], "-INF");
  		this.swapLabel1 = this.nextIndex++;
  		this.swapLabel2 = this.nextIndex++;
  		this.swapLabel3 = this.nextIndex++;
  		this.swapLabel4 = this.nextIndex++;
  		this.descriptLabel1 = this.nextIndex++;
  		this.descriptLabel2 = this.nextIndex++;
  		this.cmd("CreateLabel", this.descriptLabel1, "", 20, 10, 0);
  		this.animationManager.StartNewAnimation(this.commands);
  		this.animationManager.skipForward();
  		this.animationManager.clearHistory();
  	}
  
  
  	populateCallback() {
  		this.implementAction(this.buildHeap.bind(this), "");
  	}
  
  	clearCallback(event) {
  		this.commands = new Array();
  		this.implementAction(this.clear.bind(this), "");
  	}
  
  	removeSmallestCallback(event) {
  		this.implementAction(this.removeSmallest.bind(this), "");
  	}
  
  	reset() {
  		this.currentHeapSize = 0;
  	}
  
  	removeSmallestCallback(event) {
  		this.implementAction(this.removeSmallest.bind(this), "");
  	}
  
  
  	swap(index1, index2) {
  		this.cmd("SetText", this.arrayRects[index1], "");
  		this.cmd("SetText", this.arrayRects[index2], "");
  		this.cmd("SetText", this.circleObjs[index1], "");
  		this.cmd("SetText", this.circleObjs[index2], "");
  		this.cmd("CreateLabel", this.swapLabel1, this.arrayData[index1], this.ArrayXPositions[index1], ARRAY_Y_POS);
  		this.cmd("CreateLabel", this.swapLabel2, this.arrayData[index2], this.ArrayXPositions[index2], ARRAY_Y_POS);
  		this.cmd("CreateLabel", this.swapLabel3, this.arrayData[index1], this.HeapXPositions[index1], this.HeapYPositions[index1]);
  		this.cmd("CreateLabel", this.swapLabel4, this.arrayData[index2], this.HeapXPositions[index2], this.HeapYPositions[index2]);
  		this.cmd("Move", this.swapLabel1, this.ArrayXPositions[index2], ARRAY_Y_POS)
  		this.cmd("Move", this.swapLabel2, this.ArrayXPositions[index1], ARRAY_Y_POS)
  		this.cmd("Move", this.swapLabel3, this.HeapXPositions[index2], this.HeapYPositions[index2])
  		this.cmd("Move", this.swapLabel4, this.HeapXPositions[index1], this.HeapYPositions[index1])
  		var tmp = this.arrayData[index1];
  		this.arrayData[index1] = this.arrayData[index2];
  		this.arrayData[index2] = tmp;
  		this.cmd("Step")
  		this.cmd("SetText", this.arrayRects[index1], this.arrayData[index1]);
  		this.cmd("SetText", this.arrayRects[index2], this.arrayData[index2]);
  		this.cmd("SetText", this.circleObjs[index1], this.arrayData[index1]);
  		this.cmd("SetText", this.circleObjs[index2], this.arrayData[index2]);
  		this.cmd("Delete", this.swapLabel1);
  		this.cmd("Delete", this.swapLabel2);
  		this.cmd("Delete", this.swapLabel3);
  		this.cmd("Delete", this.swapLabel4);
  	}
  
  	setIndexHighlight(index, highlightVal) {
  		this.cmd("SetHighlight", this.circleObjs[index], highlightVal);
  		this.cmd("SetHighlight", this.arrayRects[index], highlightVal);
  	}
  
  
  	startExtract() {
  		this.commands = new Array();
  		this.setIndexHighlight(this.currentHeapSize, 1);
  		this.setIndexHighlight(1, 1);
  		this.cmd("Step");
  		this.setIndexHighlight(this.currentHeapSize, 0);
  		this.swap(this.currentHeapSize, 1);
  		this.holdingIndex = 1;
  		this.questionState = 1;
  		this.enableUI();
  
  		this.cmd("SetText", this.arrayRects[this.currentHeapSize], "");
  		this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
  		this.currentHeapSize--;
  
  		this.questionState = 1;
  		this.enableUI();
  		return this.commands;
  	}
  
  	siftDownLeft() {
  		this.commands = new Array();
  		if (this.holdingIndex * 2 + 1 > this.currentHeapSize) {
  			this.getElementById('nextcomment').innerHTML = "There is no left child to swap with.";
  			return;
  		}
  		if (this.arrayData[this.holdingIndex] > this.arrayData[2 * this.holdingIndex] && 
  				this.arrayData[2 * this.holdingIndex] <= this.arrayData[2 * this.holdingIndex + 1]) {
  			this.setIndexHighlight(2 * this.holdingIndex, 1);
  			this.swap(2 * this.holdingIndex, this.holdingIndex);
  			this.setIndexHighlight(this.holdingIndex, 0);
  			this.holdingIndex = 2 * this.holdingIndex;
  			document.getElementById('nextcomment').innerHTML = "Good job!";
  		} else {
  			document.getElementById('nextcomment').innerHTML = "You made the WRONG swap. Try again.";
  		}
  		return this.commands;
  	}
  
  	siftDownRight() {
  		this.commands = new Array();
  		if (this.holdingIndex * 2 + 1 > this.currentHeapSize) {
  			this.getElementById('nextcomment').innerHTML = "There is no right child to swap with.";
  			return;
  		}
  		if (this.arrayData[this.holdingIndex] > this.arrayData[2 * this.holdingIndex + 1] && 
  				this.arrayData[2 * this.holdingIndex + 1] <= this.arrayData[2 * this.holdingIndex]) {
  			this.setIndexHighlight(2 * this.holdingIndex + 1, 1);
  			this.swap(2 * this.holdingIndex + 1, this.holdingIndex);
  			this.setIndexHighlight(this.holdingIndex, 0);
  			this.holdingIndex = 2 * this.holdingIndex + 1;
  			document.getElementById('nextcomment').innerHTML = "Good job!";
  		} else {
  			document.getElementById('nextcomment').innerHTML = "You made the WRONG swap. Try again.";
  		}
  		return this.commands;
  	}
  
  	siftDownDone() {
  		this.commands = new Array();
  		if ((this.holdingIndex * 2 > this.currentHeapSize || 
  				this.arrayData[this.holdingIndex] <= this.arrayData[2 * this.holdingIndex]) && 
  				(this.holdingIndex * 2 + 1 > this.currentHeapSize || 
  				this.arrayData[this.holdingIndex] <= this.arrayData[2 * this.holdingIndex + 1])) {
  			this.setIndexHighlight(this.holdingIndex, 0);
  			document.getElementById('nextcomment').innerHTML = "Good job!";
  		} else {
  			document.getElementById('nextcomment').innerHTML = "This was WRONG, keep trying.";
  		}
  		this.questionState = 0;
  		this.enableUI();
  		return this.commands;
  	}
  
  	siftStartCallback() {
  		this.implementAction(this.startExtract.bind(this), "");
  	}
  	siftLeftCallback() {
  		this.implementAction(this.siftDownLeft.bind(this), "");
  	}
  	siftRightCallback() {
  		this.implementAction(this.siftDownRight.bind(this), "");
  	}
  	siftDoneCallback() {
  		this.implementAction(this.siftDownDone.bind(this), "");
  	}
  
  
  	pushDown(index) {
  		var smallestIndex;
  		while (true) {
  			if (index * 2 > this.currentHeapSize) return;
  			smallestIndex = 2 * index;
  			if (index * 2 + 1 <= this.currentHeapSize) {
  				this.setIndexHighlight(2 * index, 1);
  				this.setIndexHighlight(2 * index + 1, 1);
  				this.cmd("Step");
  				this.setIndexHighlight(2 * index, 0);
  				this.setIndexHighlight(2 * index + 1, 0);
  				if (this.arrayData[2 * index + 1] < this.arrayData[2 * index]) {
  					smallestIndex = 2 * index + 1;
  				}
  			}
  			this.setIndexHighlight(index, 1);
  			this.setIndexHighlight(smallestIndex, 1);
  			this.cmd("Step");
  			this.setIndexHighlight(index, 0);
  			this.setIndexHighlight(smallestIndex, 0);
  
  			if (this.arrayData[smallestIndex] < this.arrayData[index]) {
  				this.swap(smallestIndex, index);
  				index = smallestIndex;
  			} else {
  				return;
  			}
  		}
  	}
  
  	removeSmallest(dummy) {
  		this.commands = new Array();
  		this.cmd("SetText", this.descriptLabel1, "");
  
  		if (this.currentHeapSize == 0) {
  			this.cmd("SetText", this.descriptLabel1, "Heap is empty, cannot remove smallest element");
  			return this.commands;
  		}
  
  		this.cmd("SetText", this.descriptLabel1, "Removing element:");
  		this.cmd("CreateLabel", this.descriptLabel2, this.arrayData[1], this.HeapXPositions[1], this.HeapYPositions[1], 0);
  		this.cmd("SetText", this.circleObjs[1], "");
  		this.cmd("Move", this.descriptLabel2, 120, 40)
  		this.cmd("Step");
  		this.cmd("Delete", this.descriptLabel2);
  		this.cmd("SetText", this.descriptLabel1, "Removing element: " + this.arrayData[1]);
  		this.arrayData[1] = "";
  		if (this.currentHeapSize > 1) {
  			this.cmd("SetText", this.arrayRects[1], "");
  			this.cmd("SetText", this.arrayRects[this.currentHeapSize], "");
  			this.swap(1, this.currentHeapSize);
  			this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
  			this.currentHeapSize--;
  			this.pushDown(1);
  		} else {
  			this.cmd("SetText", this.arrayRects[1], "");
  			this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
  			this.currentHeapSize--;
  		}
  		return this.commands;
  	}
  
  	buildHeap(ignored) {
  		this.commands = [];
  		this.clear();
  		for (var i = 1; i < ARRAY_SIZE; i++) {
  			this.arrayData[i] = this.normalizeNumber(Math.floor(Math.random() * 100), 2);
  			this.cmd("CreateCircle", this.circleObjs[i], this.arrayData[i], this.HeapXPositions[i], this.HeapYPositions[i]);
  			this.cmd("SetText", this.arrayRects[i], this.arrayData[i]);
  			if (i > 1) {
  				this.cmd("Connect", this.circleObjs[Math.floor(i / 2)], this.circleObjs[i]);
  			}
  		}
  		this.cmd("Step");
  		this.currentHeapSize = ARRAY_SIZE - 1;
  		var nextElem = this.currentHeapSize;
  		while (nextElem > 0) {
  			this.pushDown(nextElem);
  			nextElem = nextElem - 1;
  		}
  		return this.commands;
  	}
  
  	clear() {
  		while (this.currentHeapSize > 0) {
  			this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
  			this.cmd("SetText", this.arrayRects[this.currentHeapSize], "");
  			this.currentHeapSize--;
  		}
  		return this.commands;
  	}
  
  
  	disableUI(event) {
  		this.swaplButton.disabled = true;
  		this.swaprButton.disabled = true;
  		this.extractButton.disabled = true;
  		this.doneButton.disabled = true;
  		this.populateButton = true;
  	}
  
  	enableUI(event) {
  		if (this.questionState === 1) {
  			this.swaplButton.disabled = false;
  			this.swaprButton.disabled = false;
  			this.extractButton.disabled = true;
  			this.doneButton.disabled = false;
  			this.populateButton = true;
  		} else if (this.questionState === 0) {
  			this.swaplButton.disabled = true;
  			this.swaprButton.disabled = true;
  			this.extractButton.disabled = false;
  			this.doneButton.disabled = true;
  			this.populateButton = true;
  		}
  	}
  }
  

var currentAlg;

function init() {
	var animManag = initCanvas();
	currentAlg = new Heap(animManag, canvas.width, canvas.height);
}
