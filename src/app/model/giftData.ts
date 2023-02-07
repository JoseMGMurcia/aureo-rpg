

export class GiftData {
  public COMMON_GIFTS: { PHYSICAL: TextGift[],  MENTAL: TextGift[], SUPERNATURALS: TextGift[], SOCIAL: TextGift[] } =
    { PHYSICAL: [], MENTAL: [], SUPERNATURALS: [], SOCIAL: [] };
  public CURSES: {  PHYSICAL: TextGift[], MENTAL: TextGift[], SUPERNATURALS: TextGift[],  SOCIAL: TextGift[] } =
    { PHYSICAL: [], MENTAL: [], SUPERNATURALS: [], SOCIAL: [] };
  public DIVINE_GIFTS: TextGift[] = [];
  constructor(){}
}


export class TextGift {
  public ID = '';
  public NAME = '';
  public COST: number[]= [];
  public DESCRIPTION = '';
  public RULES = '';
  public CONDITIONS = '';
}
