export const SET_KIND_OF_ITEM = "SET_KIND_OF_ITEM";
export const CLEAR_KIND_OF_ITEM = "CLEAR_KIND_OF_ITEM";

export const setKindOfItem = (itemKind) => ({
  type: SET_KIND_OF_ITEM,
  payload: itemKind,
});

export const clearKindOfItem = () => ({
  type: SET_KIND_OF_ITEM,
  payload: false,
});
