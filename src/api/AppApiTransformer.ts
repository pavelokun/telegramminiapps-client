import { ResourceApiDefaultTransformer } from '@artsiombarouski/rn-resources/src/api/ResourceApiDefaultTransform';
import {
  ResourceListQuery,
  ResourcePage,
  ResourceQuery,
} from '@artsiombarouski/rn-resources/src/api/types';
import { AxiosResponse } from 'axios';
import {
  CondOperator,
  QuerySortOperator,
  RequestQueryBuilder,
} from '@dataui/crud-request';

export class AppApiTransformer extends ResourceApiDefaultTransformer {
  transformQuery(
    query?: ResourceQuery & ResourceListQuery & { or?: { [key: string]: any } }, //todo: add to lib
  ): string | undefined {
    if (!query) {
      return;
    }
    const { after, before, sort, include, filter, or, ...restQuery } = query;
    const qb = RequestQueryBuilder.create();
    if (after) {
      qb.setPage(Number(after));
    } else if (before) {
      qb.setPage(Number(before));
    }
    if (sort) {
      qb.sortBy(
        sort.map((sort) => {
          const splitted = sort.split(':');
          return {
            field: splitted[0],
            order:
              splitted.length > 1 ? (splitted[1] as QuerySortOperator) : 'ASC',
          };
        }),
      );
    }
    if (include) {
      qb.setJoin(include.map((include) => ({ field: include })));
    }
    if (or) {
      qb.setOr(
        Object.entries(or).map(([key, value]) => {
          if (value?.operator && value?.value) {
            return {
              field: key,
              value: value?.value,
              operator: value?.operator,
            };
          }
          return {
            field: key,
            operator: CondOperator.EQUALS,
            value: value,
          };
        }),
      );
    }
    if (filter) {
      qb.setFilter(
        Object.entries(filter).map(([key, value]) => {
          if (value?.operator && value?.value) {
            return {
              field: key,
              value: value?.value,
              operator: value?.operator,
            };
          }
          return { field: key, operator: CondOperator.EQUALS, value: value };
        }),
      );
    }
    Object.assign(qb.queryObject, restQuery);
    return qb.query();
  }

  // @ts-ignore
  transformMany<T>(
    response: AxiosResponse,
  ): Promise<ResourcePage<T>> | ResourcePage<T> {
    const { page, data, pageCount, total } = response.data;
    const startItemIndex = (page - 1) * 20;
    return {
      data: data,
      meta: {
        count: total,
        page: page,
        startItemIndex: startItemIndex + 1,
        endItemIndex: startItemIndex + data.length,
        hasNextPage: page < pageCount,
        hasPreviousPage: page > 1,
        nextPageToken: page < pageCount ? `${page + 1}` : undefined,
        previousPageToken: page > 1 ? `${page - 1}` : undefined,
      },
    };
  }
}
