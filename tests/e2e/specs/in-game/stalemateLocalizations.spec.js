require('@cypress/xpath');
import en from '../../../../src/translations/en.json';
import es from '../../../../src/translations/es.json';
import fr from '../../../../src/translations/fr.json';

const changeLanguage = (name) => {
  cy.get('[id="game-menu-activator"]').click();
  cy.get('[data-cy="language-menu"]').click();
  cy.get(`[data-lang="${name}"]`).click();
};

describe('Setting up language', () => {
  beforeEach(() => {
    cy.setupGameAsP1();
    cy.get('[data-player-hand-card]').should('have.length', 6);
    cy.log('Game loaded');
  });

  describe('Checking localization of Stalemate dialog', () => {
    const checkDialogLocalization = (string, lang) => {
      changeLanguage(string);

      cy.stalemateOpponent();

      cy.xpath('//div[@id="opponent-requested-stalemate-dialog"]//h1')
        .should('contain', lang.game.dialogs.opponentRequestedStalemateDialog.title);

      cy.xpath('//div[@id="opponent-requested-stalemate-dialog"]//div[3]/p')
        .should('contain', lang.game.dialogs.opponentRequestedStalemateDialog.opponentHasRequested);

      cy.get('#opponent-requested-stalemate-dialog')
        .should('be.visible')
        .find('[data-cy=accept-stalemate]')
        .should('contain', lang.game.dialogs.opponentRequestedStalemateDialog.accept);

      cy.get('#opponent-requested-stalemate-dialog')
        .should('be.visible')
        .find('[data-cy=reject-stalemate]')
        .should('contain', lang.game.dialogs.opponentRequestedStalemateDialog.reject);
    };

    it('English localization', () => {
      checkDialogLocalization('en', en);
    });

    it('Spanish localization', () => {
      checkDialogLocalization('es', es);
    });

    it('French localization', () => {
      checkDialogLocalization('fr', fr);
    });
  });
});