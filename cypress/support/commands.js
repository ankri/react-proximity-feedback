Cypress.Commands.add('scrollToSection', name => {
  cy.get(`a[name="${name}"]`).scrollIntoView();
});

Cypress.Commands.add('getButton', name =>
  cy
    .get(`button[data-test="${name}"]`)
    .as(name)
    .then($button => {
      const rect = $button.get(0).getBoundingClientRect();
      const xCenter = Math.floor((rect.x + rect.width) / 2);
      const height = rect.height;
      const width = $button.width();
      const yCenter = Math.floor((rect.y + rect.height) / 2);

      return {
        $button,
        rect,
        xCenter,
        yCenter,
        height,
        width
      };
    })
);
