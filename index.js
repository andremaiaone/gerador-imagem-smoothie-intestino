const express = require('express');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Registrar a fonte
registerFont(path.join(__dirname, 'ativos', 'fontes', 'Poppins-Bold.ttf'), { family: 'Poppins' });

app.get('/webhook/aluno', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).send('Nome é obrigatório.');
    }

    const largura = 1080;
    const altura = 1350;
    const canvas = createCanvas(largura, altura);
    const ctx = canvas.getContext('2d');

    try {
        const imagemBase = await loadImage(path.join(__dirname, 'ativos', 'imagens', 'Design sem nome (37).png'));

        ctx.drawImage(imagemBase, 0, 0, largura, altura);

        ctx.font = 'bold 36px "Poppins"';
        ctx.fillStyle = '#000000'; // Cor preta
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, largura / 2, 960); // Ajuste fino na posição vertical

        res.setHeader('Content-Type', 'image/png');
        canvas.pngStream().pipe(res);

    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        res.status(500).send('Erro ao gerar imagem.');
    }
});

app.get('/', (req, res) => {
    res.send('Servidor do Gerador de Imagens do Smoothie ativo.');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
