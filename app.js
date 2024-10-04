
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
  },
});

const upload = multer({ storage });

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Upload route
app.post('/upload', upload.single('cropImage'), (req, res) => {
  // Here you can integrate your CNN model for prediction
  // const prediction = yourCNNModel.predict(req.file.path);

  // For now, just return the uploaded file details
  res.json({
    message: 'File uploaded successfully!',
    file: req.file,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
