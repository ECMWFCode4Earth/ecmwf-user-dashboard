import { v4 as uuidv4 } from "uuid";
import { Layout } from "react-grid-layout";


export abstract class WidgetBuilder {

  public static readonly widgetName: string = "Widget";

  public readonly id: string;
  public abstract layout: Layout;

  protected constructor() {
    this.id = "Widget-" + uuidv4(); // If key not provide, generate a random id.
  }

  public setLayout(layout: Layout) {
    this.layout = layout;
  }

  public abstract build(): JSX.Element;

}
