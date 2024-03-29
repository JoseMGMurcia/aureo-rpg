import { COMBAT_EQUIP_CATALOG } from '../constants/equip.constants';
import { combatEquipFactory } from '../controller/combat.equip.controller';
import { Atribute } from '../model/atributes';
import { Character } from '../model/character';
import { CombatEquip } from '../model/combatEquip';
import { Companion } from '../model/companion';
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
  pj.getAtributes().setSense(new Atribute(3));
  pj.getAtributes().getSense().setMods([new Modificator(1,'Joven')]);

  pj.getCurses().push(new Gift('CUSO13', 2));
  pj.getCurses().push(new Gift('CUSO21', 4));

  pj.getCommonGifts().push(new Gift('CGSO22', -5));
  pj.getCommonGifts().push(new Gift('CGME06', -2));
  pj.getCommonGifts().push(new Gift('CGSO01', -1));
  pj.getCommonGifts().push(new Gift('CGSO02', -4));
  pj.getCommonGifts().push(new Gift('CGSO11', -1));

  pj.getDivineGifts().push(new Gift('DG01', -10));
  pj.getDivineGifts().push(new Gift('DG07', -5));
  pj.getDivineGifts().push(new Gift('DG27', -5));

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
  pj.getPowers().push(new Power('HRM12'));
  pj.getPowers().push(new Power('HRM17'));
  pj.getPowers().push(new Power('ZEUS01'));
  pj.getPowers().push(new Power('HRM20'));

  pj.getSocialFeatures().push(new Skill('Estatus', 1));
  pj.getSocialFeatures().push(new Skill('Equipo', 2));
  pj.getSocialFeatures().push(new Skill('Monedas', 3));
  pj.getSocialFeatures().push(new Skill('Seguidores', 2));

  pj.setOtherEquip(['Botas de Cuero', 'Pieles para dormir', 'Ropajes decentes']);

  const dagger = combatEquipFactory(COMBAT_EQUIP_CATALOG.WEAPON_CC_SHORT, 'Daga');
  pj.getCombatEquipment().push(dagger);

  const mediumBow = combatEquipFactory(COMBAT_EQUIP_CATALOG.WEAPON_D_MEDIUM, 'Arco Medio');
  pj.getCombatEquipment().push(mediumBow);

  const lightArmor = combatEquipFactory(COMBAT_EQUIP_CATALOG.ARMOR_LIGHT, 'Armadura ligera');
  pj.getCombatEquipment().push(lightArmor);

  const follower: Follower = new Follower('Barquímedes');
  follower.setArquetype('Marinero');
  follower.setCombat(1);
  follower.setMental(1);
  pj.getFollowers().push(follower);

  pj.setGodAfinities([
    new GodAffinity('Afrodita', 2, 0, 0),
    new GodAffinity('Apolo'),
    new GodAffinity('Ares'),
    new GodAffinity('Artemisa'),
    new GodAffinity('Atenea'),
    new GodAffinity('Dioniso'),
    new GodAffinity('Hades'),
    new GodAffinity('Hefesto'),
    new GodAffinity('Hermes', 4, 0, 0),
    new GodAffinity('Hera'),
    new GodAffinity('Poseidon'),
    new GodAffinity('Zeus')
]);

  pj.setCompanions([
    new Companion('Vengatrix', 'Sr. Morado', 'Hera'),
    new Companion('Noblius', 'Sr. Azul', 'Hefesto'),
    new Companion('Mortis', 'Sr. Rojo', 'Ares')
  ]);

  pj.setGloryLines(['Megalópolis +1']);
  pj.setTitles(['Regateador (10)', 'Temido (7)', 'Intuitivo (6)', 'Orador (7)']);

  pj.setOtherNotes(['Hijo de Hermes', 'Capa mágica: Saltar al agua transporta al grupo junto a mi barco.']);
  let history =  `Mi nombre es Dymas de Megalopolis, naci hace 180 inviernos en el seno de una famila modesta, mi madre, que aún vivia con mis abuelos
 en una pequeña familia de pastores nunca dió explicaciones de como pasó, pero fué seducida por Hermes y algún tiempo después nací yo. Los primeros años de mi vida fueron quizá los más felices
 Mi juventud en Megalópolis fue una épocade excesos y corredurias poco épicas.
 Durante mi vigesimo octavo invierno, Hermes mi padre de habló por primera vez, prefiero no reproducir aquellas palabras, no fueron muy amables, me echó en cara mi modo de vida y me pidió un favor
  otro hijo suyo, aun muy joven, habia caido en manos peligrosas y quería que yo lo salvase, me negé en redondo, cosa de la que no estoy orgulloso y cuando insistió le dije que no estaba dispuesto
  a perder los años de mi vida huyendo con un niño. Un par de semanas después vi al niño en un mercado de esclavos junto al rio Helisonte, su mirada fué devastadora, tocó algo en mi interior.
  Esa noche me escurrí sin ser visto entre los esclavos y saqué al niño a nado por el rio hasta una pequeña barca con la que huimos de la ciudad. Mi hermano me preguntó que como podía ser tan necio
  de haber accedido a los deseos de Hermes tras primero haberlos negado y que si era consciente de que padre no nos ayudaría en esas condiciones, por primera vez nada me importaba, durante unas
  semanas navegamos rio abajo y nos hicimos pasar por hermanos que viajabamos para comerciar con los pueblos pescadores de la costa Mas pronto que tarde descubrí que podía dejar de fingir y
  comerciar realmente, ganando unas monedas con las que comprar algo que echarnos a la boca. Pasaron los años, mi hermano creció pero no así yo, por algún motivo padre me permitió disfrutar de mi
  juventud mientras estuviese cuidando de su prole... Años despues encontré un niño medio ahogado flotando en una tabla junto al barco que ya poseía y de inmedia supe lo que habia que hacer, rescaté
  al niño y lo cuidé entre mis mejores pieles. Ese niño resultó haber caido al agua desde un barco de alguien importante en Megalópolis, y los guardias lo reconocieron en mi barco, pensando que lo
  habia secuestrado... otra vez tuve que huir. Por alguna razón este niño estaba encantado de la vida en el barco, hasta talpunto que se convirtió en un par de años en un gran marinero'
  Hasta que llegó un día en el que le pudo la responsabilidad y volvió con los suyos, no voy a hablar de quien era, pero más de quien yo creí... Unos 20 años más tarde mi fortuna habia crecido,
  y mi barco... Apareció un hombre alto y recio que me buscaba, era mi ex-marinero me pedia pasar una temporada viajando y aprendiendo de la mar, como hizo su padre antes que el. Pasaron los años y
  la historia se repitió muchas veces,  más a veces no eran uno, si no doso tres, finalmente los lazos de la familia se perpetuaron de alguna forma conmigo y me convertí en el maestro de muchos de
  ellos...Aun en día un familiar lejado de dicha familia viaja junto a mi barco, ocupanto el puesto de mi primero de abordo y siendo alguien importante parami. Los años me han convertido en un gran
  comerciante y embaucador, y me han dado conocimientos en muchas areas, si bien quizá me vence en ciertos momentos el peso del oro...`;

  pj.setHistory(history);

  return pj;

};
