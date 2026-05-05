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

function displayComment(text) {
  $("#nextcomment").html(text);
}

const ARRAY_SIZE = 16;
const ARRAY_ELEM_WIDTH = 50;
const ARRAY_ELEM_HEIGHT = 50;
const ARRAY_INITIAL_X = 30;

const ARRAY_Y_POS = 50;
const ARRAY_LABEL_Y_POS = 17;

class Heap extends Algorithm {
  constructor(am) {
    super();
    this.holdingIndex = 0;
    this.questionState = 0;
    this.init(am);
  }

  init(am) {
    super.init(am);
    this.nextIndex = 0;
    this.HeapXPositions = [
      0, 450, 250, 650, 150, 350, 550, 750, 100, 200, 300, 400, 500, 600, 700,
      800, 75, 125, 175, 225, 275, 325, 375, 425, 475, 525, 575, 625, 675, 725,
      775, 825,
    ];
    this.HeapYPositions = [
      0, 100, 170, 170, 240, 240, 240, 240, 310, 310, 310, 310, 310, 310, 310,
      310, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380,
      380, 380,
    ];
    this.commands = [];
    this.createArray();
    // Set a user-friendly message in Observations at start
    if (document.getElementById("nextcomment")) {
      document.getElementById("nextcomment").innerHTML =
        "Click 'Next Insertion' to begin.";
    }
  }

  addControls() {
    this.insertButton = document.getElementById("heap-prac-next-btn");
    this.insertButton.onclick = this.insertCallback.bind(this);
    this.swapButton = document.getElementById("heap-prac-swap-btn");
    this.swapButton.onclick = this.swapCallback.bind(this);
    this.nextStepButton = document.getElementById("heap-prac-next-step-btn");
    this.nextStepButton.onclick = this.nextStepCallback.bind(this);
    this.resetButton = document.getElementById("heap-prac-reset-btn");
    this.resetButton.onclick = this.clearCallback.bind(this);
    this.finalDoneButton = document.getElementById("heap-prac-final-done-btn");
    this.finalDoneButton.onclick = this.finalDoneCallback.bind(this);
    this.finalDoneButton.disabled = true; // Initially disabled
    this.nextStepButton.disabled = true; // Initially disabled
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
      this.cmd(
        "CreateRectangle",
        this.arrayRects[i],
        "",
        ARRAY_ELEM_WIDTH,
        ARRAY_ELEM_HEIGHT,
        this.ArrayXPositions[i],
        ARRAY_Y_POS,
      );
      this.cmd(
        "CreateLabel",
        this.arrayLabels[i],
        i,
        this.ArrayXPositions[i],
        ARRAY_LABEL_Y_POS,
      );
      this.cmd("SetForegroundColor", this.arrayLabels[i], "#0000FF");
    }
    // Do not show -INF in the UI at start
    this.cmd("SetText", this.arrayRects[0], "");
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

  insertCallback(event) {
    if (this.currentHeapSize >= ARRAY_SIZE - 1) {
      displayComment("Heap is full. Please reset to continue.");
      this.disableAllExceptReset();
      return;
    }
    var insertedValue = this.normalizeNumber(Math.ceil(Math.random() * 100), 4);
    this.implementAction(this.insertElement.bind(this), insertedValue);
    this.questionState = 1;
    this.updateButtonsAfterInsertion();
    this.holdingIndex = this.currentHeapSize;
    // If heap is now full after insertion, show message and disable buttons
    if (this.currentHeapSize >= ARRAY_SIZE - 1) {
      displayComment(
        "Heap is full. Please click 'Done' to check your heap, or Reset to start over.",
      );
      this.insertButton.disabled = true;
      this.swapButton.disabled = true;
      this.nextStepButton.disabled = true;
      this.finalDoneButton.disabled = false;
    }
  }

  // Next step button logic (confirm step, e.g., after swap or no swap)
  nextStepCallback() {
    // After confirming the step, allow new insertion unless heap is full
    this.questionState = 0;
    this.updateButtonsAfterStep();
    displayComment("Ready for next insertion or swap.");
  }

  swapCallback() {
    if (
      this.holdingIndex > 1 &&
      this.arrayData[this.holdingIndex] <
        this.arrayData[Math.floor(this.holdingIndex / 2)]
    ) {
      // Perform the swap
      this.implementAction(this.swapElements.bind(this), "");
      // Update holdingIndex to new position (parent)
      this.holdingIndex = Math.floor(this.holdingIndex / 2);
      // Check if another swap is needed
      if (
        this.holdingIndex > 1 &&
        this.arrayData[this.holdingIndex] <
          this.arrayData[Math.floor(this.holdingIndex / 2)]
      ) {
        document.getElementById("nextcomment").innerHTML =
          "Good swap! If heap property is still violated, swap again.";
        this.swapButton.disabled = false;
        this.nextStepButton.disabled = true;
      } else {
        document.getElementById("nextcomment").innerHTML =
          "Heap property restored for this insertion. Click Next to continue.";
        this.swapButton.disabled = true;
        this.nextStepButton.disabled = false;
      }
    } else {
      document.getElementById("nextcomment").innerHTML =
        "Wrong Answer, you should not swap here.";
    }
  }

  // Final Done button callback for heap correctness check
  finalDoneCallback() {
    let isHeap = this.checkHeapProperty();
    if (isHeap) {
      displayComment("Correct! The heap is valid.");
    } else {
      displayComment("Incorrect. The heap property is violated.");
    }
    // Do not disable Done button after click; keep it enabled for repeated checks
    this.insertButton.disabled = true;
    this.swapButton.disabled = true;
    this.nextStepButton.disabled = true;
    this.finalDoneButton.disabled = false;
  }

  clearCallback() {
    this.commands = new Array();
    this.implementAction(this.clear.bind(this), "");
    document.getElementById("nextcomment").innerHTML =
      "Let's keep going with the next question.";
    this.enableAllButtons();
    this.nextStepButton.disabled = true;
  }
  // Check if the heap property is satisfied for the current heap
  checkHeapProperty() {
    for (let i = 2; i <= this.currentHeapSize; i++) {
      if (this.arrayData[i] < this.arrayData[Math.floor(i / 2)]) {
        return false;
      }
    }
    return true;
  }

  // Disable all buttons except Reset
  // Disable all buttons except Reset and Done
  disableAllExceptReset() {
    this.insertButton.disabled = true;
    this.swapButton.disabled = true;
    this.nextStepButton.disabled = true;
    this.resetButton.disabled = false;
    this.finalDoneButton.disabled = false;
  }

  // Enable all buttons (used after reset)
  // Enable all buttons (used after reset)
  enableAllButtons() {
    this.insertButton.disabled = false;
    this.swapButton.disabled = false;
    this.nextStepButton.disabled = true;
    this.resetButton.disabled = false;
    this.finalDoneButton.disabled = false;
  }

  // Update button states after an insertion
  updateButtonsAfterInsertion() {
    // After insertion, allow swap or next step, but not another insertion until step is confirmed
    this.insertButton.disabled = true;
    this.swapButton.disabled = false;
    this.nextStepButton.disabled = false;
    this.finalDoneButton.disabled = false;
    this.resetButton.disabled = false;
  }

  // Update button states after a step is confirmed (Next)
  updateButtonsAfterStep() {
    // After step, allow new insertion unless heap is full
    if (this.currentHeapSize >= ARRAY_SIZE - 1) {
      this.insertButton.disabled = true;
      this.swapButton.disabled = true;
      this.nextStepButton.disabled = true;
      this.finalDoneButton.disabled = false;
    } else {
      this.insertButton.disabled = false;
      this.swapButton.disabled = true;
      this.nextStepButton.disabled = true;
      this.finalDoneButton.disabled = false;
    }
    this.resetButton.disabled = false;
  }

  reset() {
    this.currentHeapSize = 0;
  }

  swap(index1, index2) {
    this.cmd("SetText", this.arrayRects[index1], "");
    this.cmd("SetText", this.arrayRects[index2], "");
    this.cmd("SetText", this.circleObjs[index1], "");
    this.cmd("SetText", this.circleObjs[index2], "");
    this.cmd(
      "CreateLabel",
      this.swapLabel1,
      this.arrayData[index1],
      this.ArrayXPositions[index1],
      ARRAY_Y_POS,
    );
    this.cmd(
      "CreateLabel",
      this.swapLabel2,
      this.arrayData[index2],
      this.ArrayXPositions[index2],
      ARRAY_Y_POS,
    );
    this.cmd(
      "CreateLabel",
      this.swapLabel3,
      this.arrayData[index1],
      this.HeapXPositions[index1],
      this.HeapYPositions[index1],
    );
    this.cmd(
      "CreateLabel",
      this.swapLabel4,
      this.arrayData[index2],
      this.HeapXPositions[index2],
      this.HeapYPositions[index2],
    );
    this.cmd(
      "Move",
      this.swapLabel1,
      this.ArrayXPositions[index2],
      ARRAY_Y_POS,
    );
    this.cmd(
      "Move",
      this.swapLabel2,
      this.ArrayXPositions[index1],
      ARRAY_Y_POS,
    );
    this.cmd(
      "Move",
      this.swapLabel3,
      this.HeapXPositions[index2],
      this.HeapYPositions[index2],
    );
    this.cmd(
      "Move",
      this.swapLabel4,
      this.HeapXPositions[index1],
      this.HeapYPositions[index1],
    );
    var tmp = this.arrayData[index1];
    this.arrayData[index1] = this.arrayData[index2];
    this.arrayData[index2] = tmp;
    this.cmd("Step");
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

  insertElement(insertedValue) {
    this.commands = new Array();

    if (this.currentHeapSize >= ARRAY_SIZE - 1) {
      this.cmd("SetText", this.descriptLabel1, "Heap Full!");
      return this.commands;
    }

    this.cmd(
      "SetText",
      this.descriptLabel1,
      "Inserting Element: " + insertedValue,
    );
    this.cmd("Step");
    this.cmd("SetText", this.descriptLabel1, "Inserting Element: ");
    this.currentHeapSize++;
    this.arrayData[this.currentHeapSize] = insertedValue;
    this.cmd(
      "CreateCircle",
      this.circleObjs[this.currentHeapSize],
      "",
      this.HeapXPositions[this.currentHeapSize],
      this.HeapYPositions[this.currentHeapSize],
    );
    this.cmd("CreateLabel", this.descriptLabel2, insertedValue, 120, 45, 1);
    if (this.currentHeapSize > 1) {
      this.cmd(
        "Connect",
        this.circleObjs[Math.floor(this.currentHeapSize / 2)],
        this.circleObjs[this.currentHeapSize],
      );
    }

    this.cmd(
      "Move",
      this.descriptLabel2,
      this.HeapXPositions[this.currentHeapSize],
      this.HeapYPositions[this.currentHeapSize],
    );
    this.cmd("Step");
    this.cmd("SetText", this.circleObjs[this.currentHeapSize], insertedValue);
    this.cmd("delete", this.descriptLabel2);
    this.cmd("SetText", this.arrayRects[this.currentHeapSize], insertedValue);

    var currentIndex = this.currentHeapSize;
    var parentIndex = Math.floor(currentIndex / 2);
    this.setIndexHighlight(currentIndex, 1);

    return this.commands;
  }

  swapElements() {
    this.commands = new Array();

    var currentIndex = this.holdingIndex;
    var parentIndex = Math.floor(currentIndex / 2);

    if (
      currentIndex > 1 &&
      this.arrayData[currentIndex] < this.arrayData[parentIndex]
    ) {
      this.setIndexHighlight(parentIndex, 1);
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor(parentIndex / 2);
      this.setIndexHighlight(this.holdingIndex, 0);
    }

    this.holdingIndex = currentIndex;
    return this.commands;
  }

  done() {
    this.commands = new Array();
    this.setIndexHighlight(this.holdingIndex, 0);
    return this.commands;
  }

  clear() {
    this.commands = new Array();
    this.setIndexHighlight(this.holdingIndex, 0);
    while (this.currentHeapSize > 0) {
      this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
      this.cmd("SetText", this.arrayRects[this.currentHeapSize], "");
      this.currentHeapSize--;
    }
    return this.commands;
  }

  disableUI(event) {
    if (
      !this.insertButton ||
      !this.swapButton ||
      !this.resetButton ||
      !this.finalDoneButton
    )
      return;
    this.insertButton.disabled = true;
    this.swapButton.disabled = true;
    this.finalDoneButton.disabled = true;
  }

  enableUI(event) {
    if (
      !this.insertButton ||
      !this.swapButton ||
      !this.resetButton ||
      !this.finalDoneButton
    )
      return;
    if (this.questionState == 0) {
      this.insertButton.disabled = false;
      this.swapButton.disabled = true;
      this.finalDoneButton.disabled = true;
    } else {
      this.insertButton.disabled = true;
      this.swapButton.disabled = false;
      this.finalDoneButton.disabled = true;
    }
  }
}

var currentAlg;

function init() {
  var animManag = initCanvas();
  currentAlg = new Heap(animManag, canvas.width, canvas.height);
  currentAlg.addControls(); // Ensure buttons exist before assigning
}
