const express = require('express');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Registro da fonte
registerFont(path.join(__dirname, 'assets', 'fonts', 'Poppins-Bold.ttf'), {
    family: 'Poppins',
});

// Rota para gerar a imagem
app.get('/webhook/smoothie', async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).send('Parâmetro "name" é obrigatório');
        }

        // Caminho da imagem de fundo
        const backgroundPath = path.join(__dirname, 'assets', 'images', 'Design sem nome (37).png');
        const background = await loadImage(backgroundPath);

        // Criar canvas
        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext('2d');

        // Desenhar a imagem de fundo
        ctx.drawImage(background, 0, 0);

        // Configurar o texto
        ctx.font = 'bold 50px "Poppins"';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Coordenadas para centralizar o nome
        const textX = canvas.width / 2;
        const textY = 940; // Ajustado para a faixa preta

        ctx.fillText(name, textX, textY);

        // Retornar a imagem gerada
        res.setHeader('Content-Type', 'image/png');
        canvas.pngStream().pipe(res);

    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        res.status(500).send('Erro interno ao gerar imagem.');
    }
});

// Rota simples para verificar se o servidor está online
app.get('/', (req, res) => {
    res.send('Servidor está online e funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
