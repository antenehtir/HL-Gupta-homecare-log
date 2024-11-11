document.getElementById('care-form').addEventListener('submit', saveRecord);

function toggleFbsRbs() {
    const ampm = document.getElementById('ampm').value;
    document.getElementById('fbs-field').classList.toggle('hidden', ampm !== 'AM');
    document.getElementById('rbs-field').classList.toggle('hidden', ampm !== 'PM');
}

function saveRecord(event) {
    event.preventDefault();
    const record = {
        date: document.getElementById('date').value,
        ampm: document.getElementById('ampm').value,
        doctor: document.getElementById('doctor').value,
        bp: document.getElementById('bp').value,
        pulse: document.getElementById('pulse').value,
        spo2: document.getElementById('spo2').value,
        temp: document.getElementById('temp').value || 'N/A',
        fbs: document.getElementById('fbs').value || '-',
        rbs: document.getElementById('rbs').value || '-',
        status: document.getElementById('status').value
    };

    let records = JSON.parse(localStorage.getItem('records')) || [];
    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));

    alert('Record saved successfully!');
    resetForm();
    displayRecords();
}

function resetForm() {
    document.getElementById('care-form').reset();
    toggleFbsRbs();
}

function displayRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const recordList = document.getElementById('record-list');
    recordList.innerHTML = '';

    records.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.ampm}</td>
            <td>${record.doctor}</td>
            <td>${record.bp}</td>
            <td>${record.pulse}</td>
            <td>${record.spo2}</td>
            <td>${record.temp}</td>
            <td>${record.fbs}</td>
            <td>${record.rbs}</td>
            <td>${record.status}</td>
            <td><button class="delete-btn" onclick="deleteRecord(${index})">Delete</button></td>
        `;
        recordList.appendChild(row);
    });

    document.getElementById('records').classList.remove('hidden');
}

function deleteRecord(index) {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    displayRecords();
}
