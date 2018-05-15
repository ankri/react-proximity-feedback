Cypress.Commands.add('scrollToSection', name => {
  cy.get(`a[name="${name}"]`).scrollIntoView();
});

Cypress.Commands.add('getButton', name =>
  cy
    .get(`button[data-test="${name}"]`)
    .as(name)
    .then($button => {
      const rect = $button.get(0).getBoundingClientRect();
      const height = rect.height;
      const width = $button.width();

      return {
        $button,
        rect,
        height,
        width
      };
    })
);
