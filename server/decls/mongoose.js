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

type DocumentId = Object | string | number;
type OperationCallback<T> = (err: Error, res: T) => void;

declare module mongoose {

  declare class Connection {
  }

  declare class MongooseThenable {
    connection: Connection;
    connections: Array<Connection>;

    disconnect(): MongooseThenable;
  }

  declare class Schema {
    (schema: Object): Schema;
    index(fields: Object, options?: Object): Schema;
    pre(name: string, callback: Function): Schema;
  }

  declare class Model {
    static find(conditions: Object, projection?: Object, options?: Object, callback?: OperationCallback<Array<Document>>): Query<Array<Document>>;
    static findById(id: DocumentId, projection?: Object, options?: Object, callback?: OperationCallback<Document>): Query<Document>;
    static findByIdAndUpdate(id: DocumentId, update: Object, options: Object, callback?: OperationCallback<Document>): Query<Document>;
    static findByIdAndRemove(id: DocumentId, options: Object, callback?: (error: string) => void): Query<void>;

    static (doc: Object): Model;
    save(callback: OperationCallback<Document>): Promise<Document>;
  }

  declare class Document {
    get(path: string): any;
  }

  declare class Promise<T> {
  }

  declare class Query<T> {
    exec(callback: OperationCallback<T>): Promise<T>;
  }

  declare var exports: {
    connect(url: string, options?: Object, callback?: Function): MongooseThenable;
    Connection: typeof Connection;
    disconnect(): void;
    Document: typeof Document;
    MongooseThenable: typeof MongooseThenable;
    Promise: typeof Promise;
    Query: typeof Query;
    Schema: typeof Schema;
    model(name: string, schema: Schema, collection?: string, skipInit?: bool): typeof Model;
    Model: typeof Model;
  }
}
