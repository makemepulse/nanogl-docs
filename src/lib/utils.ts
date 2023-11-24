import { LIB_ITEM_TYPE } from "./constants.ts";

export const getLibItemType = (kind) => {
  if (kind === 'Class') {
    return LIB_ITEM_TYPE.CLASS;
  }

  if (kind === 'Function') {
    return LIB_ITEM_TYPE.FUNCTION;
  }

  if (kind === 'Interface') {
    return LIB_ITEM_TYPE.INTERFACE;
  }

  if (kind === 'Type alias') {
    return LIB_ITEM_TYPE.TYPE;
  }

  if (kind === 'Enumeration') {
    return LIB_ITEM_TYPE.ENUM;
  }

  return null
}