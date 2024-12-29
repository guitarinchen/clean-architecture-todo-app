type TaskProps = {
  id?: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
};

export class Task {
  private readonly _id?: number;
  private _title: string;
  private _description: string;
  private _status: string;
  private _dueDate: Date;

  constructor(props: TaskProps) {
    if (props.id) this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._status = props.status;
    this._dueDate = props.dueDate;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get description() {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get status() {
    return this._status;
  }

  set status(status: string) {
    this._status = status;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(dueDate: Date) {
    this._dueDate = dueDate;
  }
}
