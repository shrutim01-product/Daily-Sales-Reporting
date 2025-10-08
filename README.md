# Daily Sales Reporting Dashboard

A comprehensive web-based dashboard for tracking daily sales visits, machine repairs, and pipeline management for medical equipment sales teams.

## Features

### 📊 Data Entry Form
- **Sales Person Information**: Track which salesperson conducted the visit
- **Visit Details**: Date, doctor name, location, and purpose of visit
- **Pipeline Management**: Track doctors through different sales pipeline stages
- **Machine Repair Tracking**: Record machine model, name, and repair notes
- **Visit Notes**: Additional notes and observations

### 📈 Analytics & Charts
1. **Doctors Visited per Salesperson**: Bar chart showing visit counts
2. **Machines Repaired per Salesperson**: Doughnut chart tracking repairs
3. **Sales Pipeline Stages**: Pie chart showing distribution of doctors across pipeline stages
4. **Visit Purpose Distribution**: Horizontal bar chart showing visit types

### 💾 Data Management
- **Local Storage**: All data is saved locally in your browser
- **Export Functionality**: Export all data to CSV format
- **Edit & Delete**: Modify or remove existing records
- **Data Table**: View all records in a sortable table

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Clean, professional interface with gradient backgrounds
- **Interactive Charts**: Powered by Chart.js for smooth animations
- **Color-coded Pipeline**: Visual indicators for different sales stages

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The dashboard will load with today's date pre-filled
3. Start entering your sales visit data

### Adding a New Visit Record
1. Fill in the required fields (marked with *)
2. Select appropriate pipeline stage and visit purpose
3. Add machine details if applicable
4. Include any relevant notes
5. Click "Add Visit Record"

### Managing Data
- **Edit**: Click the "Edit" button in the data table to modify a record
- **Delete**: Click the "Delete" button to remove a record
- **Export**: Use the "Export Data" button to download a CSV file
- **Clear All**: Use the "Clear All Data" button to remove all records

### Understanding the Charts
- **Doctors Visited**: Shows total number of unique doctor visits per salesperson
- **Machines Repaired**: Tracks repairs completed (when machine model and name are provided)
- **Pipeline Stages**: Visualizes where doctors are in the sales process
- **Visit Purpose**: Shows distribution of different visit types

## Sales Pipeline Stages
- **Lead**: Initial contact made
- **Prospect**: Potential customer identified
- **Qualified**: Customer needs confirmed
- **Proposal**: Formal proposal submitted
- **Negotiation**: Price and terms discussion
- **Closed Won**: Deal successfully closed
- **Closed Lost**: Opportunity lost

## Visit Purpose Options
- Initial Contact
- Follow-up
- Product Demo
- Machine Repair
- Training
- Contract Discussion
- Maintenance

## Technical Details

### Built With
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: Interactive functionality
- **Chart.js**: Data visualization
- **Local Storage**: Data persistence

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Data Storage
- All data is stored locally in your browser
- Data persists between sessions
- No server required - fully client-side application

## Customization

### Adding New Pipeline Stages
1. Edit the `select` options in `index.html` for the pipeline stage field
2. Add corresponding CSS styling in `script.js` for the pipeline stage colors

### Adding New Visit Purposes
1. Edit the `select` options in `index.html` for the visit purpose field
2. The charts will automatically update to include new categories

### Styling Changes
- Modify `styles.css` to change colors, fonts, or layout
- Update the gradient backgrounds by changing the CSS linear-gradient values

## Security & Privacy
- All data is stored locally on your device
- No data is sent to external servers
- Export functionality allows you to backup your data
- Clear data option allows you to remove all stored information

## Support
This dashboard is designed to be self-contained and easy to use. All functionality is built into the three main files:
- `index.html` - Structure and layout
- `styles.css` - Styling and responsive design
- `script.js` - Interactive functionality and data management

For questions or issues, refer to the browser's developer console for any error messages.
