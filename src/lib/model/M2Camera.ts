import { M2Track, M2SplineKey } from '../index.js';

class M2Camera {
  #cameraId: number;
  #fieldOfView: number;
  #farClip: number;
  #nearClip: number;
  #positionTrack: M2Track<M2SplineKey<number[]>>;
  #positionBase: number[];
  #targetTrack: M2Track<M2SplineKey<number[]>>;
  #targetBase: number[];
  #rollTrack: M2Track<M2SplineKey<number[]>>;

  constructor(
    cameraId: number,
    fieldOfView: number,
    farClip: number,
    nearClip: number,
    positionTrack: M2Track<M2SplineKey<number[]>>,
    positionBase: number[],
    targetTrack: M2Track<M2SplineKey<number[]>>,
    targetBase: number[],
    rollTrack: M2Track<M2SplineKey<number[]>>,
  ) {
    this.#cameraId = cameraId;
    this.#fieldOfView = fieldOfView;
    this.#farClip = farClip;
    this.#nearClip = nearClip;
    this.#positionTrack = positionTrack;
    this.#positionBase = positionBase;
    this.#targetTrack = targetTrack;
    this.#targetBase = targetBase;
    this.#rollTrack = rollTrack;
  }

  get cameraId() {
    return this.#cameraId;
  }

  get fieldOfView() {
    return this.#fieldOfView;
  }

  get farClip() {
    return this.#farClip;
  }

  get nearClip() {
    return this.#nearClip;
  }

  get positionTrack() {
    return this.#positionTrack;
  }

  get positionBase() {
    return this.#positionBase;
  }

  get targetTrack() {
    return this.#targetTrack;
  }

  get targetBase() {
    return this.#targetBase;
  }

  get rollTrack() {
    return this.#rollTrack;
  }

  toObject() {
    return {
      cameraId: this.#cameraId,
      fieldOfView: this.#fieldOfView,
      farClip: this.#farClip,
      nearClip: this.#nearClip,
      positionTrack: this.#positionTrack.toObject(),
      positionBase: this.#positionBase,
      targetTrack: this.#targetTrack.toObject(),
      targetBase: this.#targetBase,
      rollTrack: this.#rollTrack.toObject(),
    };
  }
}

export default M2Camera;
export { M2Camera };
