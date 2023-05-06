const Intern = require('../lib/Intern');

test('creates an Intern object', () => {
    const intern = new Intern('Jeanna', 1, 'jeanna1@gmail.com', 'ASU');

    expect(intern.school).toEqual(expect.any(String));
});

test('gets employee school', () => {
    const intern = new Intern('Jeanna', 1, 'jjeanna1@gmail.com', 'ASU');

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test('gets role of employee', () => {
    const intern = new Intern('Jeanna', 1, 'jeanna1@gmail.com', 'ASU');

    expect(intern.getRole()).toEqual("Intern");
});