import { MockDB } from '../modules/common/services/mock-http.service';
import { HttpMethods } from '../modules/common/types';
import { APP_KEYS } from '../modules/common/consts';

// eslint-disable-next-line func-names
export default function (baseURL: string) {
  MockDB.connection().addRecord(`${baseURL}/${APP_KEYS.BACKEND_KEYS.EXAMPLE}`, {
    [HttpMethods.GET]: {
      status: 200,
      data: [
        {
          id: '1',
          type: 'Pasta',
          createdAt: '2021-10-14T14:02:55.228Z',
          updatedAt: '2021-10-14T14:02:55.228Z',
          menuItems: [
            {
              id: '1',
              createdAt: '2021-10-14T14:02:55.228Z',
              updatedAt: '2021-10-14T14:02:55.228Z',
              price: 10.5,
              name: 'Tuna Pasta',
              available: true,
              description:
                'Pasta, tuna, onion, garlic, celery, nutmeg, lemon juice, salt, ground black pepper'
            },
            {
              id: '2',
              createdAt: '2021-10-14T14:02:55.228Z',
              updatedAt: '2021-10-14T14:02:55.228Z',
              price: 10.5,
              name: 'Tuna Pasta2',
              available: false,
              description:
                'Pasta, tuna, onion, garlic, celery, nutmeg, lemon juice, salt, ground black pepper'
            }
          ]
        }
      ]
    },
    [HttpMethods.POST]: {
      status: 200,
      data: {
        test: 'post'
      }
    },
    [HttpMethods.PUT]: {
      status: 200,
      data: {
        test: 'put'
      }
    },
    [HttpMethods.DELETE]: {
      status: 200,
      data: {
        test: 'delete'
      }
    }
  });
}
