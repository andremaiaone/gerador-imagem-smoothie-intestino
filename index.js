const express = require('express');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Registra uma fonte mais bonita
registerFont(path.join(__dirname, 'assets', 'fonts', 'Poppins-Bold.ttf'), { family: 'Poppins' });

app.get('/webhook/aline', async (req, res) => {
  try {
    const name = req.query.name || 'Aluno';
    const canvas = createCanvas(768, 960);
    const ctx = canvas.getContext('2d');

    const background = await loadImage(path.join(__dirname, 'assets', 'images', 'smoothie.png'));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 36px "Poppins"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(name.toUpperCase(), canvas.width / 2, 700); // posição abaixo do smoothie

    res.setHeader('Content-Type', 'image/png');
    canvas.pngStream().pipe(res);

  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    res.status(500).send('Erro ao gerar imagem.');
  }
});

app.get('/', (req, res) => {
  res.send('Servidor rodando. Use /webhook/aline?name=SEUNOME');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
