import { Character } from '../model/character';
import { Skill } from '../model/skill';


export const getSkillAndModsValue = (character: Character, name: string): number  => {
  let theSkill: Skill = new Skill(name, 0);

  if(character.getPrymarySkills().find( skill => skill.getName() === name)){
    const skill1 = character.getPrymarySkills().find( skill => skill.getName() === name )
    theSkill = skill1 ? skill1 : theSkill;
  }
  else if(character.getSecondarySkills().find( skill => skill.getName() === name )){
    const skill2 = character.getSecondarySkills().find( skill => skill.getName() === name )
    theSkill = skill2 ? skill2 : theSkill;;
  }

  let skillValue = theSkill.getLevel();
  theSkill.getMods().forEach(mod => {
    skillValue = mod.isPartial() ? skillValue : skillValue + mod.getValue();
  });

  return skillValue;
};
