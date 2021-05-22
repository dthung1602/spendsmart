/* eslint-disable @typescript-eslint/no-empty-function */

abstract class AbstractModel {
  public static readonly TEXT_FIELDS_INDEX_MAPPING = {};
  public static readonly COMPARABLE_FIELDS_INDEX_MAPPING = {};

  protected readonly _isNew: boolean;

  protected constructor(isNew: boolean) {
    this._isNew = isNew;
  }

  public get isNew(): boolean {
    return this._isNew;
  }

  public preSave(): void {}

  public abstract getKey(): string | number;
}

export default AbstractModel;

/* eslint-enable @typescript-eslint/no-empty-function */

// type INDICES_PREFERENCE_ORDER
