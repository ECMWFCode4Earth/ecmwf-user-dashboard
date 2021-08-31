import { v4 as uuidv4 } from "uuid";
import { Layout } from "react-grid-layout";


export abstract class WidgetBuilder {

  public tabNumber: number;
  public readonly uuid: string;

  // Make sure to define this when creating sub class.
  public abstract builderClassId: string;
  public abstract layout: Layout;


  /**
   * Do not define constructor in sub class.
   * */

  public constructor(tabNumber: number, uuid: string | undefined = undefined) {
    this.tabNumber = tabNumber || 0;
    this.uuid = uuid || uuidv4(); // Generate a random uuid.
  }


  /**
   * Static methods
   * */

  public static generateWidgetId(tabNumber: number, builderClassId: string) {
    return [tabNumber, builderClassId, uuidv4()].join("/");
  }

  public static splitWidgetId(widgetId: string) {
    const [tabNumber, builderClassId, uuid] = widgetId.split("/"); // Extract widget information for widget id.
    return { tabNumber: Number(tabNumber), builderClassId, uuid };
  }


  /**
   * Methods, abstract methods, getters and setters.
   * */

  get widgetId() {
    return `${this.tabNumber}/${this.builderClassId}/${this.uuid}`;
  }

  public abstract build(): JSX.Element;

}
