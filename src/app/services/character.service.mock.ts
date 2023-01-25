import { Atribute } from '../model/atributes';
import { Character } from '../model/character';
import { CombatEquip } from '../model/combatEquip';
import { Follower } from '../model/follower';
import { Gift } from '../model/gift';
import { GodAffinity } from '../model/godAffinity';
import { Modificator } from '../model/modificator';
import { Power } from '../model/power';
import { Skill } from '../model/skill';

export const getMockCharacter = (): Character=>   {
  const pj = new Character('Dymas');
  pj.setId('Unique mock String');
  pj.setCult('Hermes');
  pj.setPolis('Megalópolis');
  pj.setArquetype('Comerciante');
  pj.setSocialGroup('Meteco');
  pj.setSex('M');
  pj.setAge(180);
  pj.setPlayer('Pepe');
  pj.setAureoRemaining(3);
  pj.setHibris(5);

  pj.getAtributes().setAgility(new Atribute(2));
  pj.getAtributes().getAgility().setMods([new Modificator(1, 'Joven')]);
  pj.getAtributes().setComunication(new Atribute(5));
  pj.getAtributes().setReflexes(new Atribute(2));
  pj.getAtributes().setSoul(new Atribute(3));
  pj.getAtributes().setStrength(new Atribute(2));
  pj.getAtributes().setResistance(new Atribute(2));
  pj.getAtributes().setAppearance(new Atribute(5));
  pj.getAtributes().setMind(new Atribute(3));
  pj.getAtributes().setSense(new Atribute(2));
  pj.getAtributes().getSense().setMods([new Modificator(1,'Joven')]);

  pj.getCurses().push(new Gift('Codicioso', 2));
  pj.getCurses().push(new Gift('Sobreprotector con los niños', 4));

  pj.getCommonGifts().push(new Gift('Barco', 5));
  pj.getCommonGifts().push(new Gift('Instinto de supervivencia', 2));
  pj.getCommonGifts().push(new Gift('Bueno con nombres y caras', 1));
  pj.getCommonGifts().push(new Gift('Discipulos aventajados', 4));
  pj.getCommonGifts().push(new Gift('Selectivo en apareamiento', 5));

  pj.getDivineGifts().push(new Gift('Objeto mágico', 10));
  pj.getDivineGifts().push(new Gift('Eternamente joven', 5));
  pj.getDivineGifts().push(new Gift('Tutelado por Hermes', 5));

  pj.getPrymarySkills().push(new Skill('Empatia', 1));
  pj.getPrymarySkills().push(new Skill('Percibir', 3));
  pj.getPrymarySkills().push(new Skill('Armas D', 1));
  pj.getPrymarySkills().push(new Skill('Política', 2));
  pj.getPrymarySkills().push(new Skill('Atletismo', 1));
  pj.getPrymarySkills().push(new Skill('Intimidar', 2));
  pj.getPrymarySkills().push(new Skill('Coraje', 1));
  pj.getPrymarySkills().push(new Skill('Oratoria', 5));
  pj.getPrymarySkills().push(new Skill('Supervivencia', 1));
  pj.getPrymarySkills().push(new Skill('Dureza', 1));
  pj.getPrymarySkills().push(new Skill('Templanza', 1));

  pj.getSecondarySkills().push(new Skill('Filosofía', 1));
  pj.getSecondarySkills().push(new Skill('Teología', 1));
  pj.getSecondarySkills().push(new Skill('Idiomas', 1));
  pj.getSecondarySkills().push(new Skill('Intuir', 3));
  pj.getSecondarySkills().push(new Skill('Oceanología', 2));
  pj.getSecondarySkills().push(new Skill('Seducir', 1));

  // TODO Complete prays
  pj.getPowers().push(new Power('Maestro del regateo'));
  pj.getPowers().push(new Power('Servidor del pueblo'));
  pj.getPowers().push(new Power('Aura heroica'));
  pj.getPowers().push(new Power('Susurros y rumores'));

  pj.getSocialFeatures().push(new Skill('Estatus', 1));
  pj.getSocialFeatures().push(new Skill('Equipo', 2));
  pj.getSocialFeatures().push(new Skill('Monedas', 3));
  pj.getSocialFeatures().push(new Skill('Seguidores', 2));

  pj.setOtherEquip(['Botas de Cuero', 'Pieles para dormir', 'Ropajes decentes']);

  const combatEquip = new CombatEquip('Daga');
  combatEquip.setInitialDamage(4);
  pj.getCombatEquipment().push(combatEquip);

  const combatEquip2 = new CombatEquip('Arco Medio');
  combatEquip2.setInitialDamage(4);
  pj.getCombatEquipment().push(combatEquip2);

  const combatEquip3 = new CombatEquip('Armadura ligera');
  combatEquip3.setArmor(2);
  pj.getCombatEquipment().push(combatEquip3);

  const follower: Follower = new Follower('Barquímedes');
  follower.setArquetype('Marinero');
  follower.setCombat(1);
  follower.setMental(1);
  pj.getFollowers().push(follower);

  pj.setGodAfinities([
    new GodAffinity('Afrodita', 2, 0, 0),
    new GodAffinity('Apolo',    3, 0, 0),
    new GodAffinity('Ares',     3, 0, 0),
    new GodAffinity('Artemisa', 3, 0, 0),
    new GodAffinity('Atenea',   3, 0, 0),
    new GodAffinity('Dioniso',  3, 0, 0),
    new GodAffinity('Hades',    3, 0, 0),
    new GodAffinity('Hefesto',  3, 0, 0),
    new GodAffinity('Hermes',   4, 0, 0),
    new GodAffinity('Hera',     3, 0, 0),
    new GodAffinity('Poseidon', 3, 0, 0),
    new GodAffinity('Zeus',     3, 0, 0)
]);

  pj.setGloryLines(['Megalópolis +1']);
  pj.setTitles(['Regateador (10)', 'Temido (7)', 'Intuitivo (6)', 'Orador (7)']);

  pj.setOtherNotes(['Hijo de Hermes', 'Capa mágica: Saltar al agua transporta al grupo junto a mi barco.']);
  let history = 'Mi nombre es Dymas de Megalopolis, naci hace 180 inviernos en el seno de una famila modesta, mi madre, que aún vivia con mis abuelos ';
  history = history.concat(' nunca dió explicaciones de como pasó, pero fué seducida por Hermes y algún tiempo después nací yo. Los primeros años de ');
  history = history.concat('mi vida fueron quizá los más felices');
  pj.setHistory(history);

  return pj;

};
