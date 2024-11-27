const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3000; // Use Vercel's environment variable or default to 3000

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(chalk.blue('🔗 Database Connected'));
  })
  .catch((err) => {
    console.error(chalk.red('Connection error:', err));
  });

// MongoDB Schema and Model
const viewSchema = new mongoose.Schema({
  page: String,
  views: { type: Number, default: 0 },
});
const View = mongoose.model('View', viewSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home', 'index.html'));
});

app.get('/analytics', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'analytics', 'analytics.html'));
});

// API route to track views
app.get('/api/views', async (req, res) => {
  try {
    const page = req.query.page || 'home';

    // Ignore static file requests (CSS/JS)
    if (page.includes('.css') || page.includes('.js')) {
      return res.status(200).json({ message: 'Ignored CSS/JS file request' });
    }

    let viewDoc = await View.findOne({ page });
    if (!viewDoc) {
      viewDoc = new View({ page, views: 1 });
    } else {
      viewDoc.views += 1;
    }
    await viewDoc.save();

    res.json({ page: viewDoc.page, views: viewDoc.views });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch or update views' });
  }
});

// API route for analytics
app.get('/api/analytics', async (req, res) => {
  try {
    const viewDocs = await View.find({ page: { $not: /(\.css|\.js)$/ } });
    const analyticsData = {};
    viewDocs.forEach((doc) => {
      analyticsData[doc.page] = doc.views;
    });

    res.json(analyticsData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// 404 fallback route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(chalk.yellow(`🚀 Server running on port ${PORT}`));
});
