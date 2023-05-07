import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class HttpRequestWrapper {
  constructor(private readonly httpService: HttpService) {}

  public async makeRequest(url: string, body: any, method: 'get' | 'post', headers: any) {
    headers = { ...headers, 'Accept-Encoding': '*' };
    const data = await lastValueFrom(
      body
        ? this.httpService[method](url, body, {
            headers
          }).pipe(map((res) => res.data))
        : this.httpService[method](url, {
            headers
          }).pipe(map((res) => res.data))
    ).catch((error) => {
      throw new HttpException({ WYRE_API: error.response.data }, HttpStatus.BAD_REQUEST);
    });

    return data;
  }
}
