# @sosd/qs-constructor

A convenient way to generate query strings for JSON:API.

## Install
```shell
yarn add @sosd/qs-constructor
```

## Usage

```typescript
import createQueryString from '@sosd/qs-constructor'

const queryString: string = createQueryString({ orderBy, language, id, where }: ResolverArgs, include: string | undefined)
```

### Interfaces

- #### `ResolverArgs`
  ```typescript
  interface ResolverArgs {
    language: string;
    id?: string | undefined;
    orderBy?: OrderBy | undefined;
    where?: Where[] | undefined;
  }
  ```

- #### `OrderBy`
  ```typescript
  interface OrderBy {
    path: string;
    direction: OrderByDirection;
  }
  ```

- #### `Where`
  ```typescript
  interface Where {
    path: string;
    operator: WhereOperators;
    value: string;
    group?: string;
  }
  ```

### Type & Enum

- #### `WhereOperators`
  ```typescript
  type WhereOperators =
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
  ```

- #### `OrderByDirection`
  ```typescript
  enum OrderByDirection {
    ASC = 'ASC',
    DSC = 'DSC',
  }
  ```



