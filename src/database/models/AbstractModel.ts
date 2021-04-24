/* eslint-disable @typescript-eslint/no-empty-function */

abstract class AbstractModel {
  public preSave(): void {}
  public abstract getKey(): string | number;
}

export default AbstractModel;

/* eslint-enable @typescript-eslint/no-empty-function */
