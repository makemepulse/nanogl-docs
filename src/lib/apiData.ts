import { LIB_ITEM_TAGS } from "./constants";

export type APITag = LIB_ITEM_TAGS;

export type APILiteralType = null | string | number | boolean;

export type APITypeListType = 'union' | 'intersection' | 'tuple';

export type APITypeOperator = 'keyof' | 'unique' | 'readonly';

export type APITypeData = {
  useAsserts?: boolean;
  operator?: APITypeOperator;
  function?: APIFunction;
  properties?: APISimpleVariable[];
  arguments?: APIType[];
  indexType?: APIType;
  literalType?: APILiteralType;
  targetType?: APIType;
  extendsType?: APIType;
  conditionalTypes?: APIType[];
}

export type APISingleType = {
  name: string;
  lib?: string;
  kind?: string;
  source?: string;
  data?: APITypeData;
  isArray?: boolean;
  isQuery?: boolean;
  isIndexed?: boolean;
  isInferred?: boolean;
}

export type APIListType = {
  listType: APITypeListType;
  list: APIType[];
  data?: {
    operator?: APITypeOperator;
  };
}

export type APIType = APIListType | APISingleType;

export type APITypeParam = {
  id: number;
  name: string;
  type: APIType;
  comment: string;
  tags: APITag[];
  default: APIType;
}

export type APISimpleVariable = {
  name: string;
  type: APIType;
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

export type APIEnumMember = {
  id: number;
  name: string;
  type: APIType;
  comment: string;
  tags: APITag[];
}

export type APIFunction = {
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
  setter: APIFunction;
  getter: APIFunction;
}

export type APIClass = {
  id: number;
  name: string;
  extends?: APISingleType[];
  implements?: APISingleType;
  source: string;
  tags: APITag[];
  comment: string;
  example: string;
  constructors: APIFunction[];
  properties: APIVariable[];
  accessors: APIAccessor[];
  methods: APIFunction[];
}

export type APIInterface = {
  id: number;
  name: string;
  extends?: APISingleType[];
  implemented?: APISingleType[];
  source: string;
  tags: APITag[];
  comment: string;
  example: string;
  properties: APIVariable[];
  accessors: APIAccessor[];
  methods: APIFunction[];
};

export type APIEnum = {
  id: number;
  name: string;
  source: string;
  tags: APITag[];
  members: APIEnumMember[];
}

export type APILibTypeSimple = {
  id: number;
  name: string;
  source: string;
  tags: APITag[];
  type: APIType;
  params?: APITypeParam[];
  useInterface?: false;
}

export type APILibTypeInterface = APIInterface & {
  useInterface: true;
}

export type APILibType = APILibTypeSimple | APILibTypeInterface;

export type APILibFunction = APIFunction;

export type APILib = {
  name: string;
  description: string;
  classes: APIClass[];
  functions: APILibFunction[];
  interfaces: APIClass[];
  enumerations: APIEnum[];
  types: APILibType[];
}