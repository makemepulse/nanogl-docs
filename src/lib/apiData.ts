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

export type APIParam = {
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
  params: APIParam[];
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
  extends: string;
  source: string;
  tags: APITag[];
  comment: string;
  example: string;
  constructors: APIMethod[];
  properties: APIParam[];
  accessors: APIAccessor[];
  methods: APIMethod[];
}

export type APIFunction = {
  name: string;
  params: APIParam[];
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