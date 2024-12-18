const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de armazenamento do multer para salvar no diretório atual
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, __dirname),  // Salva no diretório atual
    filename: (req, file, cb) => cb(null, file.originalname)  // Usa o nome original do arquivo
});

const upload = multer({ storage });

// Middleware para servir arquivos e páginas estáticas
app.use(express.static(__dirname));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota de upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
    res.json({ message: 'Upload realizado com sucesso!', fileUrl });
});

// Iniciar o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
