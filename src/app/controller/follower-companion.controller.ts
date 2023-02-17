import { Companion } from "../model/companion";
import { Follower } from "../model/follower";

export const cloneFollowers = (followers: Follower[]): Follower[] =>
  followers.map((follower) => {
    const newFollower = new Follower(follower.getName());
    newFollower.setArquetype(follower.getArquetype());
    newFollower.setCombat(follower.getCombat());
    newFollower.setEspiritual(follower.getSpiritual());
    newFollower.setMental(follower.getMental());
    newFollower.setPhysical(follower.getPhysical());
    newFollower.setSocial(follower.getSocial());
    return newFollower;
  });

export const cloneCompanions = (companions: Companion[]): Companion[] =>
  companions.map((companion: Companion) =>
    new Companion(companion.getName(), companion.getName(), companion.getCult()));


