document.getElementById('csvFileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    Papa.parse(file, {
        header: false, // We want raw indices for A1, A2 style access
        skipEmptyLines: true,
        complete: function(results) {
            const data = results.data;
            renderTable1(data);
            processTable2(data);
        }
    });
});

function renderTable1(data) {
    let html = '<table>';
    data.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
            html += `<td>${cell}</td>`;
        });
        html += '</tr>';
    });
    html += '</table>';
    document.getElementById('table1-container').innerHTML = html;
}

function processTable2(data) {
    /**
     * Helper to get value from Table 1 based on Excel logic.
     * Excel "A5" is actually data[4][1] if Column A is the label and Column B is the value.
     */
    const getVal = (rowNum) => {
        // rowNum - 1 because JS arrays are 0-indexed.
        // Index [1] assumes the numeric value is in the second column.
        return parseFloat(data[rowNum - 1][1]);
    };

    try {
        // Values based on your requirements:
        const alpha = getVal(5) + getVal(20);
        const beta = getVal(15) / getVal(7);
        const charlie = getVal(13) * getVal(12);

        document.getElementById('val-alpha').textContent = alpha;
        document.getElementById('val-beta').textContent = Math.floor(beta); // Integer as requested
        document.getElementById('val-charlie').textContent = charlie;
    } catch (err) {
        console.error("Error processing math:", err);
        alert("Make sure the CSV matches the expected row format!");
    }
}