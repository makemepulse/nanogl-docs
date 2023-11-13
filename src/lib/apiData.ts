export type APIType = {
  name: string;
  lib?: string;
  kind?: string;
  source?: string;
}

export type APIParam = {
  name: string;
  optional: boolean;
  type: APIType | APIType[];
  comment: string;
  defaultValue: string;
}

export type APIMethod = {
  name: string;
  params: APIParam[];
  type: APIType | APIType[];
  source: string;
  comment: string;
}

export type APIAccessor = {
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
  comment: string;
  constructors: APIMethod[];
  properties: APIParam[];
  accessors: APIAccessor[];
  methods: APIMethod[];
}

export type APIFunction = {
  name: string;
  params: APIParam[];
  type: APIType | APIType[];
  source: string;
  comment: string;
}

export type APILib = {
  name: string;
  description: string;
  classes: APIClass[];
  functions: APIFunction[];
}