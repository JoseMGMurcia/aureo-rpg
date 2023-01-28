# AureoRPG
#### Aureo roleplaying game support app

This aplication is built in **Ionic 6, capacitor-Angular-15** using internal *ionic Storage*, and have been testing in Android  & iOS platforms.
The goal is to be used by Aureo game players as an alternative to a paper and dices.

Current versión 1.0.2

### The first goal, main funcionality (In progress):
- Users can create a complete set of characters, storage and manage it.
  - [x] Add Storage.
  - [x] Delete character.
  - [x] Add character.
  - [x] Tabs for character detail page.(General / combat / powers / skills / background )
  - [x] Represent current character in the tabs.
    - [x] General.
      - [x] Info.
      - [x] Atributes.
      - [x] God Affinities.
    - [x] Combat.
    - [x] Powers.
      - [x] Divine Gifts.
      - [x] Gifts.
      - [x] Prays.
    - [x] Skills.
      - [x] Primary Skills.
      - [x] Secondary Skills.
    - [x] Background.
      - [x] Social Ranks.
    - [x] Represent Calculated ranks.
  - [x] Character mapping from JSON.
  - [ ] Editing character in tab.
    - [ ] Character validation first method.
      - [ ] By types.
      - [ ] Numbers in ranks.
      - [ ] Strings or Arrays not null.
      - [ ] No special characters in strings.
    - [ ] Character Edit rework.
      - [x] Base Editing Modal.
        - [x] Edit Main info component.
          - [x] Temporal Aureo edit from detail.
          - [x] Random Polis.
        - [x] Edit Atributes/Skills component.
          - [ ] Modificator validation.
        - [ ] Edit Afinities component.
        - [ ] Edit Powers component.
        - [ ] Edit Gifts component.
        - [ ] Edit List component.
          - [ ] Glory / Infamy variation.
        - [ ] XP edit from detail.
        - [ ] Edit Combat equip component.
        - [ ] Edit Followers component.
        - [ ] Edit History component.
  - [x] Segment buttons to Icons.

 
- Fisrt Design, users can't see empty or undesigned pages.
  - [x] Home page first design.
    - [x] Description text.
    - [x] Image
    - [x] Redirecting button
  - [x] Detail Page / general, Info redesign.
  - [ ] Change app name for Android users.
  - [ ] App Icon.
  - [ ] Same icon on side Menu header.
  - [x] Colour palette.
  - [x] Dices page redesign.
  - [ ] Doc Page first design.
  - [ ] Doc Page first texts.

- [x] Angular 15 Migration.
- [x] Ionic 6 Migration.

### The second goal exporting:
- Characters import / export between devices and export to PDF.
	- [ ] As a encrypted file.

### The third goal, bot phase: 
- Many game mechanics are automated.
- Settings page.
- Second Design.
- Throw dices sacking the device.
- Best rolls tab for character.
