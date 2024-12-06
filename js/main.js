const container = document.getElementById('container');
const imageSrc = '../gameAmNyam/img/output1.png'; 
let isFalling = false; // Флаг для отслеживания состояния анимации
const donut = document.createElement('img');
let amNyam = document.getElementById('amNyam');
let scoreDisplay = document.getElementById('score');
let score = 0;
let amNyamImg = document.getElementById('amNyamImg');
const amOpen = '../gameAmNyam/img/output2.png'; 
aye = 3000;
let tt = 3000;
let heart1 = document.getElementById('heart1');
let heart2 = document.getElementById('heart2');
let heart3 = document.getElementById('heart3');
let lossScore = 3;
let topp = document.getElementById('topp');
let amSad = '../gameAmNyam/img/output3.png';
let fail = document.getElementById('fail');
let box = document.getElementById('box');
let fBtn = document.getElementById('fBtn');
let startBtn = document.getElementById('startBtn');
let ss = document.getElementById('ss');
let sound = document.getElementById('sound');
let isAudioPlay = false;
let plusDon = document.getElementById('plusDon');
let body = document.body;
let endTxt = document.getElementById('endTxt');
let startTxt = document.getElementById('startTxt');

ss.onclick = function() {
    let audio = document.getElementById('myAudio');
    if (isAudioPlay == false) {
        audio.play(); // Запустить воспроизведение
        sound.src = "../gameAmNyam/img/sound_fhlbnpauw4tf.svg";
        isAudioPlay = true;
    } else {
        audio.pause(); // Остановить воспроизведение
        audio.currentTime = 0; // Сбросить время к началу
        sound.src = "../gameAmNyam/img/sound_wrhsbtl1iova.svg";
        isAudioPlay = false;
    }
};


function checkCollision() {
    const rectDonut = donut.getBoundingClientRect();
    const rectAm = amNyam.getBoundingClientRect();

    return !(
        rectDonut.right < rectAm.left ||
        rectDonut.left > rectAm.right ||
        rectDonut.bottom < rectAm.top ||
        rectDonut.top > rectAm.bottom
    );
}

function createFallingImage() {
    if (isFalling) return; 
    isFalling = true; 
    isColliding = false;

    donut.src = imageSrc;
    donut.className = 'falling-image';
   
    const windowWidth = window.innerWidth;
    donut.style.left = (Math.random() * (windowWidth - 50)) + 'px'; 
    container.appendChild(donut);

    let startTime = null;
    const duration = aye; 
    const startY = -100; 
    const endY = window.innerHeight; 

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const progress = Math.min(elapsed / duration, 1); 
        const currentY = startY + (endY - startY) * progress;

        donut.style.top = currentY + 'px';

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            donut.remove(); // Удаляем пончик после завершения анимации
            isFalling = false; // Сбрасываем флаг
        }

        function getDistance(elem1, elem2) {
            const rect1 = elem1.getBoundingClientRect();
            const rect2 = elem2.getBoundingClientRect();
        
            const dx = rect1.left - rect2.left;
            const dy = rect1.top - rect2.top;
        
            return Math.sqrt(dx * dx + dy * dy);
        }
        
        const distance = getDistance(donut, amNyam);
        const threshold = 110; 
        if (distance < threshold) {
            amNyamImg.src = amOpen;
        } 
        
        if (score == 4) {
            aye = 2800;
        } else if (score == 8) {
            aye = 2400;
        } else if (score == 12) {
            aye = 2000;
        } else if (score == 17) {
            aye = 1700;
        } else if (score == 20) {
            console.log(score);
            aye = 1500;
        } else if (score == 25) {
            container.style.display = 'none';
            topp.style.display = 'none';
            donut.style.display = 'none';
            lossScore = -1;
            body.style.backgroundImage = 'url(../gameAmNyam/img/776e87e7-464d-438a-be1f-6105deaa44c1.jpeg)'
            amNyamImg.style.width = '0px';
            
            plusDon.pause();
            endTxt.textContent = 'ура вы выйграли!!!';
        }

        if (checkCollision()) {
            donut.remove();
            amNyamImg.src = '../gameAmNyam/img/output.png';
            score++;
            scoreDisplay.textContent = "Счет: " + score;
            plusDon.play();
            setTimeout(function() {
                plusDon.pause(); // Остановить воспроизведение
                plusDon.currentTime = 0; // Сбросить время к началу
            }, 100); 
            isColliding = true; // Устанавливаем флаг, что произошло столкновени
            
            createFallingImage();
        } 
        
        
        if (currentY >= window.innerHeight && (isColliding == false)) {
            let q = document.getElementById('heart' + lossScore);
            if (q) {
                q.remove();
            }
            lossScore -= 1;
            createFallingImage();
            if (lossScore == 0) {
                container.style.display = 'none';
                topp.style.display = 'none';
                donut.style.display = 'none';
                amNyamImg.src = amSad;
                fail.className = 'fail';
                box.className = 'box';

                fBtn.onclick = function() {
                    location.reload()
                }
            }
        }
    }

    requestAnimationFrame(animate);
}

startBtn.onclick = function() {
    setInterval(createFallingImage, 1);
    startBtn.style.display = 'none';
    startTxt.style.display = 'none';
}



document.addEventListener("keydown", function (event) {
    if (event.code !== "ArrowRight" && event.code !== "ArrowLeft") {
        return;
    }

    let rectAm = amNyam.getBoundingClientRect();
    let x = rectAm.x + window.scrollX; // Текущая позиция по X
    let y = rectAm.y + window.scrollY; // Текущая позиция по Y (можно оставить без изменений)

    const windowWidth = window.innerWidth;

    // Изменяем позицию по X в зависимости от нажатой клавиши
    if (event.code === "ArrowRight") {
        x += amNyam.offsetWidth; // Двигаем вправо
    }
    if (event.code === "ArrowLeft") {
        x -= amNyam.offsetWidth; // Двигаем влево
    }

    // Ограничиваем движение по X
    if (x < 0) {
        x = 0; 
    } else if (x + amNyam.offsetWidth > windowWidth) {
        x = windowWidth - amNyam.offsetWidth;
    }

    // Обновляем позицию элемента
    amNyam.style.position = "absolute";
    amNyam.style.left = x + "px";
    amNyam.style.top = y + "px"; // можно оставить без изменений

    
});






