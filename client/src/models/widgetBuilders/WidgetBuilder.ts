import { v4 as uuidv4 } from "uuid";
import { Layout } from "react-grid-layout";


export abstract class WidgetBuilder {

  public readonly uuid: string;

  // Make sure to define this when creating sub class.
  public abstract builderClassId: string;
  public abstract layout: Layout;


  /**
   * Do not define constructor in sub class.
   * */

  public constructor(uuid: string | undefined = undefined) {
    this.uuid = uuid || uuidv4(); // Generate a random uuid.
  }


  /**
   * Static methods
   * */

  public static generateWidgetId(builderClassId: string) {
    return [builderClassId, uuidv4()].join("/");
  }

  public static splitWidgetId(widgetId: string) {
    const [builderClassId, uuid] = widgetId.split("/"); // Extract widget information for widget id.
    return { builderClassId, uuid };
  }


  /**
   * Methods, abstract methods, getters and setters.
   * */

  get widgetId() {
    return `${this.builderClassId}/${this.uuid}`;
  }

  public abstract build(): JSX.Element;

}
