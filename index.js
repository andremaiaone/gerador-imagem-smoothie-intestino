// index.js CORRIGIDO

const express = require('express');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Registro da fonte correta
registerFont(path.join(__dirname, 'assets', 'fonts', 'Poppins-Bold.ttf'), {
    family: 'Poppins',
});

// Rota principal para gerar a imagem
app.get('/webhook/smoothie', async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).send('Parâmetro "name" é obrigatório');
        }

        const backgroundPath = path.join(__dirname, 'assets', 'images', 'Design sem nome (37).png');
        const background = await loadImage(backgroundPath);

        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(background, 0, 0);

        ctx.font = 'bold 50px "Poppins"';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textX = canvas.width / 2;
        const textY = 940;

        ctx.fillText(name, textX, textY);

        res.setHeader('Content-Type', 'image/png');
        canvas.pngStream().pipe(res);

    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        res.status(500).send('Erro interno ao gerar imagem.');
    }
});

// Rota simples para verificar o servidor
app.get('/', (req, res) => {
    res.send('Servidor do Gerador de Smoothie ativo!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// package.json CORRIGIDO

/*
{
  "name": "gerador-imagem-smoothie-intestino",
  "version": "1.0.0",
  "description": "Gerador de imagens com nome no Smoothie para o Desafio Intestino Renovado",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "canvas": "^2.11.2",
    "express": "^4.18.2"
  }
}
*/

// .gitignore CORRIGIDO

/*
node_modules
.env
*/
