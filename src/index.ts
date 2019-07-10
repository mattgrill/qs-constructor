import qs from 'qs';

interface Sort {
  sort: {
    [key: string]: {
      path: string;
      direction: string;
    };
  };
}

interface FieldFilter {
  [key: string]: {
    path: string;
    operator: string;
    value: string;
    memberOf?: string;
  };
}

export type WhereOperators =
  | '='
  | '<>'
  | '>'
  | '>='
  | '<'
  | '<='
  | 'STARTS_WITH'
  | 'CONTAINS'
  | 'ENDS_WITH'
  | 'IN'
  | 'NOT IN'
  | 'BETWEEN'
  | 'NOT BETWEEN'
  | 'IS NULL'
  | 'IS NOT NULL';

export interface Where {
  path: string;
  operator: WhereOperators;
  value: string;
  group?: string;
}

export enum OrderByDirection {
  ASC = 'ASC',
  DSC = 'DSC',
}

export interface OrderBy {
  path: string;
  direction: OrderByDirection;
}

export interface ResolverArgs {
  language: string;
  id?: string | undefined;
  orderBy?: OrderBy | undefined;
  where?: Where[] | undefined;
}

const createSort = ({ path, direction }: { path: string; direction: string }): Sort => ({
  sort: {
    [`sort-${path}`]: {
      path,
      direction,
    },
  },
});

const createFieldFilters = (where: Where[] | undefined): FieldFilter =>
  (where as Where[]).reduce(
    (acc, { path, operator, value, group }): FieldFilter => ({
      ...acc,
      [`filter-${path}`]: { path, operator, value, memberOf: group },
    }),
    {},
  );

export const createQueryString = (
  { orderBy, language, id, where }: ResolverArgs,
  include: string | undefined,
): string => {
  const queryParams: string = qs.stringify(
    {
      // Create 'sorts' if any are available.
      ...((orderBy && createSort(orderBy)) || {}),
      // Attach includes if available.
      include,
      filter: {
        // Filter by languageCode
        langcode: language,
        // Filter by 'id' if available.
        id,
        // Filter by fields if any are available.
        ...((where && createFieldFilters(where)) || {}),
      },
    },
    // Set indices to false so we don't end up with a[0]=b&a[1] on arrays
    // Only encode values.
    { indices: false, encodeValuesOnly: true },
  );
  return queryParams;
};