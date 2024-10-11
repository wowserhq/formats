type Serializable = {
  toObject();
};

class M2Track<T extends Serializable> {
  #type: number;
  #loopIndex: number;
  #sequenceTimes: Uint32Array;
  #sequenceKeys: T[];

  constructor(type: number, loopIndex: number, sequenceTimes: Uint32Array, sequenceKeys: T[]) {
    this.#type = type;
    this.#loopIndex = loopIndex;
    this.#sequenceTimes = sequenceTimes;
    this.#sequenceKeys = sequenceKeys;
  }

  get type() {
    return this.#type;
  }

  get loopIndex() {
    return this.#loopIndex;
  }

  get sequenceTimes() {
    return this.#sequenceTimes;
  }

  get sequenceKeys() {
    return this.#sequenceKeys;
  }

  toObject() {
    return {
      type: this.#type,
      loopIndex: this.#loopIndex,
      sequenceTimes: this.#sequenceTimes,
      sequenceKeys: this.#sequenceKeys.map((sequenceKey) => sequenceKey.toObject()),
    };
  }
}

export default M2Track;
export { M2Track };
