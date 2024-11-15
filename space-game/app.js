function loadTexture(path) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img);
        };
    })
}

function createEnemies(ctx, canvas, enemyImg) {
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * enemyImg.width;
  const START_X = (canvas.width - MONSTER_WIDTH) / 2;
  const STOP_X = START_X + MONSTER_WIDTH;
  
  for (let x = START_X; x < STOP_X; x += enemyImg.width) {
    for (let y = 0; y < enemyImg.height * 5; y += enemyImg.height) {
        ctx.drawImage(enemyImg, x, y);
      }
    
  }
}

function createEnemies2(ctx, canvas, enemyImg) {
  const ROWS = 5; // 피라미드 높이 (행의 개수)
  
  for (let row = 0; row < ROWS; row++) {
    // 각 행의 몬스터 개수는 피라미드 형태로 감소
    const monstersInRow = ROWS - row;
    const rowWidth = monstersInRow * enemyImg.width;
    const startX = (canvas.width - rowWidth) / 2; // 가운데 정렬
    
    // 행의 몬스터 그리기
    for (let col = 0; col < monstersInRow; col++) {
      const x = startX + col * enemyImg.width;
      const y = row * enemyImg.height;
      ctx.drawImage(enemyImg, x, y);
    }
  }
}

window.onload = async () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const heroImg = await loadTexture('assets/player.png');
    const enemyImg = await loadTexture('assets/enemyShip.png');
    const background = await loadTexture('assets/starBackground.png');

    var ptrn = ctx.createPattern(background, 'repeat');    
    ctx.fillStyle = ptrn;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(heroImg, canvas.width / 2 - 45, canvas.height - (canvas.height / 4));
    const heroImgWidth = heroImg.width / 2;
    const heroImgHeight = heroImg.height / 2;
    ctx.drawImage(heroImg, canvas.width / 2 - 100, canvas.height - (canvas.height / 4.5), heroImgWidth, heroImgHeight);
    ctx.drawImage(heroImg, canvas.width / 2 + 60, canvas.height - (canvas.height / 4.5), heroImgWidth, heroImgHeight);
    createEnemies2(ctx, canvas, enemyImg);
};