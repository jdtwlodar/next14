/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    ...ProductSingleItemFragment\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductSingleItemFragment on Product {\n  id\n  name\n  description\n  categories {\n    name\n  }\n  images {\n    url\n    alt\n    width\n    height\n  }\n  price\n  rating\n}": types.ProductSingleItemFragmentFragmentDoc,
    "query ProductsGetList {\n  products(take: 10) {\n    data {\n      ...ProductsListItemFragment\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListWithPagination($count: Int!) {\n  products(take: $count) {\n    data {\n      ...ProductsListItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetListWithPaginationDocument,
    "fragment ProductsListItemFragment on Product {\n  id\n  name\n  categories {\n    name\n  }\n  images {\n    url\n    alt\n    width\n    height\n  }\n  price\n}": types.ProductsListItemFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    ...ProductSingleItemFragment\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductSingleItemFragment on Product {\n  id\n  name\n  description\n  categories {\n    name\n  }\n  images {\n    url\n    alt\n    width\n    height\n  }\n  price\n  rating\n}"): typeof import('./graphql').ProductSingleItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products(take: 10) {\n    data {\n      ...ProductsListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListWithPagination($count: Int!) {\n  products(take: $count) {\n    data {\n      ...ProductsListItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListWithPaginationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductsListItemFragment on Product {\n  id\n  name\n  categories {\n    name\n  }\n  images {\n    url\n    alt\n    width\n    height\n  }\n  price\n}"): typeof import('./graphql').ProductsListItemFragmentFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
