var net = new brain.NeuralNetwork();

function swapData(data) {
    var dataRes = [];
    for (var i = 0; i < data.length; i++) {
        dataRes.push(parseInt(data[i], 10));
    }
    return dataRes;
}

var dataTest = [];

function successFunction(data) {
    var allRows = data.split(/\r?\n|\r/);
    var dataArray = [];
    var table = '<table>';
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
            table += '<thead>';
            table += '<tr>';
        } else {
            table += '<tr>';
        }
        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            if (singleRow === 0) {
                table += '<th>';
                table += rowCells[rowCell];
                table += '</th>';
            } else {
                table += '<td>';
                dataArray.push(rowCells[rowCell]);
                table += rowCells[rowCell];
                table += '</td>';
            }
        }
        if (singleRow === 0) {
            table += '</tr>';
            table += '</thead>';
            table += '<tbody>';
        } else {
            table += '</tr>';
        }
    }
    table += '</tbody>';
    table += '</table>';

    dataTest = (swapData(dataArray));
    net.train(neuralData(dataTest), {
        learningRate: 0.2
    });

    // console.log(Math.round(net.run([1, 1, 0, 1])));
    // console.log (Math.round(net.run(swapData(document.getElementById("test-data").value))));
    $('body').append(table);
}

function neuralTest() {
    return (Math.round(net.run(swapData(document.getElementById("test-data").value))));
}
//var dataTest = [];
$.ajax({
    url: 'csv_data.csv',
    dataType: 'text',
}).done(successFunction);

var i = 0;

function neuralData(dataArray) {
    var learnData = [];
    for (var i = 0; i < dataArray.length - 4; i += 5) {
        learnData.push({ input: [dataArray[i], dataArray[i + 1], dataArray[i + 2], dataArray[i + 3]], output: [dataArray[i + 4]] });
    }
    return learnData;
}