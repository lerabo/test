import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { IPagination, ReactQueryFactory } from '../common/utils';

interface IExampleFilters {
  title: string;
}

interface IListItem {
  id: string;
  title: string;
}

const apiData = [
  {
    id: '1',
    title: 'First'
  },
  {
    id: '2',
    title: 'Second'
  },
  {
    id: '3',
    title: 'Third'
  }
];

class ExampleReactQueryRepository extends ReactQueryFactory<IExampleFilters> {
  constructor() {
    super('example');
  }

  onDetailedRequest(id: string) {
    return apiData.find((d) => d.id === id);
  }

  onListRequest(filters: IExampleFilters, pagination: IPagination) {
    const filtered = apiData.filter((d) => d.title === filters.title);
    const currentPage = pagination.limit * pagination.page;
    return filtered.slice(currentPage, currentPage + pagination.limit);
  }

  onAllRequest() {
    return apiData;
  }
}

const instance = new ExampleReactQueryRepository();
interface IPros {
  data: { id: string };
}

const DetailsComponent: FC<IPros> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { data } = instance.useDetailedQuery<IListItem>(props.data.id);
  return (
    <div>
      Datails: {data?.id}, {data?.title}
    </div>
  );
};

interface IListItemComponentProps {
  data: IListItem;
}
const ListItemComponent: FC<IListItemComponentProps> = (props) => {
  const { data } = props;
  const [isShown, setShown] = useState(false);

  return (
    <div key={data.id}>
      <div>Content: {data.title}</div>
      <button type="button" onClick={() => setShown(!isShown)}>
        Show
      </button>
      <div>{isShown && <DetailsComponent data={{ id: data.id }} />}</div>
    </div>
  );
};

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const HomePageContainer = () => {
  // const all = instance.useAllQuery<IListItem[]>();
  const filtered = instance.useListQuery<IListItem[]>({ title: 'First' }, { page: 1, limit: 10 });
  if (filtered.data) {
    return (
      <Grid container spacing={1}>
        {/* {filtered.data.map((d) => (
          <ListItemComponent key={d.id} data={d} />
        ))} */}
        <Grid sm={6} md={3} xs={12} item>
          <Card>
            <CardHeader title="Header 1" />
            <CardMedia
              component="img"
              height="194"
              image="/static/images/cards/paella.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography>
                Some long content Some long content Some long content Some long content Some long
                content Some long content Some long content Some long content Some long content Some
                long content Some long content Some long content Some long content Some long content
                Some long content Some long content Some long content Some long content Some long
                content Some long content Some long content Some long content Some long content Some
                long content
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid sm={6} md={3} xs={12} item>
          <Card>
            <CardHeader title="Header 1" />
          </Card>
        </Grid>
        <Grid sm={6} md={3} xs={12} item>
          <Card>
            <CardHeader title="Header 1" />
          </Card>
        </Grid>
        <Grid sm={6} md={3} xs={12} item>
          <Card>
            <CardHeader title="Header 1" />
          </Card>
        </Grid>
      </Grid>
    );
  }
  return <div>Loading...</div>;
};

export default HomePageContainer;
