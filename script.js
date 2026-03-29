document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: function(results) {
                const data = results.data;
                renderTable(data);
                mathTable(data);
            }
        });
    }
});

function renderTable(data) {
    let html = "<table>";
    data.forEach(row => {
        html += "<tr>";
        row.forEach(cell => {
            html += '<td>' + cell + '</td>';
        });
        html += "</tr>";
    })
    html += "</table>";
    document.getElementById('tableRender').innerHTML = html;
}

function mathTable(data) {

    const getVal = (rowNum) => {
    return parseFloat(data[rowNum][1]);
    };

    const alpha = getVal(5) + getVal(20);
    const beta = getVal(15) / getVal(7);
    const charlie = getVal(13) * getVal(12);

    document.getElementById('alpha').textContent = alpha;
    document.getElementById('beta').textContent = Math.floor(beta);
    document.getElementById('charlie').textContent = charlie;
};