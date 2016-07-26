/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

//import type {EventEmitter} from 'events';

declare module express {

  declare type StringKeyMap<T> = { [key: string]: T };

  declare type HandleCallback = (req: Request, res: Response, next: () => void) => void;

  declare type ApplicationEvent = | 'mount';

  declare type Application = {
    locals: StringKeyMap<string>;
    mountpath: Array<string>;

    (req: Request, res: Response, next: () => void): void;
    all(path: string, ...callback: Array<HandleCallback>): Application;
    delete(path: string, ...callback: Array<HandleCallback>): Application;
    disable(name: string): Application;
    disabled(name: string): bool;
    enable(name: string): Application;
    enabled(name: string): Application;
    engine(ext: string, callback: HandleCallback): Application;
    get(path: string, ...callback: Array<HandleCallback>): Application;
    listen(port: number, hostname?: string, backlog?: number, callback?: Function): void;
    on(event: ApplicationEvent, callback: (parent: Application) => void): void;
    post(path: string, ...callback: Array<HandleCallback>): Application;
    put(path: string, ...callback: Array<HandleCallback>): Application;
    use(path: string, ...callback: Array<HandleCallback>): Application;
  }

  declare type RouteLayer = {
    handle: Function;
    keys: Array<string>;
    method: RequestMethod;
    name: string;
    params: ?StringKeyMap<string>;
    path: ?string;
    regexp: RegExp;
  }

  declare type Route = {
    methods: { [key: RequestMethod]: bool };
    path: string;
    stack: Array<RouteLayer>;
  }

  declare type RequestMethod =
    | 'checkout'
    | 'copy'
    | 'delete'
    | 'get'
    | 'head'
    | 'lock'
    | 'merge'
    | 'mkactivity'
    | 'mkcol'
    | 'm-search'
    | 'notify'
    | 'options'
    | 'patch'
    | 'post'
    | 'purge'
    | 'put'
    | 'report'
    | 'search'
    | 'subscribe'
    | 'trace'
    | 'unlock'
    | 'unsubscribe';

  declare type Request = {
    app: Application;
    baseUrl: string;
    body: StringKeyMap<string>;
    cookies: StringKeyMap<string>;
    fresh: bool;
    hostname: string;
    ip: string;
    ips: Array<string>;
    method: RequestMethod;
    originalUrl: string;
    params: StringKeyMap<string>;
    path: string;
    protocol: string;
    query: StringKeyMap<string>;
    route?: Route;
    secure: bool;
    signedCookies: StringKeyMap<string>;
    stale: bool;
    subdomains: Array<string>;
    xhr: bool;

    accepts(types: string | Array<string>): bool;
    acceptsCharsets(...charset: Array<string>): bool;
    acceptsEncodings(...encoding: Array<string>): bool;
    acceptsLanguages(...lang: Array<string>): bool;
    get(field: string): string | void;
    is(type: string): bool;
    param<T>(name: string, defaultValue?: T): T;
  }

  declare type ResponseCookieOptions = {
    domain?: string;
    encode?: (value: string) => string;
    expires?: Date;
    httpOnly?: bool;
    maxAge?: string;
    path?: string;
    secure?: bool;
    signed?: bool;
  };

  declare type ResponseSendFileDotFiles = | 'allow' | 'deny' | 'ignore';

  declare type ResponseSendFileOptions = {
    maxAge?: number;
    root?: string;
    lastModifield?: Date | bool;
    headers?: StringKeyMap<string>;
    dotfiles?: ResponseSendFileDotFiles;
  }

  declare type Response = {
    app: Application;
    headersSent: bool;
    locals: StringKeyMap<string>;

    append(field: string, value: string | Array<string>): Response;
    attachment(filename?: string): Response;
    cookie(name: string, value: string, options?: ResponseCookieOptions): Response;
    clearCookie(name: string, options?: ResponseCookieOptions): Response;
    download(path: string, filename:? string, fn?: (error: Error) => void): Response;
    end(data?: string | Buffer): Response;
    format(object: StringKeyMap<string>): Response;
    get(field: string): string | void;
    json(body?: StringKeyMap<string>): Response;
    jsonp(body?: StringKeyMap<string>): Response;
    links(links: StringKeyMap<string>): Response;
    location(path: string): Response;
    on(event: string, callback: Function): void;
    once(event: string, callback: Function): void;
    redirect(status?: number, path: string): Response;
    render(view: string, locals?: StringKeyMap<string>, callback?: (err: Error, html: string) => void): Response;
    send(body: Buffer | StringKeyMap<any> | string | Array<string>): Response;
    sendFile(path: string, options?: ResponseSendFileOptions, fn?: HandleCallback): Response;
    sendStatus(statusCode: number): Response;
    set(field: string, value?: string): Response;
    status(code: number): Response;
    vary(field: string): Response;
  }

  declare type Router = {
    (req: Request, res: Response, next: () => void): void;
    all(path: string, ...callback: Array<HandleCallback>): Router;
    delete(path: string, ...callback: Array<HandleCallback>): Router;
    get(path: string, ...callback: Array<HandleCallback>): Router;
    param(name: string, callback: (req: Request, res: Response, next: () => void, id: string) => void): Router;
    post(path: string, ...callback: Array<HandleCallback>): Router;
    put(path: string, ...callback: Array<HandleCallback>): Router;
    route(path: string): Route;
    use(path: string, ...callback: Array<HandleCallback>): Router;
  }

  declare var exports: {
    (): Application,
    static: (root: string, options?: Object) => HandleCallback;
    Route: () => Route,
    Router: () => Router,
  }
}
