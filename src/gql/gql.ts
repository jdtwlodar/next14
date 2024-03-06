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
    "mutation CardAddProduct($id: ID!, $productId: String!) {\n  cartAddItem(id: $id, input: {item: {productId: $productId, quantity: 1}}) {\n    ...CartOrderFragment\n  }\n}": types.CardAddProductDocument,
    "mutation cartFindOrCreate($id: ID!) {\n  cartFindOrCreate(input: {}, id: $id) {\n    ...CartOrderFragment\n  }\n}": types.CartFindOrCreateDocument,
    "query getCardById($id: ID!) {\n  cart(id: $id) {\n    ...CartOrderFragment\n  }\n}": types.GetCardByIdDocument,
    "fragment CartOrderFragment on Cart {\n  id\n  items {\n    product {\n      id\n      name\n      price\n      categories {\n        slug\n        name\n      }\n      images {\n        url\n        alt\n      }\n    }\n  }\n}": types.CartOrderFragmentFragmentDoc,
    "mutation CartRemoveProduct($id: ID!, $productId: String!) {\n  cartRemoveItem(id: \"\", productId: \"\") {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "query CollectionsGetList($count: Int!) {\n  collections(take: $count) {\n    data {\n      description\n      name\n      id\n      slug\n    }\n  }\n}": types.CollectionsGetListDocument,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    ...ProductSingleItemFragment\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductSingleItemFragment on Product {\n  id\n  name\n  description\n  categories {\n    name\n  }\n  images {\n    url\n    alt\n    width\n    height\n  }\n  price\n  rating\n}": types.ProductSingleItemFragmentFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    name\n    description\n    products {\n      ...ProductsListItemFragment\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    description\n    id\n    name\n    slug\n    products {\n      ...ProductsListItemFragment\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetList {\n  products(take: 10) {\n    data {\n      ...ProductsListItemFragment\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListBySearch($search: String!, $count: Int!) {\n  products(search: $search, take: $count) {\n    data {\n      ...ProductsListItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetListBySearchDocument,
    "query ProductsGetListSuggestedByCategory($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductsListItemFragment\n    }\n  }\n}": types.ProductsGetListSuggestedByCategoryDocument,
    "query ProductsGetListWithPagination($count: Int!) {\n  products(take: $count) {\n    data {\n      ...ProductsListItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetListWithPaginationDocument,
    "fragment ProductsListItemFragment on Product {\n  id\n  name\n  categories {\n    name\n  }\n  images {\n    url\n    alt\n    width\n    height\n  }\n  price\n}": types.ProductsListItemFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CardAddProduct($id: ID!, $productId: String!) {\n  cartAddItem(id: $id, input: {item: {productId: $productId, quantity: 1}}) {\n    ...CartOrderFragment\n  }\n}"): typeof import('./graphql').CardAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation cartFindOrCreate($id: ID!) {\n  cartFindOrCreate(input: {}, id: $id) {\n    ...CartOrderFragment\n  }\n}"): typeof import('./graphql').CartFindOrCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getCardById($id: ID!) {\n  cart(id: $id) {\n    ...CartOrderFragment\n  }\n}"): typeof import('./graphql').GetCardByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartOrderFragment on Cart {\n  id\n  items {\n    product {\n      id\n      name\n      price\n      categories {\n        slug\n        name\n      }\n      images {\n        url\n        alt\n      }\n    }\n  }\n}"): typeof import('./graphql').CartOrderFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($id: ID!, $productId: String!) {\n  cartRemoveItem(id: \"\", productId: \"\") {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList($count: Int!) {\n  collections(take: $count) {\n    data {\n      description\n      name\n      id\n      slug\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
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
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    name\n    description\n    products {\n      ...ProductsListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    description\n    id\n    name\n    slug\n    products {\n      ...ProductsListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products(take: 10) {\n    data {\n      ...ProductsListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListBySearch($search: String!, $count: Int!) {\n  products(search: $search, take: $count) {\n    data {\n      ...ProductsListItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListBySearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListSuggestedByCategory($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductsListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListSuggestedByCategoryDocument;
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
