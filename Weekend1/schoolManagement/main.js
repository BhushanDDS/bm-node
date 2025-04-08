/*
7.School Management System Simulation
Assignment:
Simulate a school with students, teachers, classes, and grading — using Node.js and
OOP.
Requirements:
● Classes: Student, Teacher, Classroom, Grade
● Create:
○ 5 Teachers
○ 10 Classes
○ 30 Students
● Assign students to classes
● Assign teachers to subjects
● Randomly generate test scores and grades
📈 Output:
● Top 5 students by average grade
● Teacher with highest student average
● List of students per class with performance
*/

class Student {
    static idGen = 1;
    constructor(name) {
        this.id = Student.idGen++;
        this.name = name;
        this.grades = [];
    }

    addGrade(grade) {
        this.grades.push(grade);
    }

    getAverage() {
        if (this.grades.length === 0) return 0;
        const total = this.grades.reduce((sum, grade) => sum + grade.score, 0);
        return total / this.grades.length;
    }
}

class Teacher {
    static idGen = 1;
    constructor(name, subject) {
        this.id = Teacher.idGen++;
        this.name = name;
        this.subject = subject;
        this.classes = [];
    }

    assignClassroom(classroom) {
        this.classes.push(classroom);
    }

    getStudentAverage() {
        let allGrades = [];
        this.classes.forEach(cls => {
            cls.students.forEach(student => {
                const grades = student.grades.filter(g => g.subject === this.subject);
                allGrades.push(...grades);
            });
        });
        if (allGrades.length === 0) return 0;
        const total = allGrades.reduce((sum, grade) => sum + grade.score, 0);
        return total / allGrades.length;
    }
}

class Classroom {
    static idGen = 1;
    constructor(name, subject, teacher) {
        this.id = Classroom.idGen++;
        this.name = name;
        this.subject = subject;
        this.teacher = teacher;
        this.students = [];
    }

    enrollStudent(student) {
        this.students.push(student);
    }

    assignGrades() {
        this.students.forEach(student => {
            const score = Math.floor(Math.random() * 41) + 60;
            const grade = new Grade(this.subject, score, this.teacher);
            student.addGrade(grade);
        });
    }
}

class Grade {
    constructor(subject, score, teacher) {
        this.subject = subject;
        this.score = score;
        this.teacher = teacher;
    }
}

const subjects = ["Math", "Science", "History", "English", "Geography"];
const classNames = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
const studentNames = Array.from({ length: 30 }, (_, i) => `Student ${i + 1}`);
const teacherNames = Array.from({ length: 5 }, (_, i) => `Teacher ${i+1}`);

const teachers = teacherNames.map((name, i) => new Teacher(name, subjects[i]));


const classrooms = classNames.map((name, i) => {
    const subjectIndex = i % subjects.length;
    const teacher = teachers[subjectIndex];
    const classroom = new Classroom(name, subjects[subjectIndex], teacher);
    teacher.assignClassroom(classroom);
    return classroom;
});

const students = studentNames.map(name => new Student(name));


students.forEach(student => {
    const shuffled = [...classrooms].sort(() => Math.random() - 0.5);
    shuffled.slice(0, 3).forEach(cls => cls.enrollStudent(student));
});

classrooms.forEach(cls => cls.assignGrades());


// Top 5 Students
const topStudents = [...students]
    .sort((a, b) => b.getAverage() - a.getAverage())
    .slice(0, 5);

console.log("\n Top 5 Students by Average Grade:");
topStudents.forEach((student, i) => {
    console.log(`${i + 1}. ${student.name} - Avg: ${student.getAverage().toFixed(2)}`);
});

// Teacher with Highest Student Average
const topTeacher = [...teachers]
    .sort((a, b) => b.getStudentAverage() - a.getStudentAverage())[0];

console.log(`\n Teacher with Highest Student Average:`);
console.log(`${topTeacher.name} (${topTeacher.subject}) - Avg: ${topTeacher.getStudentAverage().toFixed(2)}`);

// Students per Class
console.log(`\n Student Performance by Classroom:`);
classrooms.forEach(cls => {
    console.log(`\n${cls.name} (${cls.subject}) - Teacher: ${cls.teacher.name}`);
    cls.students.forEach(student => {
        const subjectGrades = student.grades.filter(g => g.subject === cls.subject);
        const score = subjectGrades.length > 0 ? subjectGrades[0].score : "N/A";
        console.log(`- ${student.name}: ${score}`);
    });
});