// Sales Reporting Dashboard JavaScript

class SalesDashboard {
    constructor() {
        this.salesData = this.loadData();
        this.charts = {};
        this.currentEditIndex = -1;
        
        this.initializeEventListeners();
        this.renderTable();
        this.initializeCharts();
        this.updateCharts();
        
        // Set default date to today
        document.getElementById('visitDate').value = new Date().toISOString().split('T')[0];
    }

    // Load data from localStorage
    loadData() {
        const savedData = localStorage.getItem('salesData');
        return savedData ? JSON.parse(savedData) : [];
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('salesData', JSON.stringify(this.salesData));
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Form submission
        document.getElementById('salesForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Clear form button
        document.getElementById('clearForm').addEventListener('click', () => {
            this.clearForm();
        });

        // Refresh charts button
        document.getElementById('refreshCharts').addEventListener('click', () => {
            this.updateCharts();
        });

        // Export data button
        document.getElementById('exportData').addEventListener('click', () => {
            this.exportData();
        });

        // Clear all data button
        document.getElementById('clearData').addEventListener('click', () => {
            this.clearAllData();
        });
    }

    // Handle form submission
    handleFormSubmit() {
        const formData = new FormData(document.getElementById('salesForm'));
        const visitRecord = {
            id: Date.now(),
            salesPerson: formData.get('salesPerson'),
            visitDate: formData.get('visitDate'),
            doctorName: formData.get('doctorName'),
            doctorLocation: formData.get('doctorLocation'),
            visitPurpose: formData.get('visitPurpose'),
            pipelineStage: formData.get('pipelineStage'),
            machineModel: formData.get('machineModel'),
            machineName: formData.get('machineName'),
            repairNotes: formData.get('repairNotes'),
            visitNotes: formData.get('visitNotes'),
            timestamp: new Date().toISOString()
        };

        if (this.currentEditIndex >= 0) {
            // Edit existing record
            this.salesData[this.currentEditIndex] = visitRecord;
            this.currentEditIndex = -1;
            this.showMessage('Visit record updated successfully!', 'success');
        } else {
            // Add new record
            this.salesData.push(visitRecord);
            this.showMessage('Visit record added successfully!', 'success');
        }

        this.saveData();
        this.renderTable();
        this.updateCharts();
        this.clearForm();
    }

    // Clear form
    clearForm() {
        document.getElementById('salesForm').reset();
        document.getElementById('visitDate').value = new Date().toISOString().split('T')[0];
        this.currentEditIndex = -1;
        document.querySelector('.btn-primary').textContent = 'Add Visit Record';
    }

    // Show message
    showMessage(message, type) {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        const form = document.getElementById('salesForm');
        form.insertBefore(messageDiv, form.firstChild);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Render data table
    renderTable() {
        const tbody = document.getElementById('recordsTableBody');
        tbody.innerHTML = '';

        if (this.salesData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" class="empty-state">
                        <h3>No visit records yet</h3>
                        <p>Start by adding your first sales visit record above.</p>
                    </td>
                </tr>
            `;
            return;
        }

        // Sort by date (newest first)
        const sortedData = [...this.salesData].sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));

        sortedData.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(record.visitDate).toLocaleDateString()}</td>
                <td>${record.salesPerson}</td>
                <td>${record.doctorName}</td>
                <td>${record.doctorLocation}</td>
                <td>${record.visitPurpose}</td>
                <td><span class="pipeline-stage ${record.pipelineStage.toLowerCase().replace(' ', '-')}">${record.pipelineStage}</span></td>
                <td>${record.machineModel || '-'}</td>
                <td>${record.machineName || '-'}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="dashboard.editRecord(${record.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="dashboard.deleteRecord(${record.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Edit record
    editRecord(id) {
        const index = this.salesData.findIndex(record => record.id === id);
        if (index >= 0) {
            const record = this.salesData[index];
            this.currentEditIndex = index;

            // Populate form
            document.getElementById('salesPerson').value = record.salesPerson;
            document.getElementById('visitDate').value = record.visitDate;
            document.getElementById('doctorName').value = record.doctorName;
            document.getElementById('doctorLocation').value = record.doctorLocation;
            document.getElementById('visitPurpose').value = record.visitPurpose;
            document.getElementById('pipelineStage').value = record.pipelineStage;
            document.getElementById('machineModel').value = record.machineModel || '';
            document.getElementById('machineName').value = record.machineName || '';
            document.getElementById('repairNotes').value = record.repairNotes || '';
            document.getElementById('visitNotes').value = record.visitNotes || '';

            document.querySelector('.btn-primary').textContent = 'Update Visit Record';
            document.getElementById('salesForm').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Delete record
    deleteRecord(id) {
        if (confirm('Are you sure you want to delete this record?')) {
            this.salesData = this.salesData.filter(record => record.id !== id);
            this.saveData();
            this.renderTable();
            this.updateCharts();
            this.showMessage('Record deleted successfully!', 'success');
        }
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to delete ALL records? This action cannot be undone.')) {
            this.salesData = [];
            this.saveData();
            this.renderTable();
            this.updateCharts();
            this.showMessage('All data cleared successfully!', 'success');
        }
    }

    // Initialize charts
    initializeCharts() {
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        };

        // Doctors visited chart
        this.charts.doctorsVisited = new Chart(
            document.getElementById('doctorsVisitedChart'),
            {
                type: 'bar',
                data: { labels: [], datasets: [] },
                options: {
                    ...chartOptions,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            }
        );

        // Machines repaired chart
        this.charts.machinesRepaired = new Chart(
            document.getElementById('machinesRepairedChart'),
            {
                type: 'doughnut',
                data: { labels: [], datasets: [] },
                options: chartOptions
            }
        );

        // Pipeline chart
        this.charts.pipeline = new Chart(
            document.getElementById('pipelineChart'),
            {
                type: 'pie',
                data: { labels: [], datasets: [] },
                options: chartOptions
            }
        );

        // Purpose chart
        this.charts.purpose = new Chart(
            document.getElementById('purposeChart'),
            {
                type: 'bar',
                data: { labels: [], datasets: [] },
                options: {
                    ...chartOptions,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            }
        );
    }

    // Update all charts
    updateCharts() {
        this.updateDoctorsVisitedChart();
        this.updateMachinesRepairedChart();
        this.updatePipelineChart();
        this.updatePurposeChart();
    }

    // Update doctors visited chart
    updateDoctorsVisitedChart() {
        const salesPersonStats = {};
        
        this.salesData.forEach(record => {
            if (!salesPersonStats[record.salesPerson]) {
                salesPersonStats[record.salesPerson] = 0;
            }
            salesPersonStats[record.salesPerson]++;
        });

        const labels = Object.keys(salesPersonStats);
        const data = Object.values(salesPersonStats);

        this.charts.doctorsVisited.data = {
            labels: labels,
            datasets: [{
                label: 'Doctors Visited',
                data: data,
                backgroundColor: [
                    '#667eea', '#764ba2', '#f093fb', '#f5576c',
                    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                    '#ffecd2', '#fcb69f'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        };

        this.charts.doctorsVisited.update();
    }

    // Update machines repaired chart
    updateMachinesRepairedChart() {
        const salesPersonRepairs = {};
        
        this.salesData.forEach(record => {
            if (record.machineModel && record.machineName) {
                if (!salesPersonRepairs[record.salesPerson]) {
                    salesPersonRepairs[record.salesPerson] = 0;
                }
                salesPersonRepairs[record.salesPerson]++;
            }
        });

        const labels = Object.keys(salesPersonRepairs);
        const data = Object.values(salesPersonRepairs);

        this.charts.machinesRepaired.data = {
            labels: labels,
            datasets: [{
                label: 'Machines Repaired',
                data: data,
                backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
                    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        };

        this.charts.machinesRepaired.update();
    }

    // Update pipeline chart
    updatePipelineChart() {
        const pipelineStats = {};
        
        this.salesData.forEach(record => {
            if (!pipelineStats[record.pipelineStage]) {
                pipelineStats[record.pipelineStage] = 0;
            }
            pipelineStats[record.pipelineStage]++;
        });

        const labels = Object.keys(pipelineStats);
        const data = Object.values(pipelineStats);

        this.charts.pipeline.data = {
            labels: labels,
            datasets: [{
                label: 'Doctors in Pipeline',
                data: data,
                backgroundColor: [
                    '#ff6b6b', '#ffa726', '#ffeb3b', '#66bb6a',
                    '#42a5f5', '#ab47bc', '#ef5350', '#26a69a'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        };

        this.charts.pipeline.update();
    }

    // Update purpose chart
    updatePurposeChart() {
        const purposeStats = {};
        
        this.salesData.forEach(record => {
            if (!purposeStats[record.visitPurpose]) {
                purposeStats[record.visitPurpose] = 0;
            }
            purposeStats[record.visitPurpose]++;
        });

        const labels = Object.keys(purposeStats);
        const data = Object.values(purposeStats);

        this.charts.purpose.data = {
            labels: labels,
            datasets: [{
                label: 'Visit Purpose',
                data: data,
                backgroundColor: [
                    '#667eea', '#764ba2', '#f093fb', '#f5576c',
                    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
                ],
                borderColor: '#fff',
                borderWidth: 1
            }]
        };

        this.charts.purpose.update();
    }

    // Export data to CSV
    exportData() {
        if (this.salesData.length === 0) {
            alert('No data to export!');
            return;
        }

        const headers = [
            'Date', 'Sales Person', 'Doctor Name', 'Doctor Location',
            'Visit Purpose', 'Pipeline Stage', 'Machine Model', 'Machine Name',
            'Repair Notes', 'Visit Notes'
        ];

        const csvContent = [
            headers.join(','),
            ...this.salesData.map(record => [
                record.visitDate,
                `"${record.salesPerson}"`,
                `"${record.doctorName}"`,
                `"${record.doctorLocation}"`,
                `"${record.visitPurpose}"`,
                `"${record.pipelineStage}"`,
                `"${record.machineModel || ''}"`,
                `"${record.machineName || ''}"`,
                `"${record.repairNotes || ''}"`,
                `"${record.visitNotes || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `sales_data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage('Data exported successfully!', 'success');
    }
}

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new SalesDashboard();
});

// Add some CSS for pipeline stage styling
const style = document.createElement('style');
style.textContent = `
    .pipeline-stage {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .pipeline-stage.lead { background: #ffeb3b; color: #333; }
    .pipeline-stage.prospect { background: #ff9800; color: white; }
    .pipeline-stage.qualified { background: #2196f3; color: white; }
    .pipeline-stage.proposal { background: #9c27b0; color: white; }
    .pipeline-stage.negotiation { background: #f44336; color: white; }
    .pipeline-stage.closed-won { background: #4caf50; color: white; }
    .pipeline-stage.closed-lost { background: #9e9e9e; color: white; }
`;
document.head.appendChild(style);
