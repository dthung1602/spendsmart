/* eslint-disable @typescript-eslint/no-empty-function */

abstract class AbstractModel {
  public static readonly TEXT_FIELDS_INDEX_MAPPING = {};
  public static readonly COMPARABLE_FIELDS_INDEX_MAPPING = {};

  public readonly id: number;
  private _isNew: boolean;

  protected constructor(id?: number) {
    if (id === undefined) {
      this.id = new Date().getTime();
      this._isNew = true;
    } else {
      this.id = id;
      this._isNew = false;
    }
  }

  public get isNew(): boolean {
    return this._isNew;
  }

  public preSave(): void {}

  public postSave(): void {
    this._isNew = true;
  }
}

export default AbstractModel;

/* eslint-enable @typescript-eslint/no-empty-function */
