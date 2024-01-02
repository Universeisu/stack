const stackContainer = document.getElementById("stack-container");
const block = document.querySelector(".block");
const infoContainer = document.getElementById("info-container");
let boxCount = 0;
const maxBoxCount = 4;

function updateInfo() {
  infoContainer.textContent = `Boxes: ${boxCount}, Position: ${boxCount + 1}`;
}

function checkAndAlert() {
  if (boxCount === maxBoxCount) {
    alert("Cannot add more boxes. The limit is reached.");
  }
}

block.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "block");
});

stackContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

stackContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  if (data === "block" && boxCount < maxBoxCount) {
    const newBlock = block.cloneNode(true);
    stackContainer.appendChild(newBlock);
    boxCount++;

    // เพิ่ม Event Listener สำหรับการลบด้วยการดับเบิลคลิก
    newBlock.addEventListener("dblclick", () => {
      stackContainer.removeChild(newBlock);
      boxCount--;
      checkAndAlert();
      updateInfo();
    });

    updateInfo();
    checkAndAlert();
  }
});

// เพิ่ม Event Listener สำหรับการลบด้วยการดับเบิลคลิก ในกรณีที่ต้องการลบบล็อกที่มีอยู่แล้วใน stackContainer
stackContainer.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("block")) {
    stackContainer.removeChild(e.target);
    boxCount--;
    updateInfo();
    checkAndAlert();
  }
});
