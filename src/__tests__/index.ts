import { createQueryString, ResolverArgs, OrderByDirection } from '../index';

const resolverArgsDefaults: ResolverArgs = {
  language: '',
  id: undefined,
  orderBy: undefined,
  where: undefined,
}

test('Language Filter', (): void => {
  expect(createQueryString({
    ...resolverArgsDefaults,
    language: 'en-us'
  }, undefined)).toBe('filter[langcode]=en-us');
});

test('ID Filter', (): void => {
  expect(createQueryString({
    ...resolverArgsDefaults,
    language: 'en-us',
    id: 'c6e7a361-315c-4b00-ae41-aae65fa852bb'
  }, undefined)).toBe('filter[langcode]=en-us&filter[id]=c6e7a361-315c-4b00-ae41-aae65fa852bb');
});

test('Where Filter', (): void => {
  expect(createQueryString({
    ...resolverArgsDefaults,
    language: 'en-us',
    where: [
      {
        path: 'title',
        operator: '=',
        value: 'sampletitle',
      },
    ]
  }, undefined)).toBe('filter[langcode]=en-us&filter[filter-title][path]=title&filter[filter-title][operator]=%3D&filter[filter-title][value]=sampletitle');
  
  expect(createQueryString({
    ...resolverArgsDefaults,
    language: 'en-us',
    where: [
      {
        path: 'title',
        operator: '=',
        value: 'sampletitle',
        group: 'samplegroup'
      },
    ]
  }, undefined)).toBe('filter[langcode]=en-us&filter[filter-title][path]=title&filter[filter-title][operator]=%3D&filter[filter-title][value]=sampletitle&filter[filter-title][memberOf]=samplegroup');
});

test('OrderBy Filter', (): void => {
  expect(createQueryString({
    ...resolverArgsDefaults,
    language: 'en-us',
    orderBy: { path: 'created', direction: OrderByDirection.ASC }
  }, undefined)).toBe('sort[sort-created][path]=created&sort[sort-created][direction]=ASC&filter[langcode]=en-us');
});

test('Includes', (): void => {
  expect(createQueryString({
    ...resolverArgsDefaults,
    language: 'en-us',
  }, 'field_related_image')).toBe('include=field_related_image&filter[langcode]=en-us');
});
