enum M2_MODEL_FLAG {
  USE_COMBINER_COMBOS = 0x8,
}

enum M2_MATERIAL_BLEND {
  BLEND_OPAQUE = 0,
  BLEND_ALPHA_KEY,
  BLEND_ALPHA,
  BLEND_NO_ALPHA_ADD,
  BLEND_ADD,
  BLEND_MOD,
  BLEND_MOD2X,
}

enum M2_MATERIAL_FLAG {
  FLAG_TWO_SIDED = 0x4,
}

enum M2_TEXTURE_COMBINER {
  COMBINER_OPAQUE = 0x0,
  COMBINER_MOD = 0x1,
  COMBINER_DECAL = 0x2,
  COMBINER_ADD = 0x3,
  COMBINER_MOD2X = 0x4,
  COMBINER_FADE = 0x5,
  COMBINER_MOD2X_NA = 0x6,
  COMBINER_ADD_NA = 0x7,
}

enum M2_TEXTURE_COMPONENT {
  COMPONENT_NONE = 0,
  COMPONENT_SKIN,
  COMPONENT_OBJECT_SKIN,
  COMPONENT_WEAPON_BLADE,
  COMPONENT_WEAPON_HANDLE,
  COMPONENT_ENVIRONMENT,
  COMPONENT_CHAR_HAIR,
  COMPONENT_CHAR_FACIAL_HAIR,
  COMPONENT_SKIN_EXTRA,
  COMPONENT_UI_SKIN,
  COMPONENT_TAUREN_MANE,
  COMPONENT_MONSTER_1,
  COMPONENT_MONSTER_2,
  COMPONENT_MONSTER_3,
  COMPONENT_ITEM_ICON,
}

enum M2_TEXTURE_COORD {
  COORD_ENV = 0xffff,
  COORD_T1 = 0,
  COORD_T2,
}

enum M2_TEXTURE_FLAG {
  FLAG_WRAP_S = 0x1,
  FLAG_WRAP_T = 0x2,
}

export {
  M2_MODEL_FLAG,
  M2_MATERIAL_BLEND,
  M2_MATERIAL_FLAG,
  M2_TEXTURE_COMBINER,
  M2_TEXTURE_COORD,
  M2_TEXTURE_COMPONENT,
  M2_TEXTURE_FLAG,
};
