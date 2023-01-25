import { Character } from '../model/character';
import { Skill } from '../model/skill';


export const getSkillAndModsValue = (character: Character, name: string): number  => {
  let theSkill: Skill = new Skill(name, 0);

  if(character.getPrymarySkills().find( skill => skill.getName() === name)){
    theSkill = character.getPrymarySkills().find( skill => skill.getName() === name );
  }
  else if(character.getSecondarySkills().find( skill => skill.getName() === name )){
    theSkill = character.getSecondarySkills().find( skill => skill.getName() === name );
  }

  let skillValue = theSkill.getLevel();
  theSkill.getMods().forEach(mod => {
    skillValue = mod.isPartial ? skillValue : skillValue + mod.getValue();
  });

  return skillValue;
};
