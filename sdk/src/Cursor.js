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
 *
 * @flow
 */

import type Api from './Api';
import type Node from './Node';
import type NodeSpec from './specs/NodeSpec';
import type Response from './http/Response';

const {List} = require('immutable');

type CursorMapper = (node: Node, index: number, cursor?: Cursor) => any;

// FIXME implement implicit fetching
class Cursor {

  api: Api;
  index: number;
  last_response: Response;
  node_spec: NodeSpec;
  nodes: List<Node>;

  constructor(node_spec: NodeSpec, first_response: Response): void {
    this.node_spec = node_spec;
    this.nodes = new List();
    this.pushResponse(first_response);
    this.rewind();
  }

  makeNode(node_content: Object): Node {
    // Inline require to avoid static cyclic dependecy issues
    const Node = require('./Node');
    return Node.fromData(this.getLastResponse().getRequest().getApi(), this.getNodeSpec(), node_content);
  }

  pushResponse(response: Response): Cursor {
    this.last_response = response;
    this.nodes = this.nodes.merge(
      new List(response.getContent().data).map(this.makeNode.bind(this))
    );
    return this;
  }

  getNodeSpec(): NodeSpec {
    return this.node_spec;
  }

  getLastResponse(): Response {
    return this.last_response;
  }

  count(): number {
    return this.nodes.size;
  }

  toArray(): Array<Node> {
    return this.nodes.toArray();
  }

  key(): number {
    return this.index;
  }

  has(key: number): bool {
    // List.has(-1) -> true
    return key >= 0 && this.nodes.has(key);
  }

  isValid(): bool {
    return this.has(this.key());
  }

  current(): ?Node {
    return this.isValid() ? this.nodes.get(this.key()) : null;
  }

  next(): ?Node {
    ++this.index;
    return this.current();
  }

  rewind(): void {
    this.index = -1;
  }

  map(mapper: CursorMapper, thisArg?: any): Array<Node> {
    return this.nodes.map((value, key) => mapper.call(thisArg, value, key, this), thisArg).toArray();
  }

  forEach(mapper: CursorMapper, thisArg?: any): Cursor {
    this.map(mapper, thisArg);
    return this;
  }
}

module.exports = Cursor;
