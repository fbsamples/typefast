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

declare module "phosphor-queue" {

  declare class Queue<T> {
    (items?: Array<T>): void;
    back(): ?T;
    clear(): void;
    empty(): bool;
    every(pred: (value: T, index: number) => bool): bool;
    filter(pred: (value: T, index: number) => bool): Array<T>;
    forEach<U>(callback: (value: T, index: number) => U): U;
    front(): ?T;
    map<U>(callback: (value: T, index: number) => U): Array<U>;
    pop(): ?T;
    push(value: T): void;
    remove(value: T): bool;
    removeAll(value: T): number;
    size(): number;
    some(pred: (value: T, index: number) => bool): bool;
    toArray(): Array<T>;
  }

  declare var exports: {
    Queue: typeof Queue;
  }
}
