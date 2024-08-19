let studentList = [];
let editIndex = -1;

document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    
    if (editIndex === -1) {
        studentList.push({ name, age, grade });
    } else {
        studentList[editIndex] = { name, age, grade };
        editIndex = -1;
        document.getElementById('editFormContainer').classList.add('hidden');
        document.getElementById('studentForm').reset();
        return;
    }

    document.getElementById('studentForm').reset();
    renderTable();
});

function renderTable() {
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    studentList.forEach((student, index) => {
        const row = tableBody.insertRow();
        
        row.insertCell(0).textContent = student.name;
        row.insertCell(1).textContent = student.age;
        row.insertCell(2).textContent = student.grade;

        const actionsCell = row.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteStudent(index));
        actionsCell.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editStudent(index));
        actionsCell.appendChild(editButton);
    });
}

function deleteStudent(index) {
    studentList.splice(index, 1);
    renderTable();
}

function editStudent(index) {
    editIndex = index;
    const student = studentList[index];
    
    document.getElementById('editName').value = student.name;
    document.getElementById('editAge').value = student.age;
    document.getElementById('editGrade').value = student.grade;
    
    document.getElementById('editFormContainer').classList.remove('hidden');
}

document.getElementById('editStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('editName').value;
    const age = document.getElementById('editAge').value;
    const grade = document.getElementById('editGrade').value;
    
    studentList[editIndex] = { name, age, grade };
    editIndex = -1;

    document.getElementById('editFormContainer').classList.add('hidden');
    renderTable();
});
