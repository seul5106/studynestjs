import { Controller, Get } from '@nestjs/common';

// 하위 도메인 라우팅
@Controller({ host: 'api.localhost' })
export class ApiController {
  @Get() // 같은 루트 경로
  index(): string {
    return 'Hello,Api'; // 다른 응답
  }
}

//하위 도메인 라우팅으로 API를 버전별로 분리할 수 있다.
// @Controller({ host: ':version.api.localhost' })
// export class ApiController {
//   @Get()
//   index(@HostParam('version') version: string): string {
//     return `Hello, API ${version}`;
//   }
// }
