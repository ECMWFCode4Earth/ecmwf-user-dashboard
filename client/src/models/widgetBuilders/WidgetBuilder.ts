import { v4 as uuidv4 } from "uuid";
import { Layout } from "react-grid-layout";


export abstract class WidgetBuilder {

  public tabNo: number;
  public readonly uuid: string;

  public abstract builderClassId: string;
  public abstract layout: Layout;

  public constructor(tabNo: number, uuid: string | undefined = undefined) {
    this.tabNo = tabNo || 0;
    this.uuid = uuid || uuidv4(); // Generate a random uuid.
  }

  get widgetId() {
    return `${this.tabNo}/${this.builderClassId}/${this.uuid}`;
  }

  public abstract build(): JSX.Element;

}
