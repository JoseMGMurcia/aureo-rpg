export class PowersData {
  public POWERS: PowerData[] = [];

  constructor() {}
}

export class PowerData {
  public ID = '';
  public NAME = '';
  public COST = 0;
  public AM = '';
  public AE? = '';
  public AFINITY = '';
  public DURATION = '';
  public AFFECT = '';
  public DESCRIPTION = '';
  public RULES = '';
  public CONDITIONS = '';
}


export class CultsPowers {
  public cults: CultPowers[] = [];

  constructor() {}
}

export class CultPowers {
  public cultName = '';
  public powers: PowerData[] = [];
  public show = false;
}
