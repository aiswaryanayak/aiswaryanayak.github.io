let highestZ = 1;
class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  static papersLeft = 0;

  init(paper) {
    Paper.papersLeft++;  // Count the number of papers
    document.addEventListener('mousemove', (e) => {
      if (!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      if (e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Double-click paper to remove it
    paper.addEventListener('dblclick', () => {
      paper.style.transition = 'transform 0.5s ease-out';  // Smooth removal transition
      paper.style.transform = 'scale(0)'; // Shrink the paper before removing it
      setTimeout(() => {
        paper.remove();
        Paper.papersLeft--;  // Decrement the number of papers left
        if (Paper.papersLeft === 0) {
          showNextButton();  // Show the button when all papers are removed
        }
      }, 500);  // Wait for the shrink effect before removing paper
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

// Function to show the Valentine popup when all papers are removed
function showNextButton() {
  const button = document.createElement('button');
  button.textContent = "Will you be my Valentine? 💖";
  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.left = "50%";
  button.style.transform = "translate(-50%, -50%)";
  button.style.padding = "15px 30px";
  button.style.fontSize = "1.5rem";
  button.style.background = "#ff7eb9";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "50px";
  button.style.cursor = "pointer";
  button.style.transition = "transform 0.3s ease";
  button.addEventListener('mouseenter', () => {
    button.style.transform = "translate(-50%, -50%) scale(1.1)";
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = "translate(-50%, -50%) scale(1)";
  });
  button.onclick = () => {
    showValentinePopup();  // Call function to show the Valentine question
  };
  document.body.appendChild(button);
}

// Function to show the Valentine popup with Yes/No buttons
function showValentinePopup() {
  const overlay = document.createElement('div');
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "1000";

  const popup = document.createElement('div');
  popup.style.background = "#fff";
  popup.style.padding = "20px";
  popup.style.textAlign = "center";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
  popup.style.fontSize = "1.5rem";
  popup.innerHTML = "<p>Will you be my valentine? 💖</p>";

  const yesButton = document.createElement('button');
  yesButton.textContent = "Yes";
  yesButton.id = "yesButton";
  yesButton.style.padding = "10px 20px";
  yesButton.style.background = "#ff7eb9";
  yesButton.style.color = "white";
  yesButton.style.border = "none";
  yesButton.style.borderRadius = "50px";
  yesButton.style.cursor = "pointer";
  yesButton.style.margin = "10px";

  const noButton = document.createElement('button');
  noButton.textContent = "No";
  noButton.id = "noButton";
  noButton.style.padding = "10px 20px";
  noButton.style.background = "#ccc";
  noButton.style.color = "black";
  noButton.style.border = "none";
  noButton.style.borderRadius = "50px";
  noButton.style.cursor = "pointer";
  noButton.style.margin = "10px";

  popup.appendChild(yesButton);
  popup.appendChild(noButton);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Handle Yes button
  yesButton.addEventListener('click', () => {
    overlay.remove();  // Remove the prompt overlay
    showLoveLetter();  // Show love letter and animated GIF
  });

  // Handle No button
  const messages = ["No", "Apke param mitra hote to pakka ha krdete?", "Mere jaisa koi pyaar nhi krega?", "Don't you love me?", "Amma kasam ha boldo", "Itna bhi kya soch rhe ho?", "Haan bol do yaar", "Kya hua", "Kuch toh bolo", "Bolo na", "Bolo", "Bolo na yaar", "Bol na "];
  let count = 0;
  noButton.addEventListener('click', () => {
    noButton.textContent = messages[count % messages.length];
    count++;
  });
}

// Show love letter and thank you GIF
function showLoveLetter() {
  const loveLetter = document.createElement('div');
  loveLetter.style.position = "fixed";
  loveLetter.style.top = "50%";
  loveLetter.style.left = "50%";
  loveLetter.style.transform = "translate(-50%, -50%)";
  loveLetter.style.background = "#fff";
  loveLetter.style.padding = "20px";
  loveLetter.style.borderRadius = "10px";
  loveLetter.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
  loveLetter.style.textAlign = "center";
  loveLetter.style.fontSize = "1.5rem";
  loveLetter.innerHTML = `<p>My Dearest,</p><p>In every moment I’ve spent with you, my love for you has grown immeasurably. You fill my heart with happiness that I never thought was possible. Your presence lights up my world, and every day with you feels like a beautiful adventure. I love you more than words can express, and I promise to cherish you always. 💖</p>`;

  const thankYouGif = document.createElement('img');
  thankYouGif.src = "https://media.giphy.com/media/l0MYsbD5TW8N0qVXa/giphy.gif";  // Example Thank You GIF
  thankYouGif.style.width = "300px";
  thankYouGif.style.marginTop = "20px";

  loveLetter.appendChild(thankYouGif);
  document.body.appendChild(loveLetter);
}
