import { LIB_ITEM_TAGS } from "./constants";

export type APITag = LIB_ITEM_TAGS;

export type APISingleType = {
  name: string;
  lib?: string;
  kind?: string;
  source?: string;
  isArray?: boolean;
}

export type APIType = APISingleType | APISingleType[];

export type APITypeParam = {
  id: number;
  name: string;
  type: APIType;
  comment: string;
  tags: APITag[];
  default: APIType;
}

export type APIVariable = {
  id: number;
  name: string;
  optional: boolean;
  type: APIType;
  comment: string;
  tags: APITag[];
  defaultValue: string;
}

export type APIMethod = {
  id: number;
  name: string;
  params: APIVariable[];
  typeParams: APITypeParam[];
  type: APIType;
  source: string;
  comment: string;
  example: string;
  tags: APITag[];
}

export type APIAccessor = {
  id: number;
  name: string;
  source: string;
  comment: string;
  setter: APIMethod;
  getter: APIMethod;
}

export type APIClass = {
  name: string;
  extends: APISingleType[];
  implements: APISingleType;
  source: string;
  tags: APITag[];
  comment: string;
  example: string;
  constructors: APIMethod[];
  properties: APIVariable[];
  accessors: APIAccessor[];
  methods: APIMethod[];
}

export type APIFunction = {
  name: string;
  params: APIVariable[];
  type: APIType;
  source: string;
  tags: APITag[];
  comment: string;
  example: string;
}

export type APILib = {
  name: string;
  description: string;
  classes: APIClass[];
  functions: APIFunction[];
}