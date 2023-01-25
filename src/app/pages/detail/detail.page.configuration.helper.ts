import { TranslateService } from '@ngx-translate/core';
import { TableDataConfiguration } from 'src/app/components/table/table.component';

export const getAfinitiesDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
  const transLations = translate.instant('DETAIL_PAGE.GENERAL_SEC');
  return {
     columns: [
      {
        id: 'god',
        name: transLations.GOD
      },
      {
        id: 'afinity',
        name: transLations.AFINITY
      },
      {
        id: 'aretes',
        name: transLations.ARETES
      },
      {
        id: 'hamartias',
        name: transLations.HAMARTIAS
      }
    ]
  };
};

export const getAtributesDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
  const transLations = translate.instant('DETAIL_PAGE.GENERAL_SEC');
  return {
    columns: [
      {
        id: 'name',
        name: transLations.ATRIBUTES
      },
      {
        id: 'atribute',
        name: transLations.VALUE
      },
      {
        id: 'modif',
        name: transLations.MODIF
      }
    ]
  };
};

export const getGiftsDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
  const transLations = translate.instant('DETAIL_PAGE.POWERS_SEC');
  return {
    columns: [
      {
        id: 'name',
        name: transLations.NAME
      },
      {
        id: 'cost',
        name: transLations.COST
      }
    ]
  };
};

export const getPowersDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
  const transLations = translate.instant('DETAIL_PAGE.POWERS_SEC');
  return {
    columns: [
      {
        id: 'name',
        name: transLations.NAME
      },
      // {
      //   id: 'af',
      //   name: transLations.AF
      // },
      // {
      //   id: 'am',
      //   name: transLations.AM
      // },
      // {
      //   id: 'ae',
      //   name: transLations.AE
      // },
      {
        id: 'effect',
        name: transLations.EFFECT
      },
      {
        id: 'cost',
        name: transLations.COST
      },
      {
        id: 'duration',
        name: transLations.DURATION
      }
    ]
  };
};

export const getSkillsDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
  const transLations = translate.instant('DETAIL_PAGE.SKILLS_SEC');
  return {
    columns: [
      {
        id: 'name',
        name: transLations.NAME
      },
      {
        id: 'level',
        name: transLations.LEVEL
      },
      {
        id: 'mods',
        name: transLations.MODIF
      }
    ]
  };
};

export const getListConfiguration = (): TableDataConfiguration =>({
  swHideHeader: true,
  columns: [{
    id: 'name',
    name: ''
  }]});

  export const getCombatEquipDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
    const transLations = translate.instant('DETAIL_PAGE.COMBAT_SEC');
    return {
      columns: [
        {
          id: 'name',
          name: transLations.NAME
        },
        {
          id: 'initialDamage',
          name: transLations.INITIAL_DMG
        },
        {
          id: 'activeDefence',
          name: transLations.ACTIVE_DEFENCE
        },
        {
          id: 'armor',
          name: transLations.ARMOR
        }
      ]
    };
  };

  export const getFollowersDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
    const transLations = translate.instant('DETAIL_PAGE.BACKGROUND_SEC');
    return {
      columns: [
        {
          id: 'name',
          name: transLations.NAME
        },
        {
          id: 'mods',
          name: transLations.MODIF
        }
      ]
    };
  };

  export const getCompanionsDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
    const transLations = translate.instant('DETAIL_PAGE.BACKGROUND_SEC');
    return {
      columns: [
        {
          id: 'name',
          name: transLations.NAME
        },
        {
          id: 'player',
          name: transLations.INITIAL_DMG
        },
        {
          id: 'cult',
          name: transLations.ACTIVE_DEFENCE
        }
      ]
    };
  };


  export const getXPDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
    const transLations = translate.instant('DETAIL_PAGE.GENERAL_SEC');
    return {
      columns: [
        {
          id: 'savedXP',
          name: transLations.SAVED_XP
        },
        {
          id: 'accumulatedXP',
          name: transLations.ACUMULATED_XP
        },
        {
          id: 'aureoXP',
          name: transLations.AUREO_XP
        }
      ]
    };
  };

export const getCalculatedSkillDataConfiguration = (): TableDataConfiguration => ({
  swHideHeader: true,
  columns: [
    {
      id: 'trait',
      name: ''
    },
    {
      id: 'value',
      name: ''
    }
  ]
});

export const getAtackDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
  const transLations = translate.instant('DETAIL_PAGE.COMBAT_SEC');
  return {
    columns: [
      {
        id: 'type',
        name: transLations.TYPE
      },
      {
        id: 'roll',
        name: transLations.ROLL
      },
      {
        id: 'dmg',
        name: transLations.DAMAGE
      }
    ]
  };
};

export const getDefenceDataConfiguration = (translate: TranslateService): TableDataConfiguration =>{
  const transLations = translate.instant('DETAIL_PAGE.COMBAT_SEC');
  return {
    columns: [
      {
        id: 'type',
        name: transLations.TYPE
      },
      {
        id: 'pjs',
        name: transLations.VS_PJS
      },
      {
        id: 'pnjs',
        name: transLations.VS_PNJS
      }
    ]
  };
};
