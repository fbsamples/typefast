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

import type {NodeType} from './specs/NodeSpec';
import type NodeSpec from './specs/NodeSpec';

const {Map} = require('immutable');

class SpecRegistry {

  nodes: Map<NodeType, NodeSpec>;

  constructor(): void {
    this.nodes = new Map();
  }

  register(spec: NodeSpec): SpecRegistry {
    this.nodes = this.nodes.set(spec.getType(), spec);
    return this;
  }

  has(key: NodeType): bool {
    return this.nodes.has(key);
  }

  get(key: NodeType): NodeSpec {
    const node = this.nodes.get(key, undefined);
    if (node === undefined) {
      throw new Error(`Unregistred node type ${key}`);
    }

    return node;
  }
}

module.exports = SpecRegistry;
