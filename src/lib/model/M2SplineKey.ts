class M2SplineKey<T> {
  #value: T;
  #inTan: T;
  #outTan: T;

  constructor(value: T, inTan: T, outTan: T) {
    this.#value = value;
    this.#inTan = inTan;
    this.#outTan = outTan;
  }

  get value() {
    return this.#value;
  }

  get inTan() {
    return this.#inTan;
  }

  get outTan() {
    return this.#outTan;
  }

  toObject() {
    return {
      value: this.#value,
      inTan: this.#inTan,
      outTan: this.#outTan,
    };
  }
}

export default M2SplineKey;
export { M2SplineKey };
