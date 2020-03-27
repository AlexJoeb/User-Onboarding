describe("tests", () => {
    it("find the name", () => {
        cy.visit("http://localhost:3001/")

        cy.get("input[name='first_name']").type("Alexander");
        cy.get("input[name='last_name']").type("Besse");
        cy.get("input[name='email']").type("abc@123.com");
        cy.get("input[name='password']").type("123123");
        cy.get("input[type='checkbox']").check();

        cy.get("input[name='first_name']").should("not.be.empty");
        cy.get("input[name='last_name']").should("not.be.empty");
        cy.get("input[name='email']").should("not.be.empty");
        cy.get("input[name='password']").should("not.be.empty");
    })
})