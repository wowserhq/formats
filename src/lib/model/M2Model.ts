import { IoMode, IoSource, openStream } from '@wowserhq/io';
import * as io from '@wowserhq/io';
import * as m2Io from './io/m2.js';
import { M2_BONE_FLAG, M2_MODEL_FLAG } from './const.js';
import { M2Sequence, M2TextureTransform, M2TextureWeight, M2Color, M2Bone } from './types.js';
import M2Texture, { M2_TEXTURE_COMBINER, M2_TEXTURE_COORD } from './M2Texture.js';
import M2Material from './M2Material.js';
import { m2typedArray } from './io/common.js';
import M2Bounds from './M2Bounds.js';
import M2Camera from './M2Camera.js';
import M2Track from './M2Track.js';
import M2SplineKey from './M2SplineKey.js';

class M2Model {
  #name: string;
  #flags: number;

  #vertices: ArrayBuffer;

  #bounds: M2Bounds;
  #collisionBounds: M2Bounds;

  #bones: M2Bone[] = [];
  #boneIndicesById: Uint16Array;

  #textures: M2Texture[] = [];
  #textureCombos: number[] = [];
  #textureCoordCombos: M2_TEXTURE_COORD[] = [];
  #textureWeights: M2TextureWeight[] = [];
  #textureWeightCombos: number[] = [];
  #textureTransforms: M2TextureTransform[] = [];
  #textureTransformCombos: number[] = [];
  #textureCombinerCombos: M2_TEXTURE_COMBINER[] = [];

  #colors: M2Color[] = [];

  #materials: M2Material[] = [];
  #skinProfileCount: number;

  #sequences: M2Sequence[] = [];
  #loops: Uint32Array;

  #cameras: M2Camera[] = [];

  get bones() {
    return this.#bones;
  }

  get boneIndicesById() {
    return this.#boneIndicesById;
  }

  get bounds() {
    return this.#bounds;
  }

  get collisionBounds() {
    return this.#collisionBounds;
  }

  get colors() {
    return this.#colors;
  }

  get flags() {
    return this.#flags;
  }

  get loops() {
    return this.#loops;
  }

  get materials() {
    return this.#materials;
  }

  get name() {
    return this.#name;
  }

  get sequences() {
    return this.#sequences;
  }

  get skinProfileCount() {
    return this.#skinProfileCount;
  }

  get textures() {
    return this.#textures;
  }

  get textureCombos() {
    return this.#textureCombos;
  }

  get textureCombinerCombos() {
    return this.#textureCombinerCombos;
  }

  get textureCoordCombos() {
    return this.#textureCoordCombos;
  }

  get textureTransforms() {
    return this.#textureTransforms;
  }

  get textureTransformCombos() {
    return this.#textureTransformCombos;
  }

  get textureWeights() {
    return this.#textureWeights;
  }

  get textureWeightCombos() {
    return this.#textureWeightCombos;
  }

  get vertices() {
    return this.#vertices;
  }

  get cameras() {
    return this.#cameras;
  }

  load(source: IoSource) {
    const stream = openStream(source, IoMode.Read);

    // Base data
    const data = m2Io.m2.read(stream);

    // Optional data
    if (data.flags & M2_MODEL_FLAG.USE_COMBINER_COMBOS) {
      this.#textureCombinerCombos = m2typedArray(io.uint16le).read(stream);
    }

    stream.close();

    this.#name = data.name;
    this.#flags = data.flags;
    this.#skinProfileCount = data.skinProfileCount;
    this.#vertices = data.vertices.buffer;
    this.#loops = data.loops;

    this.#bounds = new M2Bounds(data.bounds.extent, data.bounds.radius);
    this.#collisionBounds = new M2Bounds(data.collisionBounds.extent, data.collisionBounds.radius);

    this.#bones = data.bones;
    this.#boneIndicesById = data.boneIndicesById;

    this.#textureCombos = data.textureCombos;
    this.#textureCoordCombos = data.textureCoordCombos;
    this.#textureWeightCombos = data.textureWeightCombos;
    this.#textureTransformCombos = data.textureTransformCombos;

    this.#loadTextures(data);
    this.#textureTransforms = data.textureTransforms;
    this.#textureWeights = data.textureWeights;

    this.#colors = data.colors;

    this.#loadMaterials(data);

    this.#sequences = data.sequences;

    this.#loadCameras(data);

    return this;
  }

  #loadMaterials(data: any) {
    for (const materialData of data.materials) {
      this.#materials.push(new M2Material(materialData.flags, materialData.blendMode));
    }
  }

  #loadTextures(data: any) {
    for (const textureData of data.textures) {
      this.#textures.push(
        new M2Texture(textureData.component, textureData.flags, textureData.filename),
      );
    }
  }

  createTrack(data: any): M2Track<M2SplineKey<number[]>> {
    const splineKeys: M2SplineKey<number[]>[] = [];
    for (const spline of data.sequenceKeys) {
      splineKeys.push(new M2SplineKey<number[]>(spline.value, spline.inTan, spline.outTan));
    }

    return new M2Track<M2SplineKey<number[]>>(
      data.trackType,
      data.loopIndex,
      data.sequenceTimes,
      splineKeys,
    );
  }

  #loadCameras(data: any) {
    for (const cameraData of data.cameras) {
      this.#cameras.push(
        new M2Camera(
          cameraData.cameraId,
          cameraData.fieldOfView,
          cameraData.farClip,
          cameraData.nearClip,
          this.createTrack(cameraData.positionTrack),
          cameraData.positionBase,
          this.createTrack(cameraData.targetTrack),
          cameraData.targetBase,
          this.createTrack(cameraData.rollTrack),
        ),
      );
    }
  }
}

export default M2Model;
export {
  M2Model,
  M2Track,
  M2Bone,
  M2Color,
  M2Sequence,
  M2TextureWeight,
  M2TextureTransform,
  M2_BONE_FLAG,
  M2_MODEL_FLAG,
};
