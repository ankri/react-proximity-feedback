describe('Test react-proximity-feedback', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('testing render prop: distance (y coordinates)', () => {
    cy.scrollToSection('demo-distance');

    cy.getButton('button-distance').then(({ xCenter, height }) => {
      [500, 200, 100, 50, 32, height].forEach(yCoordinate => {
        cy
          .get('@button-distance')
          .trigger('mousemove', xCenter, yCoordinate, { force: true });
        cy.get('@button-distance').contains(`${yCoordinate - height}px`);
      });
    });
  });

  it('testing render prop: isNearby', () => {
    cy.scrollToSection('demo-is-nearby');
    cy.getButton('button-is-nearby').then(({ xCenter }) => {
      [200, 100, 40, 35, 15, 0].forEach(({ yCoordinate }) => {
        cy
          .get('@button-is-nearby')
          .trigger('mousemove', xCenter, yCoordinate, { force: true });
        cy
          .get('@button-is-nearby')
          .contains(yCoordinate <= 35 ? 'nearby' : 'far away');
      });
    });
  });

  it('testing render prop proximity', () => {
    cy.scrollToSection('demo-proximity');
    cy.getButton('button-proximity').then(() => {
      cy
        .get('@button-proximity')
        .trigger('mousemove', 36, 36, { force: true })
        .wait(300) // 300 to be > ProximityFeedback props.threshold which is 250
        .then(btn => {
          expect(btn.get(0).style.outline).includes('0.49');
        });
      cy
        .get('@button-proximity')
        .trigger('mousemove', 200, 200, { force: true })
        .wait(300)
        .then(btn => {
          expect(btn.get(0).style.outline).includes('rgba(255, 0, 0, 0)');
        });
      cy
        .get('@button-proximity')
        .trigger('mousemove', 18, 18, { force: true })
        .wait(300)
        .then(btn => {
          expect(btn.get(0).style.outline).includes('rgb(255, 0, 0)');
        });
    });
  });

  it('testing prop threshold', () => {
    cy.scrollToSection('demo-props-threshold');
    cy.getButton('button-props-threshold').then(({ xCenter }) => {
      cy
        .get('@button-props-threshold')
        .trigger('mousemove', xCenter, 100, { force: true })
        .contains('nearby');
    });
    cy
      .get('input[data-test="input-props-threshold"]')
      .clear()
      .type(10)
      .blur();
    cy.getButton('button-props-threshold').then(({ xCenter }) => {
      cy
        .get('@button-props-threshold')
        .trigger('mousemove', xCenter, 100, { force: true })
        .contains('far away');
      cy
        .get('@button-props-threshold')
        .trigger('mousemove', xCenter, 5, { force: true })
        .contains('nearby');
    });
  });
});
