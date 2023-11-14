export type APIType = {
  name: string;
  lib?: string;
  kind?: string;
  source?: string;
  isArray?: boolean;
}

export type APICommentItem = {
  text: string;
  list?: APICommentItem[];
  target?: number;
  isCode?: boolean;
}

export type APIComment = APICommentItem[]

export type APIParam = {
  id: number;
  name: string;
  optional: boolean;
  type: APIType | APIType[];
  comment: APIComment;
  defaultValue: string;
}

export type APIMethod = {
  id: number;
  name: string;
  params: APIParam[];
  type: APIType | APIType[];
  source: string;
  comment: APIComment;
}

export type APIAccessor = {
  id: number;
  name: string;
  source: string;
  comment: APIComment;
  setter: APIMethod;
  getter: APIMethod;
}

export type APIClass = {
  name: string;
  extends: string;
  source: string;
  comment: APIComment;
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
  comment: APIComment;
}

export type APILib = {
  name: string;
  description: string;
  classes: APIClass[];
  functions: APIFunction[];
}