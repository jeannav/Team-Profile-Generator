const Manager = require('../lib/Manager');

test('creates an Manager object', () => {
    const manager = new Manager('Jeanna', 1, 'jeanna1@gmail.com', 2);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('gets role of employee', () => {
    const manager = new Manager('Jeanna', 1, 'jeanna1@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
});