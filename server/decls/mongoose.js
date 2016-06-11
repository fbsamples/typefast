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

type documentCallback = (err: string, doc: Document) => void;
type documentsCallback = (err: string, docs: Array<Document>) => void;

declare module mongoose {

  declare type MongooseThenable = {
  }

  declare type Schema = {
    pre(name: string, callback: Function): void;
  }

  declare type Model = {
    find(conditions: Object, projection?: Object, options?: Object, callback: documentsCallback): Query;
    findById(id: Object | string | number, projection?: Object, options?: Object, callback: documentCallback): Query;
    findByIdAndUpdate(id: Object | string | number, update: Object, options: Object, callback: documentCallback): Query;
    findByIdAndRemove(id: Object | string | number, options: Object, callback: (error: string) => void): Query;
    save(callback: documentCallback): Promise;
  }

  declare type Document = {
  }

  declare type Promise = {
  }

  declare type Query = {
  }

  declare var exports: {
    connect(url: string, options?: Object, callback?: Function): MongooseThenable;
    Schema(schema: Object): Schema;
    model(name: string, schema: Schema, collection?: string, skipInit?: bool): (doc: Object) => Model;
  }
}
