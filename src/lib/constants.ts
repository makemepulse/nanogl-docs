export enum SECTIONS {
  GUIDE = 'guide',
  API = 'api',
  EXAMPLES = 'examples',
}

export enum LIB_ITEM_TYPE {
  FUNCTION = 'functions',
  CLASS = 'classes',
}

export enum LIB_ITEM_TAGS {
  ABSTRACT = 'abstract',
  OPTIONAL = 'optional',
  READONLY = 'readonly',
  PROTECTED = 'protected',
  PRIVATE = 'private',
  STATIC = 'static',
}

export const LIB_ITEM_FLAGS_TAGS = {
  "isAbstract": LIB_ITEM_TAGS.ABSTRACT,
  "isOptional": LIB_ITEM_TAGS.OPTIONAL,
  "isReadonly": LIB_ITEM_TAGS.READONLY,
  "isProtected": LIB_ITEM_TAGS.PROTECTED,
  "isPrivate": LIB_ITEM_TAGS.PRIVATE,
  "isStatic": LIB_ITEM_TAGS.STATIC,
}